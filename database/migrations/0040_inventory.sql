-- +goose Up

-- Create "inventory" table
CREATE TABLE IF NOT EXISTS "inventory" (
    "id" UUID PRIMARY KEY,
    "variant_id" UUID NOT NULL REFERENCES "product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "seller_id" UUID NOT NULL REFERENCES "seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,


    "quantity" INTEGER NOT NULL,
    "amount_units" BIGINT NOT NULL,
    "amount_nanos" INTEGER NOT NULL,
    "amount_currency" VARCHAR(4) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inventory_seller_id_id ON "inventory" ("seller_id");

CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON "inventory" ("variant_id");

-- +goose Down
DROP TABLE IF EXISTS "inventory";