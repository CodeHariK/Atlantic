package server

import (
	"log"
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"connectrpc.com/otelconnect"
	"github.com/codeharik/Atlantic/auth/server/auth"
	"github.com/codeharik/Atlantic/auth/server/authn"
	"github.com/codeharik/Atlantic/auth/server/dragon"
	"github.com/codeharik/Atlantic/auth/server/profile"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"go.opentelemetry.io/otel"

	user_v1connect "github.com/codeharik/Atlantic/database/api/user/v1/v1connect"
	user_app "github.com/codeharik/Atlantic/database/store/user"

	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
)

func CreateRoutes(
	router *http.ServeMux,
	storeInstance store.Store,
	dragon dragon.Dragon,
	config *config.Config,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, "auth", "Auth")

	//------------------
	// Interceptors

	var interceptors []connect.Interceptor
	if config.OTLP.GRPC != "" {
		observability, err := otelconnect.NewInterceptor(
			otelconnect.WithTracerProvider(otel.GetTracerProvider()),
			otelconnect.WithMeterProvider(otel.GetMeterProvider()),
			otelconnect.WithPropagator(otel.GetTextMapPropagator()),
		)
		if err != nil {
			log.Fatalf("%v", err.Error())
		}
		interceptors = append(interceptors, observability)
	}

	compress1KB := connect.WithCompressMinBytes(1024)

	//------------------
	// AuthService

	authService := auth.CreateAuthServiceServer(
		config,
		dragon,
		storeInstance.UserStore,
	)
	authPath, authHandler := v1connect.NewAuthServiceHandler(
		authService,
		connect.WithInterceptors(interceptors...), compress1KB,
	)

	shield := authn.NewMiddleware(authService.Authenticate)

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
		connect.WithInterceptors(interceptors...), compress1KB,
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
		connect.WithInterceptors(interceptors...), compress1KB,
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
		grpchealth.NewStaticChecker(config.Service.Name),
		compress1KB,
	))
}
