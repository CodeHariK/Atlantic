// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: auth/v1/auth.proto

package v1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1 "github.com/codeharik/Atlantic/auth/api/auth/v1"
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
	// AuthServiceName is the fully-qualified name of the AuthService service.
	AuthServiceName = "auth.v1.AuthService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// AuthServiceEmailLoginProcedure is the fully-qualified name of the AuthService's EmailLogin RPC.
	AuthServiceEmailLoginProcedure = "/auth.v1.AuthService/EmailLogin"
	// AuthServiceRegisterUserProcedure is the fully-qualified name of the AuthService's RegisterUser
	// RPC.
	AuthServiceRegisterUserProcedure = "/auth.v1.AuthService/RegisterUser"
	// AuthServiceAuthRefreshProcedure is the fully-qualified name of the AuthService's AuthRefresh RPC.
	AuthServiceAuthRefreshProcedure = "/auth.v1.AuthService/AuthRefresh"
	// AuthServiceRevokeSessionProcedure is the fully-qualified name of the AuthService's RevokeSession
	// RPC.
	AuthServiceRevokeSessionProcedure = "/auth.v1.AuthService/RevokeSession"
	// AuthServiceAckRefreshSessionProcedure is the fully-qualified name of the AuthService's
	// AckRefreshSession RPC.
	AuthServiceAckRefreshSessionProcedure = "/auth.v1.AuthService/AckRefreshSession"
	// AuthServiceInvalidateAllSessionsProcedure is the fully-qualified name of the AuthService's
	// InvalidateAllSessions RPC.
	AuthServiceInvalidateAllSessionsProcedure = "/auth.v1.AuthService/InvalidateAllSessions"
)

// These variables are the protoreflect.Descriptor objects for the RPCs defined in this package.
var (
	authServiceServiceDescriptor                     = v1.File_auth_v1_auth_proto.Services().ByName("AuthService")
	authServiceEmailLoginMethodDescriptor            = authServiceServiceDescriptor.Methods().ByName("EmailLogin")
	authServiceRegisterUserMethodDescriptor          = authServiceServiceDescriptor.Methods().ByName("RegisterUser")
	authServiceAuthRefreshMethodDescriptor           = authServiceServiceDescriptor.Methods().ByName("AuthRefresh")
	authServiceRevokeSessionMethodDescriptor         = authServiceServiceDescriptor.Methods().ByName("RevokeSession")
	authServiceAckRefreshSessionMethodDescriptor     = authServiceServiceDescriptor.Methods().ByName("AckRefreshSession")
	authServiceInvalidateAllSessionsMethodDescriptor = authServiceServiceDescriptor.Methods().ByName("InvalidateAllSessions")
)

// AuthServiceClient is a client for the auth.v1.AuthService service.
type AuthServiceClient interface {
	EmailLogin(context.Context, *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error)
	RegisterUser(context.Context, *connect.Request[v1.RegisterUserRequest]) (*connect.Response[v1.RegisterUserResponse], error)
	AuthRefresh(context.Context, *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error)
	RevokeSession(context.Context, *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error)
	AckRefreshSession(context.Context, *connect.Request[v1.AckRefreshSessionRequest]) (*connect.Response[v1.AckRefreshSessionResponse], error)
	InvalidateAllSessions(context.Context, *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error)
}

