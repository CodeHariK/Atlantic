// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package product

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Attribute struct {
	ID             int32  `json:"id"`
	AttributeName  string `json:"attribute_name"`
	AttributeValue string `json:"attribute_value"`
}

type Cart struct {
	ID        int32            `json:"id"`
	UserID    pgtype.UUID      `json:"user_id"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

type CartItem struct {
	ID        int32 `json:"id"`
	CartID    int32 `json:"cart_id"`
	ProductID int32 `json:"product_id"`
	Quantity  int32 `json:"quantity"`
}

type GooseDbVersion struct {
	ID        int32            `json:"id"`
	VersionID int64            `json:"version_id"`
	IsApplied bool             `json:"is_applied"`
	Tstamp    pgtype.Timestamp `json:"tstamp"`
}

type Inventory struct {
	ID             int32  `json:"id"`
	ProductID      int32  `json:"product_id"`
	SellerID       int32  `json:"seller_id"`
	Quantity       int32  `json:"quantity"`
	AmountUnits    int64  `json:"amount_units"`
	AmountNanos    int32  `json:"amount_nanos"`
	AmountCurrency string `json:"amount_currency"`
}

type Location struct {
	ID         int32   `json:"id"`
	Address    string  `json:"address"`
	City       string  `json:"city"`
	State      string  `json:"state"`
	Country    string  `json:"country"`
	PostalCode string  `json:"postal_code"`
	Latitude   float64 `json:"latitude"`
	Longitude  float64 `json:"longitude"`
}

type Order struct {
	ID             int32            `json:"id"`
	UserID         pgtype.UUID      `json:"user_id"`
	CreatedAt      pgtype.Timestamp `json:"created_at"`
	UpdatedAt      pgtype.Timestamp `json:"updated_at"`
	AmountUnits    int64            `json:"amount_units"`
	AmountNanos    int32            `json:"amount_nanos"`
	AmountCurrency string           `json:"amount_currency"`
	Status         string           `json:"status"`
	PaymentStatus  string           `json:"payment_status"`
}

type OrderItem struct {
	ID             int32  `json:"id"`
	OrderID        int32  `json:"order_id"`
	ProductID      int32  `json:"product_id"`
	SellerID       int32  `json:"seller_id"`
	Quantity       int32  `json:"quantity"`
	AmountUnits    int64  `json:"amount_units"`
	AmountNanos    int32  `json:"amount_nanos"`
	AmountCurrency string `json:"amount_currency"`
	Status         string `json:"status"`
	PaymentStatus  string `json:"payment_status"`
}

type Product struct {
	ID          int32       `json:"id"`
	ProductName pgtype.Text `json:"product_name"`
	CategoryID  int32       `json:"category_id"`
}

type ProductAttribute struct {
	ID          int32       `json:"id"`
	ProductID   int32       `json:"product_id"`
	VariantID   pgtype.Int4 `json:"variant_id"`
	AttributeID int32       `json:"attribute_id"`
}

type ProductCategory struct {
	ID       int32       `json:"id"`
	Name     string      `json:"name"`
	ParentID pgtype.Int4 `json:"parent_id"`
}

type ProductComment struct {
	ID        int32            `json:"id"`
	Comment   pgtype.Text      `json:"comment"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
}

type ProductDescription struct {
	ID               int32       `json:"id"`
	ProductID        int32       `json:"product_id"`
	ProductVariantID pgtype.Int4 `json:"product_variant_id"`
	Description      pgtype.Text `json:"description"`
	Images           []string    `json:"images"`
	Videos           []string    `json:"videos"`
}

type ProductPromotion struct {
	ID            int32       `json:"id"`
	PromotionName string      `json:"promotion_name"`
	Discount      int32       `json:"discount"`
	ProductID     int32       `json:"product_id"`
	StartDate     pgtype.Date `json:"start_date"`
	EndDate       pgtype.Date `json:"end_date"`
}

type ProductReview struct {
	ID        int32       `json:"id"`
	UserID    pgtype.UUID `json:"user_id"`
	ProductID int32       `json:"product_id"`
	SellerID  int32       `json:"seller_id"`
	Rating    int32       `json:"rating"`
	Comment   pgtype.Int4 `json:"comment"`
}

type ProductVariant struct {
	ID          int32  `json:"id"`
	ProductID   int32  `json:"product_id"`
	VariantName string `json:"variant_name"`
}

type Seller struct {
	ID       int32       `json:"id"`
	Name     string      `json:"name"`
	Location pgtype.Int4 `json:"location"`
}

type User struct {
	ID           pgtype.UUID      `json:"id"`
	Username     string           `json:"username"`
	PasswordHash pgtype.Text      `json:"password_hash"`
	Email        pgtype.Text      `json:"email"`
	PhoneNumber  pgtype.Text      `json:"phone_number"`
	Gender       pgtype.Text      `json:"gender"`
	IsAdmin      bool             `json:"is_admin"`
	DateOfBirth  pgtype.Date      `json:"date_of_birth"`
	CreatedAt    pgtype.Timestamp `json:"created_at"`
	UpdatedAt    pgtype.Timestamp `json:"updated_at"`
	Location     pgtype.Int4      `json:"location"`
}
