package authbox

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/sessionstore"
)

func SaveSession(r *http.Request, w http.ResponseWriter, cfg *sessionstore.JwtConfig,
	session *v1.CookieSession, accessToken *v1.AccessToken,
) (string, string, error) {
	sessionByte, err := json.Marshal(session)
	if err != nil {
		return "", "", err
	}

	sessionHash, err := sessionstore.ChaEncrypt(cfg.Config, string(sessionByte))
	if err != nil {
		return "", "", err
	}

	accessByte, err := json.Marshal(accessToken)
	if err != nil {
		return "", "", err
	}
	_, _, err = cfg.CreateJwtToken(accessToken)
	if err != nil {
		return "", "", err
	}

	accessHash, err := sessionstore.ChaEncrypt(cfg.Config, string(accessByte))
	if err != nil {
		return "", "", err
	}

	sessionCookie := http.Cookie{
		Name:     "session-id",
		Value:    sessionHash,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		Expires:  time.Unix(session.Exp, 0),
	}
	http.SetCookie(w, &sessionCookie)

	accessCookie := http.Cookie{
		Name:     "access-token",
		Value:    accessHash,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		Expires:  time.Unix(accessToken.Exp, 0),
	}
	http.SetCookie(w, &accessCookie)

	return sessionHash, string(accessByte), nil
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

	accessCookie := http.Cookie{
		Name:     "access-token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		MaxAge:   -1,
	}
	http.SetCookie(w, &accessCookie)
}

func RoleFromString(role string) (int64, error) {
	return strconv.ParseInt(role, 10, 64)
}
