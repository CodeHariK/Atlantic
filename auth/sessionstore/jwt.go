package sessionstore

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/codeharik/Atlantic/config"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	// Generate a bcrypt hash from the password with a default cost of 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// Compare the hashed password stored in the database with the user input
func CheckPassword(hashedPassword string, inputPassword string) error {
	err := bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword),
		[]byte(inputPassword),
	)
	if err != nil {
		return fmt.Errorf("Invalid password")
	}
	return nil
}

func (cfg *JwtConfig) generateKid(sub uuid.UUID) int {
	var sum int
	for _, b := range sub {
		sum += int(b)
	}
	return sum % cfg.AuthService.KeyMod
}

type JwtConfig struct {
	*config.Config
}

func (cfg *JwtConfig) CreateJwt(user uuid.UUID, name string, roles []string) (string, error) {
	claims := jwt.MapClaims{
		"sub":   user.String(),
		"name":  name,
		"roles": roles,
		"iat":   time.Now().Unix(),
		"exp":   time.Now().Add(time.Minute * 15).Unix(),
	}

	kid := cfg.generateKid(user)

	// Create a new token object using EdDSA (Ed25519)
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)

	// Sign the token using the private key
	tokenString, err := token.SignedString(cfg.AuthService.PrivateKeys[kid])
	if err != nil {
		fmt.Println("Error signing token:", err)
		return "", err
	}

	return tokenString, nil
}

// func (cfg *JwtConfig) VerifyJwt(tokenString string) {
// 	// Now simulate verifying the token
// 	parsedToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 		// Use the public key for verification
// 		return cfg.AuthService.PublicKeys[kid], nil
// 	})

// 	if err != nil || !parsedToken.Valid {
// 		fmt.Printf("Token %d %s\n", kid, GetMD5Hash(tokenString))
// 	}
// }

func (cfg *JwtConfig) ExtractClaims(tokenString string) (jwt.MapClaims, error) {
	// Parse the token to extract the `kid` and use it to get the correct key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Extract the `kid` from the header

		fmt.Println()
		fmt.Println(token.Claims)

		s, _ := (token.Claims.(jwt.MapClaims))["sub"]

		uu, _ := uuid.Parse(s.(string))

		fmt.Println(cfg.generateKid(uu))

		kid := 4

		// Get the public key based on the `kid`
		publicKey := cfg.AuthService.PublicKeys[kid]

		// Ensure the signing method is Ed25519
		if _, ok := token.Method.(*jwt.SigningMethodEd25519); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return publicKey, nil
	})
	// Handle parsing errors
	if err != nil {
		return nil, err
	}

	// Extract and return claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("invalid token or claims")
}

func GetMD5Hash(text string) string {
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))
}
