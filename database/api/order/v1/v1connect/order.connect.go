// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: order/v1/order.proto

package v1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1 "github.com/codeharik/Atlantic/database/api/order/v1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion1_13_0

const (
	// OrderServiceName is the fully-qualified name of the OrderService service.
	OrderServiceName = "order.v1.OrderService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// OrderServiceCreateOrderProcedure is the fully-qualified name of the OrderService's CreateOrder
	// RPC.
	OrderServiceCreateOrderProcedure = "/order.v1.OrderService/CreateOrder"
	// OrderServiceCreateOrderItemProcedure is the fully-qualified name of the OrderService's
	// CreateOrderItem RPC.
	OrderServiceCreateOrderItemProcedure = "/order.v1.OrderService/CreateOrderItem"
	// OrderServiceDeleteOrderByIDProcedure is the fully-qualified name of the OrderService's
	// DeleteOrderByID RPC.
	OrderServiceDeleteOrderByIDProcedure = "/order.v1.OrderService/DeleteOrderByID"
	// OrderServiceDeleteOrderItemByIDProcedure is the fully-qualified name of the OrderService's
	// DeleteOrderItemByID RPC.
	OrderServiceDeleteOrderItemByIDProcedure = "/order.v1.OrderService/DeleteOrderItemByID"
	// OrderServiceGetOrderByIDProcedure is the fully-qualified name of the OrderService's GetOrderByID
	// RPC.
	OrderServiceGetOrderByIDProcedure = "/order.v1.OrderService/GetOrderByID"
	// OrderServiceGetOrderItemByIDProcedure is the fully-qualified name of the OrderService's
	// GetOrderItemByID RPC.
	OrderServiceGetOrderItemByIDProcedure = "/order.v1.OrderService/GetOrderItemByID"
	// OrderServiceGetOrderItemsByOrderIDProcedure is the fully-qualified name of the OrderService's
	// GetOrderItemsByOrderID RPC.
	OrderServiceGetOrderItemsByOrderIDProcedure = "/order.v1.OrderService/GetOrderItemsByOrderID"
	// OrderServiceGetOrdersByUserIDProcedure is the fully-qualified name of the OrderService's
	// GetOrdersByUserID RPC.
	OrderServiceGetOrdersByUserIDProcedure = "/order.v1.OrderService/GetOrdersByUserID"
	// OrderServiceUpdateOrderPaymentStatusProcedure is the fully-qualified name of the OrderService's
	// UpdateOrderPaymentStatus RPC.
	OrderServiceUpdateOrderPaymentStatusProcedure = "/order.v1.OrderService/UpdateOrderPaymentStatus"
	// OrderServiceUpdateOrderStatusProcedure is the fully-qualified name of the OrderService's
	// UpdateOrderStatus RPC.
	OrderServiceUpdateOrderStatusProcedure = "/order.v1.OrderService/UpdateOrderStatus"
)

// These variables are the protoreflect.Descriptor objects for the RPCs defined in this package.
var (
	orderServiceServiceDescriptor                        = v1.File_order_v1_order_proto.Services().ByName("OrderService")
	orderServiceCreateOrderMethodDescriptor              = orderServiceServiceDescriptor.Methods().ByName("CreateOrder")
	orderServiceCreateOrderItemMethodDescriptor          = orderServiceServiceDescriptor.Methods().ByName("CreateOrderItem")
	orderServiceDeleteOrderByIDMethodDescriptor          = orderServiceServiceDescriptor.Methods().ByName("DeleteOrderByID")
	orderServiceDeleteOrderItemByIDMethodDescriptor      = orderServiceServiceDescriptor.Methods().ByName("DeleteOrderItemByID")
	orderServiceGetOrderByIDMethodDescriptor             = orderServiceServiceDescriptor.Methods().ByName("GetOrderByID")
	orderServiceGetOrderItemByIDMethodDescriptor         = orderServiceServiceDescriptor.Methods().ByName("GetOrderItemByID")
	orderServiceGetOrderItemsByOrderIDMethodDescriptor   = orderServiceServiceDescriptor.Methods().ByName("GetOrderItemsByOrderID")
	orderServiceGetOrdersByUserIDMethodDescriptor        = orderServiceServiceDescriptor.Methods().ByName("GetOrdersByUserID")
	orderServiceUpdateOrderPaymentStatusMethodDescriptor = orderServiceServiceDescriptor.Methods().ByName("UpdateOrderPaymentStatus")
	orderServiceUpdateOrderStatusMethodDescriptor        = orderServiceServiceDescriptor.Methods().ByName("UpdateOrderStatus")
)

