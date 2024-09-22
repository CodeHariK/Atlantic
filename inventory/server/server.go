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

	natConn *nats.NatsClient
}

func CreateInventoryServiceServer(cfg config.Config, minioClient *minio.MinioClient, natsConn *nats.NatsClient) InventoryServiceServer {
	return InventoryServiceServer{
		cfg:     cfg,
		client:  minioClient,
		natConn: natsConn,
	}
}
