-- name: CreateSeller :one
INSERT INTO
    seller (id, name, location)
VALUES ($1, $2, $3) RETURNING id;

-- name: GetSellerByID :one
SELECT id, name, location FROM seller WHERE id = $1;

-- name: UpdateSeller :exec
UPDATE seller SET name = $2, location = $3 WHERE id = $1;

-- name: DeleteSeller :exec
DELETE FROM seller WHERE id = $1;

-- name: ListSellers :many
SELECT id, name, location FROM seller;