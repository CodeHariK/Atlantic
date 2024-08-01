-- +goose Up

-- Create "product_reviews" table
CREATE TABLE IF NOT EXISTS "product_comment" (
    "id" SERIAL PRIMARY KEY REFERENCES "product_reviews" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "comment" VARCHAR(1024),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
DROP TABLE IF EXISTS "product_comment";