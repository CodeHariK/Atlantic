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

-- +goose Down

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

TRUNCATE TABLE products RESTART IDENTITY CASCADE;

TRUNCATE TABLE locations RESTART IDENTITY CASCADE;