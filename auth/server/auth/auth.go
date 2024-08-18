package AuthHandler

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/types"
)

type AuthHandler struct {
	*sessionstore.SessionStore
}

func CreateAuthRoutes(
	router *http.ServeMux,
	store *sessionstore.SessionStore,
) *AuthHandler {
	authHandler := &AuthHandler{
		store,
	}

	router.HandleFunc("/login", authHandler.HandleLogin)
	router.HandleFunc("/logout", authHandler.Logout)
	router.HandleFunc("/getSessionsForUser", authHandler.GetSessionsForUser)
	router.HandleFunc("/auth/discord/callback", authHandler.HandleCallback)

	return authHandler
}

func (authHandler *AuthHandler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	_, err := authHandler.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	url := types.DiscordOauthConfig.AuthCodeURL(types.OauthStateString)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// func (authHandler *AuthHandler) RefreshTokenIfNeeded(token *oauth2.Token) (*oauth2.Token, error) {
// 	if token.Expiry.Before(time.Now()) {
// 		tokenSource := types.DiscordOauthConfig.TokenSource(context.Background(), token)
// 		newToken, err := tokenSource.Token()
// 		if err != nil {
// 			return nil, err
// 		}
// 		return newToken, nil
// 	}
// 	return token, nil
// }

func (authHandler *AuthHandler) HandleCallback(w http.ResponseWriter, r *http.Request) {
	token, err := types.DiscordOauthConfig.Exchange(context.Background(), r.FormValue("code"))
	if err != nil {
		log.Println("Code exchange failed: ", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	fmt.Printf("acc : %s\nref : %s\nta : %s\nexp : %s\nvalid : %v\n",
		token.AccessToken,
		token.RefreshToken,
		time.Now().Add(time.Second*60*60*24*30),
		token.Expiry,
		token.Valid(),
	)

	client := types.DiscordOauthConfig.Client(context.Background(), token)
	response, err := client.Get("https://discord.com/api/users/@me")
	if err != nil {
		log.Println("Failed to get user info: ", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	defer response.Body.Close()

	var user types.AuthUser
	if err := json.NewDecoder(response.Body).Decode(&user); err != nil {
		log.Println("Failed to decode user info: ", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	err = authHandler.SaveUserSession(r, w, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/profile", http.StatusFound)
}

func (authHandler *AuthHandler) GetSessionsForUser(w http.ResponseWriter, r *http.Request) {
	user, err := authHandler.GetUser(r)
	if err != nil {
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	sessions, err := authHandler.SessionStore.GetSessionsForUser(user.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	sessionsJSON, err := json.Marshal(sessions)
	if err != nil {
		http.Error(w, "Failed to marshal sessions to JSON", http.StatusInternalServerError)
		return
	}
	w.Write(sessionsJSON)
}

func (authHandler *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	err := authHandler.RevokeSession(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func (authHandler *AuthHandler) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := authHandler.GetUser(r)
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return
		}

		ctx := sessionstore.SetContextWithUser(r, user)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
