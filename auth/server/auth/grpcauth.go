package AuthHandler

import (
	"context"
	"crypto/subtle"
	"errors"
	"fmt"
	"net/http"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/auth/server/authn"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/jackc/pgx/v5/pgtype"

	auth_v1connect "github.com/codeharik/Atlantic/auth/api/v1/v1connect"

	auth_app "github.com/codeharik/Atlantic/auth/api/v1"
)

type AuthServiceServer struct {
	auth_v1connect.UnimplementedAuthServiceHandler
	userStore   *user.Queries
	dragonstore *sessionstore.DragonSessionStore
	cookiestore *sessionstore.CookieSessionStore
}

func CreateNewAuthServiceServer(
	userStore *user.Queries,
	dragonstore *sessionstore.DragonSessionStore,
	cookiestore *sessionstore.CookieSessionStore,
) AuthServiceServer {
	return AuthServiceServer{
		userStore:   userStore,
		dragonstore: dragonstore,
		cookiestore: cookiestore,
	}
}

func equal(left, right string) bool {
	// Using subtle prevents some timing attacks.
	return subtle.ConstantTimeCompare([]byte(left), []byte(right)) == 1
}

func (s *AuthServiceServer) Authenticate(_ context.Context, req authn.Request) (any, error) {
	r, w := req.Request, req.Writer
	user, err := s.cookiestore.GetUser(r)
	if err != nil {
		user, err = s.dragonstore.GetUser(r)
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return nil, nil
		}
		err := s.cookiestore.SaveUserSession(r, w, user)
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return nil, nil
		}
	}

	sessionstore.SetContextWithUser(r, user)
	// s.dragonstore.SaveUserSession(req.Request, req.Writer, types.AuthUser{ID: "hello123"})

	// req.Writer.Header().Set("Content-Type", "text/html")
	// http.Redirect(req.Writer, req.Request, "/profile", http.StatusTemporaryRedirect)

	fmt.Println()
	fmt.Println(user)
	fmt.Println(req.Cookies())
	fmt.Println()

	// return nil, authn.Errorf("invalid authorization")

	// if !ok {
	// 	return nil, authn.Errorf("invalid authorization")
	// }
	// if !equal(password, "open-sesame") {
	// 	return nil, authn.Errorf("invalid password")
	// }
	// The request is authenticated! We can propagate the authenticated user to
	// Connect interceptors and services by returning it: the middleware we're
	// about to construct will attach it to the context automatically.

	////
	////
	////
	// return user, nil
	return req, nil
}

func (s AuthServiceServer) EmailLogin(ctx context.Context, req *connect.Request[auth_app.EmailLoginRequest]) (*connect.Response[auth_app.EmailLoginResponse], error) {
	authreq := authn.GetInfo(ctx).(authn.Request)
	r, w := authreq.Request, authreq.Writer

	_, err := s.cookiestore.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return nil, nil
	}

	_, err = s.dragonstore.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return nil, nil
	}

	email := req.Msg.Email
	password := req.Msg.Password

	// r.Writer.Header().Set("Content-Type", "text/html")
	// http.Redirect(
	// 	r.Writer,
	// 	r.Request,
	// 	"/",
	// 	http.StatusTemporaryRedirect)

	// Fetch user by email
	user, err := s.userStore.GetAuthUserByEmail(
		context.Background(),
		pgtype.Text{String: email, Valid: true})
	if err != nil || !user.Email.Valid || !user.PasswordHash.Valid {
		http.Error(w, "Invalid Email or password", http.StatusUnauthorized)

		return connect.NewResponse(&auth_app.EmailLoginResponse{}),
			connect.NewError(connect.CodePermissionDenied, errors.New("Invalid Email or password"))
	}

	// Verify password
	if err := sessionstore.CheckPassword(user.PasswordHash.String, password); err != nil {
		http.Error(w, "Invalid Email or password", http.StatusUnauthorized)

		return connect.NewResponse(&auth_app.EmailLoginResponse{}),
			connect.NewError(connect.CodePermissionDenied, errors.New("Invalid Email or password"))
	}

	u := types.AuthUser{
		ID:    user.ID,
		Email: user.Email.String,
	}

	err = s.cookiestore.SaveUserSession(r, w, u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return connect.NewResponse(&auth_app.EmailLoginResponse{}),
			connect.NewError(connect.CodeInternal, err)
	}
	err = s.dragonstore.SaveUserSession(r, w, u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return connect.NewResponse(&auth_app.EmailLoginResponse{}),
			connect.NewError(connect.CodeInternal, err)
	}

	http.Redirect(w, r, "/profile", http.StatusSeeOther)
	return connect.NewResponse(
			&auth_app.EmailLoginResponse{
				Id: user.ID[:],
			}),
		nil
}
