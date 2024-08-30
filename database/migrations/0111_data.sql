-- +goose Up

-------------Location-------------
INSERT INTO
    "locations" (
        "id",
        "address",
        "city",
        "state",
        "country",
        "postal_code",
        "latitude",
        "longitude"
    )
VALUES (
        '25173097-653b-400b-9e98-78830fdd630e',
        '789 Oak St',
        'Spring',
        'Antarctic',
        'USA',
        '90001',
        34.0522,
        -118.2437
    );

-------------User-------------
INSERT INTO
    "users" (
        "id",
        "username",
        "password_hash",
        "email",
        "phone_number",
        "gender",
        "role",
        "date_of_birth",
        "location"
    )
VALUES (
        '66173097-653b-400b-9e98-78830fdd630e',
        '123',
        '$2a$10$WRvV0s.re29MDH7e4EM3eeWosEgrNI176.kNyVoD6eHcVDu/Nq.aG',
        '123@123.com',
        '5551234567',
        'F',
        1,
        '1988-03-22',
        '25173097-653b-400b-9e98-78830fdd630e'
    );

-------------Seller-------------
INSERT INTO
    seller (id, name, location)
VALUES (
        '123e4567-e89b-12d3-a456-426614174000',
        'Dummy Seller',
        '25173097-653b-400b-9e98-78830fdd630e'
    );

-------------Category-------------

-- Insert top-level categories
INSERT INTO
    product_category (id, name, parent_id)
VALUES (1, 'Electronics', NULL),
    (2, 'Clothing', NULL);

-- Insert subcategories under 'Electronics'
INSERT INTO
    product_category (id, name, parent_id)
VALUES (4, 'Mobile Phones', 1),
    (5, 'Laptops', 1),
    (6, 'Mens Clothing', 2);

-- +goose Down

TRUNCATE TABLE product_comment RESTART IDENTITY CASCADE;

TRUNCATE TABLE product_reviews RESTART IDENTITY CASCADE;

TRUNCATE TABLE product_category RESTART IDENTITY CASCADE;

TRUNCATE TABLE seller RESTART IDENTITY CASCADE;

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

TRUNCATE TABLE products RESTART IDENTITY CASCADE;

TRUNCATE TABLE locations RESTART IDENTITY CASCADE;