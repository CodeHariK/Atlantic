package handler

import (
	"net/http"

	"github.com/codeharik/Atlantic/sandslash/server/docs"
	UserHandler "github.com/codeharik/Atlantic/sandslash/server/user"
	"github.com/codeharik/Atlantic/sandslash/service"
)

func CreateRoutes(router *http.ServeMux, storeInstance service.Store) {
	hss := New(&storeInstance)

	UserHandler.CreateRoutes(router, storeInstance.UserStore)

	router.HandleFunc("/", (hss.Index))
	router.HandleFunc("/login", HandleLogin)
	router.HandleFunc("/logout", Logout)
	router.Handle("/profile", AuthStoreMiddleware(
		http.HandlerFunc(HandleProfile)),
	)
	router.HandleFunc("/auth/discord/callback", HandleCallback)

	docs.OpenapiHandler(router, "")
}
