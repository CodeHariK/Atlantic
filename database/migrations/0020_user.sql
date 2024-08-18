-- +goose Up

-- Create "users" table
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL CHECK (CHAR_LENGTH("username") > 0),
    "email" VARCHAR(255) UNIQUE NOT NULL CHECK (CHAR_LENGTH("email") > 0),
    "phone_number" VARCHAR(15) UNIQUE NOT NULL CHECK (CHAR_LENGTH("phone_number") > 0),
    "gender" VARCHAR(1) NOT NULL CHECK ("gender" IN ('M', 'F')),
    "is_admin" BOOLEAN DEFAULT FALSE NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" INTEGER REFERENCES "locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");

-- +goose Down

DROP TABLE IF EXISTS "users";