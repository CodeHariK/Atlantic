package authbox

import (
	"log"

	"connectrpc.com/connect"
	"connectrpc.com/otelconnect"
	"github.com/codeharik/Atlantic/config"
	"go.opentelemetry.io/otel"
)

func ConnectInterceptors(config *config.Config) []connect.HandlerOption {
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

	return []connect.HandlerOption{connect.WithInterceptors(interceptors...), compress1KB}
}
