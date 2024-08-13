package database

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/grpcreflect"
	"github.com/jackc/pgx/v5/pgxpool"

	product_v1connect "github.com/codeharik/Atlantic/sandslash/api/product/v1/v1connect"
	seller_v1connect "github.com/codeharik/Atlantic/sandslash/api/seller/v1/v1connect"
	user_v1connect "github.com/codeharik/Atlantic/sandslash/api/user/v1/v1connect"
	product_app "github.com/codeharik/Atlantic/sandslash/store/product"
	seller_app "github.com/codeharik/Atlantic/sandslash/store/seller"
	user_app "github.com/codeharik/Atlantic/sandslash/store/user"
)

func RegisterHandlers(mux *http.ServeMux, db *pgxpool.Pool, option ...connect.HandlerOption) {
	productService := product_app.NewService(product_app.New(db))
	productPath, productHandler := product_v1connect.NewProductServiceHandler(productService,
		option...,
	)
	mux.Handle(productPath, productHandler)
	sellerService := seller_app.NewService(seller_app.New(db))
	sellerPath, sellerHandler := seller_v1connect.NewSellerServiceHandler(sellerService,
		option...,
	)
	mux.Handle(sellerPath, sellerHandler)
	userService := user_app.NewService(user_app.New(db))
	userPath, userHandler := user_v1connect.NewUserServiceHandler(userService,
		option...,
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
