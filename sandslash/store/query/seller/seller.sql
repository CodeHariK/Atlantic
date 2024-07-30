-- name: CreateSeller :one
INSERT INTO seller (name, location) VALUES ($1, $2) RETURNING id;

-- name: GetSellerByID :one
SELECT * FROM seller WHERE id = $1;

-- name: ListSellers :many
SELECT * FROM seller;

-- name: UpdateSeller :one
UPDATE seller SET name = $1, location = $2 WHERE id = $3 RETURNING *;

-- name: DeleteSeller :exec
DELETE FROM seller WHERE id = $1;