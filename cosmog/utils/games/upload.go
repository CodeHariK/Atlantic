package games

import (
	"fmt"

	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/meilisearch/meilisearch-go"
)

func SyncInit(meiliInstance meilisearch.ServiceManager) {
	games := loadGames()

	for i := range games {
		games[i].Category.Lvl0 = "games"
		if len(games[i].Genres) > 0 {
			games[i].Category.Lvl1 = fmt.Sprintf("%s > %s", "games", games[i].Genres[0])
		}
	}

	task, err := meiliInstance.Index("Atlantic").AddDocumentsInBatches(
		games,
		1000,
	)
	colorlogger.Log(task, err)

	meiliInstance.CreateIndex(&meilisearch.IndexConfig{
		Uid:        "Atlantic",
		PrimaryKey: "id",
	})

	searchableAttributes := []string{
		"title",
		"info",
	}
	filterableAttributes := []string{
		"gen",
		"cat",
		"price",
		"sale",
	}
	sortableAttributes := []string{
		"sale",
	}
	meiliInstance.Index("Atlantic").UpdateSearchableAttributes(&searchableAttributes)
	meiliInstance.Index("Atlantic").UpdateFilterableAttributes(&filterableAttributes)
	meiliInstance.Index("Atlantic").UpdateSortableAttributes(&sortableAttributes)
}
