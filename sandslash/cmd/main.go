package main

import (
	_ "embed"
	"log"

	handler "github.com/codeharik/Atlantic/sandslash/server"
	"github.com/codeharik/Atlantic/sandslash/service"
)

func main() {
	service.SetMaxProcs()

	config := service.LoadConfig("config.json", "../config/config.json")

	service.SetLogger(config)

	service.SessionStore = service.CreateSessionStore(config)

	storeInstance, err := service.ConnectDatabase(config)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	handler.Serve(
		storeInstance,
		config,
	)
}
