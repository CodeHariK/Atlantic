package secret

import (
	"crypto/ed25519"
	"crypto/rand"
	"encoding/pem"
	"fmt"
	"os"
)

// Function to read and parse the PEM-encoded private key
func ReadPrivateKeyFromFile(filePath string) (ed25519.PrivateKey, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	block, _ := pem.Decode(data)
	if block == nil || block.Type != "ED25519 PRIVATE KEY" {
		return nil, fmt.Errorf("invalid private key file")
	}

	return ed25519.PrivateKey(block.Bytes), nil
}

// Function to read and parse the PEM-encoded public key
func ReadPublicKeyFromFile(filePath string) (ed25519.PublicKey, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	block, _ := pem.Decode(data)
	if block == nil || block.Type != "ED25519 PUBLIC KEY" {
		return nil, fmt.Errorf("invalid public key file")
	}

	return ed25519.PublicKey(block.Bytes), nil
}

type KeyPair struct {
	Public  ed25519.PublicKey
	Private ed25519.PrivateKey
}

// Function to generate and save Ed25519 key pair
func GenerateAndSaveKeys(keymod int, keyId string) []KeyPair {
	// os.RemoveAll("keys/*")

	keypairs := make([]KeyPair, keymod)

	for i := 0; i < keymod; i++ {

		// Generate the key pair
		publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
		if err != nil {
			os.Exit(1)
		}

		keypairs[i] = KeyPair{Public: publicKey, Private: privateKey}

		if keyId != "" {
			privateKeyPath := (fmt.Sprintf("keys/%s_%d_private_key.pem", keyId, i))
			publicKeyPath := (fmt.Sprintf("keys/%s_%d_public_key.pem", keyId, i))

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

	return keypairs
}

func LoadKeys(keymod int, keyId string) []KeyPair {
	keypairs := make([]KeyPair, keymod)

	for i := range keymod {
		privateKeyPath := (fmt.Sprintf("keys/%s_%d_private_key.pem", keyId, i))
		publicKeyPath := (fmt.Sprintf("keys/%s_%d_public_key.pem", keyId, i))

		privateKey, err := ReadPrivateKeyFromFile(privateKeyPath)
		if err != nil {
			fmt.Println("Error reading private key:", err)
			os.Exit(1)
		}

		publicKey, err := ReadPublicKeyFromFile(publicKeyPath)
		if err != nil {
			fmt.Println("Error reading public key:", err)
			os.Exit(1)
		}

		keypairs[i] = KeyPair{Public: publicKey, Private: privateKey}
	}

	return keypairs
}

func ReplaceKey(keypairs *[]KeyPair, i int) {
	publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		os.Exit(1)
	}

	(*keypairs)[i] = KeyPair{Public: publicKey, Private: privateKey}
}
