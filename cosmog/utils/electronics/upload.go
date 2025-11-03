package electronics

import (
	"math/rand/v2"

	"github.com/codeharik/Atlantic/cosmog/utils"
	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/store"
	"github.com/google/uuid"
	"github.com/meilisearch/meilisearch-go"
)

type Category struct {
	Lvl0 string `json:"lvl0,omitempty"`
	Lvl1 string `json:"lvl1,omitempty"`
}

type Electronic struct {
	ID        string   `json:"id,omitempty"`
	Title     string   `json:"title,omitempty"`
	Price     int64    `json:"price,omitempty"`
	Rating    float64  `json:"rating,omitempty"`
	Brand     string   `json:"brand,omitempty"`
	Img       []string `json:"img,omitempty"`
	Sim       string   `json:"sim,omitempty"`
	Processor string   `json:"processor,omitempty"`
	RAM       string   `json:"ram,omitempty"`
	Storage   string   `json:"storage,omitempty"`
	Battery   string   `json:"battery,omitempty"`
	Display   string   `json:"display,omitempty"`
	OS        string   `json:"os,omitempty"`
	Category  Category `json:"category,omitempty"`
}

// func ValidateElectronics() []Electronic {
// 	mobiles := loadMobiles()

// 	var electronics []Electronic

// 	for _, e := range mobiles {
// 		uid, _ := uuid.NewV7()
// 		p := Electronic{
// 			ID:        uid.String(),
// 			Title:     e.Title,
// 			Price:     e.Price,
// 			Rating:    e.Rating,
// 			Brand:     e.Brand,
// 			OS:        e.OS,
// 			Display:   e.Display,
// 			Img:       []string{e.Img},
// 			Processor: e.Processor,
// 			RAM:       e.RAM,
// 			Storage:   e.Storage,
// 			Category:  Category{Lvl0: "electronics", Lvl1: "electronics > laptop"},
// 		}
// 		electronics = append(electronics, p)
// 	}

// 	return electronics
// }

func SyncInit(meiliInstance meilisearch.ServiceManager, storeInstance store.Store) {
	emobiles := loadMobiles()
	elaptops := loadLaptops()
	emobiles = append(emobiles, elaptops...)

	prods := make([]product.Product, len(emobiles))
	for i := range emobiles {
		prods[i].Title = emobiles[i].Title

		uid, _ := uuid.Parse(emobiles[i].ID)
		prods[i].ProductID = uid

		prods[i].Price = rand.Int32N(2000) + 300
		prods[i].Quantity = rand.Int32N(300) + 10
		prods[i].Category = emobiles[i].Category.Lvl1
	}
	utils.BatchInsertProducts(storeInstance, prods)

	task, err := meiliInstance.Index("Atlantic").AddDocumentsInBatches(
		emobiles,
		1000,
	)
	colorlogger.Log(task, err)

	utils.Mix(meiliInstance)
}
