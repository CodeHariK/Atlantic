package server

import (
	"context"
	"errors"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/config"
	v1 "github.com/codeharik/Atlantic/inventory/api/inventory/v1"
	"github.com/codeharik/Atlantic/inventory/api/inventory/v1/v1connect"
)

type InventoryServiceServer struct {
	v1connect.UnimplementedInventoryServiceHandler

	cfg config.Config
}

func CreateInventoryServiceServer() InventoryServiceServer {
	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	return InventoryServiceServer{
		cfg: cfg,
	}
}

func (c InventoryServiceServer) UploadImage(context.Context, *connect.Request[v1.UploadImageRequest]) (*connect.Response[v1.UploadImageResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("inventory.v1.InventoryService.UploadImage is not implemented"))
}
