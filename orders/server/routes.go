package server

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/orders/api/cart/v1/v1connect"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/store"
	"go.temporal.io/sdk/client"

	orders_v1connect "github.com/codeharik/Atlantic/database/api/orders/v1/v1connect"
	orders_app "github.com/codeharik/Atlantic/database/store/orders"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
	natsClient *nats.NatsClient,
	storeInstance store.Store,
	temporalClient client.Client,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// Interceptors

	interceptors := authbox.ConnectInterceptors(config)

	//------------------
	// CartService

	cartService := CreateCartServiceServer(*config, natsClient, storeInstance, temporalClient)
	cartPath, cartHandler := v1connect.NewCartServiceHandler(
		cartService,
		interceptors...,
	)

	shield := authbox.ConnectShield(config)

	router.Handle(
		cartPath,
		shield.Wrap(cartHandler),
	)

	//------------------
	// OrdersService

	orderService := orders_app.NewService(
		orders_app.New(storeInstance.Db),
	)
	orderPath, orderHandler := orders_v1connect.NewOrdersServiceHandler(
		orderService,
		interceptors...,
	)
	router.Handle(
		orderPath,
		shield.Wrap(orderHandler),
	)

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		v1connect.CartServiceName,
		orders_v1connect.OrdersServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
