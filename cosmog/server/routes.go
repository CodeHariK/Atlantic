package server

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/meilisearch/meilisearch-go"

	"github.com/codeharik/Atlantic/cosmog/api/cosmog/v1/v1connect"
)

func CreateRoutes(
	serviceName string,
	router *http.ServeMux,
	config *config.Config,
	meiliInstance *meilisearch.ServiceManager,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, serviceName)

	//------------------
	// CosmogService

	cosmogService := CreateCosmogServiceServer(*config, meiliInstance)
	cosmogPath, cosmogHandler := v1connect.NewCosmogServiceHandler(
		cosmogService,
		authbox.ConnectInterceptors(config)...,
	)

	// shield := authbox.ConnectShield(config)

	router.Handle(
		cosmogPath,
		// shield.Wrap(cosmogHandler),
		cosmogHandler,
	)

	//------------------
	// Reflectors

	reflector := grpcreflect.NewStaticReflector(
		v1connect.CosmogServiceName,
	)
	router.Handle(grpcreflect.NewHandlerV1(reflector))
	router.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Atlantic),
		connect.WithCompressMinBytes(1024),
	))
}
