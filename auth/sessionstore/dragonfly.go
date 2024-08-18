package sessionstore

import (
	"context"
	"encoding/gob"
	"fmt"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
	"github.com/gorilla/sessions"

	dragonstore "github.com/rbcervilla/redisstore/v9"
	dragon "github.com/redis/go-redis/v9"
)

type DragonStore struct {
	*dragon.Client
	*dragonstore.RedisStore
}

func (store *DragonStore) StoreSessionKey(userID, sessionKey string) error {
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)
	err := store.SAdd(context.Background(), sessionKeySet, sessionKey).Err()
	if err != nil {
		return err
	}
	return nil
}

// GetSessionsForUser retrieves all session IDs for a given user
func (store *DragonStore) GetSessionsForUser(userID string) ([]string, error) {
	// Define the key for storing user sessions
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

	sessions, err := store.SMembers(context.Background(), sessionKeySet).Result()
	if err != nil {
		return nil, fmt.Errorf("could not get sessions from DragonFly: %v", err)
	}

	return sessions, nil
}

func CreateDragonflySessionStore(cfg config.Config) (*SessionStore, error) {
	config := config.LoadConfig("config.json", "../config/config.json")

	dragonflyURI := config.DragonflyConnectionUri()

	options, err := dragon.ParseURL(dragonflyURI)
	if err != nil {
		panic(err)
	}

	dragonClient := dragon.NewClient(options)

	dragonSessionStore, err := dragonstore.NewRedisStore(
		context.Background(),
		dragonClient,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create dragonfly store: %v", err)
	}

	fmt.Println("Initialized DragonFly")

	// dragonSessionStore.KeyGen(func() (string, error) {
	// 	return "", nil
	// })

	dragonSessionStore.Options(sessions.Options{
		Path:     "/",
		MaxAge:   cfg.Session.MaxAge,
		HttpOnly: cfg.Session.HttpOnly,
		Secure:   cfg.Session.Secure,
		// SameSite: http.SameSiteLaxMode,
	})

	gob.Register(types.AuthUser{})

	return &SessionStore{
		&DragonStore{
			dragonClient,
			dragonSessionStore,
		},
	}, nil
}
