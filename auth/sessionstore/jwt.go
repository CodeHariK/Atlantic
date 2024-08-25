package sessionstore

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
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

func (cfg *JwtConfig) GenerateKid(sub uuid.UUID) int {
	var sum int
	for _, b := range sub {
		sum += int(b)
	}
	return sum % cfg.AuthService.KeyMod
}

func (cfg *JwtConfig) GenerateKid2(obj *jwt.MapClaims) int {
	b, _ := json.Marshal(obj)

	var sum int
	for _, b := range b {
		sum += int(b)
	}
	return sum % cfg.AuthService.KeyMod
}

type JwtConfig struct {
	*config.Config
}

type JwtObj struct {
	User  uuid.UUID
	Name  string
	Roles []string
	Iat   time.Time
	Exp   time.Time
}

func (cfg *JwtConfig) CreateJwt(jwtobj *JwtObj) (string, *jwt.MapClaims, error) {
	claims := jwt.MapClaims{
		"sub":   jwtobj.User.String(),
		"name":  jwtobj.Name,
		"roles": jwtobj.Roles,
		"iat":   time.Now().Unix(),
		"exp":   time.Now().Add(time.Minute * 15).Unix(),
	}

	// kid := cfg.GenerateKid(jwtobj.User)
	kid := cfg.GenerateKid2(&claims)

	// Create a new token object using EdDSA (Ed25519)
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)

	// Sign the token using the private key
	tokenString, err := token.SignedString(cfg.AuthService.PrivateKeys[kid])
	if err != nil {
		fmt.Println("Error signing token:", err)
		return "", nil, err
	}

	return tokenString, &claims, nil
}

func (cfg *JwtConfig) ExtractClaims(tokenString string) (*JwtObj, error) {
	j := &JwtObj{}

	// Parse the token to extract the `kid` and use it to get the correct key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Extract the `kid` from the header

		claims := token.Claims.(jwt.MapClaims)
		sub, ok := claims["sub"].(string)
		if ok {
			j.User, _ = uuid.Parse(sub)
		}

		name, ok := claims["name"].(string)
		if ok {
			j.Name = name
		}

		if exp, ok := claims["exp"].(float64); ok { // Typically JWT exp/iat are float64
			j.Exp = time.Unix(int64(exp), 0)
		}

		if iat, ok := claims["iat"].(float64); ok {
			j.Iat = time.Unix(int64(iat), 0)
		}

		if roles, ok := claims["roles"].([]interface{}); ok {
			j.Roles = make([]string, len(roles))
			for i, role := range roles {
				if r, ok := role.(string); ok {
					j.Roles[i] = r
				}
			}
		}

		// kid := cfg.GenerateKid(j.User)
		kid := cfg.GenerateKid2(&claims)

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
		return nil, fmt.Errorf("Parsing error: %v", err)
	}

	// Extract and return claims
	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid && token.Claims.Valid() == nil {
		return j, nil
	}

	return nil, fmt.Errorf("invalid token or claims")
}

func GetMD5Hash(text string) string {
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))
}
