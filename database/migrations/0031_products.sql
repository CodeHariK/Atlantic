-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "amount_units" BIGINT NOT NULL,
    "amount_nanos" INTEGER NOT NULL,
    "amount_currency" VARCHAR(4) NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS "products";