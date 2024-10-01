package utils

import (
	"context"
	"fmt"
	"math"

	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/service/store"
)

// iteratorForMultiCreateProduct implements pgx.CopyFromSource.
type iteratorForMultiCreateProduct struct {
	rows                 []product.Product
	skippedFirstNextCall bool
}

func (r *iteratorForMultiCreateProduct) Next() bool {
	if len(r.rows) == 0 {
		return false
	}
	if !r.skippedFirstNextCall {
		r.skippedFirstNextCall = true
		return true
	}
	r.rows = r.rows[1:]
	return len(r.rows) > 0
}

func (r iteratorForMultiCreateProduct) Values() ([]interface{}, error) {
	return []interface{}{
		r.rows[0].ID,
		r.rows[0].Title,
		r.rows[0].Quantity,
		r.rows[0].Price,
		r.rows[0].Category,
	}, nil
}

func (r iteratorForMultiCreateProduct) Err() error {
	return nil
}

func BatchInsertProducts(storeInstance store.Store, products []product.Product) error {
	batchSize := 500
	totalProducts := len(products)
	batchCount := int(math.Ceil(float64(totalProducts) / float64(batchSize)))

	for i := 0; i < batchCount; i++ {
		start := i * batchSize
		end := start + batchSize

		// Ensure we don't go out of bounds on the last batch
		if end > totalProducts {
			end = totalProducts
		}

		batch := products[start:end]

		n, err := storeInstance.Db.CopyFrom(context.Background(), []string{"products"}, []string{"id", "title", "quantity", "price", "category"}, &iteratorForMultiCreateProduct{rows: batch})
		fmt.Printf("Inserted %d products total:%d batch:%d err:%v\n", n, totalProducts, len(batch), err)
		if err != nil {
			fmt.Printf("failed to insert batch %d: %v\n", i+1, err)
			continue
		}
	}

	return nil
}
