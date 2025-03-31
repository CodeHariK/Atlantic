package pgservice

import (
	"errors"

	"github.com/jackc/pgx/v5/pgconn"
)

// isError checks if the error is a duplicate key error for the specified constraint
func isError(err error, constraintName string) bool {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		if pgErr.ConstraintName == constraintName {
			return true
		}
	}
	return false
}

func PgCheck(err error) error {
	if isError(err, "users_email_key") {
		return errors.New("email address is already in use")
	}
	if isError(err, "users_address_check") {
		return errors.New("user address cannot be null")
	}
	return err
}
