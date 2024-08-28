package auth

import (
	"context"
	"errors"
	"time"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/auth/server/authn"
	"github.com/codeharik/Atlantic/auth/server/connectbox"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/jackc/pgx/v5/pgtype"

	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/codeharik/Atlantic/auth/server/authbox"

	"github.com/codeharik/Atlantic/auth/server/dragon"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
)

type AuthServiceServer struct {
	v1connect.UnimplementedAuthServiceHandler

	*sessionstore.JwtConfig
	userStore *user.Queries
	dragon    *dragon.Dragon
}

func CreateAuthServiceServer(
	config *config.Config,
	userStore *user.Queries,
) AuthServiceServer {
	d := dragon.CreateDragon(config)

	return AuthServiceServer{
		JwtConfig: &sessionstore.JwtConfig{Config: config},
		userStore: userStore,
		dragon:    &d,
	}
}

func (s AuthServiceServer) Authenticate(_ context.Context, req authn.Request) (any, error) {
	r, w := req.Request, req.Writer

	user, sessionNumber, err := s.dragon.DragonSessionCheck(r, w, s.Config)
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
	errorResponse, responserError := connect.NewResponse(
		&v1.EmailLoginResponse{},
	),
		connect.NewError(
			connect.CodePermissionDenied,
			errors.New("Invalid Email or password"),
		)

	cb, ok := connectbox.GetConnectBox(ctx)
	if !ok {
		return errorResponse, responserError
	}

	email := req.Msg.Email
	password := req.Msg.Password

	// Fetch user by email
	user, err := s.userStore.GetAuthUserByEmail(
		context.Background(),
		pgtype.Text{String: email, Valid: true})
	if err != nil || !user.Email.Valid || !user.PasswordHash.Valid {
		return errorResponse, responserError
	}

	// Verify password
	if err := sessionstore.CheckPassword(user.PasswordHash.String, password); err != nil {
		return errorResponse, responserError
	}

	use := &v1.AuthUser{
		ID:       user.ID.String(),
		Username: user.Username,
		Email:    user.Email.String,
	}

	uu, err := s.dragon.GetDragonUser(cb.R, cb.W, user.ID.String())
	if err == nil {
		use.Sessions = uu.Sessions
	}

	session := &v1.Session{
		ID:    user.ID.String(),
		Agent: cb.R.UserAgent(),
		Iat:   timestamppb.New(time.Now()),
		Exp:   timestamppb.New(time.Now().Add(time.Hour * 24 * 7)),
	}

	sessionId, err := authbox.SaveSession(cb.R, cb.W, s.Config, session)
	if err != nil {
		return errorResponse, responserError
	}

	use.Sessions = append(use.Sessions, session)

	err = s.dragon.SaveUser(cb.R, cb.W, use)
	if err != nil {
		return errorResponse, responserError
	}

	connectbox.AddRedirect(cb.W, "http://localhost:8080/profile")

	return connect.NewResponse(
			&v1.EmailLoginResponse{
				SessionId: sessionId,
			}),
		nil
}

func (s AuthServiceServer) AuthRefresh(ctx context.Context, req *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error) {
	cb, ok := connectbox.GetConnectBox(ctx)

	errorResponse, responserError := connect.NewResponse(&v1.RefreshResponse{}), connect.NewError(
		connect.CodeInternal,
		errors.New("Internal server error"),
	)

	if !ok {
		return errorResponse, responserError
	}

	session := cb.User.Sessions[cb.SessionNumber]
	session.Agent = cb.R.UserAgent() + time.Now().String()
	session.Iat = timestamppb.New(time.Now())
	session.Exp = timestamppb.New(time.Now().Add(time.Hour * 24 * 7))

	sessionId, err := authbox.SaveSession(cb.R, cb.W, s.Config, session)
	if err != nil {
		return errorResponse, responserError
	}

	cb.User.Sessions[cb.SessionNumber] = session

	err = s.dragon.SaveUser(cb.R, cb.W, cb.User)
	if err != nil {
		return errorResponse, responserError
	}

	return connect.NewResponse(
			&v1.RefreshResponse{
				SessionId: sessionId,
			}),
		nil
}

func (s AuthServiceServer) Logout(ctx context.Context, req *connect.Request[v1.LogoutRequest]) (*connect.Response[v1.LogoutResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.JwtAuthService.Logout is not implemented"))
}

func (s AuthServiceServer) GetAllSessions(ctx context.Context, req *connect.Request[v1.GetAllSessionsRequest]) (*connect.Response[v1.GetAllSessionsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.JwtAuthService.GetAllSessions is not implemented"))
}

func (s AuthServiceServer) InvalidateAllSessions(ctx context.Context, req *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.JwtAuthService.InvalidateAllSessions is not implemented"))
}
