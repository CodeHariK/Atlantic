package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/cosmog/server"
	"github.com/codeharik/Atlantic/cosmog/utils/amazon"
	"github.com/codeharik/Atlantic/cosmog/utils/games"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/meilisearch/meilisearch-go"
)

const serviceName = "cosmog"

func MeiliSearchUrl(cfg *config.Config) string {
	return fmt.Sprintf("http://%s:%d", cfg.MeiliSearch.Host, cfg.MeiliSearch.Port)
}

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
		MeiliSearchUrl(&cfg),
		meilisearch.WithAPIKey(cfg.MeiliSearch.Key),
	)

	h, err := meiliInstance.Health()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(h)

	games.SyncInit(meiliInstance)
	amazon.SyncInit(meiliInstance)

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
