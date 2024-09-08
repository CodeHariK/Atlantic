package authbox

import (
	"context"
	"net/http"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
)

type ConnectBox struct {
	AccessObj *v1.JwtObj
	R         *http.Request
	W         http.ResponseWriter
}

func GetConnectBox(ctx context.Context) (ConnectBox, bool) {
	h, ok := GetInfo(ctx).(ConnectBox)
	return h, ok
}

func AddRedirect(w http.ResponseWriter, to string) {
	w.Header().Set("Redirect-To", to)
}

func IsAuthRefresh(r *http.Request) bool {
	refresh := r.URL.Path == v1connect.AuthServiceAuthRefreshProcedure

	return refresh
}

func AuthRedirect(r *http.Request, w http.ResponseWriter, err error) error {
	loggedIn := err == nil

	login := r.URL.Path == v1connect.AuthServiceEmailLoginProcedure
	register := r.URL.Path == v1connect.AuthServiceRegisterUserProcedure

	if register || login {
		if loggedIn {
			AddRedirect(w, "/profile")
			return Errorf("Already logged in")
		} else {
			return nil
		}
	} else {
		if loggedIn {
			return nil
		} else {
			return Errorf("Not logged in")
		}
	}
}
