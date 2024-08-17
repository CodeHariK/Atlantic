// Code generated by sqlc-connect (https://github.com/walterwanderley/sqlc-connect). DO NOT EDIT.

package main

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpcreflect"
	"github.com/jackc/pgx/v5/pgxpool"

	product_v1connect "github.com/codeharik/Atlantic/database/api/product/v1/v1connect"
	seller_v1connect "github.com/codeharik/Atlantic/database/api/seller/v1/v1connect"
	user_v1connect "github.com/codeharik/Atlantic/database/api/user/v1/v1connect"
	product_app "github.com/codeharik/Atlantic/database/store/product"
	seller_app "github.com/codeharik/Atlantic/database/store/seller"
	user_app "github.com/codeharik/Atlantic/database/store/user"
)

func registerHandlers(mux *http.ServeMux, db *pgxpool.Pool, interceptors []connect.Interceptor) {
	productService := product_app.NewService(product_app.New(db))
	productPath, productHandler := product_v1connect.NewProductServiceHandler(productService,
		connect.WithInterceptors(
			interceptors...,
		),
	)
	mux.Handle(productPath, productHandler)
	sellerService := seller_app.NewService(seller_app.New(db))
	sellerPath, sellerHandler := seller_v1connect.NewSellerServiceHandler(sellerService,
		connect.WithInterceptors(
			interceptors...,
		),
	)
	mux.Handle(sellerPath, sellerHandler)
	userService := user_app.NewService(user_app.New(db))
	userPath, userHandler := user_v1connect.NewUserServiceHandler(userService,
		connect.WithInterceptors(
			interceptors...,
		),
	)
	mux.Handle(userPath, userHandler)

	reflector := grpcreflect.NewStaticReflector(
		product_v1connect.ProductServiceName,
		seller_v1connect.SellerServiceName,
		user_v1connect.UserServiceName,
	)
	mux.Handle(grpcreflect.NewHandlerV1(reflector))
	mux.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
}
