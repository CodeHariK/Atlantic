package server

import (
	"context"
	"errors"
	"fmt"
	"log"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/user"
	v1 "github.com/codeharik/Atlantic/orders/api/cart/v1"
	"github.com/codeharik/Atlantic/orders/api/cart/v1/v1connect"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/store"
	"go.temporal.io/sdk/client"
)

type CartServiceServer struct {
	v1connect.UnimplementedCartServiceHandler

	cfg       config.Config
	validator *protovalidate.Validator
	userStore *user.Queries

	natsClient *nats.NatsClient

	temporalClient client.Client
}

func CreateCartServiceServer(cfg config.Config, natsClient *nats.NatsClient, storeInstance store.Store, temporalClient client.Client) CartServiceServer {
	validator, err := protovalidate.New()
	if err != nil {
		log.Fatal(err)
	}

	cartService := CartServiceServer{
		cfg:            cfg,
		validator:      validator,
		natsClient:     natsClient,
		temporalClient: temporalClient,
		userStore:      storeInstance.UserStore,
	}

	natsClient.CreateOrdersStream(cfg)

	fmt.Println("---Temporal---")
	go cartService.Orderworker()
	go cartService.Moneyworker()
	fmt.Println("--------------")

	return cartService
}

// func (o CartServiceServer) PlaceOrder(ctx context.Context, req *connect.Request[v1.PlaceOrderRequest]) (*connect.Response[v1.PlaceOrderResponse], error) {
// 	fmt.Println(req.Msg)

// 	if err := o.validator.Validate(req.Msg); err != nil {
// 		return nil, connect.NewError(connect.CodeInternal, err)
// 	}

// 	data, err := protojson.Marshal(req.Msg)
// 	if err != nil {
// 		return nil, connect.NewError(connect.CodeInternal, err)
// 	}

// 	_, err = o.natsClient.Js.Publish(context.Background(), o.cfg.Nats.Topics.OrderPlaced, data)
// 	if err != nil {
// 		return nil, connect.NewError(connect.CodeInternal, err)
// 	}

// 	return connect.NewResponse(
// 			&v1.PlaceOrderResponse{},
// 		),
// 		nil
// }

func (o CartServiceServer) CreateCart(ctx context.Context, req *connect.Request[v1.CreateCartRequest]) (*connect.Response[v1.Cart], error) {
	// cb, ok := authbox.GetConnectBox(ctx)
	// if !ok {
	// 	return nil, authbox.InternalServerError
	// }

	// uid := cb.AccessObj.ID
	uid := "66173097-653b-400b-9e98-78830fdd630e"

	options := client.StartWorkflowOptions{
		ID:        "cart-" + uid,
		TaskQueue: "CART_TASK_QUEUE",
	}

	cart := v1.Cart{Items: []*v1.CartItem{}}
	we, err := o.temporalClient.ExecuteWorkflow(context.Background(), options, CartWorkflow, &cart)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	colorlogger.Log(we.GetID(), we.GetRunID())

	return connect.NewResponse(&v1.Cart{}), nil
}

func (o CartServiceServer) GetCart(ctx context.Context, req *connect.Request[v1.GetCartRequest]) (*connect.Response[v1.Cart], error) {
	// cb, ok := authbox.GetConnectBox(ctx)
	// if !ok {
	// 	return nil, authbox.InternalServerError
	// }

	// uid := cb.AccessObj.ID
	uid := "66173097-653b-400b-9e98-78830fdd630e"

	response, err := o.temporalClient.QueryWorkflow(context.Background(), "cart-"+uid, "", "getCart")
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	var cartState v1.Cart
	if err := response.Get(&cartState); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	colorlogger.Log("----query", cartState, err)

	return connect.NewResponse(&cartState), err
}

func (o CartServiceServer) UpdateCartItem(ctx context.Context, req *connect.Request[v1.CartItem]) (*connect.Response[v1.Cart], error) {
	// cb, ok := authbox.GetConnectBox(ctx)
	// if !ok {
	// 	return nil, authbox.InternalServerError
	// }

	// uid := cb.AccessObj.ID
	uid := "66173097-653b-400b-9e98-78830fdd630e"

	update := UpdateCartSignal{Item: req.Msg}

	err := o.temporalClient.SignalWorkflow(context.Background(), "cart-"+uid, "", SignalChannels.UPDATE_CART_CHANNEL, update)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&v1.Cart{}), err
}

func (o CartServiceServer) CheckoutCart(context.Context, *connect.Request[v1.CheckoutCartRequest]) (*connect.Response[v1.CheckoutCartResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("cart.v1.CartService.CheckoutCart is not implemented"))
}
