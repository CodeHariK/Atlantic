package server

import (
	"context"
	"fmt"
	"log"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/database/store/user"
	v1 "github.com/codeharik/Atlantic/orders/api/cart/v1"
	"github.com/codeharik/Atlantic/orders/api/cart/v1/v1connect"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/store"
	"go.temporal.io/sdk/client"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type CartServiceServer struct {
	v1connect.UnimplementedCartServiceHandler

	cfg       config.Config
	validator *protovalidate.Validator

	userStore     *user.Queries
	productStore  *product.Queries
	storeInstance store.Store

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

		storeInstance: storeInstance,
		userStore:     storeInstance.UserStore,
		productStore:  storeInstance.ProductStore,
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

	cart := v1.Cart{Items: []*v1.CartItem{}, UpdatedAt: timestamppb.Now()}
	we, err := o.temporalClient.ExecuteWorkflow(context.Background(), options, o.CartWorkflow, &cart)
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

	return connect.NewResponse(&cartState), err
}

func (o CartServiceServer) UpdateCartItem(ctx context.Context, req *connect.Request[v1.CartItem]) (*connect.Response[v1.Cart], error) {
	// cb, ok := authbox.GetConnectBox(ctx)
	// if !ok {
	// 	return nil, authbox.InternalServerError
	// }

	// uid := cb.AccessObj.ID
	uid := "66173097-653b-400b-9e98-78830fdd630e"

	update, _ := protojson.Marshal(req.Msg)

	colorlogger.Log("update", update)

	err := o.temporalClient.SignalWorkflow(context.Background(), "cart-"+uid, "", SignalChannels.UPDATE_CART_CHANNEL, update)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&v1.Cart{}), err
}

func (o CartServiceServer) CheckoutCart(context.Context, *connect.Request[v1.CheckoutCartRequest]) (*connect.Response[v1.CheckoutCartResponse], error) {
	uid := "66173097-653b-400b-9e98-78830fdd630e"

	err := o.temporalClient.SignalWorkflow(context.Background(), "cart-"+uid, "", SignalChannels.CHECKOUT_CHANNEL, nil)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&v1.CheckoutCartResponse{}), err
}
