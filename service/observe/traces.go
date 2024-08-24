package observe

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/config"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateTracerProvider(exporter sdktrace.SpanExporter, config *config.Config) *sdktrace.TracerProvider {
	tracerProvider := sdktrace.NewTracerProvider(
		sdktrace.WithBatcher(exporter),
		sdktrace.WithSampler(sdktrace.AlwaysSample()),
		sdktrace.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(config.Service.Name),
			),
		),
	)

	otel.SetTracerProvider(tracerProvider)

	return tracerProvider
}

func CreateTraceExporterHTTP(ctx context.Context, config *config.Config) (sdktrace.SpanExporter, error) {
	exporter, err := otlptracehttp.New(
		ctx,
		otlptracehttp.WithEndpoint(config.OTLP.HTTP),
		otlptracehttp.WithHeaders(config.OTLP.Headers),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Trace exporter: %v", err)
	}
	return exporter, err
}

func CreateTraceExporterGRPC(ctx context.Context, config *config.Config) (sdktrace.SpanExporter, error) {
	exporter, err := otlptracegrpc.New(
		ctx,
		otlptracegrpc.WithEndpoint(config.OTLP.GRPC),
		// otlptracegrpc.WithInsecure(),
		otlptracegrpc.WithHeaders(config.OTLP.Headers),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Trace exporter: %v", err)
	}
	return exporter, err
}
