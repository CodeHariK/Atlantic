package sessionstore

import (
	"encoding/gob"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
)

type CookieStore struct {
	*sessions.CookieStore
}

func (store *CookieStore) StoreSessionKey(userID, sessionKey string) error {
	return nil
}

func (store *CookieStore) GetAllSessionsForUser(userID string) ([]string, error) {
	return nil, nil
}

func (store *CookieStore) InvalidateAllSessionsForUser(userID string) error {
	return nil
}

func (store *CookieStore) Close() error {
	return nil
}

func CreateCookieSessionStore(cfg config.Config) *SessionStore {
	// store := sessions.NewCookieStore(
	// 	[]byte(cfg.Session.AuthKey), []byte(cfg.Session.EncryptionKey),
	// )
	store := sessions.NewCookieStore(
		securecookie.GenerateRandomKey(32),
		securecookie.GenerateRandomKey(32),
	)

	store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   900,
		HttpOnly: true,
		Secure:   false,
		// SameSite: http.SameSiteLaxMode,
	}

	gob.Register(types.AuthUser{})

	return &SessionStore{
		&CookieStore{store},
	}
}
