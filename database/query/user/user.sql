-- name: CreateUser :exec
INSERT INTO
    users (
        id,
        username,
        password_hash,
        email,
        verified,
        phone_number,
        gender,
        role,
        date_of_birth,
        address,
        balance
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
    );

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
    gender = $5,
    role = $6,
    date_of_birth = $7,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = $8;

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
    updated_at
FROM users
LIMIT $1
OFFSET
    $2;

-- name: UpdateUserBalance :exec
UPDATE users
SET
    balance = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = $1;

-- name: UpdateUserPassword :exec
UPDATE users
SET
    password_hash = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = $1;