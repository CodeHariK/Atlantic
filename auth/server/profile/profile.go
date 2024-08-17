package ProfileHandler

import (
	"fmt"
	"net/http"

	AuthHandler "github.com/codeharik/Atlantic/auth/server/auth"
	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/database/store/user"
)

type ProfileHandler struct {
	store       *user.Queries
	authHandler *AuthHandler.AuthHandler
}

func CreateProfileRoutes(router *http.ServeMux, store *user.Queries, authHandler *AuthHandler.AuthHandler) {
	profileHandler := &ProfileHandler{
		store:       store,
		authHandler: authHandler,
	}

	router.HandleFunc("/", (profileHandler.Index))
	router.Handle("/profile", authHandler.AuthMiddleware(
		http.HandlerFunc(profileHandler.HandleProfile)),
	)
}

func (profileHandler *ProfileHandler) Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Index")
}

func (profileHandler *ProfileHandler) HandleProfile(w http.ResponseWriter, r *http.Request) {
	user, ok := r.Context().Value(types.ConstAuthUser).(types.AuthUser)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "User Info:\nID: %s\nUsername: %s\nEmail: %s", user.ID, user.Username, user.Email)
}
