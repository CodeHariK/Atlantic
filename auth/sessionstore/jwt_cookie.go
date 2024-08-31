package sessionstore

// import (
// 	"context"
// 	"errors"
// 	"fmt"
// 	"net/http"
// 	"time"

// 	"github.com/codeharik/Atlantic/auth/types"
// 	"github.com/codeharik/Atlantic/config"
// 	"github.com/codeharik/Atlantic/database/store/user"
// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5/pgtype"
// 	dragon "github.com/redis/go-redis/v9"
// )

// type JwtAuthHandler struct {
// 	*JwtConfig
// 	userStore *user.Queries
// 	dragon    *dragon.Client
// }

// func CreateJwtAuthRoutes(
// 	router *http.ServeMux,
// 	config *config.Config,
// 	userstore *user.Queries,
// ) *JwtAuthHandler {
// 	dragonURI := config.DragonConnectionUri()

// 	options, err := dragon.ParseURL(dragonURI)
// 	if err != nil {
// 		panic(err)
// 	}

// 	dragonClient := dragon.NewClient(options)

// 	authHandler := &JwtAuthHandler{
// 		JwtConfig: &JwtConfig{Config: config},
// 		userStore: userstore,
// 		dragon:    dragonClient,
// 	}

// 	// router.HandleFunc("/login", authHandler.HandleLogin)
// 	router.HandleFunc("/auth/refresh", authHandler.JwtRefresh)
// 	router.HandleFunc("/jwtemaillogin", authHandler.JwtEmailLoginHandler)
// 	router.HandleFunc("/jwtemailpage", authHandler.JwtEmailLoginPageHandler)
// 	// router.HandleFunc("/grpcemailpage", authHandler.GrpcEmailLoginPageHandler)
// 	// router.HandleFunc("/logout", authHandler.Logout)
// 	// router.HandleFunc("/getAllSessionsForUser", authHandler.GetAllSessionsForUser)
// 	// router.HandleFunc("/invalidateAllSessionsForUser", authHandler.InvalidateAllSessionsForUser)
// 	// router.HandleFunc("/auth/discord/callback", authHandler.HandleCallback)

// 	return authHandler
// }

// func (auth *JwtAuthHandler) Save(r *http.Request, w http.ResponseWriter, u *types.AuthUser) error {
// 	accessToken, _, _ := auth.CreateJwtToken(
// 		&JwtObj{
// 			User: u.ID,
// 		}, time.Minute*15)

// 	refreshToken, _, _ := auth.CreateJwtToken(
// 		&JwtObj{
// 			User: u.ID,
// 		}, 7*24*time.Hour)

// 	err := auth.DragonSaveSession(u, refreshToken)
// 	if err != nil {
// 		return err
// 	}

// 	// Define access token cookie
// 	accessCookie := http.Cookie{
// 		Name:     "access_token",
// 		Value:    accessToken,
// 		Path:     "/",
// 		HttpOnly: true,
// 		Secure:   false,                            // Set to true in production when using HTTPS
// 		Expires:  time.Now().Add(15 * time.Minute), // Access token expires in 15 minutes
// 	}

// 	// Define refresh token cookie
// 	refreshCookie := http.Cookie{
// 		Name:     "refresh_token",
// 		Value:    GetMD5Hash(refreshToken),
// 		Path:     "/auth/refresh", // Set specific path for the refresh token
// 		HttpOnly: true,
// 		Secure:   false,                              // Set to true in production when using HTTPS
// 		Expires:  time.Now().Add(7 * 24 * time.Hour), // Refresh token expires in 7 days
// 	}

// 	// Set cookies in the response
// 	http.SetCookie(w, &accessCookie)
// 	http.SetCookie(w, &refreshCookie)

// 	return nil
// }

// func (auth *JwtAuthHandler) DragonSaveSession(u *types.AuthUser, refreshToken string) error {
// 	sessionKeySet := fmt.Sprintf("user:%s:sessions", u.ID)
// 	err := auth.dragon.SAdd(context.Background(), sessionKeySet, refreshToken).Err()
// 	if err != nil {
// 		return err
// 	}
// 	// Set expiration time for the session key set
// 	expiration := 7 * 24 * time.Hour // Set expiration for 7 days (adjust as needed)
// 	err = auth.dragon.Expire(context.Background(), sessionKeySet, expiration).Err()
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }

