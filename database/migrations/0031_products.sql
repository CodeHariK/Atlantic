-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID PRIMARY KEY,
    "product_name" VARCHAR(255) UNIQUE CHECK (
        CHAR_LENGTH("product_name") > 0
    ),
    "category_id" UUID NOT NULL REFERENCES "product_category" ("id")
);

-- +goose Down
DROP TABLE IF EXISTS "products";