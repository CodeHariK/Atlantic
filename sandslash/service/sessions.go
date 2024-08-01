package service

import (
	"encoding/gob"
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/sandslash/types"

	"github.com/gorilla/sessions"
)

type User struct {
	ID         string  `json:"id"`
	Username   string  `json:"username"`
	Avatar     *string `json:"avatar"`
	GlobalName string  `json:"global_name"`
	Locale     string  `json:"locale"`
	Email      string  `json:"email"`
	Verified   bool    `json:"verified"`
}

func CreateSessionStore(cfg Config) *sessions.CookieStore {
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

	gob.Register(types.User{})

	return store
}

const (
	SandSlashSession = "session-name"
	SandSlashUser    = "user"
)

func GetUser(r *http.Request) (types.User, error) {
	session, err := SessionStore.Get(r, SandSlashSession)
	if err != nil {
		fmt.Println(fmt.Sprintf("GetUserError : %v", err))
		return types.User{}, nil
	}
	user, ok := (session.Values[SandSlashUser]).(types.User)
	if !ok {
		return types.User{}, fmt.Errorf("User not found")
	}
	return user, nil
}

func SaveUserSession(r *http.Request, w http.ResponseWriter, user types.User) error {
	session, _ := SessionStore.Get(r, SandSlashSession)
	session.Values[SandSlashUser] = user
	return session.Save(r, w)
}
