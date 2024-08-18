-- +goose Up

INSERT INTO
    "locations" (
        "address",
        "city",
        "state",
        "country",
        "postal_code",
        "latitude",
        "longitude"
    )
VALUES (
        '789 Oak St',
        'Spring',
        'Antarctic',
        'USA',
        '90001',
        34.0522,
        -118.2437
    );

INSERT INTO
    "users" (
        "username",
        "password_hash",
        "email",
        "phone_number",
        "gender",
        "is_admin",
        "date_of_birth",
        "location"
    )
VALUES (
        '123',
        '$2a$10$WRvV0s.re29MDH7e4EM3eeWosEgrNI176.kNyVoD6eHcVDu/Nq.aG',
        '123@123.com',
        '5551234567',
        'F',
        FALSE,
        '1988-03-22',
        1
    );