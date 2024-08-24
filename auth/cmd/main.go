package main

import (
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
	"github.com/google/uuid"
)

func main() {
	// process.SetMaxProcs()

	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	// logger.SetLogger(cfg)

	// storeInstance, err := store.ConnectDatabase(cfg)
	// if err != nil {
	// 	log.Fatalf("Cannot connect to database : %v", err.Error())
	// }

	// cookiestore := sessionstore.CreateCookieSessionStore(cfg)
	// if err != nil {
	// 	log.Fatalf("Could not create Cookie Session Store")
	// }
	// dragonstore, err := sessionstore.CreateDragonSessionStore(&cfg)
	// if err != nil {
	// 	log.Fatalf("Could not create Dragon Session Store")
	// }

	// server.Serve(
	// 	storeInstance,
	// 	dragonstore,
	// 	cookiestore,
	// 	&cfg,
	// )

	j := sessionstore.JwtConfig{Config: &cfg}

	u, _ := uuid.NewV7()

	t, _ := j.CreateJwt(u, "Hello", []string{"dev", "admin"})

	j.ExtractClaims(t)
}
