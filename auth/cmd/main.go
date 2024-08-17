package main

import (
	_ "embed"
	"log"

	handler "github.com/codeharik/Atlantic/auth/server"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/logger"
	"github.com/codeharik/Atlantic/service/process"
)

func main() {
	process.SetMaxProcs()

	cfg := config.LoadConfig("config.json", "../config/config.json")

	logger.SetLogger(cfg)

	config.SessionStore = store.CreateSessionStore(cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	handler.Serve(
		storeInstance,
		cfg,
	)
}
