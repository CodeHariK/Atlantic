package main

import (
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/inventory/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/servemux"
)

const serviceName = "inventory"

func InventoryServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.InventoryService.Host, config.InventoryService.Port)
}

func InventoryServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.InventoryService.Port)
}

func main() {
	cfg := config.LoadConfig("config.json", "../config/config.json")

	dragon := dragon.CreateDragon(&cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg)
		},
		func() error { return nil },
		InventoryServerPortUrl(&cfg),
		InventoryServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
