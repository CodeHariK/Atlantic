-- name: CreateProduct :one
INSERT INTO
    products (
        id,
        product_name,
        category_id1,
        category_id2,
        category_id3,
        category_id4
    )
VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;

-- name: GetProductByID :one
SELECT * FROM products WHERE id = $1;

-- name: UpdateProduct :exec
UPDATE products
SET
    product_name = $2,
    category_id1 = $3,
    category_id2 = $4,
    category_id3 = $5,
    category_id4 = $6
WHERE
    id = $1;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: ListProducts :many
SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2;