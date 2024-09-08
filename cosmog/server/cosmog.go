package server

import (
	"context"
	"time"

	"connectrpc.com/connect"
	"github.com/codeharik/Atlantic/config"
	v1 "github.com/codeharik/Atlantic/cosmog/api/cosmog/v1"
	"github.com/codeharik/Atlantic/cosmog/api/cosmog/v1/v1connect"
	"github.com/meilisearch/meilisearch-go"
)

type CosmogServiceServer struct {
	v1connect.UnimplementedCosmogServiceHandler

	cfg config.Config

	cosmog meilisearch.ServiceManager
}

func CreateCosmogServiceServer() CosmogServiceServer {
	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

	cosmog := meilisearch.New(
		cfg.CosmogService.MeiliSearch.Host,
		meilisearch.WithAPIKey(cfg.CosmogService.MeiliSearch.Key),
	)

	return CosmogServiceServer{
		cfg:    cfg,
		cosmog: cosmog,
	}
}

func (c CosmogServiceServer) CreateSearchKey(ctx context.Context, req *connect.Request[v1.CreateSearchKeyRequest]) (*connect.Response[v1.CreateSearchKeyResponse], error) {
	c.cosmog.DeleteKey(req.Msg.ID)

	key, err := c.cosmog.CreateKey(
		&meilisearch.Key{
			UID:         req.Msg.ID,
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
