package types

type User struct {
	ID         string  `json:"id"`
	Username   string  `json:"username"`
	Avatar     *string `json:"avatar"`
	GlobalName string  `json:"global_name"`
	Locale     string  `json:"locale"`
	Email      string  `json:"email"`
	Verified   bool    `json:"verified"`
}
