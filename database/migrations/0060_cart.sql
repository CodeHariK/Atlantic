-- +goose Up

-- Create "carts" table
CREATE TABLE IF NOT EXISTS "carts" (
    "id" UUID PRIMARY KEY,
    "user_id" UUID NOT NULL REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_carts_user_id ON "carts" ("user_id");

-- +goose Down

DROP TABLE IF EXISTS "carts";