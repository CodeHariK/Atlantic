package authbox

import (
	"net/http"
	"strconv"
	"time"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/service/colorlogger"
)

func SaveSession(r *http.Request, w http.ResponseWriter, cfg *JwtConfig,
	session *v1.JwtObj, accessToken *v1.JwtObj,
) (string, string, error) {
	colorlogger.Log("Save Session")

	sessionJwt, _, err := cfg.CreateJwtToken(session)
	if err != nil {
		return "", "", err
	}

	sessionHash, err := ChaEncrypt(cfg.Config, sessionJwt)
	if err != nil {
		return "", "", err
	}

	accessJwt, _, err := cfg.CreateJwtToken(accessToken)
	if err != nil {
		return "", "", err
	}

	accessHash, err := ChaEncrypt(cfg.Config, accessJwt)
	if err != nil {
		return "", "", err
	}

	colorlogger.Log("Save Session Set cookie")

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

	return sessionHash, accessJwt, nil
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
