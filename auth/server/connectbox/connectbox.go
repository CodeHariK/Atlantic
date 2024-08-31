package connectbox

import (
	"context"
	"errors"
	"net/http"

	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
	"github.com/codeharik/Atlantic/auth/api/auth/v1/v1connect"
	"github.com/codeharik/Atlantic/auth/server/authn"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
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
	loggedIn := err == nil

	login := r.URL.Path == v1connect.AuthServiceEmailLoginProcedure
	register := r.URL.Path == v1connect.AuthServiceRegisterUserProcedure

	if register || login {
		if loggedIn {
			AddRedirect(w, "/profile")
			return authn.Errorf("Already logged in")
		} else {
			return nil
		}
	} else {
		if loggedIn {
			return nil
		} else {
			return authn.Errorf("Not logged in")
		}
	}
}

func ToUUIDstring(dbuser pgtype.UUID) (string, error) {
	if !dbuser.Valid {
		return "", errors.New("Not valid")
	}
	uuidValue, err := uuid.FromBytes(dbuser.Bytes[:])
	if err != nil {
		return "", err
	}
	return uuidValue.String(), nil
}
