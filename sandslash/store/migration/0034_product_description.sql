-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "product_description" (
    "id" SERIAL PRIMARY KEY,
    "product_id" INT NOT NULL REFERENCES "products" ("id") ON DELETE CASCADE,
    "product_variant_id" INT REFERENCES "product_variants" ("id") ON DELETE CASCADE,
    "description" VARCHAR(2048),
    "images" VARCHAR(1024) [],
    "videos" VARCHAR(1024) [],
    CONSTRAINT "unique_description_per_variant" UNIQUE (
        "product_id",
        "product_variant_id"
    )
);

CREATE UNIQUE INDEX unique_description_per_product ON "product_description" ("product_id")
WHERE
    "product_variant_id" IS NULL;

-- +goose Down
DROP TABLE IF EXISTS "product_description";