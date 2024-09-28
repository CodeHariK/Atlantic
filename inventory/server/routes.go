package server

import (
	"fmt"
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/minio"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/store"

	"github.com/codeharik/Atlantic/inventory/api/inventory/v1/v1connect"

	product_v1connect "github.com/codeharik/Atlantic/database/api/product/v1/v1connect"
	product_app "github.com/codeharik/Atlantic/database/store/product"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
	minioClient *minio.MinioClient,
	natsClient *nats.NatsClient,
	storeInstance store.Store,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// Interceptors

	interceptors := authbox.ConnectInterceptors(config)

	//------------------
	// CosmogService

	inventoryService := CreateInventoryServiceServer(*config, minioClient, natsClient)
	inventoryPath, inventoryHandler := v1connect.NewInventoryServiceHandler(
		inventoryService,
		interceptors...,
	)

	shield := authbox.ConnectShield(config)

	router.Handle(
		inventoryPath,
		shield.Wrap(inventoryHandler),
	)

	//------------------
	// OrdersService

	productService := product_app.NewService(
		product_app.New(storeInstance.Db),
	)
	productPath, productHandler := product_v1connect.NewProductServiceHandler(
		productService,
		interceptors...,
	)
	router.Handle(
		productPath,
		// shield.Wrap(userHandler),
		productHandler,
	)

	//------------------
	//

	router.HandleFunc(
		fmt.Sprintf("/%s/UploadImage", v1connect.InventoryServiceName),
		authbox.HttpShield(config, inventoryService.uploadFile))

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		v1connect.InventoryServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
