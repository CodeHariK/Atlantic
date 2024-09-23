package main

import (
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/orders/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/servemux"
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

	natsClient := nats.ConnectNats(cfg)

	natsClient.CreateOrdersStream(cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg, natsClient)
		},
		func() error {
			natsClient.Nc.Close()
			return nil
		},
		OrdersServerPortUrl(&cfg),
		OrdersServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
