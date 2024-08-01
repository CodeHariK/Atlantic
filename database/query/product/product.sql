-- name: CreateProductAndDescription :one
BEGIN;

-- Insert into products
WITH new_product AS (
    INSERT INTO "products" ("product_name")
    VALUES ($1)
    RETURNING "id"
)
-- Insert into product_description
INSERT INTO "product_description" (
    "product_id",
    "product_variant_id",
    "description",
    "images",
    "videos"
)
SELECT
    "id", -- The ID of the new product
    $2, -- product_variant_id
    $3, -- description
    $4, -- images
    $5  -- videos
FROM new_product;

COMMIT;

-- -- name: GetProductByID :one
-- SELECT "id", "product_name" FROM "products" WHERE "id" = $1;

-- -- name: DeleteProduct :one
-- DELETE FROM "products" WHERE "id" = $1 RETURNING "id";

-- -- name: ListAllProducts :many
-- SELECT "id", "product_name"
-- FROM "products"
-- ORDER BY "product_name"
-- LIMIT $1;

-- -- name: FindProductByName :one
-- SELECT "id", "product_name"
-- FROM "products"
-- WHERE
--     "product_name" = $1;