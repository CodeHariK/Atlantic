package ProfileHandler

import (
	"fmt"
	"net/http"

	AuthHandler "github.com/codeharik/Atlantic/auth/server/auth"
	"github.com/codeharik/Atlantic/auth/sessionstore"
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

	router.Handle("/profile", authHandler.AuthMiddleware(
		http.HandlerFunc(profileHandler.HandleProfile)),
	)
}

func (profileHandler *ProfileHandler) HandleProfile(w http.ResponseWriter, r *http.Request) {
	user, shouldReturn := sessionstore.GetUserFromContext(r, w)
	if shouldReturn {
		return
	}

	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, "User Info:\nID: %s\nUsername: %s\nEmail: %s", user.ID, user.Username, user.Email)
}
