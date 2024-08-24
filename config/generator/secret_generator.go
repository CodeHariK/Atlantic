package main

import (
	"crypto/ed25519"
	"crypto/rand"
	"encoding/pem"
	"fmt"
	"os"

	"github.com/codeharik/Atlantic/config"
)

func main() {
	generateAndSaveKeysTest("jwt")
}

// Function to generate and save Ed25519 key pair
func generateAndSaveKeysTest(keyId string) {
	cfg := config.LoadConfig(false, "config.json", "../config/config.json")

	os.RemoveAll("keys/*")

	for i := range cfg.AuthService.KeyMod {
		privateKeyPath := (fmt.Sprintf("keys/%s_%d_private_key.pem", keyId, i))
		publicKeyPath := (fmt.Sprintf("keys/%s_%d_public_key.pem", keyId, i))

		// Generate the key pair
		publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
		if err != nil {
			os.Exit(1)
		}

		// Store the private key in a PEM file
		privateKeyFile, err := os.Create(privateKeyPath)
		if err != nil {
			os.Exit(1)
		}
		defer privateKeyFile.Close()

		privateKeyPEM := &pem.Block{
			Type:  "ED25519 PRIVATE KEY",
			Bytes: privateKey,
		}

		if err := pem.Encode(privateKeyFile, privateKeyPEM); err != nil {
			os.Exit(1)
		}

		// Store the public key in a PEM file
		publicKeyFile, err := os.Create(publicKeyPath)
		if err != nil {
			os.Exit(1)
		}
		defer publicKeyFile.Close()

		publicKeyPEM := &pem.Block{
			Type:  "ED25519 PUBLIC KEY",
			Bytes: publicKey,
		}

		if err := pem.Encode(publicKeyFile, publicKeyPEM); err != nil {
			os.Exit(1)
		}
	}
}
