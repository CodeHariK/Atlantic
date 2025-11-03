package authbox

import (
	"errors"

	"connectrpc.com/connect"
)

var InternalServerError = connect.NewError(
	connect.CodeInternal,
	errors.New("Internal server error"),
)

var InvalidEmailPassword = connect.NewError(
	connect.CodePermissionDenied,
	errors.New("Invalid Email or password"),
)
