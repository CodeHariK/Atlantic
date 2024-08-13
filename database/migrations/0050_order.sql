-- +goose Up

-- Create "orders" table
CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    "amount.units" BIGINT NOT NULL,
    "amount.nanos" INTEGER NOT NULL,
    "amount.currency" VARCHAR(4) NOT NULL,

    "status" VARCHAR(12) NOT NULL DEFAULT 'PENDING' CHECK (
        "status" IN (
            'RETURNED',
            'CANCELED',
            'PENDING',
            'CONFIRMED',
            'PROCESSING',
            'SHIPPED',
            'DELIVERED'
        )
    ),

    "payment_status" VARCHAR(12) NOT NULL CHECK (
        "status" IN (
            'REFUNDED',
            'CASH_ON_DELIVERY',
            'PAID'
        )
    )
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON "orders" ("user_id");

-- +goose Down

DROP TABLE IF EXISTS "orders";