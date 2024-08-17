package config

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
)

type Config struct {
	Service struct {
		Name          string `json:"name"`
		Dev           bool   `json:"dev"`
		EnableMetrics bool   `json:"enable_metrics"`
	} `json:"service"`
	AuthService struct {
		Address string `json:"address"`
		Port    int    `json:"port"`
	} `json:"auth_service"`
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
	Dragonfly struct {
		Host     string `json:"host"`
		Port     int    `json:"port"`
		User     string `json:"user"`
		Password string `json:"password"`
	} `json:"dragonfly"`
	Discord struct {
		ClientID     string   `json:"client_id"`
		ClientSecret string   `json:"client_secret"`
		Scopes       []string `json:"scopes"`
		RedirectURI  string   `json:"redirect_uri"`
		AuthURL      string   `json:"auth_url"`
		TokenURL     string   `json:"token_url"`
	} `json:"discord"`
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

	OTLP struct {
		GRPC string `json:"grpc"`
		HTTP string `json:"http"`
	} `json:"otlp"`
}

func LoadConfig(paths ...string) Config {
	var filePath string
	fileExists := false

	// Check each path for the existence of the file
	for _, path := range paths {
		if _, err := os.Stat(path); !os.IsNotExist(err) {
			filePath = path
			fileExists = true
			break
		}
	}

	if !fileExists {
		fmt.Println("Error: config.json not found in any of the expected locations.")
		os.Exit(1) // Exit with status code 1 indicating failure
	}

	file, err := os.Open(filePath)
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

	return cfg
}

func (config *Config) DatabaseConnectionUri() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		config.Database.User,
		config.Database.Password,
		config.Database.Host,
		config.Database.Port,
		config.Database.DbName,
		config.Database.SSLMode,
	)
}

func (config *Config) DragonflyConnectionUri() string {
	return fmt.Sprintf("rediss://%s:%s@%s:%d",
		config.Dragonfly.User,
		config.Dragonfly.Password,
		config.Dragonfly.Host,
		config.Dragonfly.Port,
	)
}
