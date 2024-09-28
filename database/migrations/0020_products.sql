-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS "products";