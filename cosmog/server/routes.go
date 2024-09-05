package server

import (
	"log"
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"connectrpc.com/otelconnect"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
	"go.opentelemetry.io/otel"

	"github.com/codeharik/Atlantic/cosmog/api/cosmog/v1/v1connect"
)

func CreateRoutes(
	router *http.ServeMux,
	config *config.Config,
) {
	//------------------
	// Docs

	docs.OpenapiHandler(router, "cosmog", "Cosmog")

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
	// CosmogService

	cosmogService := CreateCosmogServiceServer()
	cosmogPath, cosmogHandler := v1connect.NewCosmogServiceHandler(
		cosmogService,
		connect.WithInterceptors(interceptors...), compress1KB,
	)

	// shield := authn.NewMiddleware(cosmogService.Authenticate)

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
		grpchealth.NewStaticChecker(config.Service.Name),
		compress1KB,
	))
}
