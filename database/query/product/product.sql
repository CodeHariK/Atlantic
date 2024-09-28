-- name: CreateProduct :one
INSERT INTO
    products (id, quantity, price)
VALUES ($1, $2, $3) RETURNING *;

-- name: GetProductByID :one
SELECT id, quantity, price FROM products WHERE id = $1;

-- name: UpdateProduct :exec
UPDATE products
SET
    quantity = $2,
    price = $3
WHERE
    id = $1;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: ListProducts :many
SELECT id, quantity, price FROM products ORDER BY id;

-- name: CheckProductQuantity :one
SELECT quantity FROM products WHERE id = $1;