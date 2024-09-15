-- name: CreateProductCategory :one
INSERT INTO
    product_category (id, name, parent_id)
VALUES ($1, $2, $3) RETURNING id;

-- name: GetProductCategoryByID :one
SELECT id, name, parent_id FROM product_category WHERE id = $1;

-- name: UpdateProductCategory :exec
UPDATE product_category SET name = $2, parent_id = $3 WHERE id = $1;

-- name: DeleteProductCategory :exec
DELETE FROM product_category WHERE id = $1;

-- name: ListRootCategories :many
SELECT id, name, parent_id
FROM product_category
WHERE
    parent_id IS NULL
ORDER BY name;

-- name: ListCategoriesByParentID :many
SELECT id, name, parent_id
FROM product_category
WHERE
    parent_id = $1
ORDER BY name;

-- name: GetCategoryPath :one
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member: start with the category you want to query
    SELECT c.id, c.name, c.parent_id, c.name::TEXT AS path
    FROM product_category c
    WHERE c.id = $1
UNION ALL
    SELECT pc.id, pc.name, pc.parent_id, 
        ch.path || '.' || pc.name AS path
    FROM product_category pc
    INNER JOIN CategoryHierarchy ch ON pc.id = ch.parent_id
)
SELECT path
FROM CategoryHierarchy
ORDER BY array_length(string_to_array(path, '.'), 1) DESC
LIMIT 1;

-- name: GetProductWithCategoryPath :one
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member: start with the category of the product
    SELECT id, name, parent_id, name::TEXT AS path
    FROM product_category
    WHERE id = (
        SELECT category_id1
        FROM products
        WHERE id = $1  -- Use product ID to find the category_id
    )
UNION ALL
    SELECT pc.id, pc.name, pc.parent_id, 
        ch.path || '.' || pc.name AS path
    FROM product_category pc
    INNER JOIN CategoryHierarchy ch ON pc.id = ch.parent_id
),
CategoryPath AS (
    SELECT path
    FROM CategoryHierarchy
    ORDER BY array_length (
            string_to_array (path, '.'), 1
        ) DESC
    LIMIT 1
)
SELECT
    p.id AS product_id,
    p.product_name,
    p.category_id1,
    p.category_id2,
    p.category_id3,
    p.category_id4,
    cp.path AS category_path
FROM products p
    CROSS JOIN CategoryPath cp
WHERE
    p.id = $1;
-- Use product ID to match the product