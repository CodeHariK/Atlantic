package authbox

import (
	"context"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
)

func (s *JwtConfig) Authenticate(_ context.Context, req Request) (any, error) {
	r, w := req.Request, req.Writer

	cb := ConnectBox{
		R: r,
		W: w,
	}

	if !IsAuthRefresh(r) {
		accessCookie, err := r.Cookie("access-token")
		if err == nil {
			accessToken, err := s.VerifyJwe(accessCookie.Value)
			if err := AuthRedirect(r, w, err); err != nil {
				return nil, err
			}
			if err == nil {
				cb.User = &v1.AuthUser{ID: accessToken.ID}
				return cb, nil
			}
		}

		if err := AuthRedirect(r, w, err); err != nil {
			return nil, err
		}
	}
	return cb, nil
}
