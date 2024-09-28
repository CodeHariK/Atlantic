-- name: CreateCartItem :one
INSERT INTO
    cart_items (
        id,
        cart_id,
        product_id,
        quantity
    )
VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateCartItemQuantity :one
UPDATE cart_items SET quantity = $2 WHERE id = $1 RETURNING *;

-- name: GetCartItemByID :one
SELECT * FROM cart_items WHERE id = $1;

-- name: GetCartItemsByCartID :many
SELECT * FROM cart_items WHERE cart_id = $1;

-- name: DeleteCartItemByID :exec
DELETE FROM cart_items WHERE id = $1;