// Code generated by sqlc-connect (https://github.com/walterwanderley/sqlc-connect). DO NOT EDIT.

package user

import (
	"context"
	"fmt"
	"log/slog"

	"connectrpc.com/connect"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"

	pb "github.com/codeharik/Atlantic/database/api/user/v1"
	"github.com/codeharik/Atlantic/database/api/user/v1/v1connect"
	"github.com/codeharik/Atlantic/database/internal/validation"
)

type Service struct {
	v1connect.UnimplementedUserServiceHandler
	querier *Queries
}

func (s *Service) CreateUser(ctx context.Context, req *connect.Request[pb.CreateUserRequest]) (*connect.Response[pb.CreateUserResponse], error) {
	var arg CreateUserParams
	if v, err := uuid.Parse(req.Msg.GetUserId()); err != nil {
		err = fmt.Errorf("invalid UserID: %s%w", err.Error(), validation.ErrUserInput)
		return nil, err
	} else {
		arg.UserID = v
	}
	if v := req.Msg.GetUsername(); v != nil {
		arg.Username = pgtype.Text{Valid: true, String: v.Value}
	}
	if v := req.Msg.GetPasswordHash(); v != nil {
		arg.PasswordHash = pgtype.Text{Valid: true, String: v.Value}
	}
	if v := req.Msg.GetEmail(); v != nil {
		arg.Email = pgtype.Text{Valid: true, String: v.Value}
	}
	arg.Verified = req.Msg.GetVerified()
	if v := req.Msg.GetPhoneNumber(); v != nil {
		arg.PhoneNumber = pgtype.Text{Valid: true, String: v.Value}
	}
	if v := req.Msg.GetGender(); v != nil {
		arg.Gender = pgtype.Text{Valid: true, String: v.Value}
	}
	arg.Role = req.Msg.GetRole()
	if v := req.Msg.GetDateOfBirth(); v != nil {
		if err := v.CheckValid(); err != nil {
			err = fmt.Errorf("invalid DateOfBirth: %s%w", err.Error(), validation.ErrUserInput)
			return nil, err
		}
		if t := v.AsTime(); !t.IsZero() {
			arg.DateOfBirth.Valid = true
			arg.DateOfBirth.Time = t
		}
	}
	arg.Address = req.Msg.GetAddress()
	arg.Balance = req.Msg.GetBalance()

	err := s.querier.CreateUser(ctx, arg)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "CreateUser")
		return nil, err
	}
	return connect.NewResponse(&pb.CreateUserResponse{}), nil
}

func (s *Service) DeleteUser(ctx context.Context, req *connect.Request[pb.DeleteUserRequest]) (*connect.Response[pb.DeleteUserResponse], error) {
	var userID uuid.UUID
	if v, err := uuid.Parse(req.Msg.GetUserId()); err != nil {
		err = fmt.Errorf("invalid UserID: %s%w", err.Error(), validation.ErrUserInput)
		return nil, err
	} else {
		userID = v
	}

	err := s.querier.DeleteUser(ctx, userID)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "DeleteUser")
		return nil, err
	}
	return connect.NewResponse(&pb.DeleteUserResponse{}), nil
}

func (s *Service) GetUserByEmail(ctx context.Context, req *connect.Request[pb.GetUserByEmailRequest]) (*connect.Response[pb.GetUserByEmailResponse], error) {
	var email pgtype.Text
	if v := req.Msg.GetEmail(); v != nil {
		email = pgtype.Text{Valid: true, String: v.Value}
	}

	result, err := s.querier.GetUserByEmail(ctx, email)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "GetUserByEmail")
		return nil, err
	}
	return connect.NewResponse(&pb.GetUserByEmailResponse{User: toUser(result)}), nil
}

func (s *Service) GetUserByID(ctx context.Context, req *connect.Request[pb.GetUserByIDRequest]) (*connect.Response[pb.GetUserByIDResponse], error) {
	var userID uuid.UUID
	if v, err := uuid.Parse(req.Msg.GetUserId()); err != nil {
		err = fmt.Errorf("invalid UserID: %s%w", err.Error(), validation.ErrUserInput)
		return nil, err
	} else {
		userID = v
	}

	result, err := s.querier.GetUserByID(ctx, userID)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "GetUserByID")
		return nil, err
	}
	return connect.NewResponse(&pb.GetUserByIDResponse{User: toUser(result)}), nil
}

