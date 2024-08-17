package store

import (
	"encoding/gob"
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
)

func CreateSessionStore(cfg config.Config) *sessions.CookieStore {
	store := sessions.NewCookieStore(
		[]byte(cfg.Session.AuthKey), []byte(cfg.Session.EncryptionKey),
	)

	store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   cfg.Session.MaxAge,
		HttpOnly: cfg.Session.HttpOnly,
		Secure:   cfg.Session.Secure,
		// SameSite: http.SameSiteLaxMode,
	}

	gob.Register(types.AuthUser{})

	return store
}

const (
	AuthSession = "session-name"
	AuthUser    = "user"
)

func GetUser(r *http.Request) (types.AuthUser, error) {
	session, err := config.SessionStore.Get(r, AuthSession)
	if err != nil {
		fmt.Println(fmt.Sprintf("GetUserError : %v", err))
		return types.AuthUser{}, nil
	}
	user, ok := (session.Values[AuthUser]).(types.AuthUser)
	if !ok {
		return types.AuthUser{}, fmt.Errorf("User not found")
	}
	return user, nil
}

func SaveUserSession(r *http.Request, w http.ResponseWriter, user types.AuthUser) error {
	session, _ := config.SessionStore.Get(r, AuthSession)
	session.Values[AuthUser] = user
	return session.Save(r, w)
}
