package profile

import (
	"context"
	"errors"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/config"

	"github.com/codeharik/Atlantic/auth/server/dragon"

	// auth_app "github.com/codeharik/Atlantic/auth/api/auth/v1"
	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
	"github.com/codeharik/Atlantic/auth/server/authbox"
)

type ProfileServiceServer struct {
	v1connect.UnimplementedProfileServiceHandler

	JwtConfig *authbox.JwtConfig
	dragon    *dragon.Dragon
}

func CreateProfileServiceServer(
	dragon dragon.Dragon,
	config *config.Config,
) ProfileServiceServer {
	return ProfileServiceServer{
		dragon:    &dragon,
		JwtConfig: &authbox.JwtConfig{Config: config},
	}
}

func (profile ProfileServiceServer) GetProfile(ctx context.Context, req *connect.Request[v1.GetProfileRequest]) (*connect.Response[v1.GetProfileResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)

	user, sessionNumber, err := profile.dragon.DragonSessionCheck(cb.R, profile.JwtConfig)
	if err == nil {
		cb.User = user
		cb.SessionNumber = sessionNumber
	}

	errorResponse, responserError := connect.NewResponse(&v1.GetProfileResponse{}),
		connect.NewError(
			connect.CodeInternal,
			errors.New("Internal server error"),
		)

	if !ok {
		return errorResponse, responserError
	}

	cb.User.SessionNumber = int32(cb.SessionNumber)

	return connect.NewResponse(&v1.GetProfileResponse{
		User: cb.User,
	},
	), nil
}

func (profile ProfileServiceServer) UpdateProfile(context.Context, *connect.Request[v1.UpdateProfileRequest]) (*connect.Response[v1.UpdateProfileResponse], error) {
	return nil, connect.NewError(
		connect.CodeUnimplemented,
		errors.New("UpdateProfile is not implemented"))
}
