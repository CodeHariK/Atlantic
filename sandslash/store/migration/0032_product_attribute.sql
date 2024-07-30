-- +goose Up

-- Create the attributes table with a variant_id
CREATE TABLE IF NOT EXISTS "attributes" (
    "id" SERIAL PRIMARY KEY,
    "attribute_name" VARCHAR(255) NOT NULL,
    "attribute_value" VARCHAR(255) NOT NULL
);

-- Create indexes for the attributes table
CREATE INDEX IF NOT EXISTS idx_attribute_name ON "attributes" ("attribute_name");

CREATE INDEX IF NOT EXISTS idx_attribute_value ON "attributes" ("attribute_value");

-- +goose Down
DROP TABLE IF EXISTS "attributes";