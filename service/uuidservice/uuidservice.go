package uuidservice

import (
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

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
