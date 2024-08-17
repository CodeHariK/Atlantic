package store

import (
	"encoding/gob"
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
)

type SessionHandler struct {
	store *sessions.CookieStore
}

func CreateSessionStore(cfg config.Config) *SessionHandler {
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

	return &SessionHandler{
		store: store,
	}
}

// GetSession retrieves a session from the request.
func (sessionHandler *SessionHandler) GetSession(r *http.Request) (*sessions.Session, error) {
	session, err := sessionHandler.store.Get(r, types.ConstAuthSession)
	if err != nil {
		return nil, fmt.Errorf("failed to get session: %v", err)
	}
	return session, nil
}

func (sessionHandler *SessionHandler) GetUser(r *http.Request) (types.AuthUser, error) {
	session, err := sessionHandler.GetSession(r)
	if err != nil {
		return types.AuthUser{}, err
	}

	// Check if session.Values has the expected key
	val, ok := session.Values[types.ConstAuthUser]
	if !ok {
		return types.AuthUser{}, fmt.Errorf("user not found in session")
	}

	// Type assertion
	user, ok := val.(types.AuthUser)
	if !ok {
		return types.AuthUser{}, fmt.Errorf("failed to assert user type")
	}

	return user, nil
}

func (sessionHandler *SessionHandler) SaveUserSession(r *http.Request, w http.ResponseWriter, user types.AuthUser) error {
	session, _ := sessionHandler.store.Get(r, types.ConstAuthSession)
	session.Values[types.ConstAuthUser] = user
	return session.Save(r, w)
}

// RevokeSession destroys a session by deleting its cookie.
func (sessionHandler *SessionHandler) RevokeSession(w http.ResponseWriter, r *http.Request) error {
	session, err := sessionHandler.GetSession(r)
	if err != nil {
		return fmt.Errorf("failed to get session for revocation: %v", err)
	}

	// Clear the session values
	session.Values = make(map[interface{}]interface{})
	session.Options.MaxAge = -1

	// Save the session with the cleared values
	err = session.Save(r, w)
	if err != nil {
		return fmt.Errorf("failed to save session after revocation: %v", err)
	}

	return nil
}
