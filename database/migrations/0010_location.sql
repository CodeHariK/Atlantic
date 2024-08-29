-- +goose Up

-- Create "locations" table
CREATE TABLE IF NOT EXISTS "locations" (
    "id" UUID PRIMARY KEY,
    "address" VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH("address") > 0),
    "city" VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH("city") > 0),
    "state" VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH("state") > 0),
    "country" VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH("country") > 0),
    "postal_code" VARCHAR(20) NOT NULL CHECK (
        CHAR_LENGTH("postal_code") > 0
    ),
    "latitude" FLOAT NOT NULL CHECK ("latitude" BETWEEN -90 AND 90),
    "longitude" FLOAT NOT NULL CHECK (
        "longitude" BETWEEN -180 AND 180
    )
);

-- Create an index on the latitude and longitude for efficient spatial queries
CREATE INDEX IF NOT EXISTS idx_locations_latitude_longitude ON "locations" ("latitude", "longitude");

-- +goose Down

DROP TABLE IF EXISTS "locations";