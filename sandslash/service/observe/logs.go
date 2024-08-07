package observe

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/sandslash/service"
	"go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploggrpc"
	"go.opentelemetry.io/otel/log"
	"go.opentelemetry.io/otel/log/global"
	sdklog "go.opentelemetry.io/otel/sdk/log"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateLoggerProvider(exporter sdklog.Exporter, config service.Config) *sdklog.LoggerProvider {
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

	r := log.Record{}
	r.SetSeverity(log.SeverityInfo)

	s := global.GetLoggerProvider().Logger("Hello")
	s.Emit(context.Background(), r) // log.Record{},

	return loggerProvider
}

func CreateLogsExporterGRPC(ctx context.Context, config service.Config) (sdklog.Exporter, error) {
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
