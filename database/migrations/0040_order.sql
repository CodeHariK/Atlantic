-- +goose Up

-- Create "orders" table
CREATE TABLE IF NOT EXISTS "orders" (
    "id" UUID PRIMARY KEY,
    "user_id" UUID NOT NULL REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    "amount_units" BIGINT NOT NULL,
    "amount_nanos" INTEGER NOT NULL,
    "amount_currency" VARCHAR(4) NOT NULL,


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