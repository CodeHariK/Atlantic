package connectbox

import (
	"context"
	"net/http"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
	"github.com/codeharik/Atlantic/auth/server/authn"
)

type ConnectBox struct {
	User          *v1.AuthUser
	SessionNumber int
	R             *http.Request
	W             http.ResponseWriter
}

func GetConnectBox(ctx context.Context) (ConnectBox, bool) {
	h, ok := authn.GetInfo(ctx).(ConnectBox)
	return h, ok
}

func AddRedirect(w http.ResponseWriter, to string) {
	w.Header().Set("Redirect-To", to)
}

func AuthRedirect(r *http.Request, w http.ResponseWriter, err error) error {
	login := r.URL.Path == v1connect.AuthServiceEmailLoginProcedure

	if login && err == nil {
		AddRedirect(w, "http://localhost:8080/profile")
		return authn.Errorf("Already logged in")
	}
	if !login && err != nil {
		return authn.Errorf("Not logged in")
	}
	return nil
}
