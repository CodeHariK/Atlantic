// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: product.sql

package product

import (
	"context"

	"github.com/google/uuid"
)

const createProduct = `-- name: CreateProduct :one
INSERT INTO
    products (
        product_id,
        title,
        quantity,
        price,
        category
    )
VALUES ($1, $2, $3, $4, $5) RETURNING product_id, title, quantity, price, category
`

type CreateProductParams struct {
	ProductID uuid.UUID `json:"product_id"`
	Title     string    `json:"title"`
	Quantity  int32     `json:"quantity"`
	Price     int32     `json:"price"`
	Category  string    `json:"category"`
}

func (q *Queries) CreateProduct(ctx context.Context, arg CreateProductParams) (Product, error) {
	row := q.db.QueryRow(ctx, createProduct,
		arg.ProductID,
		arg.Title,
		arg.Quantity,
		arg.Price,
		arg.Category,
	)
	var i Product
	err := row.Scan(
		&i.ProductID,
		&i.Title,
		&i.Quantity,
		&i.Price,
		&i.Category,
	)
	return i, err
}

const deleteProduct = `-- name: DeleteProduct :exec
DELETE FROM products WHERE product_id = $1
`

func (q *Queries) DeleteProduct(ctx context.Context, productID uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteProduct, productID)
	return err
}

const getProductsByIds = `-- name: GetProductsByIds :many
SELECT product_id, title, quantity, price, category FROM products WHERE product_id = ANY($1::uuid[])
`

func (q *Queries) GetProductsByIds(ctx context.Context, dollar_1 []uuid.UUID) ([]Product, error) {
	rows, err := q.db.Query(ctx, getProductsByIds, dollar_1)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Product{}
	for rows.Next() {
		var i Product
		if err := rows.Scan(
			&i.ProductID,
			&i.Title,
			&i.Quantity,
			&i.Price,
			&i.Category,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listProducts = `-- name: ListProducts :many
SELECT product_id, quantity, price FROM products LIMIT $1
`

type ListProductsRow struct {
	ProductID uuid.UUID `json:"product_id"`
	Quantity  int32     `json:"quantity"`
	Price     int32     `json:"price"`
}

func (q *Queries) ListProducts(ctx context.Context, limit int32) ([]ListProductsRow, error) {
	rows, err := q.db.Query(ctx, listProducts, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ListProductsRow{}
	for rows.Next() {
		var i ListProductsRow
		if err := rows.Scan(&i.ProductID, &i.Quantity, &i.Price); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateProduct = `-- name: UpdateProduct :one
UPDATE products
SET
    title = title,
    category = category,
    quantity = quantity + $2,
    price = $3
WHERE
    product_id = $1 RETURNING product_id, title, quantity, price, category
`

type UpdateProductParams struct {
	ProductID uuid.UUID `json:"product_id"`
	Quantity  int32     `json:"quantity"`
	Price     int32     `json:"price"`
}

func (q *Queries) UpdateProduct(ctx context.Context, arg UpdateProductParams) (Product, error) {
	row := q.db.QueryRow(ctx, updateProduct, arg.ProductID, arg.Quantity, arg.Price)
	var i Product
	err := row.Scan(
		&i.ProductID,
		&i.Title,
		&i.Quantity,
		&i.Price,
		&i.Category,
	)
	return i, err
}

const updateProductPrice = `-- name: UpdateProductPrice :one
UPDATE products SET price = price WHERE product_id = $1 RETURNING product_id, title, quantity, price, category
`

func (q *Queries) UpdateProductPrice(ctx context.Context, productID uuid.UUID) (Product, error) {
	row := q.db.QueryRow(ctx, updateProductPrice, productID)
	var i Product
	err := row.Scan(
		&i.ProductID,
		&i.Title,
		&i.Quantity,
		&i.Price,
		&i.Category,
	)
	return i, err
}

const updateProductQuantity = `-- name: UpdateProductQuantity :one
UPDATE products
SET
    quantity = quantity + $2
WHERE
    product_id = $1 RETURNING product_id, title, quantity, price, category
`

type UpdateProductQuantityParams struct {
	ProductID uuid.UUID `json:"product_id"`
	Quantity  int32     `json:"quantity"`
}

func (q *Queries) UpdateProductQuantity(ctx context.Context, arg UpdateProductQuantityParams) (Product, error) {
	row := q.db.QueryRow(ctx, updateProductQuantity, arg.ProductID, arg.Quantity)
	var i Product
	err := row.Scan(
		&i.ProductID,
		&i.Title,
		&i.Quantity,
		&i.Price,
		&i.Category,
	)
	return i, err
}
