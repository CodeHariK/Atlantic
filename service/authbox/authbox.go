package authbox

import (
	"net/http"
	"time"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
	"github.com/codeharik/Atlantic/config"
)

func SaveSession(r *http.Request, w http.ResponseWriter, cfg *config.Config,
	session *v1.JwtObj, accessToken *v1.JwtObj,
) (string, string, error) {
	sessionJwt, _, err := CreateJwtToken(
		session,
		cfg.AuthService.KeyMod,
		cfg.AuthService.SessionKeyPairs,
	)
	if err != nil {
		return "", "", err
	}

	sessionHash, err := ChaEncrypt(cfg.AuthService.Encrypt_Key, sessionJwt)
	if err != nil {
		return "", "", err
	}

	accessJwt, _, err := CreateJwtToken(
		accessToken,
		cfg.AuthService.KeyMod,
		cfg.AuthService.AccessKeyPairs,
	)
	if err != nil {
		return "", "", err
	}

	accessHash, err := ChaEncrypt(cfg.AuthService.Encrypt_Key, accessJwt)
	if err != nil {
		return "", "", err
	}

	sessionCookie := http.Cookie{
		Name:     ConstSessionID,
		Value:    sessionHash,
		Domain:   cfg.Domain,
		Path:     v1connect.AuthServiceAuthRefreshProcedure,
		HttpOnly: true,
		Secure:   false,
		Expires:  time.Unix(session.Exp, 0),
	}
	http.SetCookie(w, &sessionCookie)

	accessCookie := http.Cookie{
		Name:     ConstAccessToken,
		Value:    accessHash,
		Domain:   cfg.Domain,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		Expires:  time.Unix(accessToken.Exp, 0),
	}
	http.SetCookie(w, &accessCookie)

	return sessionHash, accessJwt, nil
}

func RevokeSession(w http.ResponseWriter, cfg *config.Config) {
	sessionCookie := http.Cookie{
		Name:     ConstSessionID,
		Value:    "",
		Domain:   cfg.Domain,
		Path:     v1connect.AuthServiceAuthRefreshProcedure,
		HttpOnly: true,
		Secure:   false,
		MaxAge:   -1,
	}
	http.SetCookie(w, &sessionCookie)

	accessCookie := http.Cookie{
		Name:     ConstAccessToken,
		Value:    "",
		Domain:   cfg.Domain,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		MaxAge:   -1,
	}
	http.SetCookie(w, &accessCookie)
}
