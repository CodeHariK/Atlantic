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

-- +goose Down

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

TRUNCATE TABLE products RESTART IDENTITY CASCADE;

TRUNCATE TABLE locations RESTART IDENTITY CASCADE;