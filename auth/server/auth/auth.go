package auth

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strconv"
	"time"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/auth/server/authn"
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

	JwtConfig *authbox.JwtConfig
	validator *protovalidate.Validator
	userStore *user.Queries
	dragon    *dragon.Dragon
}

func CreateAuthServiceServer(
	config *config.Config,
	dragon dragon.Dragon,
	userStore *user.Queries,
) AuthServiceServer {
	validator, err := protovalidate.New()
	if err != nil {
		log.Fatal(err)
	}

	return AuthServiceServer{
		JwtConfig: &authbox.JwtConfig{Config: config},
		validator: validator,
		userStore: userStore,
		dragon:    &dragon,
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

	cb := authbox.ConnectBox{
		R: r,
		W: w,
	}

	if !authbox.IsAuthRefresh(r) {

		colorlogger.Log("*************")

		accessCookie, err := r.Cookie("access-token")
		fmt.Println(err)
		if err == nil {
			accessToken, err := s.JwtConfig.VerifyJwe(accessCookie.Value)
			colorlogger.Log("@@@@@@@@@@@@@")
			fmt.Println(err)
			if err := authbox.AuthRedirect(r, w, err); err != nil {
				return nil, err
			}
			if err == nil {
				cb.User = &v1.AuthUser{ID: accessToken.ID}
				return cb, nil
			}
		}

		if err := authbox.AuthRedirect(r, w, err); err != nil {
			return nil, err
		}
	}

	return cb, nil
}

func (s AuthServiceServer) EmailLogin(ctx context.Context, req *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
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
	if err := authbox.CheckPassword(dbuser.PasswordHash.String, password); err != nil {
		return nil, invalidEmailPassword
	}

	// Handle error
	avatarUUid, _ := authbox.ToUUIDstring(dbuser.Avatar)

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

	session := &v1.JwtObj{
		ID:  dbuser.ID.String(),
		Iat: time.Now().Unix(),
		Exp: time.Now().Add(time.Hour * 24 * 7).Unix(),
	}

	sessionId, accessTok, err := authbox.SaveSession(
		cb.R, cb.W, s.JwtConfig, session,
		&v1.JwtObj{
			ID:    dbuser.ID.String(),
			Roles: strconv.FormatInt(dbuser.Role, 10),
			Iat:   time.Now().Unix(),
			Exp:   time.Now().Add(time.Hour).Unix(),
		})
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

	authbox.AddRedirect(cb.W, "/profile")

	return connect.NewResponse(
			&v1.EmailLoginResponse{
				SessionId:   sessionId,
				AccessToken: accessTok,
			}),
		nil
}

func (s AuthServiceServer) RegisterUser(ctx context.Context, req *connect.Request[v1.RegisterUserRequest]) (*connect.Response[v1.RegisterUserResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	if err := s.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	email := req.Msg.Email
	password := req.Msg.Password

	hash, err := authbox.HashPassword(password)
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

	authbox.AddRedirect(cb.W, "/login")

	return connect.NewResponse(&v1.RegisterUserResponse{}), nil
}

func (s AuthServiceServer) AuthRefresh(ctx context.Context, req *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	user, sessionNumber, err := s.dragon.DragonSessionCheck(cb.R, s.JwtConfig)
	fmt.Println(err)
	if err == nil {

		cb.User = user
		cb.SessionNumber = sessionNumber

		sessionId, accessToken, err := s.RefreshSession(cb)
		if err != nil {
			return nil, err
		}
		return connect.NewResponse(
				&v1.RefreshResponse{
					SessionId:   sessionId,
					AccessToken: accessToken,
				}),
			nil
	}
	return nil, err
}

func (s AuthServiceServer) RefreshSession(cb authbox.ConnectBox) (string, string, error) {
	colorlogger.Log("Refresh Session")
	colorlogger.Log(cb.R, cb.W, cb.SessionNumber, cb.User)

	session := &v1.UserSession{
		Agent: cb.R.UserAgent(),
		Iat:   time.Now().Unix(),
		Exp:   time.Now().Add(time.Hour * 24 * 7).Unix(),
	}

	sessionId, accessToken, err := authbox.SaveSession(
		cb.R, cb.W, s.JwtConfig,
		&v1.JwtObj{
			ID:  cb.User.ID,
			Iat: session.Iat,
			Exp: session.Exp,
		},
		&v1.JwtObj{
			ID:    cb.User.ID,
			Roles: strconv.FormatInt(cb.User.Role, 10),
			Iat:   time.Now().Unix(),
			Exp:   time.Now().Add(time.Hour).Unix(),
		},
	)
	if err != nil {
		return "", "", internalServerError
	}

	cb.User.Sessions[cb.SessionNumber] = session

	err = s.dragon.SaveUser(cb.User)
	if err != nil {
		return "", "", internalServerError
	}
	return sessionId, accessToken, nil
}

func (s AuthServiceServer) RevokeSession(ctx context.Context, req *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	user, sessionNumber, err := s.dragon.DragonSessionCheck(cb.R, s.JwtConfig)
	if err == nil {

		cb.User = user
		cb.SessionNumber = sessionNumber

		indexToRemove := int(req.Msg.SessionNumber)
		if indexToRemove == -1 {
			indexToRemove = cb.SessionNumber

			if indexToRemove >= 0 && indexToRemove < len(cb.User.Sessions) {
				cb.User.Sessions = append(cb.User.Sessions[:indexToRemove], cb.User.Sessions[indexToRemove+1:]...)
			}
		}

		if err := s.dragon.SaveUser(cb.User); err != nil {
			return nil, internalServerError
		}
	}

	authbox.RevokeSession(cb.W)

	authbox.AddRedirect(cb.W, "/login")

	return connect.NewResponse(
		&v1.RevokeResponse{
			Success: true,
		}), nil
}

func (s AuthServiceServer) InvalidateAllSessions(ctx context.Context, req *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, internalServerError
	}

	cb.User.Sessions = nil

	if err := s.dragon.SaveUser(cb.User); err != nil {
		return nil, internalServerError
	}

	authbox.RevokeSession(cb.W)

	return connect.NewResponse(
		&v1.InvalidateAllSessionsResponse{
			Success: true,
		}), nil
}
