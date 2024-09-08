package server

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/auth/server/auth"
	"github.com/codeharik/Atlantic/auth/server/profile"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/dragon"

	user_v1connect "github.com/codeharik/Atlantic/database/api/user/v1/v1connect"
	user_app "github.com/codeharik/Atlantic/database/store/user"

	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	storeInstance store.Store,
	dragon dragon.Dragon,
	config *config.Config,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// Interceptors

	interceptors := authbox.ConnectInterceptors(config)

	//------------------
	// AuthService

	authService := auth.CreateAuthServiceServer(
		config,
		dragon,
		storeInstance.UserStore,
	)
	authPath, authHandler := v1connect.NewAuthServiceHandler(
		authService,
		interceptors...,
	)

	shield := authbox.ConnectShield(config)

	router.Handle(
		authPath,
		shield.Wrap(authHandler),
	)

	//------------------
	// ProfileService

	profileService := profile.CreateProfileServiceServer(
		dragon,
		config,
	)
	profilePath, profileHandler := v1connect.NewProfileServiceHandler(
		profileService,
		interceptors...,
	)
	router.Handle(
		profilePath,
		shield.Wrap(profileHandler),
	)

	//------------------
	// UserService

	userService := user_app.NewService(
		user_app.New(storeInstance.Db),
	)
	userPath, userHandler := user_v1connect.NewUserServiceHandler(
		userService,
		interceptors...,
	)
	router.Handle(
		userPath,
		// shield.Wrap(userHandler),
		userHandler,
	)

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		user_v1connect.UserServiceName,
		v1connect.AuthServiceName,
		v1connect.ProfileServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
