package AuthHandler

import (
	"context"
	"crypto/subtle"
	"errors"
	"net/http"
	"strings"

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

func authRedirect(r *http.Request, w http.ResponseWriter, err error) error {
	auth := strings.Contains(r.URL.Path, auth_v1connect.AuthServiceName)

	if auth && err == nil {
		http.Redirect(w, r, "/profile", http.StatusTemporaryRedirect)
		return authn.Errorf("Already logged in")
	}
	if !auth && err != nil {
		http.Redirect(w, r, "/grpcemailpage", http.StatusTemporaryRedirect)
		return authn.Errorf("Not logged in")
	}
	return nil
}

func (s *AuthServiceServer) Authenticate(_ context.Context, req authn.Request) (any, error) {
	r, w := req.Request, req.Writer
	user, err := s.cookiestore.GetUser(r)
	if err != nil {
		user, err = s.dragonstore.GetUser(r)
		if err := authRedirect(r, w, err); err != nil {
			return nil, err
		}
		err := s.cookiestore.SaveUserSession(r, w, user)
		if err := authRedirect(r, w, err); err != nil {
			return nil, err
		}
	}

	if err := authRedirect(r, w, err); err != nil {
		return nil, err
	}

	sessionstore.SetContextWithUser(r, user)

	return req, nil
}

func (s AuthServiceServer) EmailLogin(ctx context.Context, req *connect.Request[auth_app.EmailLoginRequest]) (*connect.Response[auth_app.EmailLoginResponse], error) {
	authreq, ok := authn.GetInfo(ctx).(authn.Request)
	if !ok {
		return emailLoginErrorResponse()
	}
	r, w := authreq.Request, authreq.Writer

	email := req.Msg.Email
	password := req.Msg.Password

	// Fetch user by email
	user, err := s.userStore.GetAuthUserByEmail(
		context.Background(),
		pgtype.Text{String: email, Valid: true})
	if err != nil || !user.Email.Valid || !user.PasswordHash.Valid {
		return emailLoginErrorResponse()
	}

	// Verify password
	if err := sessionstore.CheckPassword(user.PasswordHash.String, password); err != nil {
		return emailLoginErrorResponse()
	}

	u := types.AuthUser{
		ID:    user.ID,
		Email: user.Email.String,
	}

	err = s.cookiestore.SaveUserSession(r, w, u)
	if err != nil {
		return emailLoginErrorResponse()
	}
	err = s.dragonstore.SaveUserSession(r, w, u)
	if err != nil {
		return emailLoginErrorResponse()
	}

	http.Redirect(w, r, "/profile", http.StatusSeeOther)
	return connect.NewResponse(
			&auth_app.EmailLoginResponse{
				Id: user.ID[:],
			}),
		nil
}

func emailLoginErrorResponse() (*connect.Response[auth_app.EmailLoginResponse], error) {
	return connect.NewResponse(&auth_app.EmailLoginResponse{}),
		connect.NewError(connect.CodePermissionDenied, errors.New("Invalid Email or password"))
}
