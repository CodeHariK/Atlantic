# cosmog

MASTERKEY := aSampleMasterKey
APIKEY := 5b97be029725df2ca048dd3c5c7a812c4237b995190cb56ba747d7e0d883e383

run:
	./meilisearch --config-file-path="./config.toml"
keys:
	curl -X GET 'http://localhost:7700/keys' \
		-H 'Authorization: Bearer $(MASTERKEY)'
keyT:
	curl \
		-X GET 'http://localhost:7700/keys/$(API_KEY)' \
		-H 'Authorization: Bearer $(MASTERKEY)'
movies:
	curl \
		-X POST 'http://localhost:7700/indexes/movies/documents?primaryKey=id' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary @movies.json
tasks:
	curl \
		-X GET 'http://localhost:7700/tasks' \
		-H 'Authorization: Bearer $(MASTERKEY)'
task0:
	curl \
		-X GET 'http://localhost:7700/tasks/0' \
		-H 'Authorization: Bearer $(MASTERKEY)'
success:
	curl \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		-X GET 'http://localhost:7700/tasks?statuses=succeeded&indexUids=movies'
indexes:
	curl \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		-X GET 'http://localhost:7700/indexes'
searchAttr:
	curl \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		-X GET 'http://localhost:7700/indexes/movies/settings/searchable-attributes'
updateSearchAttr:
	curl \
		-X PUT 'http://localhost:7700/indexes/movies/settings/searchable-attributes' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary '["title","overview"]'
filterAttr:
	curl \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		-X GET 'http://localhost:7700/indexes/movies/settings/filterable-attributes'
updateFilterAttr:
	curl \
		-X PUT 'http://localhost:7700/indexes/movies/settings/filterable-attributes' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary '["genres","release_date"]'
sortAttr:
	curl \
		-X PUT 'http://localhost:7700/indexes/movies/settings/sortable-attributes' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary '["release_date"]'
rankingRule:
	curl \
		-X PUT 'http://localhost:7700/indexes/books/settings/ranking-rules' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary '["words","sort","typo","proximity","attribute","exactness"]'
facets:
	curl \
		-X POST 'http://localhost:7700/indexes/movies/search' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary '{ \
			"facets": [ "genres"] \
		}'
facetsAvengers:
	curl \
		-X POST 'http://localhost:7700/indexes/movies/search' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(APIKEY)' \
		--data-binary '{ \
			"q": "Avengers", \
			"facets": [ "genres"] \
		}'
facetsComedy:
	curl \
		-X POST 'http://localhost:7700/indexes/movies/search' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(APIKEY)' \
		--data-binary '{ \
			"q": "Comedy", \
			"facets": [ "genres"] \
		}'
sortFacetValuesByCount:
	curl \
		-X PATCH 'http://localhost:7700/indexes/movies/settings/faceting' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(MASTERKEY)' \
		--data-binary '{ \
				"sortFacetValuesBy": { \
				"genres": "count" \
			} \
		}'
searchFacets:
	curl \
		-X POST 'http://localhost:7700/indexes/movies/facet-search' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(APIKEY)' \
		--data-binary '{ \
			"facetQuery": "c", \
			"facetName": "genres" \
		}'
filter:
	curl \
		-X POST 'http://localhost:7700/indexes/movies/search' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(APIKEY)' \
		--data-binary '{ \
			"q": "Batman", \
			"filter": "release_date > 1241286484 AND genres = Mystery AND release_date < 1572527600" \
		}'
	curl \
		-X POST 'http://localhost:7700/indexes/movies/search' \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(APIKEY)' \
		--data-binary '{ \
			"q": "science", \
			"sort": ["release_date:desc"] \
		}'
        