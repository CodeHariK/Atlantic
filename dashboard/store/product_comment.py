# Code generated by sqlc. DO NOT EDIT.
# versions:
#   sqlc v1.27.0
# source: product_comment.sql
from typing import AsyncIterator, Iterator, Optional

import sqlalchemy
import sqlalchemy.ext.asyncio

from product import models


CREATE_PRODUCT_COMMENT = """-- name: create_product_comment \\:one
INSERT INTO
    product_comment (comment)
VALUES (:p1) RETURNING id,
    comment,
    created_at,
    updated_at
"""


DELETE_PRODUCT_COMMENT = """-- name: delete_product_comment \\:exec
DELETE FROM product_comment WHERE id = :p1
"""


GET_PRODUCT_COMMENT = """-- name: get_product_comment \\:one
SELECT
    id,
    comment,
    created_at,
    updated_at
FROM product_comment
WHERE
    id = :p1
"""


LIST_PRODUCT_COMMENTS = """-- name: list_product_comments \\:many
SELECT
    id,
    comment,
    created_at,
    updated_at
FROM product_comment
ORDER BY created_at DESC
"""


UPDATE_PRODUCT_COMMENT = """-- name: update_product_comment \\:exec
UPDATE product_comment
SET
    comment = :p2,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = :p1
"""


class Querier:
    def __init__(self, conn: sqlalchemy.engine.Connection):
        self._conn = conn

    def create_product_comment(self, *, comment: Optional[str]) -> Optional[models.ProductComment]:
        row = self._conn.execute(sqlalchemy.text(CREATE_PRODUCT_COMMENT), {"p1": comment}).first()
        if row is None:
            return None
        return models.ProductComment(
            id=row[0],
            comment=row[1],
            created_at=row[2],
            updated_at=row[3],
        )

    def delete_product_comment(self, *, id: int) -> None:
        self._conn.execute(sqlalchemy.text(DELETE_PRODUCT_COMMENT), {"p1": id})

    def get_product_comment(self, *, id: int) -> Optional[models.ProductComment]:
        row = self._conn.execute(sqlalchemy.text(GET_PRODUCT_COMMENT), {"p1": id}).first()
        if row is None:
            return None
        return models.ProductComment(
            id=row[0],
            comment=row[1],
            created_at=row[2],
            updated_at=row[3],
        )

    def list_product_comments(self) -> Iterator[models.ProductComment]:
        result = self._conn.execute(sqlalchemy.text(LIST_PRODUCT_COMMENTS))
        for row in result:
            yield models.ProductComment(
                id=row[0],
                comment=row[1],
                created_at=row[2],
                updated_at=row[3],
            )

    def update_product_comment(self, *, id: int, comment: Optional[str]) -> None:
        self._conn.execute(sqlalchemy.text(UPDATE_PRODUCT_COMMENT), {"p1": id, "p2": comment})


class AsyncQuerier:
    def __init__(self, conn: sqlalchemy.ext.asyncio.AsyncConnection):
        self._conn = conn

    async def create_product_comment(self, *, comment: Optional[str]) -> Optional[models.ProductComment]:
        row = (await self._conn.execute(sqlalchemy.text(CREATE_PRODUCT_COMMENT), {"p1": comment})).first()
        if row is None:
            return None
        return models.ProductComment(
            id=row[0],
            comment=row[1],
            created_at=row[2],
            updated_at=row[3],
        )

    async def delete_product_comment(self, *, id: int) -> None:
        await self._conn.execute(sqlalchemy.text(DELETE_PRODUCT_COMMENT), {"p1": id})

    async def get_product_comment(self, *, id: int) -> Optional[models.ProductComment]:
        row = (await self._conn.execute(sqlalchemy.text(GET_PRODUCT_COMMENT), {"p1": id})).first()
        if row is None:
            return None
        return models.ProductComment(
            id=row[0],
            comment=row[1],
            created_at=row[2],
            updated_at=row[3],
        )

    async def list_product_comments(self) -> AsyncIterator[models.ProductComment]:
        result = await self._conn.stream(sqlalchemy.text(LIST_PRODUCT_COMMENTS))
        async for row in result:
            yield models.ProductComment(
                id=row[0],
                comment=row[1],
                created_at=row[2],
                updated_at=row[3],
            )

    async def update_product_comment(self, *, id: int, comment: Optional[str]) -> None:
        await self._conn.execute(sqlalchemy.text(UPDATE_PRODUCT_COMMENT), {"p1": id, "p2": comment})
