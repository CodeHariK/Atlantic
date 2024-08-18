-- name: CreateSeller :exec
INSERT INTO seller (name, location) VALUES ($1, $2) RETURNING id;

-- name: GetSellerByID :one
SELECT id, name, location FROM seller WHERE id = $1;

-- name: UpdateSeller :exec
UPDATE seller SET name = $1, location = $2 WHERE id = $3;

-- name: DeleteSeller :exec
DELETE FROM seller WHERE id = $1;

-- name: ListSellers :many
SELECT id, name, location FROM seller;