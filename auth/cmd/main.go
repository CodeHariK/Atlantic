package main

import (
	_ "embed"
	"log"

	handler "github.com/codeharik/Atlantic/auth/server"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/store"
	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/logger"
	"github.com/codeharik/Atlantic/service/process"
	"golang.org/x/oauth2"
)

func main() {
	process.SetMaxProcs()

	cfg := config.LoadConfig("config.json", "../config/config.json")

	// Setup OAuth2 configuration
	types.DiscordOauthConfig = &oauth2.Config{
		RedirectURL:  cfg.Discord.RedirectURI,
		ClientID:     cfg.Discord.ClientID,
		ClientSecret: cfg.Discord.ClientSecret,
		Scopes:       cfg.Discord.Scopes,
		Endpoint: oauth2.Endpoint{
			AuthURL:  cfg.Discord.AuthURL,
			TokenURL: cfg.Discord.TokenURL,
		},
	}

	logger.SetLogger(cfg)

	storeInstance, err := store.ConnectDatabase(cfg)
	if err != nil {
		log.Fatalf("Cannot connect to database : %v", err.Error())
	}

	cookiestore := sessionstore.CreateCookieSessionStore(cfg)
	if err != nil {
		log.Fatalf("Could not create Cookie Session Store")
	}
	dragonstore, err := sessionstore.CreateDragonSessionStore(cfg)
	if err != nil {
		log.Fatalf("Could not create Dragon Session Store")
	}

	handler.Serve(
		storeInstance,
		dragonstore,
		cookiestore,
		cfg,
	)
}
