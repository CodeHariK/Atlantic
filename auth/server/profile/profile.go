package profile

import (
	"context"
	"errors"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/config"

	dragon "github.com/redis/go-redis/v9"

	// auth_app "github.com/codeharik/Atlantic/auth/api/auth/v1"
	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
	"github.com/codeharik/Atlantic/auth/server/authbox"
)

type ProfileServiceServer struct {
	v1connect.UnimplementedProfileServiceHandler

	dragon *dragon.Client
}

func CreateProfileServiceServer(
	config *config.Config,
) ProfileServiceServer {
	dragonURI := config.DragonConnectionUri()

	options, err := dragon.ParseURL(dragonURI)
	if err != nil {
		panic(err)
	}

	dragonClient := dragon.NewClient(options)

	return ProfileServiceServer{
		dragon: dragonClient,
	}
}

func (profile ProfileServiceServer) GetProfile(ctx context.Context, req *connect.Request[v1.GetProfileRequest]) (*connect.Response[v1.GetProfileResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)

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