// OrderServiceClient is a client for the order.v1.OrderService service.
type OrderServiceClient interface {
	CreateOrder(context.Context, *connect.Request[v1.CreateOrderRequest]) (*connect.Response[v1.CreateOrderResponse], error)
	CreateOrderItem(context.Context, *connect.Request[v1.CreateOrderItemRequest]) (*connect.Response[v1.CreateOrderItemResponse], error)
	DeleteOrderByID(context.Context, *connect.Request[v1.DeleteOrderByIDRequest]) (*connect.Response[v1.DeleteOrderByIDResponse], error)
	DeleteOrderItemByID(context.Context, *connect.Request[v1.DeleteOrderItemByIDRequest]) (*connect.Response[v1.DeleteOrderItemByIDResponse], error)
	GetOrderByID(context.Context, *connect.Request[v1.GetOrderByIDRequest]) (*connect.Response[v1.GetOrderByIDResponse], error)
	GetOrderItemByID(context.Context, *connect.Request[v1.GetOrderItemByIDRequest]) (*connect.Response[v1.GetOrderItemByIDResponse], error)
	GetOrderItemsByOrderID(context.Context, *connect.Request[v1.GetOrderItemsByOrderIDRequest]) (*connect.Response[v1.GetOrderItemsByOrderIDResponse], error)
	GetOrdersByUserID(context.Context, *connect.Request[v1.GetOrdersByUserIDRequest]) (*connect.Response[v1.GetOrdersByUserIDResponse], error)
	UpdateOrderPaymentStatus(context.Context, *connect.Request[v1.UpdateOrderPaymentStatusRequest]) (*connect.Response[v1.UpdateOrderPaymentStatusResponse], error)
	UpdateOrderStatus(context.Context, *connect.Request[v1.UpdateOrderStatusRequest]) (*connect.Response[v1.UpdateOrderStatusResponse], error)
}

