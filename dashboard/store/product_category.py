# Code generated by sqlc. DO NOT EDIT.
# versions:
#   sqlc v1.27.0
# source: product_category.sql
import dataclasses
from typing import Optional

import sqlalchemy
import sqlalchemy.ext.asyncio

from product import models


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


GET_PRODUCT_WITH_CATEGORY_PATH = """-- name: get_product_with_category_path \\:one
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member\\: start with the category of the product
    SELECT id, name, parent_id, name\\:\\:TEXT AS path
    FROM product_category
    WHERE id = (
        SELECT category_id
        FROM products
        WHERE id = :p1  -- Use product ID to find the category_id
    )


UNION ALL
    
    SELECT pc.id, pc.name, pc.parent_id, 
        ch.path || '.' || pc.name AS path
    FROM product_category pc
    INNER JOIN CategoryHierarchy ch ON pc.id = ch.parent_id
)

,
CategoryPath AS (
    SELECT path
    FROM CategoryHierarchy
    ORDER BY array_length(string_to_array(path, '.'), 1) DESC
    LIMIT 1
)
SELECT
    p.id AS product_id,
    p.product_name,
    p.category_id,
    cp.path AS category_path
FROM products p
    CROSS JOIN CategoryPath cp
WHERE
    p.id = :p1
"""


@dataclasses.dataclass()
class GetProductWithCategoryPathRow:
    product_id: int
    product_name: Optional[str]
    category_id: int
    category_path: str


class Querier:
    def __init__(self, conn: sqlalchemy.engine.Connection):
        self._conn = conn

    def get_category_path(self, *, id: int) -> Optional[str]:
        row = self._conn.execute(sqlalchemy.text(GET_CATEGORY_PATH), {"p1": id}).first()
        if row is None:
            return None
        return row[0]

    def get_product_with_category_path(self, *, id: int) -> Optional[GetProductWithCategoryPathRow]:
        row = self._conn.execute(sqlalchemy.text(GET_PRODUCT_WITH_CATEGORY_PATH), {"p1": id}).first()
        if row is None:
            return None
        return GetProductWithCategoryPathRow(
            product_id=row[0],
            product_name=row[1],
            category_id=row[2],
            category_path=row[3],
        )


class AsyncQuerier:
    def __init__(self, conn: sqlalchemy.ext.asyncio.AsyncConnection):
        self._conn = conn

    async def get_category_path(self, *, id: int) -> Optional[str]:
        row = (await self._conn.execute(sqlalchemy.text(GET_CATEGORY_PATH), {"p1": id})).first()
        if row is None:
            return None
        return row[0]

    async def get_product_with_category_path(self, *, id: int) -> Optional[GetProductWithCategoryPathRow]:
        row = (await self._conn.execute(sqlalchemy.text(GET_PRODUCT_WITH_CATEGORY_PATH), {"p1": id})).first()
        if row is None:
            return None
        return GetProductWithCategoryPathRow(
            product_id=row[0],
            product_name=row[1],
            category_id=row[2],
            category_path=row[3],
        )
