package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/basecontext"
	"github.com/codeharik/Atlantic/service/observe"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func ServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.AuthService.Address, config.AuthService.Port)
}

func ServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.AuthService.Port)
}

func Serve(storeInstance store.Store, config *config.Config) {
	// Handle SIGINT (CTRL+C) gracefully.
	sigctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
	)
	defer stop()

	// Set up OpenTelemetry.
	otelShutdown, otelerr := observe.SetupOTelSDK(sigctx, config)
	if otelerr != nil {
		fmt.Println(otelerr)
	}

	router := http.NewServeMux()

	CreateRoutes(router, storeInstance, config)

	mux := CORSMiddleware(
		RouteTaggingMiddleware(
			loggingMiddleware(
				// CSRFMiddleware(
				router,
				// ),
			),
		), config,
	)
	omux := otelhttp.NewHandler(mux, "/")

	server := &http.Server{
		Addr: ServerPortUrl(config),
		Handler: h2c.NewHandler(
			omux,
			&http2.Server{},
		),

		BaseContext: basecontext.GenerateContext(sigctx),

		ReadHeaderTimeout: time.Second,
		ReadTimeout:       60 * time.Second,
		WriteTimeout:      60 * time.Second,
		MaxHeaderBytes:    8 * 1024, // 8KiB
	}

	srvErr := make(chan error, 1)
	go func() {
		fmt.Printf("Server on %s\n", ServerFullUrl(config))
		srvErr <- server.ListenAndServe()
	}()

	defer func() {
		err := server.Shutdown(context.Background())
		if err != nil {
			fmt.Printf("Error shutting down Server: %v", err)
		}

		if shutdownErr := otelShutdown(context.Background()); shutdownErr != nil {
			fmt.Printf("Error shutting down OpenTelemetry: %v", shutdownErr)
		}

		storeInstance.Db.Close()

		if err != nil {
			fmt.Printf("Error shutting down SessionStore: %v", err)
		}

		fmt.Println("Server Shutdown, OtelShutdown, Store closed, Session store closed")
	}()

	// Wait for interruption.
	select {
	case serverError := <-srvErr:
		fmt.Println(serverError)
		return
	case <-sigctx.Done():
		// Wait for first CTRL+C.
		// Stop receiving signal notifications as soon as possible.
		stop()
	}
}
