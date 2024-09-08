package server

import (
	"github.com/codeharik/Atlantic/config"
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
