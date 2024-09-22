package server

import (
	"context"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/config"
	v1 "github.com/codeharik/Atlantic/orders/api/orders/v1"
	"github.com/codeharik/Atlantic/orders/api/orders/v1/v1connect"
	"github.com/codeharik/Atlantic/service/nats"
	"google.golang.org/protobuf/encoding/protojson"
)

type OrdersServiceServer struct {
	v1connect.UnimplementedOrdersServiceHandler

	cfg config.Config

	natConn *nats.NatsClient
}

func CreateOrdersServiceServer(cfg config.Config, natsConn *nats.NatsClient) OrdersServiceServer {
	return OrdersServiceServer{
		cfg:     cfg,
		natConn: natsConn,
	}
}

func (o OrdersServiceServer) PlaceOrder(ctx context.Context, req *connect.Request[v1.PlaceOrderRequest]) (*connect.Response[v1.PlaceOrderResponse], error) {
	data, err := protojson.Marshal(req.Msg)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	err = o.natConn.Nc.Publish(o.cfg.Nats.Topics.OrderPlaced, data)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(
			&v1.PlaceOrderResponse{}),
		nil
}
