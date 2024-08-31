package authbox

import (
	"encoding/json"
	"net/http"
	"time"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
)

func SaveSession(r *http.Request, w http.ResponseWriter, cfg *config.Config, session *v1.CookieSession) (string, error) {
	sessionByte, err := json.Marshal(session)
	if err != nil {
		return "", err
	}

	hash, err := sessionstore.ChaEncrypt(cfg, string(sessionByte))
	if err != nil {
		return "", err
	}

	sessionCookie := http.Cookie{
		Name:     "session-id",
		Value:    hash,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		Expires:  time.Unix(session.Exp, 0),
	}
	http.SetCookie(w, &sessionCookie)

	return hash, nil
}

func RevokeSession(w http.ResponseWriter) {
	sessionCookie := http.Cookie{
		Name:     "session-id",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		MaxAge:   -1,
	}
	http.SetCookie(w, &sessionCookie)
}
