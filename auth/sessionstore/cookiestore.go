package sessionstore

import (
	"encoding/gob"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
	"github.com/gorilla/sessions"
)

type CookieStore struct {
	*sessions.CookieStore
}

func (store *CookieStore) StoreSessionKey(userID, sessionKey string) error {
	return nil
}

func (store *CookieStore) GetSessionsForUser(userID string) ([]string, error) {
	return nil, nil
}

func (store *CookieStore) Close() error {
	return nil
}

func CreateCookieStore(cfg config.Config) *SessionStore {
	store := sessions.NewCookieStore(
		[]byte(cfg.Session.AuthKey), []byte(cfg.Session.EncryptionKey),
	)
	// store := sessions.NewCookieStore(
	// 	securecookie.GenerateRandomKey(32),
	// 	securecookie.GenerateRandomKey(32),
	// )

	store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   cfg.Session.MaxAge,
		HttpOnly: cfg.Session.HttpOnly,
		Secure:   cfg.Session.Secure,
		// SameSite: http.SameSiteLaxMode,
	}

	gob.Register(types.AuthUser{})

	return &SessionStore{
		&CookieStore{store},
	}
}
