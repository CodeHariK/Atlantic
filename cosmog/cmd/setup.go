package main

import (
	"fmt"

	"github.com/codeharik/Atlantic/config"
	"github.com/meilisearch/meilisearch-go"
)

const MOVIE_INDEX = "movies"

func setup() {
	cfg := config.LoadConfig()

	client := meilisearch.New(
		fmt.Sprintf("%s:%d", cfg.MeiliSearch.Host, cfg.MeiliSearch.Port),
		meilisearch.WithAPIKey(cfg.MeiliSearch.Key),
	)

	fmt.Println(`🚀 Seeding your Meilisearch instance`)

	client.Index(MOVIE_INDEX).UpdateFilterableAttributes(&[]string{"brand", "genre"})

	fmt.Printf(`Adding ranking rules to %s`, MOVIE_INDEX)
	client.Index(MOVIE_INDEX).UpdateRankingRules(&[]string{"sort", "words", "typo", "proximity", "attribute", "exactness"})

	fmt.Printf(`Adding sortable attributes to %s`, MOVIE_INDEX)
	client.Index(MOVIE_INDEX).UpdateSortableAttributes(&[]string{"rating", "price"})
}
