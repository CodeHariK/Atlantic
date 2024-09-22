package main

import (
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/cosmog/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/meilisearch/meilisearch-go"
)

const serviceName = "cosmog"

func CosmogServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.CosmogService.Host, config.CosmogService.Port)
}

func CosmogServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.CosmogService.Port)
}

func main() {
	cfg := config.LoadConfig()

	dragon := dragon.CreateDragon(&cfg)

	meiliInstance := meilisearch.New(
		fmt.Sprintf("%s:%d", cfg.MeiliSearch.Host, cfg.MeiliSearch.Port),
		meilisearch.WithAPIKey(cfg.MeiliSearch.Key),
	)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg, &meiliInstance)
		},
		func() error {
			meiliInstance.Close()
			return nil
		},
		CosmogServerPortUrl(&cfg),
		CosmogServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
