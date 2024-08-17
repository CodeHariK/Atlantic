package UserHandler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/database/store/user"
)

type UserHandler struct {
	store *user.Queries
}

func CreateUserRoutes(router *http.ServeMux, store *user.Queries) {
	userHandler := &UserHandler{
		store: store,
	}

	router.HandleFunc("/createUser", userHandler.CreateUser)
}

func (userHandler *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user user.CreateUserParams
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = userHandler.store.CreateUser(context.Background(), user)
	if err != nil {
		fmt.Println(err.Error())
	}

	users, err := userHandler.store.ListAllUsers(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	content, _ := json.Marshal(users)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, string(content))
}
