package server

import (
	"context"
	"log"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/google/uuid"

	v1 "github.com/codeharik/Atlantic/account/api/account/v1"
	"github.com/codeharik/Atlantic/account/api/account/v1/v1connect"
)

type AccountServiceServer struct {
	v1connect.UnimplementedAccountServiceHandler

	cfg config.Config

	userStore *user.Queries

	validator *protovalidate.Validator
}

func CreateAccountServiceServer(cfg config.Config) AccountServiceServer {
	validator, err := protovalidate.New()
	if err != nil {
		log.Fatal(err)
	}

	return AccountServiceServer{
		cfg: cfg,

		validator: validator,
	}
}

func (a AccountServiceServer) AddBalance(ctx context.Context, req *connect.Request[v1.AddBalanceRequest]) (*connect.Response[v1.AddBalanceResponse], error) {
	colorlogger.Log("AddBalance", req.Msg)
	if err := a.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	uid, _ := uuid.Parse(req.Msg.UserID)

	balance, err := a.userStore.UpdateUserBalance(context.Background(), user.UpdateUserBalanceParams{
		ID:      uid,
		Balance: req.Msg.Amount,
	})
	colorlogger.Log(err)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(
			&v1.AddBalanceResponse{
				UserID:  req.Msg.UserID,
				Balance: balance,
			},
		),
		nil
}
