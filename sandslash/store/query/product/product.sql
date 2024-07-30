-- name: CreateProduct :one
INSERT INTO
    "products" ("product_name", "description")
VALUES ($1, $2)
RETURNING
    "id",
    "product_name",
    "description";

-- name: GetProductByID :one
SELECT
    "id",
    "product_name",
    "description"
FROM "products"
WHERE
    "id" = $1;

-- name: UpdateProduct :one
UPDATE "products"
SET
    "product_name" = $1,
    "description" = $2
WHERE
    "id" = $3
RETURNING
    "id",
    "product_name",
    "description";

-- name: DeleteProduct :one
DELETE FROM "products" WHERE "id" = $1 RETURNING "id";

-- name: ListAllProducts :many
SELECT
    "id",
    "product_name",
    "description"
FROM "products"
ORDER BY "product_name";

-- name: FindProductByName :one
SELECT
    "id",
    "product_name",
    "description"
FROM "products"
WHERE
    "product_name" = $1;