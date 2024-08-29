-- +goose Up

-- Create "seller" table
CREATE TABLE IF NOT EXISTS "seller" (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "location" UUID REFERENCES "locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
DROP TABLE IF EXISTS "seller";