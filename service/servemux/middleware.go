package servemux

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/rs/cors"

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

func CORSMiddleware(handler http.Handler) http.Handler {
	return cors.New(cors.Options{
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
		AllowCredentials: true,
		AllowedHeaders: []string{
			"*",
			// "Content-Type",
			// "Authorization",
		},
		OptionsPassthrough: false, // Ensure CORS headers are handled correctly for preflight
		Debug:              false, // Optional: Useful for debugging CORS issues
		ExposedHeaders: []string{
			"Accept",
			// "X-Requested-With",
			// "Content-Type",
			// "Authorization",
			"Accept-Encoding",
			"Accept-Post",
			"Connect-Accept-Encoding",
			"Connect-Content-Encoding",
			"Content-Encoding",
			"Grpc-Accept-Encoding",
			"Grpc-Encoding",
			"Grpc-Message",
			"Grpc-Status",
			"Grpc-Status-Details-Bin",

			//
			"Redirect-To",
		},
		// Let browsers cache CORS information for longer, which reduces the number
		// of preflight requests. Any changes to ExposedHeaders won't take effect
		// until the cached data expires. FF caps this value at 24h, and modern
		// Chrome caps it at 2h.
		MaxAge: int(2 * time.Hour / time.Second),
	}).Handler(handler)
}

type Service struct {
	name string
}

func (s *Service) RouteTaggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("---@" + r.URL.Path)
		// Create a new handler with route tagging for OpenTelemetry
		taggedHandler := otelhttp.WithRouteTag(s.name+" -> "+r.URL.Path, next)
		taggedHandler.ServeHTTP(w, r)
	})
}
