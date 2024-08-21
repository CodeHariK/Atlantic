package server

import (
	"fmt"
	"net/http"
	"os"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"

	"github.com/gorilla/csrf"
	"github.com/gorilla/handlers"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

func loggingMiddleware(h http.Handler) http.Handler {
	return handlers.LoggingHandler(os.Stdout, h)
}

var CSRFMiddleware = csrf.Protect(
	types.CSRFkey,
	csrf.Secure(false),
	csrf.HttpOnly(true),
	csrf.SameSite(csrf.SameSiteLaxMode),
	csrf.Secure(false),                 // false in development only!
	csrf.RequestHeader("X-CSRF-Token"), // Must be in CORS Allowed and Exposed Headers
)

func CORSMiddleware(handler http.Handler, config config.Config) http.Handler {
	return handlers.CORS(
		handlers.AllowedOrigins([]string{
			// Only allow requests from this specific origin
			// "http://" + config.ServerUrl(),
			"http://localhost:8080",
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
		fmt.Println("---@" + r.URL.Path)
		// Create a new handler with route tagging for OpenTelemetry
		taggedHandler := otelhttp.WithRouteTag(r.URL.Path, next)
		taggedHandler.ServeHTTP(w, r)
	})
}
