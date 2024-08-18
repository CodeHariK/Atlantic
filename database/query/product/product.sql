-- name: CreateProduct :one
INSERT INTO
    products (product_name, category_id)
VALUES ($1, $2)
RETURNING
    id,
    product_name,
    category_id;

-- name: GetProductByID :one
SELECT id, product_name, category_id FROM products WHERE id = $1;

-- name: UpdateProduct :one
UPDATE products
SET
    product_name = $1,
    category_id = $2
WHERE
    id = $3
RETURNING
    id,
    product_name,
    category_id;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: ListProducts :many
SELECT id, product_name, category_id
FROM products
ORDER BY id
LIMIT $1
OFFSET
    $2;