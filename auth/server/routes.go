package handler

import (
	"net/http"

	UserHandler "github.com/codeharik/Atlantic/auth/server/user"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/docs"
)

func CreateRoutes(router *http.ServeMux, storeInstance store.Store, config config.Config) {
	hss := New(&storeInstance)

	UserHandler.CreateRoutes(router, storeInstance.UserStore)

	router.HandleFunc("/", (hss.Index))
	router.HandleFunc("/login", HandleLogin)
	router.HandleFunc("/logout", Logout)
	router.Handle("/profile", AuthStoreMiddleware(
		http.HandlerFunc(HandleProfile)),
	)
	router.HandleFunc("/auth/discord/callback", HandleCallback)

	docs.OpenapiHandler(router, config)
}
