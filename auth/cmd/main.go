package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/codeharik/Atlantic/auth/server"
	"github.com/codeharik/Atlantic/config"
	db "github.com/codeharik/Atlantic/database/migrations"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/process"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/codeharik/Atlantic/service/store"
)

const serviceName = "auth"

func AuthServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.AuthService.Host, config.AuthService.Port)
}

func AuthServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.AuthService.Port)
}

func main() {
	process.SetMaxProcs()

	cfg := config.LoadConfig()

	colorlogger.SetLogger(cfg)

	db.MigrateUp(cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	dragon := dragon.CreateDragon(&cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, storeInstance, dragon, &cfg)
		},
		func() error {
			storeInstance.Db.Close()
			return nil
		},
		AuthServerPortUrl(&cfg),
		AuthServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)
}
