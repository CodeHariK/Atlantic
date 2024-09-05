package main

import (
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/cosmog/server"
	"github.com/codeharik/Atlantic/service/servemux"
)

func CosmogServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.CosmogService.Address, config.CosmogService.Port)
}

func CosmogServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.CosmogService.Port)
}

func main() {
	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(router, &cfg)
		},
		func() {
		},
		CosmogServerPortUrl(&cfg),
		CosmogServerFullUrl(&cfg),
		"Auth",
		&cfg,
	)
}
