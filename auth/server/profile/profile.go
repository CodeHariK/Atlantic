package profile

import (
	"context"
	"errors"
	"fmt"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/config"

	"github.com/codeharik/Atlantic/service/dragon"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"

	"github.com/codeharik/Atlantic/service/authbox"
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
	if !ok {
		return nil, authbox.InternalServerError
	}

	user, sessionNumber, err := profile.dragon.GetDragonUser(cb.Access)
	fmt.Println(err)
	if err != nil {
		return nil, authbox.InternalServerError
	}

	user.SessionNumber = int32(sessionNumber)

	return connect.NewResponse(&v1.GetProfileResponse{
		User: user,
	},
	), nil
}

func (profile ProfileServiceServer) UpdateProfile(context.Context, *connect.Request[v1.UpdateProfileRequest]) (*connect.Response[v1.UpdateProfileResponse], error) {
	return nil, connect.NewError(
		connect.CodeUnimplemented,
		errors.New("UpdateProfile is not implemented"))
}
