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

	config *config.Config
	dragon *dragon.Dragon
}

func CreateProfileServiceServer(
	dragon dragon.Dragon,
	config *config.Config,
) ProfileServiceServer {
	return ProfileServiceServer{
		dragon: &dragon,
		config: config,
	}
}

func (profile ProfileServiceServer) GetProfile(ctx context.Context, req *connect.Request[v1.GetProfileRequest]) (*connect.Response[v1.GetProfileResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	user, sessionNumber, err := profile.dragon.GetDragonUser(cb.AccessObj)
	fmt.Println(err)
	if err != nil {
		return nil, authbox.InternalServerError
	}

	user.SessionNumber = int32(sessionNumber)

	return connect.NewResponse(&v1.GetProfileResponse{
		User: &v1.ProfileUser{
			Username:      user.Avatar,
			PhoneNumber:   user.PhoneNumber,
			Avatar:        user.Avatar,
			Email:         user.Email,
			Location:      user.Location,
			Verified:      user.Verified,
			Role:          user.Role,
			Sessions:      user.Sessions,
			SessionNumber: user.SessionNumber,
		},
	},
	), nil
}

func (profile ProfileServiceServer) UpdateProfile(context.Context, *connect.Request[v1.UpdateProfileRequest]) (*connect.Response[v1.UpdateProfileResponse], error) {
	return nil, connect.NewError(
		connect.CodeUnimplemented,
		errors.New("UpdateProfile is not implemented"))
}
