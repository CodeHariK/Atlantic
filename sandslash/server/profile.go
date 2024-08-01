package handler

import (
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/sandslash/types"
)

func (h *Handler) Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Index")
}

func HandleProfile(w http.ResponseWriter, r *http.Request) {
	user, ok := r.Context().Value("user").(types.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "User Info:\nID: %s\nUsername: %s\nEmail: %s", user.ID, user.Username, user.Email)
}
