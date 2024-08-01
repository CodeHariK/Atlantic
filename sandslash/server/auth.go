package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/codeharik/Atlantic/sandslash/service"
	"github.com/codeharik/Atlantic/sandslash/types"

	"golang.org/x/oauth2"
)

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	url := service.DiscordOauthConfig.AuthCodeURL(service.OauthStateString)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func RefreshTokenIfNeeded(token *oauth2.Token) (*oauth2.Token, error) {
	if token.Expiry.Before(time.Now()) {
		tokenSource := service.DiscordOauthConfig.TokenSource(context.Background(), token)
		newToken, err := tokenSource.Token()
		if err != nil {
			return nil, err
		}
		return newToken, nil
	}
	return token, nil
}

func HandleCallback(w http.ResponseWriter, r *http.Request) {
	token, err := service.DiscordOauthConfig.Exchange(context.Background(), r.FormValue("code"))
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

	client := service.DiscordOauthConfig.Client(context.Background(), token)
	response, err := client.Get("https://discord.com/api/users/@me")
	if err != nil {
		log.Println("Failed to get user info: ", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	defer response.Body.Close()

	var user types.User
	if err := json.NewDecoder(response.Body).Decode(&user); err != nil {
		log.Println("Failed to decode user info: ", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	err = service.SaveUserSession(r, w, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/profile", http.StatusFound)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	session, err := service.SessionStore.Get(r, "session-name")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["user"] = types.User{}
	session.Options.MaxAge = -1
	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func AuthStoreMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := service.GetUser(r)
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return
		}

		ctx := context.WithValue(r.Context(), "user", user)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
