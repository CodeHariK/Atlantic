-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "product_description" (
    "id" SERIAL PRIMARY KEY,
    "product_id" INT REFERENCES "products" ("id") ON DELETE CASCADE,
    "product_variant_id" INT REFERENCES "product_variants" ("id") ON DELETE CASCADE,
    "description" VARCHAR(2048),
    "images" VARCHAR(1024) [],
    "videos" VARCHAR(1024) [],
    CONSTRAINT "at_least_one_required" CHECK (
        "product_id" IS NOT NULL
        OR "product_variant_id" IS NOT NULL
    )
);

-- +goose Down
DROP TABLE IF EXISTS "product_description";