package handler

import (
	"log"
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"connectrpc.com/otelconnect"
	AuthHandler "github.com/codeharik/Atlantic/auth/server/auth"
	"github.com/codeharik/Atlantic/auth/server/authn"
	ProfileHandler "github.com/codeharik/Atlantic/auth/server/profile"
	UserHandler "github.com/codeharik/Atlantic/auth/server/user"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/otel"

	user_v1connect "github.com/codeharik/Atlantic/database/api/user/v1/v1connect"
	user_app "github.com/codeharik/Atlantic/database/store/user"

	auth_v1connect "github.com/codeharik/Atlantic/auth/api/v1/v1connect"
)

const name = "Atlantic/Otel"

var (
	tracer = otel.Tracer(name)
	meter  = otel.Meter(name)
	logger = otelslog.NewLogger(name)
)

func CreateRoutes(
	router *http.ServeMux,
	storeInstance store.Store,
	dragonstore *sessionstore.DragonSessionStore,
	cookiestore *sessionstore.CookieSessionStore,
	config config.Config,
) {
	UserHandler.CreateUserRoutes(router, storeInstance.UserStore)

	authHandler := AuthHandler.CreateAuthRoutes(
		router,
		dragonstore,
		cookiestore,
		storeInstance.UserStore)

	ProfileHandler.CreateProfileRoutes(router, storeInstance.UserStore, authHandler)

	docs.OpenapiHandler(router, "auth", "Auth")

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

	authService := AuthHandler.CreateNewAuthServiceServer(
		storeInstance.UserStore,
		dragonstore,
		cookiestore,
	)
	authPath, authHandle := auth_v1connect.NewAuthServiceHandler(
		authService,
		connect.WithInterceptors(interceptors...), compress1KB,
	)
	aut := authn.NewMiddleware(authService.Authenticate).Wrap(authHandle)
	router.Handle(authPath, aut)

	userService := user_app.NewService(
		user_app.New(storeInstance.Db),
	)
	userPath, userHandler := user_v1connect.NewUserServiceHandler(
		userService,
		connect.WithInterceptors(interceptors...), compress1KB,
	)
	router.Handle(userPath, userHandler)

	reflector := grpcreflect.NewStaticReflector(
		user_v1connect.UserServiceName,
		auth_v1connect.AuthServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Service.Name),
		compress1KB,
	))
}
