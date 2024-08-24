package observe

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/config"

	"go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploggrpc"
	"go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"
	"go.opentelemetry.io/otel/log/global"
	sdklog "go.opentelemetry.io/otel/sdk/log"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateLoggerProvider(exporter sdklog.Exporter, config *config.Config) *sdklog.LoggerProvider {
	loggerProvider := sdklog.NewLoggerProvider(
		sdklog.WithProcessor(
			sdklog.NewBatchProcessor(exporter),
		),
		sdklog.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(config.Service.Name),
			),
		),
	)
	global.SetLoggerProvider(loggerProvider)

	return loggerProvider
}

func CreateLogsExporterHTTP(ctx context.Context, config *config.Config) (sdklog.Exporter, error) {
	exporter, err := otlploghttp.New(
		ctx,
		otlploghttp.WithEndpoint(config.OTLP.HTTP),
		otlploghttp.WithHeaders(config.OTLP.Headers),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Log exporter: %v", err)
	}
	return exporter, nil
}

func CreateLogsExporterGRPC(ctx context.Context, config *config.Config) (sdklog.Exporter, error) {
	exporter, err := otlploggrpc.New(
		ctx,
		otlploggrpc.WithEndpoint(config.OTLP.GRPC),
		// otlploggrpc.WithInsecure(),
		otlploggrpc.WithHeaders(config.OTLP.Headers),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Log exporter: %v", err)
	}
	return exporter, nil
}
