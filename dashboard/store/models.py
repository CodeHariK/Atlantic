# Code generated by sqlc. DO NOT EDIT.
# versions:
#   sqlc v1.27.0
import dataclasses
import datetime
from typing import Optional
import uuid


@dataclasses.dataclass()
class GooseDbVersion:
    id: int
    version_id: int
    is_applied: bool
    tstamp: datetime.datetime


@dataclasses.dataclass()
class Order:
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime
    price: int
    status: str
    payment_status: str


@dataclasses.dataclass()
class OrderItem:
    id: uuid.UUID
    order_id: uuid.UUID
    product_id: uuid.UUID
    quantity: int
    price: int


@dataclasses.dataclass()
class Product:
    id: uuid.UUID
    quantity: int
    price: int


@dataclasses.dataclass()
class ProductReview:
    id: uuid.UUID
    user_id: uuid.UUID
    product_id: uuid.UUID
    comment: Optional[str]
    rating: int
    created_at: datetime.datetime
    updated_at: datetime.datetime


@dataclasses.dataclass()
class User:
    id: uuid.UUID
    username: Optional[str]
    password_hash: Optional[str]
    email: Optional[str]
    verified: bool
    phone_number: Optional[str]
    gender: Optional[str]
    role: int
    date_of_birth: Optional[datetime.date]
    address: str
    balance: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
