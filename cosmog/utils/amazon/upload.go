package amazon

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/codeharik/Atlantic/service/colorlogger"
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

func SyncInit(meiliInstance meilisearch.ServiceManager) {
	for category := range amazon {
		if subcategories, exists := amazon[category]; exists {
			for _, subcat := range subcategories {

				products := loadProducts(category, subcat)

				task, err := meiliInstance.Index("Games").AddDocumentsInBatches(
					products[:100],
					10,
				)
				colorlogger.Log(task, err)

				meiliInstance.CreateIndex(&meilisearch.IndexConfig{
					Uid:        "Games",
					PrimaryKey: "id",
				})

				searchableAttributes := []string{
					"title",
				}
				filterableAttributes := []string{
					"gen",
					"cat",
					"price",
					"sale",
					"age",
					"category",
					"rating",
				}
				sortableAttributes := []string{
					"sale",
					"categroy",
					"rating",
				}
				meiliInstance.Index("Games").UpdateSearchableAttributes(&searchableAttributes)
				meiliInstance.Index("Games").UpdateFilterableAttributes(&filterableAttributes)
				meiliInstance.Index("Games").UpdateSortableAttributes(&sortableAttributes)
			}
		}
	}
}

func loadProducts(category, subcat string) []Product {
	path := fmt.Sprintf("data/%s+%s.json", category, subcat)
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