// // GetAllSessionsForUser retrieves all session IDs for a given user
// func (auth *JwtAuthHandler) GetAllSessionsForUser(userID uuid.UUID) ([]string, error) {
// 	// Define the key for storing user sessions
// 	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

// 	sessions, err := auth.dragon.SMembers(context.Background(), sessionKeySet).Result()
// 	if err != nil {
// 		return nil, fmt.Errorf("could not get sessions from Dragonstore: %v", err)
// 	}

// 	return sessions, nil
// }

// // InvalidateAllSessionsForUser removes all session IDs for a given user
// func (auth *JwtAuthHandler) InvalidateAllSessionsForUser(userID uuid.UUID) error {
// 	// Define the key for storing user sessions
// 	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

// 	// Remove the Redis set
// 	_, err := auth.dragon.Del(context.Background(), sessionKeySet).Result()
// 	if err != nil {
// 		return fmt.Errorf("could not delete sessions from Redis: %v", err)
// 	}

// 	return nil
// }

// func (auth *JwtAuthHandler) GetTokensFromCookies(r *http.Request) (accessToken, refreshToken string, err error) {
// 	// Retrieve the access token cookie
// 	accessCookie, err := r.Cookie("access_token")
// 	if err != nil {
// 		if err == http.ErrNoCookie {
// 			return "", "", errors.New("access token not found")
// 		}
// 		return "", "", err
// 	}

// 	// Retrieve the refresh token cookie
// 	refreshCookie, err := r.Cookie("refresh_token")
// 	if err != nil {
// 		if err == http.ErrNoCookie {
// 			return accessCookie.Value, "", errors.New("refresh token not found")
// 		}
// 		return accessCookie.Value, "", err
// 	}

// 	// Check paths
// 	if accessCookie.Path != "/" {
// 		return "", "", errors.New("invalid path for access token")
// 	}
// 	if refreshCookie.Path != "/auth/refresh" {
// 		return accessCookie.Value, "", errors.New("invalid path for refresh token")
// 	}

// 	// Return the token values
// 	return accessCookie.Value, refreshCookie.Value, nil
// }

// func (auth *JwtAuthHandler) JwtEmailLoginPageHandler(w http.ResponseWriter, r *http.Request) {
// 	// Set the correct content type for the response
// 	w.Header().Set("Content-Type", "text/html")

// 	// Write the HTML content directly as a string
// 	w.Write([]byte(`
// 			<!DOCTYPE html>
// 			<html lang="en">
// 			<head>
// 				<meta charset="UTF-8">
// 				<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 				<title>Email Login</title>
// 			</head>
// 			<body>
// 				<h2>Login</h2>
// 				<form action="/jwtemaillogin" method="POST">
// 					<label for="email">Email:</label>
// 					<input type="email" id="email" name="email" required>
// 					<br><br>
// 					<label for="password">Password:</label>
// 					<input type="password" id="password" name="password" required>
// 					<br><br>
// 					<button type="submit">Login</button>
// 				</form>
// 			</body>
// 			</html>
// 			`))
// }

// func (auth *JwtAuthHandler) JwtEmailLoginHandler(w http.ResponseWriter, r *http.Request) {
// 	email := r.FormValue("email")
// 	password := r.FormValue("password")

// 	// Fetch user by email
// 	user, err := auth.userStore.GetAuthUserByEmail(
// 		context.Background(),
// 		pgtype.Text{String: email, Valid: true})
// 	if err != nil || !user.Email.Valid || !user.PasswordHash.Valid {
// 		http.Error(w, "Invalid Email or password", http.StatusUnauthorized)
// 		return
// 	}

// 	// Verify password
// 	if err := CheckPassword(user.PasswordHash.String, password); err != nil {
// 		http.Error(w, "Invalid Email or password", http.StatusUnauthorized)
// 		return
// 	}

// 	u := types.AuthUser{
// 		ID:    user.ID,
// 		Email: user.Email.String,
// 	}

// 	auth.Save(r, w, &u)

// 	http.Redirect(w, r, "/jwtprofile", http.StatusSeeOther)
// }

// func (auth *JwtAuthHandler) JwtRefresh(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "text/html")
// 	fmt.Fprintf(w, "User Info:\nID: %s\nUsername: %s\nEmail: %s", "user.ID", "user.Username", "user.Email")
// }
