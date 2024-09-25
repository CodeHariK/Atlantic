package games

import (
	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/meilisearch/meilisearch-go"
)

func SyncInit(meiliInstance meilisearch.ServiceManager) {
	games := loadGames()

	task, err := meiliInstance.Index("steam-videogames").AddDocumentsInBatches(
		games[:100],
		10,
	)
	colorlogger.Log(task, err)

	meiliInstance.CreateIndex(&meilisearch.IndexConfig{
		Uid:        "steam-videogames",
		PrimaryKey: "id",
	})

	filterableAttributes := []string{
		"gen",
		"cat",
		"sale",
	}
	sortableAttributes := []string{
		"sale",
	}
	meiliInstance.Index("steam-videogames").UpdateFilterableAttributes(&filterableAttributes)
	meiliInstance.Index("steam-videogames").UpdateSortableAttributes(&sortableAttributes)
}
