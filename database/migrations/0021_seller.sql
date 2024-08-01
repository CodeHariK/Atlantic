-- +goose Up

-- Create "seller" table
CREATE TABLE IF NOT EXISTS "seller" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "location" INTEGER REFERENCES "locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);

-- +goose Down
DROP TABLE IF EXISTS "seller";