func (s *Service) GetUserByUsername(ctx context.Context, req *connect.Request[pb.GetUserByUsernameRequest]) (*connect.Response[pb.GetUserByUsernameResponse], error) {
	var username pgtype.Text
	if v := req.Msg.GetUsername(); v != nil {
		username = pgtype.Text{Valid: true, String: v.Value}
	}

	result, err := s.querier.GetUserByUsername(ctx, username)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "GetUserByUsername")
		return nil, err
	}
	return connect.NewResponse(&pb.GetUserByUsernameResponse{User: toUser(result)}), nil
}

func (s *Service) ListUsers(ctx context.Context, req *connect.Request[pb.ListUsersRequest]) (*connect.Response[pb.ListUsersResponse], error) {
	var arg ListUsersParams
	arg.Limit = req.Msg.GetLimit()
	arg.Offset = req.Msg.GetOffset()

	result, err := s.querier.ListUsers(ctx, arg)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "ListUsers")
		return nil, err
	}
	res := new(pb.ListUsersResponse)
	for _, r := range result {
		res.List = append(res.List, toListUsersRow(r))
	}
	return connect.NewResponse(res), nil
}

func (s *Service) UpdateUser(ctx context.Context, req *connect.Request[pb.UpdateUserRequest]) (*connect.Response[pb.UpdateUserResponse], error) {
	var arg UpdateUserParams
	if v := req.Msg.GetUsername(); v != nil {
		arg.Username = pgtype.Text{Valid: true, String: v.Value}
	}
	if v := req.Msg.GetEmail(); v != nil {
		arg.Email = pgtype.Text{Valid: true, String: v.Value}
	}
	if v := req.Msg.GetPhoneNumber(); v != nil {
		arg.PhoneNumber = pgtype.Text{Valid: true, String: v.Value}
	}
	arg.Verified = req.Msg.GetVerified()
	if v := req.Msg.GetGender(); v != nil {
		arg.Gender = pgtype.Text{Valid: true, String: v.Value}
	}
	arg.Role = req.Msg.GetRole()
	if v := req.Msg.GetDateOfBirth(); v != nil {
		if err := v.CheckValid(); err != nil {
			err = fmt.Errorf("invalid DateOfBirth: %s%w", err.Error(), validation.ErrUserInput)
			return nil, err
		}
		if t := v.AsTime(); !t.IsZero() {
			arg.DateOfBirth.Valid = true
			arg.DateOfBirth.Time = t
		}
	}
	if v, err := uuid.Parse(req.Msg.GetUserId()); err != nil {
		err = fmt.Errorf("invalid UserID: %s%w", err.Error(), validation.ErrUserInput)
		return nil, err
	} else {
		arg.UserID = v
	}

	err := s.querier.UpdateUser(ctx, arg)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "UpdateUser")
		return nil, err
	}
	return connect.NewResponse(&pb.UpdateUserResponse{}), nil
}

func (s *Service) UpdateUserBalance(ctx context.Context, req *connect.Request[pb.UpdateUserBalanceRequest]) (*connect.Response[pb.UpdateUserBalanceResponse], error) {
	var arg UpdateUserBalanceParams
	if v, err := uuid.Parse(req.Msg.GetUserId()); err != nil {
		err = fmt.Errorf("invalid UserID: %s%w", err.Error(), validation.ErrUserInput)
		return nil, err
	} else {
		arg.UserID = v
	}
	arg.Balance = req.Msg.GetBalance()

	result, err := s.querier.UpdateUserBalance(ctx, arg)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "UpdateUserBalance")
		return nil, err
	}
	return connect.NewResponse(&pb.UpdateUserBalanceResponse{Value: result}), nil
}

func (s *Service) UpdateUserPassword(ctx context.Context, req *connect.Request[pb.UpdateUserPasswordRequest]) (*connect.Response[pb.UpdateUserPasswordResponse], error) {
	var arg UpdateUserPasswordParams
	if v, err := uuid.Parse(req.Msg.GetUserId()); err != nil {
		err = fmt.Errorf("invalid UserID: %s%w", err.Error(), validation.ErrUserInput)
		return nil, err
	} else {
		arg.UserID = v
	}
	if v := req.Msg.GetPasswordHash(); v != nil {
		arg.PasswordHash = pgtype.Text{Valid: true, String: v.Value}
	}

	err := s.querier.UpdateUserPassword(ctx, arg)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "UpdateUserPassword")
		return nil, err
	}
	return connect.NewResponse(&pb.UpdateUserPasswordResponse{}), nil
}
