package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/codeharik/Atlantic/auth/server"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/process"
	"github.com/codeharik/Atlantic/service/servemux"
)

func AuthServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.AuthService.Address, config.AuthService.Port)
}

func AuthServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.AuthService.Port)
}

func main() {
	process.SetMaxProcs()

	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	colorlogger.SetLogger(cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	dragon := dragon.CreateDragon(&cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(router, storeInstance, dragon, &cfg)
		},
		func() {
			storeInstance.Db.Close()
			dragon.Client.Close()
		},
		AuthServerPortUrl(&cfg),
		AuthServerFullUrl(&cfg),
		"Auth",
		&cfg,
	)
}
