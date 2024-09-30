-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID PRIMARY KEY,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price INTEGER NOT NULL CHECK (price > 0)
);

-- +goose Down
DROP TABLE IF EXISTS "products";