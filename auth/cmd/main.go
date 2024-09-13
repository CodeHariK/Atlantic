package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/codeharik/Atlantic/auth/server"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/process"
	"github.com/codeharik/Atlantic/service/servemux"
)

const serviceName = "auth"

func AuthServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.AuthService.Address, config.AuthService.Port)
}

func AuthServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.AuthService.Port)
}

func main() {
	process.SetMaxProcs()

	cfg := config.LoadConfig("config.json", "../config/config.json")

	fmt.Println("---->", os.Getenv("AUTH_HOST"))
	cfg.Database.Host = os.Getenv("AUTH_HOST")

	colorlogger.SetLogger(cfg)

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
