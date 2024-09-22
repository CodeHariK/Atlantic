package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/orders/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/nats-io/nats.go"
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

	totalWait := 10 * time.Minute
	reconnectDelay := time.Second
	fmt.Println(fmt.Sprintf("nats://%s:%d", cfg.Nats.Host, cfg.Nats.Port))
	natsConn, err := nats.Connect(
		fmt.Sprintf("nats://%s:%d", cfg.Nats.Host, cfg.Nats.Port),
		[]nats.Option{
			nats.Name(cfg.Nats.Name),
			// nats.UserCredentials(cfg.Nats.Creds),
			nats.ReconnectWait(reconnectDelay),
			nats.MaxReconnects((int(totalWait / reconnectDelay))),
			nats.DisconnectErrHandler(func(nc *nats.Conn, err error) {
				if !nc.IsClosed() {
					log.Printf("Disconnected due to: %s, will attempt reconnects for %.0fm", err, totalWait.Minutes())
				}
			}),
			nats.ReconnectHandler(func(nc *nats.Conn) {
				log.Printf("Reconnected [%s]", nc.ConnectedUrl())
			}),
			nats.ClosedHandler(func(nc *nats.Conn) {
				if !nc.IsClosed() {
					log.Fatal("Exiting: no servers available")
				} else {
					log.Fatal("Exiting")
				}
			}),
		}...,
	)

	if err != nil {
		log.Fatalf("Error connecting nats : %v", err)
	}

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg, natsConn)
		},
		func() error {
			natsConn.Close()
			return nil
		},
		OrdersServerPortUrl(&cfg),
		OrdersServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
