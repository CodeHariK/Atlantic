package main

import (
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/account/server"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/servemux"
)

func AccountsServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.AccountService.Host, config.AccountService.Port)
}

func AccountsServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.AccountService.Port)
}

func main() {
	cfg := config.LoadConfig()

	dragon := dragon.CreateDragon(&cfg)

	natsClient := nats.ConnectNats(cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(cfg.AccountService.Name, router, &cfg, natsClient)
		},
		func() error {
			natsClient.Nc.Close()
			return nil
		},
		AccountsServerPortUrl(&cfg),
		AccountsServerFullUrl(&cfg),
		cfg.AccountService.Name,
		&cfg,
		dragon,
	)
}
