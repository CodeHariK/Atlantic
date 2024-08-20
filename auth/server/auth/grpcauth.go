package AuthHandler

import (
	"context"
	"crypto/subtle"
	"fmt"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/auth/server/authn"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/google/uuid"

	auth_v1connect "github.com/codeharik/Atlantic/auth/api/v1/v1connect"

	auth_app "github.com/codeharik/Atlantic/auth/api/v1"
)

func equal(left, right string) bool {
	// Using subtle prevents some timing attacks.
	return subtle.ConstantTimeCompare([]byte(left), []byte(right)) == 1
}

func (s *AuthServiceServer) Authenticate(_ context.Context, req authn.Request) (any, error) {
	user, _ := s.dragonstore.GetUser(req.Request)
	// if err != nil {
	// 	return nil, authn.Errorf("Dragon error : %v", err)
	// }

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

type AuthServiceServer struct {
	auth_v1connect.UnimplementedAuthServiceHandler
	userStore   *user.Queries
	dragonstore *sessionstore.SessionStore
	cookiestore *sessionstore.SessionStore
}

func CreateNewAuthServiceServer(
	userStore *user.Queries,
	dragonstore *sessionstore.SessionStore,
	cookiestore *sessionstore.SessionStore,
) AuthServiceServer {
	return AuthServiceServer{
		userStore:   userStore,
		dragonstore: dragonstore,
		cookiestore: cookiestore,
	}
}

func (s AuthServiceServer) EmailLogin(ctx context.Context, req *connect.Request[auth_app.EmailLoginRequest]) (*connect.Response[auth_app.EmailLoginResponse], error) {
	email := req.Msg.Email
	password := req.Msg.Password

	r := authn.GetInfo(ctx).(authn.Request)

	// r.Writer.Header().Set("Content-Type", "text/html")
	// http.Redirect(
	// 	r.Writer,
	// 	r.Request,
	// 	"/",
	// 	http.StatusTemporaryRedirect)

	newid, _ := uuid.NewV7()
	s.cookiestore.SaveUserSession(r.Request, r.Writer, types.AuthUser{ID: newid})

	fmt.Printf("-> email:%s password:%s info:%v\n\n", email, password, authn.GetInfo(ctx))

	if password == "hello" {
		return connect.NewResponse(
			&auth_app.EmailLoginResponse{
				Id:       2,
				Username: "hellouser",
				Email:    "hellomail",
			}), nil
	}

	// _, err := s.dragonstore.GetUser(r)
	// if err == nil {
	// 	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
	// 	return
	// }

	// // Authentication logic (this is just a dummy example)
	// if email == "user@example.com" && password == "password123" {
	// 	return &auth_app.EmailLoginResponse{
	// 		Id:       1,
	// 		Username: "username",
	// 		Email:    email,
	// 	}, nil
	// }

	return connect.NewResponse(
		&auth_app.EmailLoginResponse{
			ErrorMessage: "Invalid credentials",
		}), connect.NewError(connect.CodePermissionDenied, fmt.Errorf("Invaled Credentials"))

	// email := r.FormValue("email")
	// password := r.FormValue("password")

	// // Fetch user by email
	// user, err := authHandler.userStore.GetAuthUserByEmail(context.Background(), email)
	// if err != nil {
	// 	http.Error(w, "Invalid credentials", http.StatusUnauthorized)
	// 	return
	// }

	// // Verify password
	// if err := sessionstore.CheckPassword(user.PasswordHash, password); err != nil {
	// 	http.Error(w, "Invalid credentials", http.StatusUnauthorized)
	// 	return
	// }

	// fmt.Println(r.Header.Get("User-Agent"))

	// u := types.AuthUser{
	// 	ID:    string(user.ID),
	// 	Email: user.Email,
	// }

	// err = authHandler.dragonstore.SaveUserSession(r, w, u)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	// http.Redirect(w, r, "/profile", http.StatusSeeOther)
}
