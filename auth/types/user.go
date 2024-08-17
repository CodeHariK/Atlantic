package types

type AuthUser struct {
	ID       string  `json:"id"`
	Username string  `json:"username"`
	Avatar   *string `json:"avatar"`
	Email    string  `json:"email"`
	Verified bool    `json:"verified"`
}
