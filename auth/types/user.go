package types

import (
	"golang.org/x/oauth2"
)

type AuthUser struct {
	ID       string  `json:"id"`
	Username string  `json:"username"`
	Avatar   *string `json:"avatar"`
	Email    string  `json:"email"`
	Verified bool    `json:"verified"`
}

var (
	DiscordOauthConfig *oauth2.Config
	OauthStateString   = "oauthStateString"
	CSRFkey            = []byte("->DM!(sxXx.Q(XVVZ(kqnF1}BwNXRzZL")
)
