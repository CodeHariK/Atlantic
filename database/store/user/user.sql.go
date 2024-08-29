// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: user.sql

package user

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
INSERT INTO
    users (
        id,
        username,
        email,
        phone_number,
        gender,
        is_admin,
        date_of_birth,
        location
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
    ) RETURNING id
`

type CreateUserParams struct {
	ID          uuid.UUID   `json:"id"`
	Username    string      `json:"username"`
	Email       pgtype.Text `json:"email"`
	PhoneNumber pgtype.Text `json:"phone_number"`
	Gender      pgtype.Text `json:"gender"`
	IsAdmin     bool        `json:"is_admin"`
	DateOfBirth pgtype.Date `json:"date_of_birth"`
	Location    pgtype.UUID `json:"location"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (uuid.UUID, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.ID,
		arg.Username,
		arg.Email,
		arg.PhoneNumber,
		arg.Gender,
		arg.IsAdmin,
		arg.DateOfBirth,
		arg.Location,
	)
	var id uuid.UUID
	err := row.Scan(&id)
	return id, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteUser, id)
	return err
}

const findUserByUsername = `-- name: FindUserByUsername :one
SELECT
    id,
    username,
    email,
    phone_number,
    gender,
    is_admin,
    date_of_birth,
    created_at,
    updated_at,
    location
FROM users
WHERE
    username = $1
`

type FindUserByUsernameRow struct {
	ID          uuid.UUID        `json:"id"`
	Username    string           `json:"username"`
	Email       pgtype.Text      `json:"email"`
	PhoneNumber pgtype.Text      `json:"phone_number"`
	Gender      pgtype.Text      `json:"gender"`
	IsAdmin     bool             `json:"is_admin"`
	DateOfBirth pgtype.Date      `json:"date_of_birth"`
	CreatedAt   pgtype.Timestamp `json:"created_at"`
	UpdatedAt   pgtype.Timestamp `json:"updated_at"`
	Location    pgtype.UUID      `json:"location"`
}

func (q *Queries) FindUserByUsername(ctx context.Context, username string) (FindUserByUsernameRow, error) {
	row := q.db.QueryRow(ctx, findUserByUsername, username)
	var i FindUserByUsernameRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.PhoneNumber,
		&i.Gender,
		&i.IsAdmin,
		&i.DateOfBirth,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Location,
	)
	return i, err
}

const getAuthUserByEmail = `-- name: GetAuthUserByEmail :one
SELECT
    id,
    username,
    email,
    password_hash
FROM users
WHERE
    email = $1
`

type GetAuthUserByEmailRow struct {
	ID           uuid.UUID   `json:"id"`
	Username     string      `json:"username"`
	Email        pgtype.Text `json:"email"`
	PasswordHash pgtype.Text `json:"password_hash"`
}

func (q *Queries) GetAuthUserByEmail(ctx context.Context, email pgtype.Text) (GetAuthUserByEmailRow, error) {
	row := q.db.QueryRow(ctx, getAuthUserByEmail, email)
	var i GetAuthUserByEmailRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.PasswordHash,
	)
	return i, err
}

const getUserByID = `-- name: GetUserByID :one
SELECT
    id,
    username,
    email,
    phone_number,
    gender,
    is_admin,
    date_of_birth,
    created_at,
    updated_at,
    location
FROM users
WHERE
    id = $1
`

type GetUserByIDRow struct {
	ID          uuid.UUID        `json:"id"`
	Username    string           `json:"username"`
	Email       pgtype.Text      `json:"email"`
	PhoneNumber pgtype.Text      `json:"phone_number"`
	Gender      pgtype.Text      `json:"gender"`
	IsAdmin     bool             `json:"is_admin"`
	DateOfBirth pgtype.Date      `json:"date_of_birth"`
	CreatedAt   pgtype.Timestamp `json:"created_at"`
	UpdatedAt   pgtype.Timestamp `json:"updated_at"`
	Location    pgtype.UUID      `json:"location"`
}

func (q *Queries) GetUserByID(ctx context.Context, id uuid.UUID) (GetUserByIDRow, error) {
	row := q.db.QueryRow(ctx, getUserByID, id)
	var i GetUserByIDRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.PhoneNumber,
		&i.Gender,
		&i.IsAdmin,
		&i.DateOfBirth,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Location,
	)
	return i, err
}

const listUsers = `-- name: ListUsers :many
SELECT
    id,
    username,
    email,
    phone_number,
    gender,
    is_admin,
    date_of_birth,
    created_at,
    updated_at,
    location
FROM users
LIMIT $1
OFFSET
    $2
`

type ListUsersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

type ListUsersRow struct {
	ID          uuid.UUID        `json:"id"`
	Username    string           `json:"username"`
	Email       pgtype.Text      `json:"email"`
	PhoneNumber pgtype.Text      `json:"phone_number"`
	Gender      pgtype.Text      `json:"gender"`
	IsAdmin     bool             `json:"is_admin"`
	DateOfBirth pgtype.Date      `json:"date_of_birth"`
	CreatedAt   pgtype.Timestamp `json:"created_at"`
	UpdatedAt   pgtype.Timestamp `json:"updated_at"`
	Location    pgtype.UUID      `json:"location"`
}

func (q *Queries) ListUsers(ctx context.Context, arg ListUsersParams) ([]ListUsersRow, error) {
	rows, err := q.db.Query(ctx, listUsers, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ListUsersRow{}
	for rows.Next() {
		var i ListUsersRow
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.Email,
			&i.PhoneNumber,
			&i.Gender,
			&i.IsAdmin,
			&i.DateOfBirth,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Location,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateUser = `-- name: UpdateUser :one
UPDATE users
SET
    username = $1,
    email = $2,
    phone_number = $3,
    gender = $4,
    is_admin = $5,
    date_of_birth = $6,
    location = $7,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = $8 RETURNING id,
    updated_at
`

type UpdateUserParams struct {
	Username    string      `json:"username"`
	Email       pgtype.Text `json:"email"`
	PhoneNumber pgtype.Text `json:"phone_number"`
	Gender      pgtype.Text `json:"gender"`
	IsAdmin     bool        `json:"is_admin"`
	DateOfBirth pgtype.Date `json:"date_of_birth"`
	Location    pgtype.UUID `json:"location"`
	ID          uuid.UUID   `json:"id"`
}

type UpdateUserRow struct {
	ID        uuid.UUID        `json:"id"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (UpdateUserRow, error) {
	row := q.db.QueryRow(ctx, updateUser,
		arg.Username,
		arg.Email,
		arg.PhoneNumber,
		arg.Gender,
		arg.IsAdmin,
		arg.DateOfBirth,
		arg.Location,
		arg.ID,
	)
	var i UpdateUserRow
	err := row.Scan(&i.ID, &i.UpdatedAt)
	return i, err
}
