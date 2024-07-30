-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL PRIMARY KEY,
    "product_name" VARCHAR(255) UNIQUE CHECK (CHAR_LENGTH("product_name") > 0)
);

-- +goose Down
DROP TABLE IF EXISTS "products";