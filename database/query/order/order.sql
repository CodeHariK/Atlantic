-- name: CreateOrder :one
INSERT INTO
    orders (
        id,
        user_id,
        created_at,
        updated_at,
        amount_units,
        amount_nanos,
        amount_currency,
        status,
        payment_status
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
    ) RETURNING *;

-- name: UpdateOrderStatus :one
UPDATE orders
SET
    status = $2,
    updated_at = $3
WHERE
    id = $1 RETURNING *;

-- name: UpdateOrderPaymentStatus :one
UPDATE orders
SET
    payment_status = $2,
    updated_at = $3
WHERE
    id = $1 RETURNING *;

-- name: GetOrderByID :one
SELECT * FROM orders WHERE id = $1;

-- name: GetOrdersByUserID :many
SELECT * FROM orders WHERE user_id = $1;

-- name: DeleteOrderByID :exec
DELETE FROM orders WHERE id = $1;