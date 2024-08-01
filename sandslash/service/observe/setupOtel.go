package observe

import (
	"context"
	"errors"
	"fmt"

	"github.com/codeharik/Atlantic/sandslash/service"
	"go.opentelemetry.io/contrib/instrumentation/runtime"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/propagation"
)

// setupOTelSDK bootstraps the OpenTelemetry pipeline.
// If it does not return an error, make sure to call shutdown for proper cleanup.
func SetupOTelSDK(ctx context.Context, config service.Config) (shutdown func(context.Context) error, err error) {
	if config.OTLP.GRPC == "" || !config.Service.EnableMetrics {
		return nil, fmt.Errorf("OpenTelemetry not running.")
	}

	fmt.Println("OpenTelemetry Collector running on http://" + config.OTLP.GRPC)

	var shutdownFuncs []func(context.Context) error

	// shutdown calls cleanup functions registered via shutdownFuncs.
	// The errors from the calls are joined.
	// Each registered cleanup will be invoked once.
	shutdown = func(ctx context.Context) error {
		var err error
		for _, fn := range shutdownFuncs {
			err = errors.Join(err, fn(ctx))
		}
		shutdownFuncs = nil
		return err
	}

	//--------
	//
	otel.SetTextMapPropagator(
		propagation.NewCompositeTextMapPropagator(
			propagation.TraceContext{},
			propagation.Baggage{},
		),
	)

	//--------
	//
	traceExporter, err := CreateTraceExporterGRPC(ctx, config)
	if err != nil {
		return nil, errors.Join(err, shutdown(ctx))
	}
	tracerProvider := CreateTracerProvider(traceExporter, config)
	shutdownFuncs = append(shutdownFuncs, tracerProvider.Shutdown)

	//--------
	//
	metricExporter, err := CreateMetricExporterGRPC(ctx, config)
	if err != nil {
		return nil, errors.Join(err, shutdown(ctx))
	}
	meterProvider := CreateMeterProvider(metricExporter, config)
	shutdownFuncs = append(shutdownFuncs, meterProvider.Shutdown)

	runtime.Start(runtime.WithMeterProvider(meterProvider))
	// err = runtime.Start(runtime.WithMinimumReadMemStatsInterval(time.Second))
	// if err != nil {
	// 	fmt.Println(err)
	// }

	//--------
	//
	logExporter, err := CreateLogsExporterGRPC(ctx, config)
	if err != nil {
		return nil, errors.Join(err, shutdown(ctx))
	}
	loggerProvider := CreateLoggerProvider(logExporter, config)
	shutdownFuncs = append(shutdownFuncs, loggerProvider.Shutdown)

	return shutdown, nil
}
