// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: product_category.sql

package product

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const createProductCategory = `-- name: CreateProductCategory :one
INSERT INTO
    product_category (id, name, parent_id)
VALUES ($1, $2, $3) RETURNING id,
    name,
    parent_id
`

type CreateProductCategoryParams struct {
	ID       uuid.UUID   `json:"id"`
	Name     string      `json:"name"`
	ParentID pgtype.UUID `json:"parent_id"`
}

func (q *Queries) CreateProductCategory(ctx context.Context, arg CreateProductCategoryParams) (ProductCategory, error) {
	row := q.db.QueryRow(ctx, createProductCategory, arg.ID, arg.Name, arg.ParentID)
	var i ProductCategory
	err := row.Scan(&i.ID, &i.Name, &i.ParentID)
	return i, err
}

const deleteProductCategory = `-- name: DeleteProductCategory :exec
DELETE FROM product_category WHERE id = $1
`

func (q *Queries) DeleteProductCategory(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteProductCategory, id)
	return err
}

const getCategoryPath = `-- name: GetCategoryPath :one
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
LIMIT 1
`

func (q *Queries) GetCategoryPath(ctx context.Context, id uuid.UUID) (string, error) {
	row := q.db.QueryRow(ctx, getCategoryPath, id)
	var path string
	err := row.Scan(&path)
	return path, err
}

const getProductCategoryByID = `-- name: GetProductCategoryByID :one
SELECT id, name, parent_id FROM product_category WHERE id = $1
`

func (q *Queries) GetProductCategoryByID(ctx context.Context, id uuid.UUID) (ProductCategory, error) {
	row := q.db.QueryRow(ctx, getProductCategoryByID, id)
	var i ProductCategory
	err := row.Scan(&i.ID, &i.Name, &i.ParentID)
	return i, err
}

const getProductWithCategoryPath = `-- name: GetProductWithCategoryPath :one
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
    p.category_id,
    cp.path AS category_path
FROM products p
    CROSS JOIN CategoryPath cp
WHERE
    p.id = $1
`

type GetProductWithCategoryPathRow struct {
	ProductID    uuid.UUID   `json:"product_id"`
	ProductName  pgtype.Text `json:"product_name"`
	CategoryID   uuid.UUID   `json:"category_id"`
	CategoryPath string      `json:"category_path"`
}

func (q *Queries) GetProductWithCategoryPath(ctx context.Context, id uuid.UUID) (GetProductWithCategoryPathRow, error) {
	row := q.db.QueryRow(ctx, getProductWithCategoryPath, id)
	var i GetProductWithCategoryPathRow
	err := row.Scan(
		&i.ProductID,
		&i.ProductName,
		&i.CategoryID,
		&i.CategoryPath,
	)
	return i, err
}

const listCategoriesByParentID = `-- name: ListCategoriesByParentID :many
SELECT id, name, parent_id
FROM product_category
WHERE
    parent_id = $1
ORDER BY name
`

func (q *Queries) ListCategoriesByParentID(ctx context.Context, parentID pgtype.UUID) ([]ProductCategory, error) {
	rows, err := q.db.Query(ctx, listCategoriesByParentID, parentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ProductCategory{}
	for rows.Next() {
		var i ProductCategory
		if err := rows.Scan(&i.ID, &i.Name, &i.ParentID); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listRootCategories = `-- name: ListRootCategories :many
SELECT id, name, parent_id
FROM product_category
WHERE
    parent_id IS NULL
ORDER BY name
`

func (q *Queries) ListRootCategories(ctx context.Context) ([]ProductCategory, error) {
	rows, err := q.db.Query(ctx, listRootCategories)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ProductCategory{}
	for rows.Next() {
		var i ProductCategory
		if err := rows.Scan(&i.ID, &i.Name, &i.ParentID); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateProductCategory = `-- name: UpdateProductCategory :exec
UPDATE product_category SET name = $2, parent_id = $3 WHERE id = $1
`

type UpdateProductCategoryParams struct {
	ID       uuid.UUID   `json:"id"`
	Name     string      `json:"name"`
	ParentID pgtype.UUID `json:"parent_id"`
}

func (q *Queries) UpdateProductCategory(ctx context.Context, arg UpdateProductCategoryParams) error {
	_, err := q.db.Exec(ctx, updateProductCategory, arg.ID, arg.Name, arg.ParentID)
	return err
}
