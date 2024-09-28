-- +goose Up

-- Create "order_items" table
CREATE TABLE IF NOT EXISTS "order_items" (
    "id" UUID PRIMARY KEY,
    "order_id" UUID NOT NULL REFERENCES "orders" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "product_id" UUID NOT NULL REFERENCES "products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON "order_items" ("order_id");

CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON "order_items" ("product_id");

-- +goose Down
DROP TABLE IF EXISTS "order_items";