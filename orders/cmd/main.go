package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/orders/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/codeharik/Atlantic/service/store"
	"go.temporal.io/sdk/client"
)

const serviceName = "orders"

func OrdersServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.OrdersService.Host, config.OrdersService.Port)
}

func OrdersServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.OrdersService.Port)
}

func main() {
	cfg := config.LoadConfig()

	dragon := dragon.CreateDragon(&cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	natsClient := nats.ConnectNats(cfg)

	temporalClient, err := client.Dial(client.Options{
		HostPort: fmt.Sprintf("%s:%d", cfg.Temporal.Host, cfg.Temporal.Port),
	})
	if err != nil {
		log.Fatalln("Unable to create Temporal client.", err)
	}

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg, natsClient, storeInstance, temporalClient)
		},
		func() error {
			temporalClient.Close()
			natsClient.Nc.Close()
			storeInstance.Db.Close()
			return nil
		},
		OrdersServerPortUrl(&cfg),
		OrdersServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
