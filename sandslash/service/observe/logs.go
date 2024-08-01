package observe

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/sandslash/service"
	"go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploggrpc"
	"go.opentelemetry.io/otel/log/global"
	"go.opentelemetry.io/otel/sdk/log"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateLoggerProvider(exporter log.Exporter, config service.Config) *log.LoggerProvider {
	loggerProvider := log.NewLoggerProvider(
		log.WithProcessor(
			log.NewBatchProcessor(exporter),
		),
		log.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(config.Service.Name),
			),
		),
	)
	global.SetLoggerProvider(loggerProvider)

	return loggerProvider
}

func CreateLogsExporterGRPC(ctx context.Context, config service.Config) (log.Exporter, error) {
	exporter, err := otlploggrpc.New(
		ctx,
		otlploggrpc.WithEndpoint(config.OTLP.GRPC),
		otlploggrpc.WithInsecure(),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Log exporter: %v", err)
	}
	return exporter, nil
}
