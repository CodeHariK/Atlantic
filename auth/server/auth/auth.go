package auth

import (
	"context"
	"log"
	"math/rand"
	"strconv"
	"time"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/codeharik/Atlantic/service/pgservice"
	"github.com/codeharik/Atlantic/service/uuidservice"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"

	"github.com/codeharik/Atlantic/service/authbox"

	"github.com/codeharik/Atlantic/service/dragon"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
)

type AuthServiceServer struct {
	v1connect.UnimplementedAuthServiceHandler

	config    *config.Config
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
		config:    config,
		validator: validator,
		userStore: userStore,
		dragon:    &dragon,
	}
}

func (s AuthServiceServer) EmailLogin(ctx context.Context, req *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InvalidEmailPassword
	}

	email := req.Msg.Email
	password := req.Msg.Password

	// Fetch dbuser by email
	dbuser, err := s.userStore.GetUserByEmail(
		context.Background(),
		pgtype.Text{String: email, Valid: true})
	if err != nil || !dbuser.Email.Valid || !dbuser.PasswordHash.Valid {
		return nil, authbox.InvalidEmailPassword
	}

	// Verify password
	if err := authbox.CheckPassword(dbuser.PasswordHash.String, password); err != nil {
		return nil, authbox.InvalidEmailPassword
	}

	avatarUUid, _ := uuidservice.ToUUIDstring(dbuser.Avatar)

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

	session := &v1.JwtObj{
		TokenId: rand.Int31(),
		ID:      dbuser.ID.String(),
		Iat:     time.Now().Unix(),
		Exp:     time.Now().Add(time.Hour * 24 * 7).Unix(),
	}

	uu, _, err := s.dragon.GetDragonUser(session)
	if err == nil {
		user.Sessions = uu.Sessions
	}

	sessionId, accessTok, err := authbox.SaveSession(
		cb.R, cb.W, s.config, session,
		&v1.JwtObj{
			TokenId: session.TokenId,
			ID:      dbuser.ID.String(),
			Roles:   strconv.FormatInt(dbuser.Role, 10),
			Iat:     time.Now().Unix(),
			Exp:     time.Now().Add(time.Hour).Unix(),
		})
	if err != nil {
		return nil, authbox.InvalidEmailPassword
	}

	user.Sessions = append(user.Sessions, &v1.UserSession{
		TokenId: session.TokenId,
		Agent:   cb.R.UserAgent(),
		Iat:     session.Iat,
		Exp:     session.Exp,
	})

	err = s.dragon.SaveUser(user)
	if err != nil {
		return nil, authbox.InvalidEmailPassword
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
		return nil, authbox.InternalServerError
	}

	if err := s.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	email := req.Msg.Email
	password := req.Msg.Password

	hash, err := authbox.HashPassword(password)
	if err != nil {
		return nil, authbox.InternalServerError
	}

	uid, err := uuid.NewV7()
	if err != nil {
		return nil, authbox.InternalServerError
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
		return nil, connect.NewError(connect.CodeInvalidArgument, pgservice.PgCheck(err))
	}

	authbox.AddRedirect(cb.W, "/login")

	return connect.NewResponse(&v1.RegisterUserResponse{}), nil
}

func (s AuthServiceServer) AuthRefresh(ctx context.Context, req *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	user, sessionNumber, err := s.dragon.GetDragonSessionUser(cb.R, s.config)
	if err == nil && sessionNumber != -1 {
		sessionId, accessToken, err := s.RefreshSession(cb, user, sessionNumber)
		if err != nil {
			return nil, connect.NewError(connect.CodeUnauthenticated, err)
		}
		return connect.NewResponse(
				&v1.RefreshResponse{
					SessionId:   sessionId,
					AccessToken: accessToken,
				}),
			nil
	}
	return nil, connect.NewError(connect.CodeUnauthenticated, err)
}

func (s AuthServiceServer) RefreshSession(cb authbox.ConnectBox, user *v1.AuthUser, sessionNumber int) (string, string, error) {
	tokenId := rand.Int31()

	session := &v1.UserSession{
		TokenId: tokenId,
		Agent:   cb.R.UserAgent(),
		Iat:     time.Now().Unix(),
		Exp:     time.Now().Add(time.Hour * 24 * 7).Unix(),
	}
	sessionId, accessToken, err := authbox.SaveSession(
		cb.R, cb.W, s.config,
		&v1.JwtObj{
			TokenId: tokenId,
			ID:      user.ID,
			Iat:     session.Iat,
			Exp:     session.Exp,
		},
		&v1.JwtObj{
			TokenId: tokenId,
			ID:      user.ID,
			Roles:   strconv.FormatInt(user.Role, 10),
			Iat:     time.Now().Unix(),
			Exp:     time.Now().Add(time.Hour).Unix(),
		},
	)
	if err != nil {
		return "", "", authbox.InternalServerError
	}

	user.Sessions[sessionNumber] = session

	err = s.dragon.SaveUser(user)
	if err != nil {
		return "", "", authbox.InternalServerError
	}
	return sessionId, accessToken, nil
}

func (s AuthServiceServer) RevokeSession(ctx context.Context, req *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	user, sessionNumber, err := s.dragon.GetDragonUser(cb.AccessObj)
	if err == nil {

		indexToRemove := int(req.Msg.SessionNumber)
		if indexToRemove == -1 {
			indexToRemove = sessionNumber
		}
		if indexToRemove >= 0 && indexToRemove < len(user.Sessions) {
			user.Sessions = append(user.Sessions[:indexToRemove], user.Sessions[indexToRemove+1:]...)
		}

		if err := s.dragon.SaveUser(user); err != nil {
			return nil, authbox.InternalServerError
		}

		if indexToRemove == sessionNumber {
			s.dragon.SyncKeyPublish(s.config, user.ID)
			authbox.RevokeSession(cb.W, s.config)
			authbox.AddRedirect(cb.W, "/login")
		}
	}

	return connect.NewResponse(
		&v1.RevokeResponse{
			Success: true,
		}), nil
}

func (s AuthServiceServer) InvalidateAllSessions(ctx context.Context, req *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	user, _, err := s.dragon.GetDragonUser(cb.AccessObj)
	if err == nil {

		user.Sessions = nil

		if err := s.dragon.SaveUser(user); err != nil {
			return nil, authbox.InternalServerError
		}
	}

	s.dragon.SyncKeyPublish(s.config, user.ID)
	authbox.RevokeSession(cb.W, s.config)
	authbox.AddRedirect(cb.W, "/login")

	return connect.NewResponse(
		&v1.InvalidateAllSessionsResponse{
			Success: true,
		}), nil
}
