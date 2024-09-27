-- +goose Up

-- Create "product_reviews" table
CREATE TABLE IF NOT EXISTS "product_reviews" (
    "id" UUID PRIMARY KEY,
    "user_id" UUID NOT NULL REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "product_id" UUID NOT NULL REFERENCES "products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON "product_reviews" ("product_id");

CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON "product_reviews" ("user_id");

-- Create "product_comment" table
CREATE TABLE IF NOT EXISTS "product_comment" (
    "id" UUID PRIMARY KEY REFERENCES "product_reviews" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "comment" VARCHAR(1024)
);

-- +goose Down
DROP TABLE IF EXISTS "product_reviews";

DROP TABLE IF EXISTS "product_comment";