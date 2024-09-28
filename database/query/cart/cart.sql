-- name: GetCartByID :one
SELECT * FROM carts WHERE id = $1;

-- name: CreateCart :one
INSERT INTO
    carts (
        id,
        user_id,
        created_at,
        updated_at
    )
VALUES ($1, $2, $3, $4) RETURNING *;

-- name: GetCartsByUserID :many
SELECT * FROM carts WHERE user_id = $1;

-- name: DeleteCartByID :exec
DELETE FROM carts WHERE id = $1;