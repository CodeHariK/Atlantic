-- name: CreateProduct :one
INSERT INTO
    products (id, quantity, price)
VALUES ($1, $2, $3) RETURNING *;

-- name: GetProductsByIds :many
SELECT * FROM products WHERE id = ANY($1::uuid[]);

-- name: UpdateProduct :exec
UPDATE products
SET
    quantity = quantity + $2,
    price = $3
WHERE
    id = $1;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: ListProducts :many
SELECT id, quantity, price FROM products LIMIT $1;