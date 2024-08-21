package AuthHandler

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/otel"

	auth_v1connect "github.com/codeharik/Atlantic/auth/api/v1/v1connect"
)

const name = "Atlantic/Auth"

var (
	tracer = otel.Tracer(name)
	meter  = otel.Meter(name)
	logger = otelslog.NewLogger(name)
)

type AuthHandler struct {
	userStore   *user.Queries
	dragonstore *sessionstore.DragonSessionStore
	cookiestore *sessionstore.CookieSessionStore
}

func CreateAuthRoutes(
	router *http.ServeMux,
	dragonstore *sessionstore.DragonSessionStore,
	cookiestore *sessionstore.CookieSessionStore,
	userstore *user.Queries,
) *AuthHandler {
	authHandler := &AuthHandler{
		userStore:   userstore,
		dragonstore: dragonstore,
		cookiestore: cookiestore,
	}

	router.HandleFunc("/login", authHandler.HandleLogin)
	router.HandleFunc("/emaillogin", authHandler.EmailLoginHandler)
	router.HandleFunc("/emailpage", authHandler.EmailLoginPageHandler)
	router.HandleFunc("/grpcemailpage", authHandler.GrpcEmailLoginPageHandler)
	router.HandleFunc("/logout", authHandler.Logout)
	router.HandleFunc("/getAllSessionsForUser", authHandler.GetAllSessionsForUser)
	router.HandleFunc("/invalidateAllSessionsForUser", authHandler.InvalidateAllSessionsForUser)
	router.HandleFunc("/auth/discord/callback", authHandler.HandleCallback)

	return authHandler
}

func (authHandler *AuthHandler) GrpcEmailLoginPageHandler(w http.ResponseWriter, r *http.Request) {
	// Set the correct content type for the response
	w.Header().Set("Content-Type", "text/html")

	fmt.Println(auth_v1connect.AuthServiceEmailLoginProcedure)

	// ///////
	// ///////
	// ///////
	_, err := authHandler.cookiestore.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	/////////
	/////////
	/////////
	/////////

	// Write the HTML content directly as a string
	w.Write([]byte(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Login</title>
</head>
<body>
    <h2>GrpcEmailLogin</h2>
    <form id="login-form">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Login</button>
    </form>

    <script>
        document.getElementById('login-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/auth.v1.AuthService/EmailLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
				if (response.redirected) {
					window.location.href = response.url;
				}
				return response.json()
			})
            .then(data => {
                // Handle the response, e.g., display a success message or redirect
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    </script>
</body>
</html>
`))
}

func (authHandler *AuthHandler) EmailLoginPageHandler(w http.ResponseWriter, r *http.Request) {
	// Set the correct content type for the response
	w.Header().Set("Content-Type", "text/html")

	// Write the HTML content directly as a string
	w.Write([]byte(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Email Login</title>
			</head>
			<body>
				<h2>Login</h2>
				<form action="/emaillogin" method="POST">
					<label for="email">Email:</label>
					<input type="email" id="email" name="email" required>
					<br><br>
					<label for="password">Password:</label>
					<input type="password" id="password" name="password" required>
					<br><br>
					<button type="submit">Login</button>
				</form>
			</body>
			</html>
			`))
}

func (authHandler *AuthHandler) EmailLoginHandler(w http.ResponseWriter, r *http.Request) {
	_, err := authHandler.cookiestore.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	_, err = authHandler.dragonstore.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	// Fetch user by email
	user, err := authHandler.userStore.GetAuthUserByEmail(
		context.Background(),
		pgtype.Text{String: email, Valid: true})
	if err != nil || !user.Email.Valid || !user.PasswordHash.Valid {
		http.Error(w, "Invalid Email or password", http.StatusUnauthorized)
		return
	}

	// Verify password
	if err := sessionstore.CheckPassword(user.PasswordHash.String, password); err != nil {
		http.Error(w, "Invalid Email or password", http.StatusUnauthorized)
		return
	}

	u := types.AuthUser{
		ID:    user.ID,
		Email: user.Email.String,
	}

	err = authHandler.cookiestore.SaveUserSession(r, w, u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = authHandler.dragonstore.SaveUserSession(r, w, u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/profile", http.StatusSeeOther)
}

func (authHandler *AuthHandler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	_, err := authHandler.cookiestore.GetUser(r)
	if err == nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	_, err = authHandler.dragonstore.GetUser(r)
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

	client := types.DiscordOauthConfig.Client(context.Background(), token)
	response, err := client.Get("https://discord.com/api/users/@me")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to get user info: %v", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	defer response.Body.Close()

	var discorduser types.DiscordUser
	if err := json.NewDecoder(response.Body).Decode(&discorduser); err != nil {
		log.Println("Failed to decode user info: ", err)
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	u, err := authHandler.userStore.GetAuthUserByEmail(
		context.Background(),
		pgtype.Text{String: discorduser.Email, Valid: true})

	uid := u.ID

	if err != nil {
		uid, err = uuid.NewV7()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		_, err := authHandler.userStore.CreateUser(context.Background(), user.CreateUserParams{
			ID:       uid,
			Username: discorduser.Username,
			Email:    pgtype.Text{String: discorduser.Email, Valid: true},
			IsAdmin:  false,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	user := types.AuthUser{
		ID:       uid,
		Username: discorduser.Username,
		Avatar:   discorduser.Avatar,
		Email:    discorduser.Email,
		Verified: discorduser.Verified,
	}

	err = authHandler.dragonstore.SaveUserSession(r, w, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = authHandler.cookiestore.SaveUserSession(r, w, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/profile", http.StatusSeeOther)
}

func (authHandler *AuthHandler) GetAllSessionsForUser(w http.ResponseWriter, r *http.Request) {
	user, err := authHandler.dragonstore.GetUser(r)
	if err != nil {
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	sessions, err := authHandler.dragonstore.GetAllSessionsForUser(user.ID)
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

// InvalidateAllSessionsForUser invalidates all sessions for the user
func (authHandler *AuthHandler) InvalidateAllSessionsForUser(w http.ResponseWriter, r *http.Request) {
	user, err := authHandler.dragonstore.GetUser(r)
	if err != nil {
		http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
		return
	}

	err = authHandler.dragonstore.InvalidateAllSessionsForUser(user.ID)
	if err != nil {
		http.Error(w, "Failed to invalidate sessions: "+err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}

func (authHandler *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	_ = authHandler.dragonstore.RevokeSession(w, r)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	_ = authHandler.cookiestore.RevokeSession(w, r)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	http.Redirect(w, r, "/", http.StatusFound)
}

func (authHandler *AuthHandler) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := authHandler.cookiestore.GetUser(r)
		if err != nil {
			user, err = authHandler.dragonstore.GetUser(r)
			if err != nil {
				http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
				return
			}
			err := authHandler.cookiestore.SaveUserSession(r, w, user)
			if err != nil {
				http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
				return
			}
		}

		ctx := sessionstore.SetContextWithUser(r, user)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
