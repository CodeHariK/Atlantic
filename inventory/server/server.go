package server

import (
	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/inventory/api/inventory/v1/v1connect"
	"github.com/codeharik/Atlantic/service/minio"
	"github.com/codeharik/Atlantic/service/nats"
)

type InventoryServiceServer struct {
	v1connect.UnimplementedInventoryServiceHandler

	cfg config.Config

	client *minio.MinioClient

	natClient *nats.NatsClient
}

func CreateInventoryServiceServer(cfg config.Config, minioClient *minio.MinioClient, natsConn *nats.NatsClient) InventoryServiceServer {
	inventoryService := InventoryServiceServer{
		cfg:       cfg,
		client:    minioClient,
		natClient: natsConn,
	}

	go inventoryService.Subscribe()

	return inventoryService
}
