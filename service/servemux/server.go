package servemux

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"sync"
	"time"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/basecontext"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/observe"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func Serve(
	createRoutes func(router *http.ServeMux),
	closeFn func() error,
	portUrl string, fullUrl string, serviceName string,
	config *config.Config,
	dragon dragon.Dragon,
) {
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

	var wg sync.WaitGroup
	wg.Add(1)
	dragon.SyncKeys(config, &wg)

	router := http.NewServeMux()

	createRoutes(router)

	s := Service{name: serviceName}

	mux := CORSMiddleware(
		s.RouteTaggingMiddleware(
			loggingMiddleware(
				// CSRFMiddleware(
				router,
				// ),
			),
		),
	)
	omux := otelhttp.NewHandler(mux, "/")

	server := &http.Server{
		Addr: portUrl,
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
		fmt.Printf("* * * * * * * * * * * * * * * * * * * * * * * * *\n    %s Server on %s    \n* * * * * * * * * * * * * * * * * * * * * * * * *\n", strings.ToUpper(serviceName), fullUrl)
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

		err = closeFn()
		if err != nil {
			fmt.Printf("Error terminating server: %v", err)
		}

		err = dragon.Client.Close()
		if err != nil {
			fmt.Printf("Error shutting down dragon: %v", err)
		}

		fmt.Println("Server Shutdown, OtelShutdown, Store closed, Session store closed")
	}()

	// Wait for interruption.
	select {
	case serverError := <-srvErr:
		fmt.Println("Server error:", serverError)
		return
	case <-sigctx.Done():
		// Wait for first CTRL+C.
		// Stop receiving signal notifications as soon as possible.
		stop()

		wg.Wait()
	}
}
