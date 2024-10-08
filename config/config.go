package config

import (
	"crypto/ed25519"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"golang.org/x/oauth2"
)

type KeyPair struct {
	Public  ed25519.PublicKey
	Private ed25519.PrivateKey
}

type OAuth struct {
	Discord OAuthService `json:"discord"`
}

type OAuthService struct {
	ClientID     string   `json:"client_id"`
	ClientSecret string   `json:"client_secret"`
	Scopes       []string `json:"scopes"`
	RedirectURI  string   `json:"redirect_uri"`
	AuthURL      string   `json:"auth_url"`
	TokenURL     string   `json:"token_url"`

	Config *oauth2.Config
}

type NatsTopic struct {
	OrderStream string `json:"orderstream"`
	Orders      string `json:"orders"`
	OrderPlaced string `json:"orderplaced"`
}

type Config struct {
	Atlantic      string `json:"atlantic"`
	Domain        string `json:"domain"`
	Dev           bool   `json:"dev"`
	EnableMetrics bool   `json:"enable_metrics"`

	AuthService struct {
		Host string `json:"host"`
		Port int    `json:"port"`

		KeyMod int `json:"keymod"`

		Encrypt_Key string `json:"encypt_key"`

		AccessKeyPairs  []KeyPair
		SessionKeyPairs []KeyPair

		OAuth OAuth `json:"oauth"`
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

	Dragon struct {
		Host     string `json:"host"`
		Port     int    `json:"port"`
		User     string `json:"user"`
		Password string `json:"password"`
	} `json:"dragonfly"`

	Minio struct {
		Host   string `json:"host"`
		Port   int    `json:"port"`
		Id     string `json:"id"`
		Secret string `json:"secret"`
		Bucket struct {
			Products string `json:"products"`
		} `json:"bucket"`
	} `json:"minio"`

	CosmogService struct {
		Host string `json:"host"`
		Port int    `json:"port"`
	} `json:"cosmog_service"`

	MeiliSearch struct {
		Host string `json:"host"`
		Port int    `json:"port"`
		Key  string `json:"key"`
	} `json:"meilisearch"`

	OrdersService struct {
		Host string `json:"host"`
		Port int    `json:"port"`
	} `json:"orders_service"`

	Nats struct {
		Name  string `json:"name"`
		Host  string `json:"host"`
		Port  int    `json:"port"`
		Creds string `json:"creds"`

		Topics NatsTopic `json:"topics"`
	} `json:"nats"`

	Temporal struct {
		Host  string `json:"host"`
		Port  int    `json:"port"`
		Creds string `json:"creds"`
	} `json:"temporal"`

	InventoryService struct {
		Host string `json:"host"`
		Port int    `json:"port"`
	} `json:"inventory_service"`

	FeatureFlags struct {
		NewFeature bool `json:"new_feature"`
		BetaAccess bool `json:"beta_access"`
	} `json:"feature_flags"`

	OTLP struct {
		GRPC    string            `json:"grpc"`
		HTTP    string            `json:"http"`
		Headers map[string]string `json:"headers"`
	} `json:"otlp"`
}

func LoadConfig() Config {
	paths := []string{"config.json", "./config/config.json", "../config/config.json"}

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

	loadOauthConfig(&cfg)

	loadEnv(&cfg)

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

func (config *Config) DragonConnectionUri() string {
	return fmt.Sprintf("rediss://%s:%s@%s:%d",
		config.Dragon.User,
		config.Dragon.Password,
		config.Dragon.Host,
		config.Dragon.Port,
	)
}

// Setup OAuth2 configuration
func loadOauthConfig(cfg *Config) {
	cfg.AuthService.OAuth.Discord.Config = &oauth2.Config{
		RedirectURL:  cfg.AuthService.OAuth.Discord.RedirectURI,
		ClientID:     cfg.AuthService.OAuth.Discord.ClientID,
		ClientSecret: cfg.AuthService.OAuth.Discord.ClientSecret,
		Scopes:       cfg.AuthService.OAuth.Discord.Scopes,
		Endpoint: oauth2.Endpoint{
			AuthURL:  cfg.AuthService.OAuth.Discord.AuthURL,
			TokenURL: cfg.AuthService.OAuth.Discord.TokenURL,
		},
	}
}

func loadEnv(cfg *Config) {
	//
	loadStringEnv(&cfg.Domain, "VITE_DOMAIN")

	fmt.Println("Atlantic", cfg.Domain)

	//
	loadStringEnv(&cfg.Database.Host, "DATABASE_HOST")
	loadStringEnv(&cfg.Database.User, "DATABASE_USER")
	loadStringEnv(&cfg.Database.Password, "DATABASE_PASSWORD")
	loadStringEnv(&cfg.Database.DbName, "DATABASE_DBNAME")
	loadStringEnv(&cfg.Database.SSLMode, "DATABASE_SSLMODE")

	//
	loadStringEnv(&cfg.Minio.Host, "MINIO_HOST")
}

func loadStringEnv(cfg *string, env string) {
	if ENV := os.Getenv(env); ENV != "" {
		*cfg = ENV
	}
}
