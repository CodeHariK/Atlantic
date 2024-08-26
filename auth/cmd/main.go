package main

import (
	"log"

	"github.com/codeharik/Atlantic/auth/server"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/process"
)

func main() {
	process.SetMaxProcs()

	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	colorlogger.SetLogger(cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	server.Serve(
		storeInstance,
		&cfg,
	)
}
