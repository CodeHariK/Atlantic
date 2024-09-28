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
	"github.com/codeharik/Atlantic/service/store"

	order_v1connect "github.com/codeharik/Atlantic/database/api/order/v1/v1connect"
	order_app "github.com/codeharik/Atlantic/database/store/order"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
	natsClient *nats.NatsClient,
	storeInstance store.Store,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// Interceptors

	interceptors := authbox.ConnectInterceptors(config)

	// //------------------
	// // OrdersService

	// ordersService := CreateOrdersServiceServer(*config, natsClient)
	// ordersPath, ordersHandler := v1connect.NewOrdersServiceHandler(
	// 	ordersService,
	// 	interceptors...,
	// )

	// // shield := authbox.ConnectShield(config)

	// router.Handle(
	// 	ordersPath,
	// 	// shield.Wrap(ordersHandler),
	// 	ordersHandler,
	// )

	//------------------
	// OrdersService

	orderService := order_app.NewService(
		order_app.New(storeInstance.Db),
	)
	orderPath, orderHandler := order_v1connect.NewOrderServiceHandler(
		orderService,
		interceptors...,
	)
	router.Handle(
		orderPath,
		// shield.Wrap(userHandler),
		orderHandler,
	)

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		// v1connect.OrdersServiceName,
		order_v1connect.OrderServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
