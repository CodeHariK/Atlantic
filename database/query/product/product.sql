-- name: CreateProduct :one
INSERT INTO
    products (
        id,
        title,
        quantity,
        price,
        category
    )
VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: GetProductsByIds :many
SELECT * FROM products WHERE id = ANY($1::uuid[]);

-- name: UpdateProduct :one
UPDATE products
SET
    title = title,
    category = category,
    quantity = quantity + $2,
    price = $3
WHERE
    id = $1 RETURNING *;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: ListProducts :many
SELECT id, quantity, price FROM products LIMIT $1;