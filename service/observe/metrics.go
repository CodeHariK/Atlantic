package observe

import (
	"context"
	"fmt"
	"time"

	"github.com/codeharik/Atlantic/config"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
	sdkmetric "go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateMeterProvider(exporter sdkmetric.Exporter, config config.Config) *sdkmetric.MeterProvider {
	meterProvider := sdkmetric.NewMeterProvider(
		sdkmetric.WithReader(
			sdkmetric.NewPeriodicReader(
				exporter,
				sdkmetric.WithInterval(3*time.Second),
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

func CreateMetricExporterGRPC(ctx context.Context, config config.Config) (sdkmetric.Exporter, error) {
	exporter, err := otlpmetricgrpc.New(
		ctx,
		otlpmetricgrpc.WithEndpoint(config.OTLP.GRPC),
		otlpmetricgrpc.WithInsecure(),
	)
	if err != nil {
		return nil, fmt.Errorf("Failed to create OTLP Metric exporter: %v", err)
	}
	return exporter, nil
}
