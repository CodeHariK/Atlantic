// Code generated by sqlc-connect (https://github.com/walterwanderley/sqlc-connect).

package product

import (
	"sandslash/api/product/v1/v1connect"
)

// NewService is a constructor of a v1.ProductServiceHandler implementation.
// Use this function to customize the server by adding middlewares to it.
func NewService(querier *Queries) v1connect.ProductServiceHandler {
	return &Service{querier: querier}
}
