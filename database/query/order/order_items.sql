-- name: CreateOrderItem :one
INSERT INTO
    order_items (
        id,
        order_id,
        product_id,
        quantity,
        amount_units,
        amount_nanos,
        amount_currency
    )
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

-- name: GetOrderItemByID :one
SELECT * FROM order_items WHERE id = $1;

-- name: GetOrderItemsByOrderID :many
SELECT * FROM order_items WHERE order_id = $1;

-- name: DeleteOrderItemByID :exec
DELETE FROM order_items WHERE id = $1;