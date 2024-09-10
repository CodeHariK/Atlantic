package pgservice

import (
	"errors"

	"github.com/jackc/pgx/v5/pgconn"
)

// isDuplicateKeyError checks if the error is a duplicate key error for the specified constraint
func isDuplicateKeyError(err error, constraintName string) bool {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		// Check if the error is a unique violation and matches the constraint
		if pgErr.Code == "23505" && pgErr.ConstraintName == constraintName {
			return true
		}
	}
	return false
}

func PgCheck(err error) error {
	if isDuplicateKeyError(err, "users_email_key") {
		return errors.New("email address is already in use")
	}
	return err
}
