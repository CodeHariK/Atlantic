package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/inventory/server"
	"github.com/codeharik/Atlantic/service/dragon"
	"github.com/codeharik/Atlantic/service/servemux"
	"github.com/minio/minio-go/v7"
)

const serviceName = "inventory"

func InventoryServerFullUrl(config *config.Config) string {
	return fmt.Sprintf("http://%s:%d", config.InventoryService.Host, config.InventoryService.Port)
}

func InventoryServerPortUrl(config *config.Config) string {
	return fmt.Sprintf(":%d", config.InventoryService.Port)
}

func main() {
	cfg := config.LoadConfig("config.json", "../config/config.json")

	dragon := dragon.CreateDragon(&cfg)

	servemux.Serve(
		func(router *http.ServeMux) {
			server.CreateRoutes(serviceName, router, &cfg)
		},
		func() error { return nil },
		InventoryServerPortUrl(&cfg),
		InventoryServerFullUrl(&cfg),
		serviceName,
		&cfg,
		dragon,
	)

	// cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	// s3Client, err := minio.New(
	// 	cfg.Minio.Addr,
	// 	&minio.Options{
	// 		Creds:  credentials.NewStaticV4(cfg.Minio.Id, cfg.Minio.Secret, ""),
	// 		Secure: false,
	// 	})
	// if err != nil {
	// 	log.Fatalln(err)
	// }

	// makeBucket(s3Client, cfg.Minio.Bucket.Products, "us-east-1")
	// publicBucket(s3Client, cfg.Minio.Bucket.Products)
	// putObject(s3Client, cfg.Minio.Bucket.Products, "go.mod")
	// getObject(s3Client, cfg.Minio.Bucket.Products, "go.mod")
	// listObjects(s3Client, cfg.Minio.Bucket.Products)
}

func makeBucket(s3Client *minio.Client, bucketName string, region string) error {
	opts := minio.MakeBucketOptions{
		Region: region,
	}

	exists, err := s3Client.BucketExists(context.Background(), bucketName)
	if !exists && err == nil {
		err = s3Client.MakeBucket(context.Background(), bucketName, opts)
	}
	return err
}

func publicBucket(s3Client *minio.Client, bucketName string) error {
	bucketPolicy := fmt.Sprintf(`{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Principal": "*",
				"Action": "s3:GetObject",
				"Resource": "arn:aws:s3:::%s/*"
			}
		]
	}`, bucketName)

	// Set the bucket policy
	err := s3Client.SetBucketPolicy(context.Background(), bucketName, bucketPolicy)
	if err != nil {
		return fmt.Errorf("Failed to set bucket policy: %v", err)
	}

	fmt.Println("Bucket is now public and accessible for reading objects.")
	return nil
}

func putObject(s3Client *minio.Client, bucketName string, objectName string) {
	object, err := os.Open("go.mod")
	if err != nil {
		log.Fatalln(err)
	}
	defer object.Close()
	objectStat, err := object.Stat()
	if err != nil {
		log.Fatalln(err)
	}

	info, err := s3Client.PutObject(
		context.Background(),
		bucketName,
		objectName,
		object,
		objectStat.Size(),
		minio.PutObjectOptions{
			ContentType: "application/octet-stream",
			UserTags: map[string]string{
				"Tag1": "T1",
				"Tag2": "T2",
			},
		})
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("Uploaded", objectName, " of size: ", info.Size, "Successfully.")
}

func getObject(s3Client *minio.Client, bucketName string, objectName string) {
	object, err := s3Client.GetObject(context.Background(), bucketName, objectName, minio.GetObjectOptions{})
	if err != nil {
		log.Fatalln(err)
	}
	defer object.Close()

	// Now that the object is uploaded, it will be accessible via the following URL
	publicURL := fmt.Sprintf("http://127.0.0.1:9000/%s/%s", bucketName, objectName)

	// Print the public URL
	fmt.Println("Public URL:", publicURL)

	// colorlogger.Log(object.Stat())
}

func deleteObject(s3Client *minio.Client, bucketName string, objectName string) error {
	opts := minio.RemoveObjectOptions{
		GovernanceBypass: true,
	}

	return s3Client.RemoveObject(context.Background(), bucketName, objectName, opts)
}

func listObjects(s3Client *minio.Client, bucketName string) {
	opts := minio.ListObjectsOptions{
		WithMetadata: true,
		Prefix:       "",
		Recursive:    true,
	}

	// List all objects from a bucket-name with a matching prefix.
	for object := range s3Client.ListObjects(context.Background(), bucketName, opts) {
		if object.Err != nil {
			fmt.Println(object.Err)
			return
		}
		// colorlogger.Log(object)
	}
}
