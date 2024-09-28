// Code generated by sqlc-connect (https://github.com/walterwanderley/sqlc-connect). DO NOT EDIT.

package cart

import (
	"google.golang.org/protobuf/types/known/timestamppb"

	pb "github.com/codeharik/Atlantic/database/api/cart/v1"
)

func toCart(in Cart) *pb.Cart {

	out := new(pb.Cart)
	out.Id = in.ID.String()
	out.UserId = in.UserID.String()
	if in.CreatedAt.Valid {
		out.CreatedAt = timestamppb.New(in.CreatedAt.Time)
	}
	if in.UpdatedAt.Valid {
		out.UpdatedAt = timestamppb.New(in.UpdatedAt.Time)
	}
	return out
}

func toCartItem(in CartItem) *pb.CartItem {

	out := new(pb.CartItem)
	out.Id = in.ID.String()
	out.CartId = in.CartID.String()
	out.ProductId = in.ProductID.String()
	out.Quantity = in.Quantity
	return out
}
