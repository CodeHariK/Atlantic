-- name: CreateUser :one
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
    ) RETURNING id,
    created_at,
    updated_at;

-- name: GetUserByID :one
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
    id = $1;

-- name: GetAuthUserByEmail :one
SELECT
    id,
    username,
    email,
    password_hash
FROM users
WHERE
    email = $1;

-- name: UpdateUser :one
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
    updated_at;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;

-- name: ListUsers :many
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
    $2;

-- name: FindUserByUsername :one
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
    username = $1;