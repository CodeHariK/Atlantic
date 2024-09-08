package authbox

import (
	"context"
)

func (s *JwtConfig) Authenticate(_ context.Context, req Request) (any, error) {
	r, w := req.Request, req.Writer

	cb := ConnectBox{
		R: r,
		W: w,
	}

	if !IsAuthRefresh(r) {
		accessCookie, err := r.Cookie(ConstAccessToken)
		if err == nil {
			accessToken, err := s.VerifyJwe(accessCookie.Value)
			if err := AuthRedirect(r, w, err); err != nil {
				return nil, err
			}
			if err == nil {
				cb.Access = accessToken
				return cb, nil
			}
		}

		if err := AuthRedirect(r, w, err); err != nil {
			return nil, err
		}
	}
	return cb, nil
}
