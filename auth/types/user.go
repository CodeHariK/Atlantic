package types

import (
	"time"

	"github.com/google/uuid"
)

type DiscordUser struct {
	ID       string  `json:"id"`
	Username string  `json:"username"`
	Avatar   *string `json:"avatar"`
	Email    string  `json:"email"`
	Verified bool    `json:"verified"`
}

type AuthUser struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
	Avatar   *string   `json:"avatar"`
	Email    string    `json:"email"`
	Verified bool      `json:"verified"`
	IssuedAt time.Time `json:"iat"`
	ExpireAt time.Time `json:"exp"`
}

var (
	OauthStateString = "oauthStateString"
	CSRFkey          = []byte("->DM!(sxXx.Q(XVVZ(kqnF1}BwNXRzZL")
)
