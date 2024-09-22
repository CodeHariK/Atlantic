package server

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/nats"

	"github.com/codeharik/Atlantic/orders/api/orders/v1/v1connect"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
	natsConn *nats.NatsClient,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// OrdersService

	ordersService := CreateOrdersServiceServer(*config, natsConn)
	ordersPath, ordersHandler := v1connect.NewOrdersServiceHandler(
		ordersService,
		authbox.ConnectInterceptors(config)...,
	)

	// shield := authbox.ConnectShield(config)

	router.Handle(
		ordersPath,
		// shield.Wrap(ordersHandler),
		ordersHandler,
	)

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		v1connect.OrdersServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
