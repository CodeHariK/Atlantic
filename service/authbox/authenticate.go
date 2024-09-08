package authbox

import (
	"context"
	"net/http"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/colorlogger"
)

func ConnectShield(config *config.Config) *Middleware {
	j := &JwtConfig{Config: config}

	return NewMiddleware(j.Authenticate)
}

func (s *JwtConfig) Authenticate(_ context.Context, req Request) (any, error) {
	r, w := req.Request, req.Writer

	cb := ConnectBox{
		R: r,
		W: w,
	}

	if !IsAuthRefresh(r) {
		accessCookie, err := r.Cookie(ConstAccessToken)
		if err == nil {
			accessobj, err := s.VerifyJwe(accessCookie.Value)
			if err := AuthRedirect(r, w, err); err != nil {
				return nil, err
			}
			if err == nil {
				cb.AccessObj = accessobj
				return cb, nil
			}
		}

		if err := AuthRedirect(r, w, err); err != nil {
			return nil, err
		}
	}
	return cb, nil
}

func HttpShield(config *config.Config) func(next http.HandlerFunc) http.HandlerFunc {
	j := &JwtConfig{Config: config}
	return j.httpAuthenticate
}

func (s *JwtConfig) httpAuthenticate(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		colorlogger.Log(r.Cookies())

		accessCookie, err := r.Cookie(ConstAccessToken)
		if err == nil {
			_, err := s.VerifyJwe(accessCookie.Value)
			if err := AuthRedirect(r, w, err); err != nil {
				http.Error(w, "Not Authenticated", http.StatusUnauthorized)
				return
			}
		}

		if err := AuthRedirect(r, w, err); err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		next(w, r)
	}
}
