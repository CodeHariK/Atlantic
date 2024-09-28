-- name: CreateProduct :one
INSERT INTO
    products (
        id,
        quantity,
        amount_units,
        amount_nanos,
        amount_currency
    )
VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: GetProductByID :one
SELECT
    id,
    quantity,
    amount_units,
    amount_nanos,
    amount_currency
FROM products
WHERE
    id = $1;

-- name: UpdateProduct :exec
UPDATE products
SET
    quantity = $2,
    amount_units = $3,
    amount_nanos = $4,
    amount_currency = $5
WHERE
    id = $1;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: ListProducts :many
SELECT
    id,
    quantity,
    amount_units,
    amount_nanos,
    amount_currency
FROM products
ORDER BY id;

-- name: CheckProductQuantity :one
SELECT quantity FROM products WHERE id = $1;