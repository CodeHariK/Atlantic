// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package user

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type Attribute struct {
	ID             int32  `json:"id"`
	AttributeName  string `json:"attribute_name"`
	AttributeValue string `json:"attribute_value"`
}

type Cart struct {
	ID        uuid.UUID        `json:"id"`
	UserID    uuid.UUID        `json:"user_id"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

type CartItem struct {
	ID        uuid.UUID `json:"id"`
	CartID    uuid.UUID `json:"cart_id"`
	ProductID uuid.UUID `json:"product_id"`
	Quantity  int32     `json:"quantity"`
}

type GooseDbVersion struct {
	ID        int32            `json:"id"`
	VersionID int64            `json:"version_id"`
	IsApplied bool             `json:"is_applied"`
	Tstamp    pgtype.Timestamp `json:"tstamp"`
}

type Inventory struct {
	ID             uuid.UUID `json:"id"`
	VariantID      uuid.UUID `json:"variant_id"`
	SellerID       uuid.UUID `json:"seller_id"`
	Quantity       int32     `json:"quantity"`
	AmountUnits    int64     `json:"amount_units"`
	AmountNanos    int32     `json:"amount_nanos"`
	AmountCurrency string    `json:"amount_currency"`
}

type Location struct {
	ID         uuid.UUID `json:"id"`
	Address    string    `json:"address"`
	City       string    `json:"city"`
	State      string    `json:"state"`
	Country    string    `json:"country"`
	PostalCode string    `json:"postal_code"`
	Latitude   float64   `json:"latitude"`
	Longitude  float64   `json:"longitude"`
}

type Order struct {
	ID             uuid.UUID        `json:"id"`
	UserID         uuid.UUID        `json:"user_id"`
	CreatedAt      pgtype.Timestamp `json:"created_at"`
	UpdatedAt      pgtype.Timestamp `json:"updated_at"`
	AmountUnits    int64            `json:"amount_units"`
	AmountNanos    int32            `json:"amount_nanos"`
	AmountCurrency string           `json:"amount_currency"`
	Status         string           `json:"status"`
	PaymentStatus  string           `json:"payment_status"`
}

type OrderItem struct {
	ID             uuid.UUID `json:"id"`
	OrderID        uuid.UUID `json:"order_id"`
	ProductID      uuid.UUID `json:"product_id"`
	SellerID       uuid.UUID `json:"seller_id"`
	Quantity       int32     `json:"quantity"`
	AmountUnits    int64     `json:"amount_units"`
	AmountNanos    int32     `json:"amount_nanos"`
	AmountCurrency string    `json:"amount_currency"`
	Status         string    `json:"status"`
	PaymentStatus  string    `json:"payment_status"`
}

type Product struct {
	ID          uuid.UUID   `json:"id"`
	ProductName pgtype.Text `json:"product_name"`
	CategoryId1 int32       `json:"category_id1"`
	CategoryId2 int32       `json:"category_id2"`
	CategoryId3 pgtype.Int4 `json:"category_id3"`
	CategoryId4 pgtype.Int4 `json:"category_id4"`
}

type ProductAttribute struct {
	ID          uuid.UUID   `json:"id"`
	ProductID   uuid.UUID   `json:"product_id"`
	VariantID   pgtype.UUID `json:"variant_id"`
	AttributeID int32       `json:"attribute_id"`
}

type ProductCategory struct {
	ID       int32       `json:"id"`
	Name     string      `json:"name"`
	ParentID pgtype.Int4 `json:"parent_id"`
}

type ProductComment struct {
	ID      uuid.UUID   `json:"id"`
	Comment pgtype.Text `json:"comment"`
}

type ProductDescription struct {
	ID          uuid.UUID   `json:"id"`
	ProductID   uuid.UUID   `json:"product_id"`
	VariantID   pgtype.UUID `json:"variant_id"`
	Description pgtype.Text `json:"description"`
	Images      []string    `json:"images"`
	Videos      []string    `json:"videos"`
}

type ProductPromotion struct {
	ID            uuid.UUID   `json:"id"`
	VariantID     uuid.UUID   `json:"variant_id"`
	PromotionName string      `json:"promotion_name"`
	Discount      int32       `json:"discount"`
	StartDate     pgtype.Date `json:"start_date"`
	EndDate       pgtype.Date `json:"end_date"`
}

type ProductReview struct {
	ID        uuid.UUID        `json:"id"`
	UserID    uuid.UUID        `json:"user_id"`
	ProductID uuid.UUID        `json:"product_id"`
	SellerID  uuid.UUID        `json:"seller_id"`
	Rating    int32            `json:"rating"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

type ProductVariant struct {
	ID          uuid.UUID `json:"id"`
	ProductID   uuid.UUID `json:"product_id"`
	VariantName string    `json:"variant_name"`
}

type Seller struct {
	ID        uuid.UUID        `json:"id"`
	Name      string           `json:"name"`
	Location  pgtype.UUID      `json:"location"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

type User struct {
	ID           uuid.UUID        `json:"id"`
	Username     string           `json:"username"`
	PasswordHash pgtype.Text      `json:"password_hash"`
	Email        pgtype.Text      `json:"email"`
	PhoneNumber  pgtype.Text      `json:"phone_number"`
	Gender       pgtype.Text      `json:"gender"`
	Role         int32            `json:"role"`
	DateOfBirth  pgtype.Date      `json:"date_of_birth"`
	Location     pgtype.UUID      `json:"location"`
	CreatedAt    pgtype.Timestamp `json:"created_at"`
	UpdatedAt    pgtype.Timestamp `json:"updated_at"`
}
