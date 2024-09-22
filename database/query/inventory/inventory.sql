-- name: AddToInventory :exec
INSERT INTO inventory (id, variant_id, seller_id, quantity, amount_units, amount_nanos, amount_currency)
VALUES ($1, $2, $3, $4, $5, $6, $7)
ON CONFLICT (id) DO UPDATE SET
    quantity = inventory.quantity + EXCLUDED.quantity;

-- name: RemoveFromInventory :exec
UPDATE inventory
SET quantity = quantity - $1
WHERE variant_id = $2 AND seller_id = $3 AND quantity >= $1
RETURNING quantity;

-- name: CheckIfQuantityExists :one
SELECT quantity >= $1 AS sufficient_quantity
FROM inventory
WHERE variant_id = $2 AND seller_id = $3;
