-- +goose Up

-- Create "product_reviews" table
CREATE TABLE IF NOT EXISTS "product_reviews" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "product_id" INTEGER NOT NULL REFERENCES "products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "seller_id" INT NOT NULL REFERENCES "seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "rating" INTEGER NOT NULL,
    "comment" INTEGER
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON "product_reviews" ("product_id");

CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON "product_reviews" ("user_id");

-- +goose Down
DROP TABLE IF EXISTS "product_reviews";