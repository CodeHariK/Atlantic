package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"sandslash/handler"
	UserHandler "sandslash/handler/user"
	"sandslash/service"
	"sandslash/store"

	"github.com/gorilla/csrf"
	"github.com/gorilla/handlers"
)

func main() {
	sandslashConfig := service.LoadConfig()

	service.SessionStore = service.CreateSessionStore(sandslashConfig)

	storeInstance := store.ConnectDatabase(sandslashConfig)

	loggingMiddleware := func(h http.Handler) http.Handler {
		return handlers.LoggingHandler(os.Stdout, h)
	}

	csrfMiddleware := csrf.Protect(
		service.CSRFkey,
		csrf.Secure(false),
		csrf.HttpOnly(true),
		csrf.SameSite(csrf.SameSiteLaxMode),
		csrf.Secure(false),                 // false in development only!
		csrf.RequestHeader("X-CSRF-Token"), // Must be in CORS Allowed and Exposed Headers
	)

	CORSMiddleware := handlers.CORS(
		handlers.AllowCredentials(),
		handlers.AllowedOriginValidator(
			func(origin string) bool {
				return strings.HasPrefix(origin, "http://localhost")
			},
		),
		handlers.AllowedHeaders([]string{"X-CSRF-Token"}),
		handlers.ExposedHeaders([]string{"X-CSRF-Token"}),
	)

	h := handler.New(&storeInstance)

	router := http.NewServeMux()

	UserHandler.CreateRoutes(router, storeInstance.UserStore)

	router.HandleFunc("/", (h.Index))
	router.HandleFunc("/login", handler.HandleLogin)
	router.HandleFunc("/logout", handler.Logout)
	router.Handle("/profile", handler.AuthStoreMiddleware(http.HandlerFunc(handler.HandleProfile)))
	router.HandleFunc("/auth/discord/callback", handler.HandleCallback)

	server := &http.Server{
		Handler:        loggingMiddleware(csrfMiddleware(CORSMiddleware(router))),
		Addr:           fmt.Sprintf(":%d", sandslashConfig.Server.Port),
		ReadTimeout:    60 * time.Second,
		WriteTimeout:   60 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	fmt.Println(fmt.Sprintf("listening on http://localhost:%d", sandslashConfig.Server.Port))
	log.Panic(server.ListenAndServe())
}
