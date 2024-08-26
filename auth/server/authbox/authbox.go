package authbox

import (
	"encoding/json"
	"net/http"

	v1 "github.com/codeharik/Atlantic/auth/api/v1"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
)

func SaveSession(r *http.Request, w http.ResponseWriter, cfg *config.Config, session *v1.Session) (string, error) {
	sessionByte, err := json.Marshal(session)
	if err != nil {
		return "", err
	}

	hash, err := sessionstore.ChaEncrypt(cfg, string(sessionByte))
	if err != nil {
		return "", err
	}

	// Define refresh token cookie
	sessionCookie := http.Cookie{
		Name:     "session-id",
		Value:    hash,
		Path:     "/", // Set specific path for the refresh token
		HttpOnly: true,
		Secure:   false,                // Set to true in production when using HTTPS
		Expires:  session.Exp.AsTime(), // Refresh token expires in 7 days
	}

	// Set cookies in the response
	http.SetCookie(w, &sessionCookie)

	return hash, nil
}
