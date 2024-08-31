-- name: CreateUser :one
INSERT INTO
    users (
        id,
        username,
        password_hash,
        email,
        phone_number,
        verified,
        avatar,
        gender,
        role,
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
        $8,
        $9,
        $10,
        $11
    ) RETURNING id;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: GetUserByUsername :one
SELECT * FROM users WHERE username = $1;

-- name: UpdateUser :exec
UPDATE users
SET
    username = $1,
    email = $2,
    phone_number = $3,
    verified = $4,
    avatar = $5,
    gender = $6,
    role = $7,
    date_of_birth = $8,
    location = $9,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = $9;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;

-- name: ListUsers :many
SELECT
    id,
    username,
    email,
    phone_number,
    gender,
    role,
    date_of_birth,
    created_at,
    updated_at,
    location
FROM users
LIMIT $1
OFFSET
    $2;