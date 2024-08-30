package authbox

import (
	"encoding/json"
	"net/http"
	"time"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func SaveSession(r *http.Request, w http.ResponseWriter, cfg *config.Config, session *v1.Session) (string, error) {
	session.Agent = r.UserAgent()
	session.Iat = timestamppb.New(time.Now())
	session.Exp = timestamppb.New(time.Now().Add(time.Hour * 24 * 7))

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
		Expires:  session.Exp.AsTime(),
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
