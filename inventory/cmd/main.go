package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/inventory/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/minio"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/codeharik/Atlantic/service/store"
)

const serviceName = "inventory"

func InventoryServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.InventoryService.Host, config.InventoryService.Port)
}

func InventoryServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.InventoryService.Port)
}

func main() {
	cfg := config.LoadConfig()

	dragon := dragon.CreateDragon(&cfg)

	minioClient := minio.CreateClient(&cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	natsClient := nats.ConnectNats(cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg, minioClient, natsClient, storeInstance)
		},
		func() error {
			natsClient.Nc.Close()
			storeInstance.Db.Close()
			return nil
		},
		InventoryServerPortUrl(&cfg),
		InventoryServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
