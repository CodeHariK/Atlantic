// Code generated by sqlc-connect (https://github.com/walterwanderley/sqlc-connect). DO NOT EDIT.

package user

import (
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"

	pb "github.com/codeharik/Atlantic/database/api/user/v1"
)

func toListUsersRow(in ListUsersRow) *pb.ListUsersRow {

	out := new(pb.ListUsersRow)
	out.UserId = in.UserID.String()
	if in.Username.Valid {
		out.Username = wrapperspb.String(in.Username.String)
	}
	if in.Email.Valid {
		out.Email = wrapperspb.String(in.Email.String)
	}
	if in.PhoneNumber.Valid {
		out.PhoneNumber = wrapperspb.String(in.PhoneNumber.String)
	}
	if in.Gender.Valid {
		out.Gender = wrapperspb.String(in.Gender.String)
	}
	out.Role = in.Role
	if in.DateOfBirth.Valid {
		out.DateOfBirth = timestamppb.New(in.DateOfBirth.Time)
	}
	if in.CreatedAt.Valid {
		out.CreatedAt = timestamppb.New(in.CreatedAt.Time)
	}
	if in.UpdatedAt.Valid {
		out.UpdatedAt = timestamppb.New(in.UpdatedAt.Time)
	}
	return out
}

func toUser(in User) *pb.User {

	out := new(pb.User)
	out.UserId = in.UserID.String()
	if in.Username.Valid {
		out.Username = wrapperspb.String(in.Username.String)
	}
	if in.PasswordHash.Valid {
		out.PasswordHash = wrapperspb.String(in.PasswordHash.String)
	}
	if in.Email.Valid {
		out.Email = wrapperspb.String(in.Email.String)
	}
	out.Verified = in.Verified
	if in.PhoneNumber.Valid {
		out.PhoneNumber = wrapperspb.String(in.PhoneNumber.String)
	}
	if in.Gender.Valid {
		out.Gender = wrapperspb.String(in.Gender.String)
	}
	out.Role = in.Role
	if in.DateOfBirth.Valid {
		out.DateOfBirth = timestamppb.New(in.DateOfBirth.Time)
	}
	out.Address = in.Address
	out.Balance = in.Balance
	if in.CreatedAt.Valid {
		out.CreatedAt = timestamppb.New(in.CreatedAt.Time)
	}
	if in.UpdatedAt.Valid {
		out.UpdatedAt = timestamppb.New(in.UpdatedAt.Time)
	}
	return out
}
