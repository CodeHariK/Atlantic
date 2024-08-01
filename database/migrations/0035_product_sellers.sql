-- +goose Up

-- Create the product_sellers table
CREATE TABLE IF NOT EXISTS "product_sellers" (
    "id" SERIAL PRIMARY KEY,
    "product_variant_id" INT NOT NULL REFERENCES "product_variants" ("id") ON DELETE CASCADE,
    "seller_id" INT NOT NULL REFERENCES "seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "price" BIGINT NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS "product_sellers";