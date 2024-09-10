package server

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/service/authbox"

	"github.com/codeharik/Atlantic/inventory/api/inventory/v1/v1connect"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	//

	router.HandleFunc(
		"/inventory.v1.InventoryService/UploadImage",
		authbox.HttpShield(config, uploadFile))

	//------------------
	// CosmogService

	inventoryService := CreateInventoryServiceServer(*config)
	inventoryPath, inventoryHandler := v1connect.NewInventoryServiceHandler(
		inventoryService,
		authbox.ConnectInterceptors(config)...,
	)

	shield := authbox.ConnectShield(config)

	router.Handle(
		inventoryPath,
		shield.Wrap(inventoryHandler),
	)

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