// NewOrderServiceClient constructs a client for the order.v1.OrderService service. By default, it
// uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewOrderServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) OrderServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &orderServiceClient{
		createOrder: connect.NewClient[v1.CreateOrderRequest, v1.CreateOrderResponse](
			httpClient,
			baseURL+OrderServiceCreateOrderProcedure,
			connect.WithSchema(orderServiceCreateOrderMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		createOrderItem: connect.NewClient[v1.CreateOrderItemRequest, v1.CreateOrderItemResponse](
			httpClient,
			baseURL+OrderServiceCreateOrderItemProcedure,
			connect.WithSchema(orderServiceCreateOrderItemMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		deleteOrderByID: connect.NewClient[v1.DeleteOrderByIDRequest, v1.DeleteOrderByIDResponse](
			httpClient,
			baseURL+OrderServiceDeleteOrderByIDProcedure,
			connect.WithSchema(orderServiceDeleteOrderByIDMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		deleteOrderItemByID: connect.NewClient[v1.DeleteOrderItemByIDRequest, v1.DeleteOrderItemByIDResponse](
			httpClient,
			baseURL+OrderServiceDeleteOrderItemByIDProcedure,
			connect.WithSchema(orderServiceDeleteOrderItemByIDMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getOrderByID: connect.NewClient[v1.GetOrderByIDRequest, v1.GetOrderByIDResponse](
			httpClient,
			baseURL+OrderServiceGetOrderByIDProcedure,
			connect.WithSchema(orderServiceGetOrderByIDMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getOrderItemByID: connect.NewClient[v1.GetOrderItemByIDRequest, v1.GetOrderItemByIDResponse](
			httpClient,
			baseURL+OrderServiceGetOrderItemByIDProcedure,
			connect.WithSchema(orderServiceGetOrderItemByIDMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getOrderItemsByOrderID: connect.NewClient[v1.GetOrderItemsByOrderIDRequest, v1.GetOrderItemsByOrderIDResponse](
			httpClient,
			baseURL+OrderServiceGetOrderItemsByOrderIDProcedure,
			connect.WithSchema(orderServiceGetOrderItemsByOrderIDMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getOrdersByUserID: connect.NewClient[v1.GetOrdersByUserIDRequest, v1.GetOrdersByUserIDResponse](
			httpClient,
			baseURL+OrderServiceGetOrdersByUserIDProcedure,
			connect.WithSchema(orderServiceGetOrdersByUserIDMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		updateOrderPaymentStatus: connect.NewClient[v1.UpdateOrderPaymentStatusRequest, v1.UpdateOrderPaymentStatusResponse](
			httpClient,
			baseURL+OrderServiceUpdateOrderPaymentStatusProcedure,
			connect.WithSchema(orderServiceUpdateOrderPaymentStatusMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		updateOrderStatus: connect.NewClient[v1.UpdateOrderStatusRequest, v1.UpdateOrderStatusResponse](
			httpClient,
			baseURL+OrderServiceUpdateOrderStatusProcedure,
			connect.WithSchema(orderServiceUpdateOrderStatusMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
	}
}

// orderServiceClient implements OrderServiceClient.
type orderServiceClient struct {
	createOrder              *connect.Client[v1.CreateOrderRequest, v1.CreateOrderResponse]
	createOrderItem          *connect.Client[v1.CreateOrderItemRequest, v1.CreateOrderItemResponse]
	deleteOrderByID          *connect.Client[v1.DeleteOrderByIDRequest, v1.DeleteOrderByIDResponse]
	deleteOrderItemByID      *connect.Client[v1.DeleteOrderItemByIDRequest, v1.DeleteOrderItemByIDResponse]
	getOrderByID             *connect.Client[v1.GetOrderByIDRequest, v1.GetOrderByIDResponse]
	getOrderItemByID         *connect.Client[v1.GetOrderItemByIDRequest, v1.GetOrderItemByIDResponse]
	getOrderItemsByOrderID   *connect.Client[v1.GetOrderItemsByOrderIDRequest, v1.GetOrderItemsByOrderIDResponse]
	getOrdersByUserID        *connect.Client[v1.GetOrdersByUserIDRequest, v1.GetOrdersByUserIDResponse]
	updateOrderPaymentStatus *connect.Client[v1.UpdateOrderPaymentStatusRequest, v1.UpdateOrderPaymentStatusResponse]
	updateOrderStatus        *connect.Client[v1.UpdateOrderStatusRequest, v1.UpdateOrderStatusResponse]
}

// CreateOrder calls order.v1.OrderService.CreateOrder.
func (c *orderServiceClient) CreateOrder(ctx context.Context, req *connect.Request[v1.CreateOrderRequest]) (*connect.Response[v1.CreateOrderResponse], error) {
	return c.createOrder.CallUnary(ctx, req)
}

// CreateOrderItem calls order.v1.OrderService.CreateOrderItem.
func (c *orderServiceClient) CreateOrderItem(ctx context.Context, req *connect.Request[v1.CreateOrderItemRequest]) (*connect.Response[v1.CreateOrderItemResponse], error) {
	return c.createOrderItem.CallUnary(ctx, req)
}

// DeleteOrderByID calls order.v1.OrderService.DeleteOrderByID.
func (c *orderServiceClient) DeleteOrderByID(ctx context.Context, req *connect.Request[v1.DeleteOrderByIDRequest]) (*connect.Response[v1.DeleteOrderByIDResponse], error) {
	return c.deleteOrderByID.CallUnary(ctx, req)
}

// DeleteOrderItemByID calls order.v1.OrderService.DeleteOrderItemByID.
func (c *orderServiceClient) DeleteOrderItemByID(ctx context.Context, req *connect.Request[v1.DeleteOrderItemByIDRequest]) (*connect.Response[v1.DeleteOrderItemByIDResponse], error) {
	return c.deleteOrderItemByID.CallUnary(ctx, req)
}

// GetOrderByID calls order.v1.OrderService.GetOrderByID.
func (c *orderServiceClient) GetOrderByID(ctx context.Context, req *connect.Request[v1.GetOrderByIDRequest]) (*connect.Response[v1.GetOrderByIDResponse], error) {
	return c.getOrderByID.CallUnary(ctx, req)
}

// GetOrderItemByID calls order.v1.OrderService.GetOrderItemByID.
func (c *orderServiceClient) GetOrderItemByID(ctx context.Context, req *connect.Request[v1.GetOrderItemByIDRequest]) (*connect.Response[v1.GetOrderItemByIDResponse], error) {
	return c.getOrderItemByID.CallUnary(ctx, req)
}

// GetOrderItemsByOrderID calls order.v1.OrderService.GetOrderItemsByOrderID.
func (c *orderServiceClient) GetOrderItemsByOrderID(ctx context.Context, req *connect.Request[v1.GetOrderItemsByOrderIDRequest]) (*connect.Response[v1.GetOrderItemsByOrderIDResponse], error) {
	return c.getOrderItemsByOrderID.CallUnary(ctx, req)
}

// GetOrdersByUserID calls order.v1.OrderService.GetOrdersByUserID.
func (c *orderServiceClient) GetOrdersByUserID(ctx context.Context, req *connect.Request[v1.GetOrdersByUserIDRequest]) (*connect.Response[v1.GetOrdersByUserIDResponse], error) {
	return c.getOrdersByUserID.CallUnary(ctx, req)
}

// UpdateOrderPaymentStatus calls order.v1.OrderService.UpdateOrderPaymentStatus.
func (c *orderServiceClient) UpdateOrderPaymentStatus(ctx context.Context, req *connect.Request[v1.UpdateOrderPaymentStatusRequest]) (*connect.Response[v1.UpdateOrderPaymentStatusResponse], error) {
	return c.updateOrderPaymentStatus.CallUnary(ctx, req)
}

// UpdateOrderStatus calls order.v1.OrderService.UpdateOrderStatus.
func (c *orderServiceClient) UpdateOrderStatus(ctx context.Context, req *connect.Request[v1.UpdateOrderStatusRequest]) (*connect.Response[v1.UpdateOrderStatusResponse], error) {
	return c.updateOrderStatus.CallUnary(ctx, req)
}

// OrderServiceHandler is an implementation of the order.v1.OrderService service.
type OrderServiceHandler interface {
	CreateOrder(context.Context, *connect.Request[v1.CreateOrderRequest]) (*connect.Response[v1.CreateOrderResponse], error)
	CreateOrderItem(context.Context, *connect.Request[v1.CreateOrderItemRequest]) (*connect.Response[v1.CreateOrderItemResponse], error)
	DeleteOrderByID(context.Context, *connect.Request[v1.DeleteOrderByIDRequest]) (*connect.Response[v1.DeleteOrderByIDResponse], error)
	DeleteOrderItemByID(context.Context, *connect.Request[v1.DeleteOrderItemByIDRequest]) (*connect.Response[v1.DeleteOrderItemByIDResponse], error)
	GetOrderByID(context.Context, *connect.Request[v1.GetOrderByIDRequest]) (*connect.Response[v1.GetOrderByIDResponse], error)
	GetOrderItemByID(context.Context, *connect.Request[v1.GetOrderItemByIDRequest]) (*connect.Response[v1.GetOrderItemByIDResponse], error)
	GetOrderItemsByOrderID(context.Context, *connect.Request[v1.GetOrderItemsByOrderIDRequest]) (*connect.Response[v1.GetOrderItemsByOrderIDResponse], error)
	GetOrdersByUserID(context.Context, *connect.Request[v1.GetOrdersByUserIDRequest]) (*connect.Response[v1.GetOrdersByUserIDResponse], error)
	UpdateOrderPaymentStatus(context.Context, *connect.Request[v1.UpdateOrderPaymentStatusRequest]) (*connect.Response[v1.UpdateOrderPaymentStatusResponse], error)
	UpdateOrderStatus(context.Context, *connect.Request[v1.UpdateOrderStatusRequest]) (*connect.Response[v1.UpdateOrderStatusResponse], error)
}

// NewOrderServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewOrderServiceHandler(svc OrderServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	orderServiceCreateOrderHandler := connect.NewUnaryHandler(
		OrderServiceCreateOrderProcedure,
		svc.CreateOrder,
		connect.WithSchema(orderServiceCreateOrderMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceCreateOrderItemHandler := connect.NewUnaryHandler(
		OrderServiceCreateOrderItemProcedure,
		svc.CreateOrderItem,
		connect.WithSchema(orderServiceCreateOrderItemMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceDeleteOrderByIDHandler := connect.NewUnaryHandler(
		OrderServiceDeleteOrderByIDProcedure,
		svc.DeleteOrderByID,
		connect.WithSchema(orderServiceDeleteOrderByIDMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceDeleteOrderItemByIDHandler := connect.NewUnaryHandler(
		OrderServiceDeleteOrderItemByIDProcedure,
		svc.DeleteOrderItemByID,
		connect.WithSchema(orderServiceDeleteOrderItemByIDMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceGetOrderByIDHandler := connect.NewUnaryHandler(
		OrderServiceGetOrderByIDProcedure,
		svc.GetOrderByID,
		connect.WithSchema(orderServiceGetOrderByIDMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceGetOrderItemByIDHandler := connect.NewUnaryHandler(
		OrderServiceGetOrderItemByIDProcedure,
		svc.GetOrderItemByID,
		connect.WithSchema(orderServiceGetOrderItemByIDMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceGetOrderItemsByOrderIDHandler := connect.NewUnaryHandler(
		OrderServiceGetOrderItemsByOrderIDProcedure,
		svc.GetOrderItemsByOrderID,
		connect.WithSchema(orderServiceGetOrderItemsByOrderIDMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceGetOrdersByUserIDHandler := connect.NewUnaryHandler(
		OrderServiceGetOrdersByUserIDProcedure,
		svc.GetOrdersByUserID,
		connect.WithSchema(orderServiceGetOrdersByUserIDMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceUpdateOrderPaymentStatusHandler := connect.NewUnaryHandler(
		OrderServiceUpdateOrderPaymentStatusProcedure,
		svc.UpdateOrderPaymentStatus,
		connect.WithSchema(orderServiceUpdateOrderPaymentStatusMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	orderServiceUpdateOrderStatusHandler := connect.NewUnaryHandler(
		OrderServiceUpdateOrderStatusProcedure,
		svc.UpdateOrderStatus,
		connect.WithSchema(orderServiceUpdateOrderStatusMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	return "/order.v1.OrderService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case OrderServiceCreateOrderProcedure:
			orderServiceCreateOrderHandler.ServeHTTP(w, r)
		case OrderServiceCreateOrderItemProcedure:
			orderServiceCreateOrderItemHandler.ServeHTTP(w, r)
		case OrderServiceDeleteOrderByIDProcedure:
			orderServiceDeleteOrderByIDHandler.ServeHTTP(w, r)
		case OrderServiceDeleteOrderItemByIDProcedure:
			orderServiceDeleteOrderItemByIDHandler.ServeHTTP(w, r)
		case OrderServiceGetOrderByIDProcedure:
			orderServiceGetOrderByIDHandler.ServeHTTP(w, r)
		case OrderServiceGetOrderItemByIDProcedure:
			orderServiceGetOrderItemByIDHandler.ServeHTTP(w, r)
		case OrderServiceGetOrderItemsByOrderIDProcedure:
			orderServiceGetOrderItemsByOrderIDHandler.ServeHTTP(w, r)
		case OrderServiceGetOrdersByUserIDProcedure:
			orderServiceGetOrdersByUserIDHandler.ServeHTTP(w, r)
		case OrderServiceUpdateOrderPaymentStatusProcedure:
			orderServiceUpdateOrderPaymentStatusHandler.ServeHTTP(w, r)
		case OrderServiceUpdateOrderStatusProcedure:
			orderServiceUpdateOrderStatusHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedOrderServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedOrderServiceHandler struct{}

func (UnimplementedOrderServiceHandler) CreateOrder(context.Context, *connect.Request[v1.CreateOrderRequest]) (*connect.Response[v1.CreateOrderResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.CreateOrder is not implemented"))
}

func (UnimplementedOrderServiceHandler) CreateOrderItem(context.Context, *connect.Request[v1.CreateOrderItemRequest]) (*connect.Response[v1.CreateOrderItemResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.CreateOrderItem is not implemented"))
}

func (UnimplementedOrderServiceHandler) DeleteOrderByID(context.Context, *connect.Request[v1.DeleteOrderByIDRequest]) (*connect.Response[v1.DeleteOrderByIDResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.DeleteOrderByID is not implemented"))
}

func (UnimplementedOrderServiceHandler) DeleteOrderItemByID(context.Context, *connect.Request[v1.DeleteOrderItemByIDRequest]) (*connect.Response[v1.DeleteOrderItemByIDResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.DeleteOrderItemByID is not implemented"))
}

func (UnimplementedOrderServiceHandler) GetOrderByID(context.Context, *connect.Request[v1.GetOrderByIDRequest]) (*connect.Response[v1.GetOrderByIDResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.GetOrderByID is not implemented"))
}

func (UnimplementedOrderServiceHandler) GetOrderItemByID(context.Context, *connect.Request[v1.GetOrderItemByIDRequest]) (*connect.Response[v1.GetOrderItemByIDResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.GetOrderItemByID is not implemented"))
}

func (UnimplementedOrderServiceHandler) GetOrderItemsByOrderID(context.Context, *connect.Request[v1.GetOrderItemsByOrderIDRequest]) (*connect.Response[v1.GetOrderItemsByOrderIDResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.GetOrderItemsByOrderID is not implemented"))
}

func (UnimplementedOrderServiceHandler) GetOrdersByUserID(context.Context, *connect.Request[v1.GetOrdersByUserIDRequest]) (*connect.Response[v1.GetOrdersByUserIDResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.GetOrdersByUserID is not implemented"))
}

func (UnimplementedOrderServiceHandler) UpdateOrderPaymentStatus(context.Context, *connect.Request[v1.UpdateOrderPaymentStatusRequest]) (*connect.Response[v1.UpdateOrderPaymentStatusResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.UpdateOrderPaymentStatus is not implemented"))
}

func (UnimplementedOrderServiceHandler) UpdateOrderStatus(context.Context, *connect.Request[v1.UpdateOrderStatusRequest]) (*connect.Response[v1.UpdateOrderStatusResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("order.v1.OrderService.UpdateOrderStatus is not implemented"))
}
