package config

import (
	"crypto/ed25519"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/codeharik/Atlantic/config/secret"
	"golang.org/x/oauth2"
)

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

type Config struct {
	Service struct {
		Name          string `json:"name"`
		Dev           bool   `json:"dev"`
		EnableMetrics bool   `json:"enable_metrics"`
	} `json:"service"`
	AuthService struct {
		Address string `json:"address"`
		Port    int    `json:"port"`

		KeyMod     int    `json:"keymod"`
		JwtKeyPath string `json:"jwt_keys"`

		Encrypt_Key string `json:"encypt_key"`
		EncryptKey  []byte

		PublicKeys  []ed25519.PublicKey
		PrivateKeys []ed25519.PrivateKey

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

func LoadConfig(load bool, paths ...string) Config {
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

	if load {
		loadSecretKeys(&cfg)
		loadOauthConfig(&cfg)

		cfg.AuthService.EncryptKey = []byte(cfg.AuthService.Encrypt_Key)
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

func (config *Config) DragonConnectionUri() string {
	return fmt.Sprintf("rediss://%s:%s@%s:%d",
		config.Dragon.User,
		config.Dragon.Password,
		config.Dragon.Host,
		config.Dragon.Port,
	)
}

func loadSecretKeys(cfg *Config) {
	for i := range cfg.AuthService.KeyMod {
		privateKeyPath := (fmt.Sprintf("%sjwt_%d_private_key.pem", cfg.AuthService.JwtKeyPath, i))
		publicKeyPath := (fmt.Sprintf("%sjwt_%d_public_key.pem", cfg.AuthService.JwtKeyPath, i))

		privateKey, err := secret.ReadPrivateKeyFromFile(privateKeyPath)
		if err != nil {
			fmt.Println("Error reading private key:", err)
			os.Exit(1)
		}
		cfg.AuthService.PrivateKeys = append(cfg.AuthService.PrivateKeys, privateKey)

		publicKey, err := secret.ReadPublicKeyFromFile(publicKeyPath)
		if err != nil {
			fmt.Println("Error reading public key:", err)
			os.Exit(1)
		}
		cfg.AuthService.PublicKeys = append(cfg.AuthService.PublicKeys, publicKey)
	}
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
