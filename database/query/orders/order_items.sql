-- name: CreateOrderItem :one
INSERT INTO
    order_items (
        orderitem_id,
        order_id,
        product_id,
        quantity,
        price
    )
VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: GetOrderItemByID :one
SELECT * FROM order_items WHERE orderitem_id = $1;

-- name: GetOrderItemsByOrderID :many
SELECT * FROM order_items WHERE order_id = $1;

-- name: DeleteOrderItemByID :exec
DELETE FROM order_items WHERE orderitem_id = $1;

-- name: CreateOrderWithItems :exec
WITH inserted_order AS (
    -- Insert into the orders table and return the order_id
    INSERT INTO orders (
        order_id,
        user_id,
        price,
        status,
        payment_status
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING order_id
)
-- Insert multiple order items using the order_id and UNNEST for variable input arrays
INSERT INTO order_items (
    orderitem_id,
    order_id,
    product_id,
    quantity,
    price
)
SELECT
    UNNEST($6::UUID[]) AS item_id,           -- Unnest array for item_id
    (SELECT order_id FROM inserted_order) AS order_id,  -- Use the order_id from the order insert
    UNNEST($7::UUID[]) AS product_id,        -- Unnest array for product_id
    UNNEST($8::INTEGER[]) AS quantity,       -- Unnest array for quantity
    UNNEST($9::INTEGER[]) AS price           -- Unnest array for price
;