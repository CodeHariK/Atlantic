-- +goose Up

-- Create "users" table
CREATE TABLE IF NOT EXISTS "users" (
    "user_id" UUID PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE CHECK (CHAR_LENGTH("username") > 0),
    "password_hash" VARCHAR(255), -- Nullable for OAuth users
    "email" VARCHAR(255) UNIQUE CHECK (CHAR_LENGTH("email") > 0),
    "verified" BOOLEAN NOT NULL DEFAULT FALSE,
    "phone_number" VARCHAR(15) UNIQUE CHECK (
        CHAR_LENGTH("phone_number") > 0
    ),
    "gender" CHAR(1) CHECK ("gender" IN ('M', 'F')),
    "role" BIGINT NOT NULL DEFAULT 1 CHECK (role > 0),


    "date_of_birth" DATE,
    
    "address" VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH("address") > 0),
    "balance" INTEGER NOT NULL,
    CHECK (
        (
            "email" IS NOT NULL
            AND CHAR_LENGTH("email") > 0
        )
        OR (
            "phone_number" IS NOT NULL
            AND CHAR_LENGTH("phone_number") > 0
        )
    ), -- Ensure either email or phone number is provided
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");

-- +goose Down

DROP TABLE IF EXISTS "users";