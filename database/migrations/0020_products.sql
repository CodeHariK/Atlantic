-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID PRIMARY KEY,
    title VARCHAR(128) NOT NULL CHECK (CHAR_LENGTH("title") > 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price INTEGER NOT NULL CHECK (price > 0),
    category VARCHAR(128) NOT NULL CHECK (CHAR_LENGTH("category") > 0)
);

-- +goose Down
DROP TABLE IF EXISTS "products";