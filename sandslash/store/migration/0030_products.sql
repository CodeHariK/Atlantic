-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL PRIMARY KEY,
    "product_name" VARCHAR(255) NOT NULL UNIQUE,
    "description" INTEGER NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS "products";