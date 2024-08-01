package observe

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/sandslash/service"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateTracerProvider(exporter trace.SpanExporter, config service.Config) *trace.TracerProvider {
	tracerProvider := trace.NewTracerProvider(
		trace.WithBatcher(exporter),
		trace.WithSampler(trace.AlwaysSample()),
		trace.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(config.Service.Name),
			),
		),
	)
	otel.SetTracerProvider(tracerProvider)

	return tracerProvider
}

func CreateTraceExporterGRPC(ctx context.Context, config service.Config) (trace.SpanExporter, error) {
	exporter, err := otlptracegrpc.New(
		ctx,
		otlptracegrpc.WithEndpoint(config.OTLP.GRPC),
		otlptracegrpc.WithInsecure(),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Trace exporter: %v", err)
	}
	return exporter, err
}
