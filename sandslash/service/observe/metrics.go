package observe

import (
	"context"
	"fmt"
	"time"

	"github.com/codeharik/Atlantic/sandslash/service"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
	"go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func CreateMeterProvider(exporter metric.Exporter, config service.Config) *metric.MeterProvider {
	meterProvider := metric.NewMeterProvider(
		metric.WithReader(
			metric.NewPeriodicReader(
				exporter,
				metric.WithInterval(3*time.Second),
			),
		),
		metric.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(config.Service.Name),
			),
		),
	)
	otel.SetMeterProvider(meterProvider)

	return meterProvider
}

func CreateMetricExporterGRPC(ctx context.Context, config service.Config) (metric.Exporter, error) {
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
