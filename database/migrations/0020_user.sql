-- +goose Up

-- Create "users" table
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL CHECK (CHAR_LENGTH("username") > 0),
    "password_hash" VARCHAR(255), -- Nullable for OAuth users
    "email" VARCHAR(255) UNIQUE CHECK (CHAR_LENGTH("email") > 0),
    "phone_number" VARCHAR(15) UNIQUE CHECK (
        CHAR_LENGTH("phone_number") > 0
    ),
    "gender" CHAR(1) CHECK ("gender" IN ('M', 'F')),
    "is_admin" BOOLEAN DEFAULT FALSE NOT NULL,
    "date_of_birth" DATE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" INTEGER REFERENCES "locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL,
    CHECK (
        (
            "email" IS NOT NULL
            AND CHAR_LENGTH("email") > 0
        )
        OR (
            "phone_number" IS NOT NULL
            AND CHAR_LENGTH("phone_number") > 0
        )
    ) -- Ensure either email or phone number is provided
);

CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");

-- +goose Down

DROP TABLE IF EXISTS "users";