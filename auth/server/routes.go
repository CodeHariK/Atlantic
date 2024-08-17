package handler

import (
	"net/http"

	AuthHandler "github.com/codeharik/Atlantic/auth/server/auth"
	ProfileHandler "github.com/codeharik/Atlantic/auth/server/profile"
	UserHandler "github.com/codeharik/Atlantic/auth/server/user"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/docs"
)

func CreateRoutes(router *http.ServeMux, storeInstance store.Store, sessionStore *store.SessionHandler, config config.Config) {
	UserHandler.CreateUserRoutes(router, storeInstance.UserStore)

	authHandler := AuthHandler.CreateAuthRoutes(router, sessionStore)

	ProfileHandler.CreateProfileRoutes(router, storeInstance.UserStore, authHandler)

	docs.OpenapiHandler(router, "user", "Auth")
}
