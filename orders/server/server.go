package server

import (
	"context"
	"fmt"
	"log"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	v1 "github.com/codeharik/Atlantic/orders/api/orders/v1"
	"github.com/codeharik/Atlantic/orders/api/orders/v1/v1connect"
	"github.com/codeharik/Atlantic/service/nats"
	"google.golang.org/protobuf/encoding/protojson"
)

type OrdersServiceServer struct {
	v1connect.UnimplementedOrdersServiceHandler

	cfg config.Config

	validator *protovalidate.Validator

	natsClient *nats.NatsClient
}

func CreateOrdersServiceServer(cfg config.Config, natsClient *nats.NatsClient) OrdersServiceServer {
	validator, err := protovalidate.New()
	if err != nil {
		log.Fatal(err)
	}

	natsClient.CreateOrdersStream(cfg)

	return OrdersServiceServer{
		cfg: cfg,

		validator: validator,

		natsClient: natsClient,
	}
}

func (o OrdersServiceServer) PlaceOrder(ctx context.Context, req *connect.Request[v1.PlaceOrderRequest]) (*connect.Response[v1.PlaceOrderResponse], error) {
	fmt.Println(req.Msg)

	if err := o.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	data, err := protojson.Marshal(req.Msg)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	_, err = o.natsClient.Js.Publish(context.Background(), o.cfg.Nats.Topics.OrderPlaced, data)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(
			&v1.PlaceOrderResponse{},
		),
		nil
}
