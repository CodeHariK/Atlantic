package dragon

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	v1 "github.com/codeharik/Atlantic/auth/api/v1"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/google/uuid"

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

	return Dragon{
		dragonClient,
	}
}

func (d *Dragon) GetDragonUser(r *http.Request, w http.ResponseWriter, userID string) (*v1.AuthUser, error) {
	sessionKey := fmt.Sprintf("user:%s", userID)

	// Retrieve JSON string from Redis
	sessionByte, err := d.Get(context.Background(), sessionKey).Result()
	if err != nil {
		return nil, err
	}

	var user v1.AuthUser
	// Deserialize the JSON string into the struct
	err = json.Unmarshal([]byte(sessionByte), &user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (d *Dragon) SaveUser(r *http.Request, w http.ResponseWriter, u *v1.AuthUser) error {
	// Serialize the struct to JSON
	sessionByte, err := json.Marshal(u)
	if err != nil {
		return err
	}

	sessionKey := fmt.Sprintf("user:%s", u.ID)

	// Store JSON string in Redis
	err = d.Set(context.Background(), sessionKey, sessionByte, 0).Err()
	if err != nil {
		return err
	}

	return nil
}

func (d *Dragon) DragonSessionCheck(r *http.Request, w http.ResponseWriter, cfg *config.Config) (*v1.AuthUser, int, error) {
	for _, c := range r.Cookies() {
		if c.Name == "session-id" {
			v, err := sessionstore.ChaDecrypt(cfg, c.Value)
			if err != nil {
				return nil, -1, err
			}

			s := v1.Session{}
			json.Unmarshal([]byte(v), &s)
			colorlogger.Log(&s)

			user, err := d.GetDragonUser(r, w, s.ID)
			if err != nil {
				return nil, -1, errors.New("User Not Found")
			}
			colorlogger.Log(user)

			for i, session := range user.Sessions {
				b, _ := json.Marshal(session)
				bs, _ := json.Marshal(&s)

				if bytes.Equal(b, bs) {
					return user, i, nil
				}
			}
		}
	}
	return nil, -1, errors.New("User Not Found")
}

// GetAllSessionsForUser retrieves all session IDs for a given user
func (d *Dragon) GetAllSessionsForUser(userID uuid.UUID) ([]string, error) {
	// Define the key for storing user sessions
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

	sessions, err := d.SMembers(context.Background(), sessionKeySet).Result()
	if err != nil {
		return nil, fmt.Errorf("could not get sessions from Dragonstore: %v", err)
	}

	return sessions, nil
}

// InvalidateAllSessionsForUser removes all session IDs for a given user
func (d *Dragon) InvalidateAllSessionsForUser(userID uuid.UUID) error {
	// Define the key for storing user sessions
	sessionKeySet := fmt.Sprintf("user:%s:sessions", userID)

	// Remove the Redis set
	_, err := d.Del(context.Background(), sessionKeySet).Result()
	if err != nil {
		return fmt.Errorf("could not delete sessions from Redis: %v", err)
	}

	return nil
}
