-- name: GetCategoryPath :one
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member: start with the category you want to query
    SELECT c.id, c.name, c.parent_id, c.name::TEXT AS path
    FROM product_category c
    WHERE c.id = $1


UNION ALL
-- Recursive member: join the category table with itself to traverse up the hierarchy
    
    SELECT pc.id, pc.name, pc.parent_id, 
        ch.path || '.' || pc.name AS path
    FROM product_category pc
    INNER JOIN CategoryHierarchy ch ON pc.id = ch.parent_id
)
-- Select the path in the desired format
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
        SELECT category_id
        FROM products
        WHERE id = $1  -- Use product ID to find the category_id
    )


UNION ALL
-- Recursive member: join the category table with itself to traverse up the hierarchy
    
    SELECT pc.id, pc.name, pc.parent_id, 
        ch.path || '.' || pc.name AS path
    FROM product_category pc
    INNER JOIN CategoryHierarchy ch ON pc.id = ch.parent_id
)

-- Select the hierarchical category path
,
CategoryPath AS (
    SELECT path
    FROM CategoryHierarchy
    ORDER BY array_length(string_to_array(path, '.'), 1) DESC
    LIMIT 1
)
-- Select the product details along with the hierarchical category path
SELECT
    p.id AS product_id,
    p.product_name,
    p.category_id,
    cp.path AS category_path
FROM products p
    CROSS JOIN CategoryPath cp
WHERE
    p.id = $1;
-- Use product ID to match the product