// NewAuthServiceClient constructs a client for the auth.v1.AuthService service. By default, it uses
// the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewAuthServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) AuthServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &authServiceClient{
		emailLogin: connect.NewClient[v1.EmailLoginRequest, v1.EmailLoginResponse](
			httpClient,
			baseURL+AuthServiceEmailLoginProcedure,
			connect.WithSchema(authServiceEmailLoginMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		registerUser: connect.NewClient[v1.RegisterUserRequest, v1.RegisterUserResponse](
			httpClient,
			baseURL+AuthServiceRegisterUserProcedure,
			connect.WithSchema(authServiceRegisterUserMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		authRefresh: connect.NewClient[v1.RefreshRequest, v1.RefreshResponse](
			httpClient,
			baseURL+AuthServiceAuthRefreshProcedure,
			connect.WithSchema(authServiceAuthRefreshMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		revokeSession: connect.NewClient[v1.RevokeRequest, v1.RevokeResponse](
			httpClient,
			baseURL+AuthServiceRevokeSessionProcedure,
			connect.WithSchema(authServiceRevokeSessionMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		ackRefreshSession: connect.NewClient[v1.AckRefreshSessionRequest, v1.AckRefreshSessionResponse](
			httpClient,
			baseURL+AuthServiceAckRefreshSessionProcedure,
			connect.WithSchema(authServiceAckRefreshSessionMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		invalidateAllSessions: connect.NewClient[v1.InvalidateAllSessionsRequest, v1.InvalidateAllSessionsResponse](
			httpClient,
			baseURL+AuthServiceInvalidateAllSessionsProcedure,
			connect.WithSchema(authServiceInvalidateAllSessionsMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
	}
}

// authServiceClient implements AuthServiceClient.
type authServiceClient struct {
	emailLogin            *connect.Client[v1.EmailLoginRequest, v1.EmailLoginResponse]
	registerUser          *connect.Client[v1.RegisterUserRequest, v1.RegisterUserResponse]
	authRefresh           *connect.Client[v1.RefreshRequest, v1.RefreshResponse]
	revokeSession         *connect.Client[v1.RevokeRequest, v1.RevokeResponse]
	ackRefreshSession     *connect.Client[v1.AckRefreshSessionRequest, v1.AckRefreshSessionResponse]
	invalidateAllSessions *connect.Client[v1.InvalidateAllSessionsRequest, v1.InvalidateAllSessionsResponse]
}

// EmailLogin calls auth.v1.AuthService.EmailLogin.
func (c *authServiceClient) EmailLogin(ctx context.Context, req *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error) {
	return c.emailLogin.CallUnary(ctx, req)
}

// RegisterUser calls auth.v1.AuthService.RegisterUser.
func (c *authServiceClient) RegisterUser(ctx context.Context, req *connect.Request[v1.RegisterUserRequest]) (*connect.Response[v1.RegisterUserResponse], error) {
	return c.registerUser.CallUnary(ctx, req)
}

// AuthRefresh calls auth.v1.AuthService.AuthRefresh.
func (c *authServiceClient) AuthRefresh(ctx context.Context, req *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error) {
	return c.authRefresh.CallUnary(ctx, req)
}

// RevokeSession calls auth.v1.AuthService.RevokeSession.
func (c *authServiceClient) RevokeSession(ctx context.Context, req *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error) {
	return c.revokeSession.CallUnary(ctx, req)
}

// AckRefreshSession calls auth.v1.AuthService.AckRefreshSession.
func (c *authServiceClient) AckRefreshSession(ctx context.Context, req *connect.Request[v1.AckRefreshSessionRequest]) (*connect.Response[v1.AckRefreshSessionResponse], error) {
	return c.ackRefreshSession.CallUnary(ctx, req)
}

// InvalidateAllSessions calls auth.v1.AuthService.InvalidateAllSessions.
func (c *authServiceClient) InvalidateAllSessions(ctx context.Context, req *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error) {
	return c.invalidateAllSessions.CallUnary(ctx, req)
}

// AuthServiceHandler is an implementation of the auth.v1.AuthService service.
type AuthServiceHandler interface {
	EmailLogin(context.Context, *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error)
	RegisterUser(context.Context, *connect.Request[v1.RegisterUserRequest]) (*connect.Response[v1.RegisterUserResponse], error)
	AuthRefresh(context.Context, *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error)
	RevokeSession(context.Context, *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error)
	AckRefreshSession(context.Context, *connect.Request[v1.AckRefreshSessionRequest]) (*connect.Response[v1.AckRefreshSessionResponse], error)
	InvalidateAllSessions(context.Context, *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error)
}

// NewAuthServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewAuthServiceHandler(svc AuthServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	authServiceEmailLoginHandler := connect.NewUnaryHandler(
		AuthServiceEmailLoginProcedure,
		svc.EmailLogin,
		connect.WithSchema(authServiceEmailLoginMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authServiceRegisterUserHandler := connect.NewUnaryHandler(
		AuthServiceRegisterUserProcedure,
		svc.RegisterUser,
		connect.WithSchema(authServiceRegisterUserMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authServiceAuthRefreshHandler := connect.NewUnaryHandler(
		AuthServiceAuthRefreshProcedure,
		svc.AuthRefresh,
		connect.WithSchema(authServiceAuthRefreshMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authServiceRevokeSessionHandler := connect.NewUnaryHandler(
		AuthServiceRevokeSessionProcedure,
		svc.RevokeSession,
		connect.WithSchema(authServiceRevokeSessionMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authServiceAckRefreshSessionHandler := connect.NewUnaryHandler(
		AuthServiceAckRefreshSessionProcedure,
		svc.AckRefreshSession,
		connect.WithSchema(authServiceAckRefreshSessionMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authServiceInvalidateAllSessionsHandler := connect.NewUnaryHandler(
		AuthServiceInvalidateAllSessionsProcedure,
		svc.InvalidateAllSessions,
		connect.WithSchema(authServiceInvalidateAllSessionsMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	return "/auth.v1.AuthService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case AuthServiceEmailLoginProcedure:
			authServiceEmailLoginHandler.ServeHTTP(w, r)
		case AuthServiceRegisterUserProcedure:
			authServiceRegisterUserHandler.ServeHTTP(w, r)
		case AuthServiceAuthRefreshProcedure:
			authServiceAuthRefreshHandler.ServeHTTP(w, r)
		case AuthServiceRevokeSessionProcedure:
			authServiceRevokeSessionHandler.ServeHTTP(w, r)
		case AuthServiceAckRefreshSessionProcedure:
			authServiceAckRefreshSessionHandler.ServeHTTP(w, r)
		case AuthServiceInvalidateAllSessionsProcedure:
			authServiceInvalidateAllSessionsHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedAuthServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedAuthServiceHandler struct{}

func (UnimplementedAuthServiceHandler) EmailLogin(context.Context, *connect.Request[v1.EmailLoginRequest]) (*connect.Response[v1.EmailLoginResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.AuthService.EmailLogin is not implemented"))
}

func (UnimplementedAuthServiceHandler) RegisterUser(context.Context, *connect.Request[v1.RegisterUserRequest]) (*connect.Response[v1.RegisterUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.AuthService.RegisterUser is not implemented"))
}

func (UnimplementedAuthServiceHandler) AuthRefresh(context.Context, *connect.Request[v1.RefreshRequest]) (*connect.Response[v1.RefreshResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.AuthService.AuthRefresh is not implemented"))
}

func (UnimplementedAuthServiceHandler) RevokeSession(context.Context, *connect.Request[v1.RevokeRequest]) (*connect.Response[v1.RevokeResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.AuthService.RevokeSession is not implemented"))
}

func (UnimplementedAuthServiceHandler) AckRefreshSession(context.Context, *connect.Request[v1.AckRefreshSessionRequest]) (*connect.Response[v1.AckRefreshSessionResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.AuthService.AckRefreshSession is not implemented"))
}

func (UnimplementedAuthServiceHandler) InvalidateAllSessions(context.Context, *connect.Request[v1.InvalidateAllSessionsRequest]) (*connect.Response[v1.InvalidateAllSessionsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.AuthService.InvalidateAllSessions is not implemented"))
}
