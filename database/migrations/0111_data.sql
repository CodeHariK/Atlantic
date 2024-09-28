-- +goose Up

-------------User-------------

INSERT INTO
    users (
        id,
        username,
        password_hash,
        email,
        verified,
        phone_number,
        gender,
        role,
        date_of_birth,
        address,
        balance
    )
VALUES (
        '66173097-653b-400b-9e98-78830fdd630e',
        '123',
        '$2a$10$WRvV0s.re29MDH7e4EM3eeWosEgrNI176.kNyVoD6eHcVDu/Nq.aG',
        '123@123.com',
        TRUE,
        '1234567890',
        'F',
        1,
        '1845-01-01',
        '123 Elm Street',
        1000
    );

-------------Product-------------

INSERT INTO
    products (id, quantity, price)
VALUES (
        '123e4567-e89b-12d3-a456-426614174000',
        100,
        50
    );

-------------Order-------------

INSERT INTO
    orders (
        id,
        user_id,
        price,
        status,
        payment_status
    )
VALUES (
        '443e4267-e89b-12d3-a456-426614174020',
        '66173097-653b-400b-9e98-78830fdd630e',
        40,
        'CONFIRMED',
        'PAID'
    ) RETURNING *;

INSERT INTO
    order_items (
        id,
        order_id,
        product_id,
        quantity,
        price
    )
VALUES (
        '443e4262-e89b-12d3-a456-426614174020',
        '443e4267-e89b-12d3-a456-426614174020',
        '123e4567-e89b-12d3-a456-426614174000',
        2,
        20
    ) RETURNING *;

-- +goose Down

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

TRUNCATE TABLE products RESTART IDENTITY CASCADE;

TRUNCATE TABLE orders RESTART IDENTITY CASCADE;

TRUNCATE TABLE order_items RESTART IDENTITY CASCADE;