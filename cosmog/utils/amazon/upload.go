package amazon

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand/v2"
	"os"

	"github.com/codeharik/Atlantic/cosmog/utils"
	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/store"
	"github.com/google/uuid"
	"github.com/meilisearch/meilisearch-go"
)

// type Product struct {
// 	ID      string  `json:"id,omitempty"`
// 	Title   string  `json:"title,omitempty"`
// 	Price   float64 `json:"price,omitempty"`
// 	Rating  float64 `json:"rating,omitempty"`
// 	Reviews int     `json:"reviews,omitempty"`
// 	Brand   string  `json:"brand,omitempty"`
// 	Age     string  `json:"age,omitempty"`
// 	Img     string  `json:"img,omitempty"`
// 	Src     string  `json:"src,omitempty"`
// }

func SyncInit(meiliInstance meilisearch.ServiceManager, storeInstance store.Store) {
	for category := range amazon {
		if subcategories, exists := amazon[category]; exists {
			for _, subcat := range subcategories {

				products := loadProducts(category, subcat)

				prods := make([]product.Product, len(products))
				for i := range products {
					prods[i].Title = products[i].Title

					uid, _ := uuid.Parse(products[i].ID)
					prods[i].ProductID = uid

					prods[i].Price = rand.Int32N(2000) + 300
					prods[i].Quantity = rand.Int32N(300) + 10
					prods[i].Category = products[i].Category.Lvl1
				}
				utils.BatchInsertProducts(storeInstance, prods)

				task, err := meiliInstance.Index("Atlantic").AddDocumentsInBatches(
					products,
					1000,
				)
				colorlogger.Log(task, err)
			}
		}
	}
	utils.Mix(meiliInstance)
}

func loadProducts(category, subcat string) []Product {
	path := fmt.Sprintf("./cosmog/data/%s+%s.json", category, subcat)
	fmt.Println(path)

	file, err := os.Open(path)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("error reading file: %v", err)
	}

	var products []Product

	if err := json.Unmarshal(byteValue, &products); err != nil {
		log.Fatalf("error unmarshaling config: %v", err)
	}

	for i := range products {
		products[i].Category.Lvl0 = category
		products[i].Category.Lvl1 = fmt.Sprintf("%s > %s", category, subcat)
	}

	return products
}
