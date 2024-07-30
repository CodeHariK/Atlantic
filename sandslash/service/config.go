package service

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"
)

var (
	DiscordOauthConfig *oauth2.Config
	OauthStateString   = "oauthStateString"
	SessionStore       *sessions.CookieStore
	CSRFkey            = []byte("32-byte-long-auth-key")
)

type Config struct {
	Database struct {
		Host           string `json:"host"`
		Port           int    `json:"port"`
		User           string `json:"user"`
		Password       string `json:"password"`
		DbName         string `json:"dbname"`
		MaxConnections int    `json:"max_connections"`
		Timeout        int    `json:"timeout"`
		SSLMode        string `json:"ssl_mode"`
	} `json:"database"`
	Discord struct {
		ClientID     string   `json:"client_id"`
		ClientSecret string   `json:"client_secret"`
		Scopes       []string `json:"scopes"`
		RedirectURI  string   `json:"redirect_uri"`
		AuthURL      string   `json:"auth_url"`
		TokenURL     string   `json:"token_url"`
	} `json:"discord"`
	Server struct {
		Port          int    `json:"port"`
		LogLevel      string `json:"log_level"`
		EnableMetrics bool   `json:"enable_metrics"`
	} `json:"server"`
	FeatureFlags struct {
		NewFeature bool `json:"new_feature"`
		BetaAccess bool `json:"beta_access"`
	} `json:"feature_flags"`
	Session struct {
		MaxAge        int    `json:"max_age"`
		HttpOnly      bool   `json:"http_only"`
		Secure        bool   `json:"secure"`
		AuthKey       string `json:"auth_key"`
		EncryptionKey string `json:"encryption_key"`
	} `json:"session"`
}

func LoadConfig() Config {
	file, err := os.Open("config.json")
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	// Read the file content
	byteValue, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("error reading file: %v", err)
	}

	// Unmarshal JSON into Config struct
	var cfg Config
	if err := json.Unmarshal(byteValue, &cfg); err != nil {
		log.Fatalf("error unmarshaling config: %v", err)
	}

	// Setup OAuth2 configuration
	DiscordOauthConfig = &oauth2.Config{
		RedirectURL:  cfg.Discord.RedirectURI,
		ClientID:     cfg.Discord.ClientID,
		ClientSecret: cfg.Discord.ClientSecret,
		Scopes:       cfg.Discord.Scopes,
		Endpoint: oauth2.Endpoint{
			AuthURL:  cfg.Discord.AuthURL,
			TokenURL: cfg.Discord.TokenURL,
		},
	}

	return cfg
}

func (config *Config) CreateDatabaseConnectionUri() string {
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		config.Database.User,
		config.Database.Password,
		config.Database.Host,
		config.Database.Port,
		config.Database.DbName,
		config.Database.SSLMode,
	)
	return dsn
}
