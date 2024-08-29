-- +goose Up

-- Create the promotions table
CREATE TABLE IF NOT EXISTS "product_promotions" (
    "id" UUID PRIMARY KEY,
    "variant_id" UUID NOT NULL REFERENCES "product_variants" ("id") ON DELETE SET NULL,
    "promotion_name" VARCHAR(255) NOT NULL,
    "discount" INT NOT NULL CHECK ("discount" < 100),
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS "product_promotions";