package minio

import (
	"bytes"
	"context"
	"fmt"
	"log"

	"github.com/codeharik/Atlantic/config"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioClient struct {
	cfg    *config.Config
	Client *minio.Client
}

func CreateClient(cfg *config.Config) (*MinioClient, error) {
	c, err := minio.New(
		cfg.Minio.Addr,
		&minio.Options{
			Creds:  credentials.NewStaticV4(cfg.Minio.Id, cfg.Minio.Secret, ""),
			Secure: false,
		})
	if err != nil {
		return nil, err
	}

	return &MinioClient{Client: c}, nil
}

func (m *MinioClient) MakeBucket(bucketName string, region string) error {
	opts := minio.MakeBucketOptions{
		Region: region,
	}

	fmt.Println("MakeBucket", bucketName, region)

	exists, err := m.Client.BucketExists(context.Background(), bucketName)
	if !exists && err == nil {
		err = m.Client.MakeBucket(context.Background(), bucketName, opts)
	}
	return err
}

func (m *MinioClient) PublicBucket(bucketName string) error {
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
	err := m.Client.SetBucketPolicy(context.Background(), bucketName, bucketPolicy)
	if err != nil {
		return fmt.Errorf("Failed to set bucket policy: %v", err)
	}

	fmt.Println("Bucket is now public and accessible for reading objects.")
	return nil
}

func (m *MinioClient) PutObject(bucketName string, objectName string, formfile *bytes.Buffer) {
	fmt.Println("PubObject", bucketName, objectName)
	info, err := m.Client.PutObject(
		context.Background(),
		bucketName,
		objectName,
		formfile,
		int64(formfile.Len()),
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

func (m *MinioClient) GetObject(bucketName string, objectName string) {
	object, err := m.Client.GetObject(context.Background(), bucketName, objectName, minio.GetObjectOptions{})
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

func (m *MinioClient) DeleteObject(bucketName string, objectName string) error {
	opts := minio.RemoveObjectOptions{
		GovernanceBypass: true,
	}

	return m.Client.RemoveObject(context.Background(), bucketName, objectName, opts)
}

func (m *MinioClient) ListObjects(bucketName string) {
	opts := minio.ListObjectsOptions{
		WithMetadata: true,
		Prefix:       "",
		Recursive:    true,
	}

	// List all objects from a bucket-name with a matching prefix.
	for object := range m.Client.ListObjects(context.Background(), bucketName, opts) {
		if object.Err != nil {
			fmt.Println(object.Err)
			return
		}
		// colorlogger.Log(object)
	}
}
