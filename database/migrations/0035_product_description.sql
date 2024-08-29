-- +goose Up

-- Create the products table
CREATE TABLE IF NOT EXISTS "product_description" (
    "id" UUID PRIMARY KEY,
    "product_id" UUID NOT NULL REFERENCES "products" ("id") ON DELETE CASCADE,
    "variant_id" UUID REFERENCES "product_variants" ("id") ON DELETE CASCADE,
    "description" VARCHAR(2048),
    "images" VARCHAR(1024) [],
    "videos" VARCHAR(1024) [],
    CONSTRAINT "unique_description_per_variant" UNIQUE (
        "product_id",
        "variant_id"
    )
);

CREATE UNIQUE INDEX unique_description_per_product ON "product_description" ("product_id")
WHERE
    "variant_id" IS NULL;

-- +goose Down
DROP TABLE IF EXISTS "product_description";