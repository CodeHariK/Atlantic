-- +goose Up

-- Create the promotions table
CREATE TABLE IF NOT EXISTS "product_promotions" (
    "id" SERIAL PRIMARY KEY,
    "promotion_name" VARCHAR(255) NOT NULL,
    "discount" INT NOT NULL CHECK ("discount" < 100),
    "product_id" INT NOT NULL REFERENCES "product_variants" ("id") ON DELETE SET NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS "product_promotions";