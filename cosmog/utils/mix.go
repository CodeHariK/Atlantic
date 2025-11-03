package utils

import "github.com/meilisearch/meilisearch-go"

func Mix(meiliInstance meilisearch.ServiceManager) {
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
		"category",
		"age",
		"rating",
	}
	sortableAttributes := []string{
		"sale",
		"rating",
		"category",
	}
	meiliInstance.Index("Atlantic").UpdateSearchableAttributes(&searchableAttributes)
	meiliInstance.Index("Atlantic").UpdateFilterableAttributes(&filterableAttributes)
	meiliInstance.Index("Atlantic").UpdateSortableAttributes(&sortableAttributes)
}
