package handler

import (
	"log"
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"connectrpc.com/otelconnect"
	AuthHandler "github.com/codeharik/Atlantic/auth/server/auth"
	ProfileHandler "github.com/codeharik/Atlantic/auth/server/profile"
	UserHandler "github.com/codeharik/Atlantic/auth/server/user"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"

	user_v1connect "github.com/codeharik/Atlantic/database/api/user/v1/v1connect"
	user_app "github.com/codeharik/Atlantic/database/store/user"
)

func CreateRoutes(router *http.ServeMux, storeInstance store.Store, sessionStore *sessionstore.SessionStore, config config.Config) {
	UserHandler.CreateUserRoutes(router, storeInstance.UserStore)

	authHandler := AuthHandler.CreateAuthRoutes(router, sessionStore)

	ProfileHandler.CreateProfileRoutes(router, storeInstance.UserStore, authHandler)

	docs.OpenapiHandler(router, "user", "Auth")

	var interceptors []connect.Interceptor
	if config.OTLP.GRPC != "" {
		observability, err := otelconnect.NewInterceptor()
		if err != nil {
			log.Fatalf("%v", err.Error())
		}
		interceptors = append(interceptors, observability)
	}

	compress1KB := connect.WithCompressMinBytes(1024)

	userService := user_app.NewService(user_app.New(storeInstance.Db))
	userPath, userHandler := user_v1connect.NewUserServiceHandler(userService,
		connect.WithInterceptors(interceptors...), compress1KB,
	)
	router.Handle(userPath, userHandler)

	reflector := grpcreflect.NewStaticReflector(
		user_v1connect.UserServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Service.Name),
		compress1KB,
	))
}
