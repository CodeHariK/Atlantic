package server

import (
	"context"
	"log"
	"time"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"github.com/codeharik/Atlantic/config"
	v1 "github.com/codeharik/Atlantic/cosmog/api/cosmog/v1"
	"github.com/codeharik/Atlantic/cosmog/api/cosmog/v1/v1connect"
	"github.com/meilisearch/meilisearch-go"
)

type CosmogServiceServer struct {
	v1connect.UnimplementedCosmogServiceHandler

	cfg config.Config

	validator *protovalidate.Validator

	meiliInstance meilisearch.ServiceManager
}

func CreateCosmogServiceServer(cfg config.Config, meiliInstance *meilisearch.ServiceManager) CosmogServiceServer {
	validator, err := protovalidate.New()
	if err != nil {
		log.Fatal(err)
	}

	return CosmogServiceServer{
		cfg:           cfg,
		validator:     validator,
		meiliInstance: *meiliInstance,
	}
}

func (c CosmogServiceServer) CreateSearchKey(ctx context.Context, req *connect.Request[v1.CreateSearchKeyRequest]) (*connect.Response[v1.CreateSearchKeyResponse], error) {
	if err := c.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	c.meiliInstance.DeleteKey(req.Msg.Id)

	key, err := c.meiliInstance.CreateKey(
		&meilisearch.Key{
			UID:         req.Msg.Id,
			Description: "Get products",
			Actions:     []string{"documents.get", "search"},
			Indexes:     []string{"movies"},
			ExpiresAt:   time.Now().Add(time.Minute * 15).UTC(),
		})
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&v1.CreateSearchKeyResponse{
		Key: key.Key,
	}), nil
}

func (c CosmogServiceServer) GetProduct(ctx context.Context, req *connect.Request[v1.GetProductRequest]) (*connect.Response[v1.GetProductResponse], error) {
	if err := c.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	var product v1.GetProductResponse
	err := c.meiliInstance.Index("Atlantic").
		GetDocument(req.Msg.Id, &meilisearch.DocumentQuery{
			Fields: []string{"id", "title", "img", "mov", "dev", "brand", "category", "info", "price", "rating"},
		}, &product)
	if err != nil {
		return nil, connect.NewError(connect.CodeNotFound, err)
	}

	return connect.NewResponse(&product), nil
}

func (c CosmogServiceServer) DeleteProduct(ctx context.Context, req *connect.Request[v1.DeleteProductRequest]) (*connect.Response[v1.DeleteProductResponse], error) {
	if err := c.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	task, err := c.meiliInstance.Index("Atlantic").DeleteDocument(req.Msg.Id)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&v1.DeleteProductResponse{
		Taskid: int32(task.TaskUID),
	}), nil
}

func (c CosmogServiceServer) UpdateProduct(ctx context.Context, req *connect.Request[v1.UpdateProductRequest]) (*connect.Response[v1.UpdateProductResponse], error) {
	if err := c.validator.Validate(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	task, err := c.meiliInstance.Index("Atlantic").UpdateDocuments(req.Msg)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&v1.UpdateProductResponse{
		Taskid: int32(task.TaskUID),
	}), nil
}

func (c CosmogServiceServer) GetTask(ctx context.Context, req *connect.Request[v1.GetTaskRequest]) (*connect.Response[v1.GetTaskResponse], error) {
	task, err := c.meiliInstance.GetTask(int64(req.Msg.Taskid))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&v1.GetTaskResponse{
		Error:     task.Error.Message,
		ErrorCode: task.Error.Code,
		Status:    string(task.Status),
	}), nil
}
