package observe

import (
	"context"
	"fmt"
	"time"

	"github.com/codeharik/Atlantic/config"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"
	sdkmetric "go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateMeterProvider(exporter sdkmetric.Exporter, config *config.Config) *sdkmetric.MeterProvider {
	meterProvider := sdkmetric.NewMeterProvider(
		sdkmetric.WithReader(
			sdkmetric.NewPeriodicReader(
				exporter,
				sdkmetric.WithInterval(30*time.Second),
			),
		),
		sdkmetric.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(config.Service.Name),
			),
		),
	)
	otel.SetMeterProvider(meterProvider)

	return meterProvider
}

func CreateMetricExporterHTTP(ctx context.Context, config *config.Config) (sdkmetric.Exporter, error) {
	exporter, err := otlpmetrichttp.New(
		ctx,
		otlpmetrichttp.WithEndpoint(config.OTLP.HTTP),
		otlpmetrichttp.WithHeaders(config.OTLP.Headers),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Metric exporter: %v", err)
	}
	return exporter, nil
}

func CreateMetricExporterGRPC(ctx context.Context, config *config.Config) (sdkmetric.Exporter, error) {
	exporter, err := otlpmetricgrpc.New(
		ctx,
		otlpmetricgrpc.WithEndpoint(config.OTLP.GRPC),
		// otlpmetricgrpc.WithInsecure(),
		otlpmetricgrpc.WithHeaders(config.OTLP.Headers),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Metric exporter: %v", err)
	}
	return exporter, nil
}
