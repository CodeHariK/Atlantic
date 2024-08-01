package handler

import "github.com/codeharik/Atlantic/sandslash/service"

type Handler struct {
	store *service.Store
}

func New(
	store *service.Store,
) *Handler {
	return &Handler{
		store: store,
	}
}
