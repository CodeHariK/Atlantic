package sessionstore

import (
	"context"
	"encoding/gob"
	"fmt"

	"github.com/codeharik/Atlantic/auth/types"
	"github.com/codeharik/Atlantic/config"
	"github.com/google/uuid"
	"github.com/gorilla/sessions"

	dragonstore "github.com/rbcervilla/redisstore/v9"
	dragon "github.com/redis/go-redis/v9"
)

type DragonSessionStore struct {
	*sessionStore
}

type DragonStore struct {
	*dragon.Client
	*dragonstore.RedisStore
}

func (store *DragonStore) NewSession() *sessions.Session {
	return sessions.NewSession(store.RedisStore, "dragon")
}

func (store *DragonStore) StoreSessionKey(userID uuid.UUID, sessionKey string) error {
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)
	err := store.SAdd(context.Background(), sessionKeySet, sessionKey).Err()
	if err != nil {
		return err
	}
	return nil
}

// GetAllSessionsForUser retrieves all session IDs for a given user
func (store *DragonStore) GetAllSessionsForUser(userID uuid.UUID) ([]string, error) {
	// Define the key for storing user sessions
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

	sessions, err := store.SMembers(context.Background(), sessionKeySet).Result()
	if err != nil {
		return nil, fmt.Errorf("could not get sessions from Dragonstore: %v", err)
	}

	return sessions, nil
}

// InvalidateAllSessionsForUser removes all session IDs for a given user
func (store *DragonStore) InvalidateAllSessionsForUser(userID uuid.UUID) error {
	// Define the key for storing user sessions
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

	// Remove the Redis set
	_, err := store.Del(context.Background(), sessionKeySet).Result()
	if err != nil {
		return fmt.Errorf("could not delete sessions from Redis: %v", err)
	}

	return nil
}

func CreateDragonSessionStore(cfg config.Config) (*DragonSessionStore, error) {
	config := config.LoadConfig("config.json", "../config/config.json")

	dragonURI := config.DragonConnectionUri()

	options, err := dragon.ParseURL(dragonURI)
	if err != nil {
		panic(err)
	}

	dragonClient := dragon.NewClient(options)

	dragonSessionStore, err := dragonstore.NewRedisStore(
		context.Background(),
		dragonClient,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create dragon store: %v", err)
	}

	fmt.Println("Initialized Dragon")

	// dragonSessionStore.KeyGen(func() (string, error) {
	// 	return "", nil
	// })

	dragonSessionStore.Options(sessions.Options{
		Path:     "/",
		MaxAge:   60 * 50,
		HttpOnly: true,
		Secure:   false,
		// SameSite: http.SameSiteLaxMode,
	})

	gob.Register(types.AuthUser{})

	return &DragonSessionStore{
		CreateSessionStore(
			"dragon",
			&DragonStore{
				dragonClient,
				dragonSessionStore,
			},
		),
	}, nil
}
