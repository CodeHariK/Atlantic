-- name: CreateProduct :one
INSERT INTO
    products (
        product_id,
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
    product_id = $1 RETURNING *;

-- name: UpdateProductPrice :one
UPDATE products SET price = price WHERE product_id = $1 RETURNING *;

-- name: UpdateProductQuantity :one
UPDATE products
SET
    quantity = quantity + $2
WHERE
    product_id = $1 RETURNING *;

-- name: DeleteProduct :exec
DELETE FROM products WHERE product_id = $1;

-- name: ListProducts :many
SELECT product_id, quantity, price FROM products LIMIT $1;