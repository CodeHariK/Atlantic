// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package orders

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type GooseDbVersion struct {
	ID        int32            `json:"id"`
	VersionID int64            `json:"version_id"`
	IsApplied bool             `json:"is_applied"`
	Tstamp    pgtype.Timestamp `json:"tstamp"`
}

type Order struct {
	ID            uuid.UUID        `json:"id"`
	UserID        uuid.UUID        `json:"user_id"`
	CreatedAt     pgtype.Timestamp `json:"created_at"`
	UpdatedAt     pgtype.Timestamp `json:"updated_at"`
	Price         int32            `json:"price"`
	Status        string           `json:"status"`
	PaymentStatus string           `json:"payment_status"`
}

type OrderItem struct {
	ID        uuid.UUID `json:"id"`
	OrderID   uuid.UUID `json:"order_id"`
	ProductID uuid.UUID `json:"product_id"`
	Quantity  int32     `json:"quantity"`
	Price     int32     `json:"price"`
}

type Product struct {
	ID       uuid.UUID `json:"id"`
	Title    string    `json:"title"`
	Quantity int32     `json:"quantity"`
	Price    int32     `json:"price"`
	Category string    `json:"category"`
}

type ProductReview struct {
	ID        uuid.UUID        `json:"id"`
	UserID    uuid.UUID        `json:"user_id"`
	ProductID uuid.UUID        `json:"product_id"`
	Comment   pgtype.Text      `json:"comment"`
	Rating    int32            `json:"rating"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

type User struct {
	ID           uuid.UUID        `json:"id"`
	Username     pgtype.Text      `json:"username"`
	PasswordHash pgtype.Text      `json:"password_hash"`
	Email        pgtype.Text      `json:"email"`
	Verified     bool             `json:"verified"`
	PhoneNumber  pgtype.Text      `json:"phone_number"`
	Gender       pgtype.Text      `json:"gender"`
	Role         int64            `json:"role"`
	DateOfBirth  pgtype.Date      `json:"date_of_birth"`
	Address      string           `json:"address"`
	Balance      int32            `json:"balance"`
	CreatedAt    pgtype.Timestamp `json:"created_at"`
	UpdatedAt    pgtype.Timestamp `json:"updated_at"`
}
