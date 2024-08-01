package handler

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"time"

	"connectrpc.com/connect"
	"connectrpc.com/grpchealth"
	"connectrpc.com/otelconnect"
	"github.com/codeharik/Atlantic/sandslash/server/database"
	"github.com/codeharik/Atlantic/sandslash/service"
	"github.com/codeharik/Atlantic/sandslash/service/observe"
	"github.com/gorilla/csrf"
	"github.com/gorilla/handlers"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func Serve(storeInstance service.Store, config service.Config) {
	// Handle SIGINT (CTRL+C) gracefully.
	ctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
	)
	defer stop()

	// Set up OpenTelemetry.
	otelShutdown, err := observe.SetupOTelSDK(ctx, config)
	if err != nil {
		fmt.Println(err)
	}

	router := http.NewServeMux()

	CreateRoutes(router, storeInstance)

	var interceptors []connect.Interceptor
	if config.OTLP.GRPC != "" {
		observability, err := otelconnect.NewInterceptor()
		if err != nil {
			log.Fatalf("%v", err.Error())
		}
		interceptors = append(interceptors, observability)
	}

	compress1KB := connect.WithCompressMinBytes(1024)
	database.RegisterHandlers(
		router,
		storeInstance.Db,
		connect.WithInterceptors(interceptors...), compress1KB,
	)

	router.Handle(grpchealth.NewHandler(
		grpchealth.NewStaticChecker(config.Service.Name),
		compress1KB,
	))

	mux := RouteTaggingMiddleware(
		loggingMiddleware(
			CSRFMiddleware(
				CORSMiddleware(
					router, config,
				),
			),
		),
	)
	omux := otelhttp.NewHandler(mux, "/")

	server := &http.Server{
		Addr: config.ServerPortUrl(),
		Handler: h2c.NewHandler(
			omux,
			&http2.Server{},
		),
		BaseContext:       func(_ net.Listener) context.Context { return ctx },
		ReadHeaderTimeout: time.Second,
		ReadTimeout:       60 * time.Second,
		WriteTimeout:      60 * time.Second,
		MaxHeaderBytes:    8 * 1024, // 8KiB
	}

	srvErr := make(chan error, 1)
	go func() {
		fmt.Printf("Server on %s\n", config.ServerFullUrl())
		srvErr <- server.ListenAndServe()
	}()

	defer func() {
		err = server.Shutdown(context.Background())
		if err != nil {
			log.Printf("Error shutting down Server: %v", err)
		}

		if shutdownErr := otelShutdown(context.Background()); shutdownErr != nil {
			log.Printf("Error shutting down OpenTelemetry: %v", shutdownErr)
		}

		storeInstance.Db.Close()
	}()

	// Wait for interruption.
	select {
	case <-srvErr:
		return
	case <-ctx.Done():
		// Wait for first CTRL+C.
		// Stop receiving signal notifications as soon as possible.
		stop()
	}
}

func loggingMiddleware(h http.Handler) http.Handler {
	return handlers.LoggingHandler(os.Stdout, h)
}

var CSRFMiddleware = csrf.Protect(
	service.CSRFkey,
	csrf.Secure(false),
	csrf.HttpOnly(true),
	csrf.SameSite(csrf.SameSiteLaxMode),
	csrf.Secure(false),                 // false in development only!
	csrf.RequestHeader("X-CSRF-Token"), // Must be in CORS Allowed and Exposed Headers
)

func CORSMiddleware(handler http.Handler, config service.Config) http.Handler {
	return handlers.CORS(
		handlers.AllowedOrigins([]string{
			// Only allow requests from this specific origin
			// "http://" + config.ServerUrl(),
			"*",
		}),
		handlers.AllowedMethods([]string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete,
		}),
		handlers.AllowedHeaders([]string{
			"X-Requested-With",
			"Content-Type",
			"Authorization",
		}),
		handlers.ExposedHeaders([]string{
			"Content-Type",
			"Authorization",
		}),
		handlers.AllowCredentials(),
	)(handler)
}

func RouteTaggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Create a new handler with route tagging for OpenTelemetry
		taggedHandler := otelhttp.WithRouteTag(r.URL.Path, next)
		taggedHandler.ServeHTTP(w, r)
	})
}
