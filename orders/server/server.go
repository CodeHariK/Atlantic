package server

import (
	"context"
	"fmt"
	"log"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/database/store/orders"
	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/database/store/user"
	v1 "github.com/codeharik/Atlantic/orders/api/cart/v1"
	"github.com/codeharik/Atlantic/orders/api/cart/v1/v1connect"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/nats"
	"github.com/codeharik/Atlantic/service/store"
	"go.temporal.io/api/serviceerror"
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
	ordersStore   *orders.Queries
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
		ordersStore:   storeInstance.OrdersStore,
	}

	natsClient.CreateOrdersStream(cfg)

	fmt.Println("Starting Temporal Workers")
	go cartService.Orderworker()
	go cartService.Moneyworker()

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
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	uid := cb.AccessObj.ID
	// uid := "66173097-653b-400b-9e98-78830fdd630e"

	err := CreateCart(o, uid)
	if err != nil {
		return nil, connect.NewError(connect.CodeAborted, err)
	}

	return connect.NewResponse(&v1.Cart{}), nil
}

func CreateCart(o CartServiceServer, uid string) error {
	options := client.StartWorkflowOptions{
		ID:        "cart-" + uid,
		TaskQueue: "CART_TASK_QUEUE",
	}

	cart := v1.Cart{Items: []*v1.CartItem{}, UpdatedAt: timestamppb.Now()}

	we, err := o.temporalClient.ExecuteWorkflow(context.Background(), options, o.CartWorkflow, &cart)
	if err != nil {
		return err
	}

	colorlogger.Log(we.GetID(), we.GetRunID())
	return nil
}

func (o CartServiceServer) GetCart(ctx context.Context, req *connect.Request[v1.GetCartRequest]) (*connect.Response[v1.Cart], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	uid := cb.AccessObj.ID
	// uid := "66173097-653b-400b-9e98-78830fdd630e"

	cartState, err := GetCart(o, uid)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(cartState), err
}

func GetCart(o CartServiceServer, uid string) (*v1.Cart, error) {
	response, err := o.temporalClient.QueryWorkflow(context.Background(), "cart-"+uid, "", "getCart")
	if err != nil {
		return &v1.Cart{}, err
	}

	var cartState v1.Cart
	if err := response.Get(&cartState); err != nil {
		return &v1.Cart{}, err
	}
	return &cartState, nil
}

func (o CartServiceServer) UpdateCartItem(ctx context.Context, req *connect.Request[v1.CartItem]) (*connect.Response[v1.Cart], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	uid := cb.AccessObj.ID
	// uid := "66173097-653b-400b-9e98-78830fdd630e"
	cartWorkflowID := "cart-" + uid

	update, _ := protojson.Marshal(req.Msg)

	colorlogger.Log("update", update)

	err := o.temporalClient.SignalWorkflow(context.Background(), cartWorkflowID, "", SignalChannels.UPDATE_CART_CHANNEL, update)
	if err != nil {
		if _, isNotFound := err.(*serviceerror.NotFound); isNotFound {
			colorlogger.Log("isNotFound : ", isNotFound)

			err = CreateCart(o, uid)
			colorlogger.Log("server:createcart", err)
			if err != nil {
				return nil, connect.NewError(connect.CodeAborted, err)
			}

			err = o.temporalClient.SignalWorkflow(context.Background(), cartWorkflowID, "", SignalChannels.UPDATE_CART_CHANNEL, update)
			colorlogger.Log("server:updatecart", err)
			if err != nil {
				return nil, connect.NewError(connect.CodeInternal, err)
			}
		} else {
			// Handle other types of errors
			return nil, connect.NewError(connect.CodeInternal, err)
		}
	}

	cart, err := GetCart(o, uid)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(cart), err
}

func (o CartServiceServer) CheckoutCart(ctx context.Context, req *connect.Request[v1.CheckoutCartRequest]) (*connect.Response[v1.CheckoutCartResponse], error) {
	cb, ok := authbox.GetConnectBox(ctx)
	if !ok {
		return nil, authbox.InternalServerError
	}

	uid := cb.AccessObj.ID
	// uid := "66173097-653b-400b-9e98-78830fdd630e"
	err := CheckoutCart(o, uid)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&v1.CheckoutCartResponse{}), err
}

func CheckoutCart(o CartServiceServer, uid string) error {
	err := o.temporalClient.SignalWorkflow(context.Background(), "cart-"+uid, "", SignalChannels.CHECKOUT_CHANNEL, nil)
	if err != nil {
		return err
	}
	return nil
}
