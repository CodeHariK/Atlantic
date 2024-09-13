package main

import (
	"fmt"
	"net/http"
	"os"

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
	minio_addr := os.Getenv("minio_addr")

	cfg := config.LoadConfig("config.json", "../config/config.json")

	cfg.Minio.Addr = minio_addr

	fmt.Println("----> MINIO_ADDR : " + cfg.Minio.Addr)

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

	// getObject(s3Client, cfg.Minio.Bucket.Products, "go.mod")
	// listObjects(s3Client, cfg.Minio.Bucket.Products)
}
