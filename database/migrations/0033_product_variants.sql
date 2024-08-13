-- +goose Up

-- Create the product_variants table
CREATE TABLE IF NOT EXISTS "product_variants" (
    "id" SERIAL PRIMARY KEY,
    "product_id" INT NOT NULL REFERENCES "products" ("id") ON DELETE CASCADE,
    "variant_name" VARCHAR(255) NOT NULL
);

-- Create indexes for the product_variants table
CREATE INDEX IF NOT EXISTS idx_variant_product_id ON "product_variants" ("product_id");

CREATE INDEX IF NOT EXISTS idx_variant_name ON "product_variants" ("variant_name");

-- +goose Down
DROP TABLE IF EXISTS "product_variants";