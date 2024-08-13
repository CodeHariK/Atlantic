-- +goose Up

-- Create "order_items" table
CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER NOT NULL REFERENCES "orders" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "product_id" INTEGER NOT NULL REFERENCES "product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "seller_id" INTEGER NOT NULL REFERENCES "seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "quantity" INTEGER NOT NULL,

    "amount.units" BIGINT NOT NULL,
    "amount.nanos" INTEGER NOT NULL,
    "amount.currency" VARCHAR(4) NOT NULL,

    "status" VARCHAR(12) NOT NULL DEFAULT 'PENDING' CHECK (
        "status" IN (
            'RETURNED',
            'CANCELED',
            'PENDING',
            'CONFIRMED',
            'PROCESSING',
            'SHIPPED',
            'DELIVERED'
        )
    ),

    "payment_status" VARCHAR(12) NOT NULL CHECK (
        "status" IN (
            'REFUNDED',
            'CASH_ON_DELIVERY',
            'PAID'
        )
    )
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON "order_items" ("order_id");

CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON "order_items" ("product_id");

-- +goose Down
DROP TABLE IF EXISTS "order_items";