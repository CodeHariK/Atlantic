package server

import (
	"fmt"
	"net/http"
)

func (s CosmogServiceServer) live(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Alive")
}

func (s CosmogServiceServer) ready(w http.ResponseWriter, r *http.Request) {
	// Ping the database to check if it's ready
	if _, err := s.meiliInstance.Health(); err != nil {
		http.Error(w, "meilisearch not connected", http.StatusServiceUnavailable)
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Ready")
}
