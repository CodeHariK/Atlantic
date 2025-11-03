package dragon

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/authbox"

	dragon "github.com/redis/go-redis/v9"
)

type Dragon struct {
	*dragon.Client
}

func CreateDragon(
	config *config.Config,
) Dragon {
	dragonURI := config.DragonConnectionUri()

	options, err := dragon.ParseURL(dragonURI)
	if err != nil {
		panic(err)
	}

	dragonClient := dragon.NewClient(options)
	maxRetries := 5
	retryDelay := time.Second * 2

	for retries := 0; retries < maxRetries; retries++ {
		status := dragonClient.Ping(context.Background())
		if status.Err() == nil {
			fmt.Println("Successfully connected to Dragon")
			return Dragon{
				dragonClient,
			}
		}

		fmt.Printf("Failed to connect to Dragon: %v. Retrying in %v...\n", status.Err(), retryDelay)
		time.Sleep(retryDelay)
	}

	panic(errors.New("Cannot connect to dragon"))
}

func (d *Dragon) GetDragonUser(obj *v1.JwtObj) (*v1.AuthUser, int, error) {
	sessionKey := fmt.Sprintf("user:%s", obj.ID)

	// Retrieve JSON string from Redis
	sessionByte, err := d.Get(context.Background(), sessionKey).Result()
	if err != nil {
		return nil, -1, err
	}

	var user v1.AuthUser
	// Deserialize the JSON string into the struct
	err = json.Unmarshal([]byte(sessionByte), &user)
	if err != nil {
		return nil, -1, err
	}

	for i, session := range user.Sessions {
		if session.TokenId == obj.TokenId {
			return &user, i, nil
		}
	}

	// On Email Login
	return &user, -1, nil
}

func (d *Dragon) SaveUser(u *v1.AuthUser) error {
	sessionByte, err := json.Marshal(u)
	if err != nil {
		return err
	}

	sessionKey := fmt.Sprintf("user:%s", u.ID)

	err = d.Set(context.Background(), sessionKey, sessionByte, 0).Err()
	if err != nil {
		return err
	}

	return nil
}

func (d *Dragon) GetDragonSessionUser(r *http.Request, cfg *config.Config) (*v1.AuthUser, int, error) {
	sessionCookie, err := r.Cookie(authbox.ConstSessionID)
	if err != nil {
		return nil, -1, errors.New("Cookie Not Found")
	}

	sessionObj, err := authbox.VerifyJwe(
		cfg.AuthService.Encrypt_Key,
		sessionCookie.Value,
		cfg.AuthService.KeyMod,
		cfg.AuthService.SessionKeyPairs,
	)
	if err != nil {
		return nil, -1, errors.New("Invalid cookie")
	}
	return d.GetDragonUser(sessionObj)
}
