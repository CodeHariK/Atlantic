package games

import (
	"fmt"
	"math/rand/v2"

	"github.com/codeharik/Atlantic/cosmog/utils"
	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/codeharik/Atlantic/service/store"
	"github.com/meilisearch/meilisearch-go"
)

func SyncInit(meiliInstance meilisearch.ServiceManager, storeInstance store.Store) {
	games := loadGames()

	products := make([]product.Product, len(games))
	for i := range games {
		games[i].Category.Lvl0 = "games"
		products[i].Category = games[i].Category.Lvl0
		if len(games[i].Genres) > 0 {
			games[i].Category.Lvl1 = fmt.Sprintf("%s > %s", "games", games[i].Genres[0])
			products[i].Category = games[i].Category.Lvl1
		}
		products[i].Title = games[i].Title
		products[i].ID = games[i].Id
		products[i].Price = rand.Int32N(2000) + 300
		products[i].Quantity = rand.Int32N(300) + 10
	}

	task, err := meiliInstance.Index("Atlantic").AddDocumentsInBatches(
		games,
		1000,
	)
	colorlogger.Log(task, err)

	utils.BatchInsertProducts(storeInstance, products)

	utils.Mix(meiliInstance)
}
