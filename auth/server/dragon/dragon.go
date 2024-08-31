package dragon

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/sessionstore"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/colorlogger"

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

func (d *Dragon) GetDragonUser(userID string) (*v1.AuthUser, error) {
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

func (d *Dragon) SaveUser(u *v1.AuthUser) error {
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

func (d *Dragon) DragonSessionCheck(r *http.Request, cfg *config.Config) (*v1.AuthUser, int, error) {
	for _, c := range r.Cookies() {
		if c.Name == "session-id" {
			v, err := sessionstore.ChaDecrypt(cfg, c.Value)
			if err != nil {
				return nil, -1, err
			}

			s := v1.CookieSession{}
			json.Unmarshal([]byte(v), &s)
			colorlogger.Log(&s)

			user, err := d.GetDragonUser(s.ID)
			if err != nil {
				return nil, -1, errors.New("User Not Found")
			}
			colorlogger.Log(user)

			for i, session := range user.Sessions {
				b, _ := json.Marshal(v1.CookieSession{
					ID:  user.ID,
					Exp: session.Exp,
					Iat: session.Iat,
				})
				bs, _ := json.Marshal(&s)

				if bytes.Equal(b, bs) {
					return user, i, nil
				}
			}
		}
	}
	return nil, -1, errors.New("User Not Found")
}
