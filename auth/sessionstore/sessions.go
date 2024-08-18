package sessionstore

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/sessions"

	"github.com/codeharik/Atlantic/auth/types"
)

const (
	ConstAuthSession = "session-name"
	ConstAuthUser    = "user"
)

type ISessionStore interface {
	Get(r *http.Request, name string) (*sessions.Session, error)
	StoreSessionKey(userID, sessionKey string) error
	GetAllSessionsForUser(userID string) ([]string, error)
	InvalidateAllSessionsForUser(userID string) error
	Close() error
}

type SessionStore struct {
	ISessionStore
}

// GetSession retrieves a session from the request.
func (sessionStore *SessionStore) getSession(r *http.Request) (*sessions.Session, error) {
	session, err := sessionStore.Get(r, ConstAuthSession)
	if err != nil {
		return nil, fmt.Errorf("failed to get session: %v", err)
	}

	return session, nil
}

func (sessionStore *SessionStore) GetUser(r *http.Request) (types.AuthUser, error) {
	session, err := sessionStore.getSession(r)
	if err != nil {
		return types.AuthUser{}, err
	}

	val, ok := session.Values[ConstAuthUser]
	if !ok {
		return types.AuthUser{}, fmt.Errorf("user not found in session")
	}

	jsonString, ok := val.(string)
	if !ok {
		log.Fatalf("Expected a string but got %T", val)
	}

	var user types.AuthUser
	err = json.Unmarshal([]byte(jsonString), &user)
	if err != nil {
		return types.AuthUser{}, fmt.Errorf("Error unmarshalling JSON: %v", err)
	}

	return user, nil
}

func (sessionStore *SessionStore) SaveUserSession(r *http.Request, w http.ResponseWriter, user types.AuthUser) error {
	session, err := sessionStore.getSession(r)
	if err != nil {
		return err
	}

	marshalUser, err := json.Marshal(user)
	if err != nil {
		return fmt.Errorf("error json marshal %v", err)
	}

	session.Values[ConstAuthUser] = string(marshalUser)
	sessionStore.StoreSessionKey(user.ID, session.ID)
	return session.Save(r, w)
}

// RevokeSession destroys a session by deleting its cookie.
func (sessionStore *SessionStore) RevokeSession(w http.ResponseWriter, r *http.Request) error {
	session, err := sessionStore.getSession(r)
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

func GetUserFromContext(r *http.Request, w http.ResponseWriter) (types.AuthUser, bool) {
	user, ok := r.Context().Value(ConstAuthUser).(types.AuthUser)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return types.AuthUser{}, true
	}
	return user, false
}

func SetContextWithUser(r *http.Request, user types.AuthUser) context.Context {
	ctx := context.WithValue(r.Context(), ConstAuthUser, user)
	return ctx
}
