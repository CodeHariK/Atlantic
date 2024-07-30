-- +goose Up

-- Create "order_items" table
CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER NOT NULL REFERENCES "orders" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "product_id" INTEGER NOT NULL REFERENCES "product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "seller_id" INTEGER NOT NULL REFERENCES "seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "quantity" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "currency" VARCHAR(12) NOT NULL DEFAULT 'USD' CHECK (
        "currency" IN (
            'USD',
            'INR',
            'BTC',
            'ETH',
            'SOL'
        )
    )
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON "order_items" ("order_id");

CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON "order_items" ("product_id");

-- +goose Down
DROP TABLE IF EXISTS "order_items";