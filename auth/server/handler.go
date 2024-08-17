package handler

import "github.com/codeharik/Atlantic/auth/store"

type Handler struct {
	store *store.Store
}

func New(
	store *store.Store,
) *Handler {
	return &Handler{
		store: store,
	}
}
