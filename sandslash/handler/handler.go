package handler

import "sandslash/store"

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
