package games

import (
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/meilisearch/meilisearch-go"
)

func SyncInit(meiliInstance meilisearch.ServiceManager) {
	games := loadGames()

	task, err := meiliInstance.Index("Games").AddDocumentsInBatches(
		games[:100],
		10,
	)
	colorlogger.Log(task, err)

	meiliInstance.CreateIndex(&meilisearch.IndexConfig{
		Uid:        "Games",
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
	meiliInstance.Index("Games").UpdateSearchableAttributes(&searchableAttributes)
	meiliInstance.Index("Games").UpdateFilterableAttributes(&filterableAttributes)
	meiliInstance.Index("Games").UpdateSortableAttributes(&sortableAttributes)
}
