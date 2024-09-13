package server

import (
	"log"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/inventory/api/inventory/v1/v1connect"
	"github.com/codeharik/Atlantic/service/minio"
)

type InventoryServiceServer struct {
	v1connect.UnimplementedInventoryServiceHandler

	cfg config.Config

	client *minio.MinioClient
}

func CreateInventoryServiceServer(cfg config.Config) InventoryServiceServer {
	minioClient, err := minio.CreateClient(&cfg)
	if err != nil {
		log.Fatalln(err)
	}
	if err = minioClient.MakeBucket(cfg.Minio.Bucket.Products, "us-east-1"); err != nil {
		log.Fatalln(err)
	}

	if err = minioClient.PublicBucket(cfg.Minio.Bucket.Products); err != nil {
		log.Fatalln(err)
	}

	return InventoryServiceServer{
		cfg:    cfg,
		client: minioClient,
	}
}
