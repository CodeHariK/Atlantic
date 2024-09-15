# Code generated by sqlc. DO NOT EDIT.
# versions:
#   sqlc v1.27.0
# source: product.sql
import dataclasses
from typing import Optional
import uuid

import sqlalchemy

from product import models


CREATE_PRODUCT = """-- name: create_product \\:one
INSERT INTO
    products (
        id,
        product_name,
        category_id1,
        category_id2,
        category_id3,
        category_id4
    )
VALUES (:p1, :p2, :p3, :p4, :p5, :p6) RETURNING id
"""


@dataclasses.dataclass()
class CreateProductParams:
    id: uuid.UUID
    product_name: Optional[str]
    category_id1: int
    category_id2: int
    category_id3: Optional[int]
    category_id4: Optional[int]


DELETE_PRODUCT = """-- name: delete_product \\:exec
DELETE FROM products WHERE id = :p1
"""


GET_PRODUCT_BY_ID = """-- name: get_product_by_id \\:one
SELECT id, product_name, category_id1, category_id2, category_id3, category_id4 FROM products WHERE id = :p1
"""


LIST_PRODUCTS = """-- name: list_products \\:many
SELECT id, product_name, category_id1, category_id2, category_id3, category_id4 FROM products ORDER BY id LIMIT :p1 OFFSET :p2
"""


UPDATE_PRODUCT = """-- name: update_product \\:exec
UPDATE products
SET
    product_name = :p2,
    category_id1 = :p3,
    category_id2 = :p4,
    category_id3 = :p5,
    category_id4 = :p6
WHERE
    id = :p1
"""


@dataclasses.dataclass()
class UpdateProductParams:
    id: uuid.UUID
    product_name: Optional[str]
    category_id1: int
    category_id2: int
    category_id3: Optional[int]
    category_id4: Optional[int]
