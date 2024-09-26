package electronics

import (
	"github.com/codeharik/Atlantic/service/colorlogger"
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

func SyncInit(meiliInstance meilisearch.ServiceManager) {
	emobiles := loadMobiles()
	elaptops := loadLaptops()
	emobiles = append(emobiles, elaptops...)

	task, err := meiliInstance.Index("Atlantic").AddDocumentsInBatches(
		emobiles,
		1000,
	)
	colorlogger.Log(task, err)

	meiliInstance.CreateIndex(&meilisearch.IndexConfig{
		Uid:        "Atlantic",
		PrimaryKey: "id",
	})

	searchableAttributes := []string{
		"title",
	}
	filterableAttributes := []string{
		"gen",
		"cat",
		"price",
		"age",
		"category",
		"rating",
	}
	sortableAttributes := []string{
		"categroy",
		"rating",
	}
	meiliInstance.Index("Atlantic").UpdateSearchableAttributes(&searchableAttributes)
	meiliInstance.Index("Atlantic").UpdateFilterableAttributes(&filterableAttributes)
	meiliInstance.Index("Atlantic").UpdateSortableAttributes(&sortableAttributes)
}
