package server

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/account/api/account/v1/v1connect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/nats"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
	natsClient *nats.NatsClient,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// OrdersService

	accountsService := CreateAccountServiceServer(*config)
	accountPath, accountsHandler := v1connect.NewAccountServiceHandler(
		accountsService,
		authbox.ConnectInterceptors(config)...,
	)

	// shield := authbox.ConnectShield(config)

	router.Handle(
		accountPath,
		// shield.Wrap(ordersHandler),
		accountsHandler,
	)

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		v1connect.AccountServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
