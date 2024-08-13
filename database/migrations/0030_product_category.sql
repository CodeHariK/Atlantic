-- +goose Up

CREATE TABLE IF NOT EXISTS "product_category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL CHECK (CHAR_LENGTH("name") > 0 AND CHAR_LENGTH("name") < 32),
    "parent_id" INT REFERENCES "product_category" ("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_category_name ON "product_category" ("name");

-- +goose Down
DROP TABLE IF EXISTS "product_category";