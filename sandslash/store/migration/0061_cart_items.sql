-- +goose Up

-- Create "cart_items" table
CREATE TABLE IF NOT EXISTS "cart_items" (
    "id" SERIAL PRIMARY KEY,
    "cart_id" INTEGER NOT NULL REFERENCES "carts" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "product_id" INTEGER NOT NULL REFERENCES "product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "quantity" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON "cart_items" ("cart_id");

-- +goose Down
DROP TABLE IF EXISTS "cart_items";