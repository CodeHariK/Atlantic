package secret

import (
	"crypto/ed25519"
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
