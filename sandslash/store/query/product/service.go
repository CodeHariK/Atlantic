// Code generated by sqlc-connect (https://github.com/walterwanderley/sqlc-connect). DO NOT EDIT.

package product

import (
	"context"
	"log/slog"

	"connectrpc.com/connect"

	pb "sandslash/api/product/v1"
	"sandslash/api/product/v1/v1connect"
)

type Service struct {
	v1connect.UnimplementedProductServiceHandler
	querier *Queries
}

func (s *Service) CreateProductAndDescription(ctx context.Context, req *connect.Request[pb.CreateProductAndDescriptionRequest]) (*connect.Response[pb.CreateProductAndDescriptionResponse], error) {

	result, err := s.querier.CreateProductAndDescription(ctx)
	if err != nil {
		slog.Error("sql call failed", "error", err, "method", "CreateProductAndDescription")
		return nil, err
	}
	return connect.NewResponse(&pb.CreateProductAndDescriptionResponse{CreateProductAndDescriptionRow: toCreateProductAndDescriptionRow(result)}), nil
}
