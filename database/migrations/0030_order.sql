-- +goose Up

-- Create "orders" table
CREATE TABLE IF NOT EXISTS "orders" (
    "order_id" UUID PRIMARY KEY,
    "user_id" UUID NOT NULL REFERENCES "users" ("user_id") ON UPDATE NO ACTION ON DELETE CASCADE,
    
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    "price" INTEGER NOT NULL,


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
        "payment_status" IN (
            'REFUNDED',
            'CASH_ON_DELIVERY',
            'PAID'
        )
    )
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON "orders" ("user_id");

-- +goose Down

DROP TABLE IF EXISTS "orders";