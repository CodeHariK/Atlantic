package auth

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/auth/server/authn"
	"github.com/codeharik/Atlantic/auth/server/connectbox"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"

	"github.com/codeharik/Atlantic/auth/server/authbox"

	"github.com/codeharik/Atlantic/auth/server/dragon"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
)

type AuthServiceServer struct {
	v1connect.UnimplementedAuthServiceHandler

	*sessionstore.JwtConfig
	validator *protovalidate.Validator
	userStore *user.Queries
	dragon    *dragon.Dragon
}

func CreateAuthServiceServer(
	config *config.Config,
	userStore *user.Queries,
) AuthServiceServer {
	d := dragon.CreateDragon(config)

	validator, err := protovalidate.New()
	if err != nil {
		log.Fatal(err)
	}

	return AuthServiceServer{
		JwtConfig: &sessionstore.JwtConfig{Config: config},
		validator: validator,
		userStore: userStore,
		dragon:    &d,
	}
}

var internalServerError = connect.NewError(
	connect.CodeInternal,
	errors.New("Internal server error"),
)

var invalidEmailPassword = connect.NewError(
	connect.CodePermissionDenied,
	errors.New("Invalid Email or password"),
)

func (s AuthServiceServer) Authenticate(_ context.Context, req authn.Request) (any, error) {
	r, w := req.Request, req.Writer

	user, sessionNumber, err := s.dragon.DragonSessionCheck(r, s.Config)
	if err := connectbox.AuthRedirect(r, w, err); err != nil {
		return nil, err
	}

	return connectbox.ConnectBox{
		User:          user,
		SessionNumber: sessionNumber,
		R:             r,
		W:             w,
	}, nil
}

func (s AuthServiceServer) EmailLogin(ctx context.Context, req *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return nil, invalidEmailPassword
	}

	email := req.Msg.Email
	password := req.Msg.Password

	// Fetch dbuser by email
	dbuser, err := s.userStore.GetUserByEmail(
		context.Background(),
		pgtype.Text{String: email, Valid: true})
	if err != nil || !dbuser.Email.Valid || !dbuser.PasswordHash.Valid {
		return nil, invalidEmailPassword
	}

	// Verify password
	if err := sessionstore.CheckPassword(dbuser.PasswordHash.String, password); err != nil {
		return nil, invalidEmailPassword
	}

	// Handle error
	avatarUUid, _ := connectbox.ToUUIDstring(dbuser.Avatar)

	user := &v1.AuthUser{
		ID:          dbuser.ID.String(),
		Username:    dbuser.Username.String,
		Email:       dbuser.Email.String,
		PhoneNumber: dbuser.PhoneNumber.String,
		Role:        dbuser.Role,
		Verified:    dbuser.Verified,
		Location:    "Location",
		Avatar:      avatarUUid,
	}

	uu, err := s.dragon.GetDragonUser(dbuser.ID.String())
	if err == nil {
		user.Sessions = uu.Sessions
	}

	session := &v1.CookieSession{
		ID:  dbuser.ID.String(),
		Iat: time.Now().Unix(),
		Exp: (time.Now().Add(time.Hour * 24 * 7)).Unix(),
	}
	sessionId, err := authbox.SaveSession(cb.R, cb.W, s.Config, session)
	if err != nil {
		return nil, invalidEmailPassword
	}

	user.Sessions = append(user.Sessions, &v1.UserSession{
		Agent: cb.R.UserAgent(),
		Iat:   session.Iat,
		Exp:   session.Exp,
	})

	err = s.dragon.SaveUser(user)
	if err != nil {
		return nil, invalidEmailPassword
	}

	connectbox.AddRedirect(cb.W, "/profile")

	return connect.NewResponse(
			&v1.EmailLoginResponse{
				SessionId: sessionId,
			}),
		nil
}

func (s AuthServiceServer) RegisterUser(ctx context.Context, req *connect.Request[v1.RegisterUserRequest]) (*connect.Response[v1.RegisterUserResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	if err := s.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	email := req.Msg.Email
	password := req.Msg.Password

	hash, err := sessionstore.HashPassword(password)
	if err != nil {
		return nil, internalServerError
	}

	uid, err := uuid.NewV7()
	if err != nil {
		return nil, internalServerError
	}

	_, err = s.userStore.CreateUser(
		context.Background(),
		user.CreateUserParams{
			ID:           uid,
			Role:         1,
			Email:        pgtype.Text{String: email, Valid: true},
			PasswordHash: pgtype.Text{String: hash, Valid: true},
		},
	)
	if err != nil {
		fmt.Println(err)
		return nil, internalServerError
	}

	connectbox.AddRedirect(cb.W, "/login")

	return connect.NewResponse(&v1.RegisterUserResponse{}), nil
}

func (s AuthServiceServer) AuthRefresh(ctx context.Context, req *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	session := cb.User.Sessions[cb.SessionNumber]
	sessionId, err := authbox.SaveSession(cb.R, cb.W, s.Config, &v1.CookieSession{
		ID:  cb.User.ID,
		Iat: time.Now().Unix(),
		Exp: (time.Now().Add(time.Hour * 24 * 7)).Unix(),
	})
	if err != nil {
		return nil, internalServerError
	}

	cb.User.Sessions[cb.SessionNumber] = session

	err = s.dragon.SaveUser(cb.User)
	if err != nil {
		return nil, internalServerError
	}

	return connect.NewResponse(
			&v1.RefreshResponse{
				SessionId: sessionId,
			}),
		nil
}

func (s AuthServiceServer) Logout(ctx context.Context, req *connect.Request[v1.LogoutRequest]) (*connect.Response[v1.LogoutResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	colorlogger.Log(cb.User)
	cb.User.Sessions[cb.SessionNumber] = nil
	colorlogger.Log(cb.User)

	if err := s.dragon.SaveUser(cb.User); err != nil {
		return nil, internalServerError
	}

	authbox.RevokeSession(cb.W)

	return connect.NewResponse(
		&v1.LogoutResponse{
			Success: true,
		}), nil
}

func (s AuthServiceServer) RevokeSession(ctx context.Context, req *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	colorlogger.Log(cb.User)
	cb.User.Sessions[req.Msg.SessionNumber] = nil
	colorlogger.Log(cb.User)

	if err := s.dragon.SaveUser(cb.User); err != nil {
		return nil, internalServerError
	}

	authbox.RevokeSession(cb.W)

	return connect.NewResponse(
		&v1.RevokeResponse{
			Success: true,
		}), nil
}

func (s AuthServiceServer) InvalidateAllSessions(ctx context.Context, req *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	colorlogger.Log(cb.User)
	cb.User.Sessions = nil
	colorlogger.Log(cb.User)

	if err := s.dragon.SaveUser(cb.User); err != nil {
		return nil, internalServerError
	}

	authbox.RevokeSession(cb.W)

	return connect.NewResponse(
		&v1.InvalidateAllSessionsResponse{
			Success: true,
		}), nil
}
