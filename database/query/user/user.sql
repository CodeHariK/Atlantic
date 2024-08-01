-- name: CreateUser :one
INSERT INTO
    "users" (
        "username",
        "email",
        "phone_number",
        "is_admin",
        "date_of_birth",
        "location"
    )
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING
    "id",
    "username",
    "email",
    "phone_number",
    "is_admin",
    "date_of_birth",
    "created_at",
    "updated_at",
    "location";

-- name: GetUserByID :one
SELECT
    "id",
    "username",
    "email",
    "phone_number",
    "is_admin",
    "date_of_birth",
    "created_at",
    "updated_at",
    "location"
FROM "users"
WHERE
    "id" = $1;

-- name: UpdateUser :one
UPDATE "users"
SET
    "username" = $1,
    "email" = $2,
    "phone_number" = $3,
    "is_admin" = $4,
    "date_of_birth" = $5,
    "location" = $6,
    "updated_at" = CURRENT_TIMESTAMP
WHERE
    "id" = $7
RETURNING
    "id",
    "username",
    "email",
    "phone_number",
    "is_admin",
    "date_of_birth",
    "created_at",
    "updated_at",
    "location";

-- name: DeleteUser :one
DELETE FROM "users" WHERE "id" = $1 RETURNING "id";

-- name: ListAllUsers :many
SELECT
    "id",
    "username",
    "email",
    "phone_number",
    "is_admin",
    "date_of_birth",
    "created_at",
    "updated_at",
    "location"
FROM "users"
ORDER BY "created_at" DESC;

-- name: FindUserByUsername :one
SELECT
    "id",
    "username",
    "email",
    "phone_number",
    "is_admin",
    "date_of_birth",
    "created_at",
    "updated_at",
    "location"
FROM "users"
WHERE
    "username" = $1;