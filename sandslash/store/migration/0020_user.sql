-- +goose Up

-- Create "users" table
-- 024/07/23 - Create users table and trigger

-- Create the table
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "phone_number" VARCHAR(15) NOT NULL UNIQUE,
    "gender" VARCHAR(4) NOT NULL CHECK ("gender" IN ('M', 'F')),
    "is_admin" BOOLEAN DEFAULT FALSE NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" INTEGER REFERENCES "locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");

-- +goose Down

DROP TABLE IF EXISTS "users";