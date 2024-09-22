package nats

import (
	"fmt"
	"log"
	"time"

	"github.com/codeharik/Atlantic/config"
	"github.com/nats-io/nats.go"
	"github.com/nats-io/nats.go/jetstream"
)

type NatsClient struct {
	cfg *config.Config
	Nc  *nats.Conn
	Js  jetstream.JetStream
}

func ConnectNats(cfg config.Config) *NatsClient {
	totalWait := 10 * time.Minute
	reconnectDelay := time.Second
	fmt.Println(fmt.Sprintf("Connected to nats://%s:%d", cfg.Nats.Host, cfg.Nats.Port))
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

	js, err := jetstream.New(natsConn)
	if err != nil {
		log.Fatalf("Error connecting JetStream : %v", err)
	}

	return &NatsClient{
		Nc: natsConn,
		Js: js,
	}
}
