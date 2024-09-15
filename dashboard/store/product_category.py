# Code generated by sqlc. DO NOT EDIT.
# versions:
#   sqlc v1.27.0
# source: product_category.sql
import dataclasses
from typing import Optional
import uuid

CREATE_PRODUCT_CATEGORY = """-- name: create_product_category \\:one
INSERT INTO
    product_category (id, name, parent_id)
VALUES (:p1, :p2, :p3) RETURNING id
"""


DELETE_PRODUCT_CATEGORY = """-- name: delete_product_category \\:exec
DELETE FROM product_category WHERE id = :p1
"""


GET_CATEGORY_PATH = """-- name: get_category_path \\:one
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member\\: start with the category you want to query
    SELECT c.id, c.name, c.parent_id, c.name\\:\\:TEXT AS path
    FROM product_category c
    WHERE c.id = :p1
UNION ALL
    SELECT pc.id, pc.name, pc.parent_id, 
        ch.path || '.' || pc.name AS path
    FROM product_category pc
    INNER JOIN CategoryHierarchy ch ON pc.id = ch.parent_id
)
SELECT path
FROM CategoryHierarchy
ORDER BY array_length(string_to_array(path, '.'), 1) DESC
LIMIT 1
"""


GET_PRODUCT_CATEGORY_BY_ID = """-- name: get_product_category_by_id \\:one
SELECT id, name, parent_id FROM product_category WHERE id = :p1
"""


GET_PRODUCT_WITH_CATEGORY_PATH = """-- name: get_product_with_category_path \\:one
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member\\: start with the category of the product
    SELECT id, name, parent_id, name\\:\\:TEXT AS path
    FROM product_category
    WHERE id = (
        SELECT category_id1
        FROM products
        WHERE id = :p1  -- Use product ID to find the category_id
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
    p.id = :p1
"""


@dataclasses.dataclass()
class GetProductWithCategoryPathRow:
    product_id: uuid.UUID
    product_name: Optional[str]
    category_id1: int
    category_id2: int
    category_id3: Optional[int]
    category_id4: Optional[int]
    category_path: str


LIST_CATEGORIES_BY_PARENT_ID = """-- name: list_categories_by_parent_id \\:many
SELECT id, name, parent_id
FROM product_category
WHERE
    parent_id = :p1
ORDER BY name
"""


LIST_ROOT_CATEGORIES = """-- name: list_root_categories \\:many
SELECT id, name, parent_id
FROM product_category
WHERE
    parent_id IS NULL
ORDER BY name
"""


UPDATE_PRODUCT_CATEGORY = """-- name: update_product_category \\:exec
UPDATE product_category SET name = :p2, parent_id = :p3 WHERE id = :p1
"""
