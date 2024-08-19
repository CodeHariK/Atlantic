package sessionstore

import (
	"fmt"

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
