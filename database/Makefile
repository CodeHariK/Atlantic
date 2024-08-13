PROJECT := Cresselia
DEV_URL := docker+postgres://_/postgres:alpine/dev
SCHEMA_FILE := schema.sql
FILE_SCHEMA_FILE := file://schema.sql

ainspect:
	atlas schema inspect \
		-u $(POSTGRES_URL) \
		--format '{{ sql . }}' > $(SCHEMA_FILE)
aapply:
	atlas schema apply \
		-u $(POSTGRES_URL) \
		--to $(FILE_SCHEMA_FILE) \
		--dev-url "$(DEV_URL)"
apush:
	atlas migrate push $(PROJECT) \
		--dev-url "$(DEV_URL)"
ahash:
	atlas migrate hash
aweb:
	atlas schema inspect \
		-u $(POSTGRES_URL) \
		--web
all: ainspect aapply apush ahash aweb

gup:
	goose -dir migrations postgres $(POSTGRES_URL) up
gdo:
	goose -dir migrations postgres$(POSTGRES_URL) down
greset:
	goose -dir migrations postgres $(POSTGRES_URL) reset
gstatus:
	goose -dir migrations postgres $(POSTGRES_URL) status

dbstatus:
	go run function/status/status.go
destroy:
	go run function/destroy/destroy.go 
immortalFire:
	go run function/destroy/destroy.go -confirm

sql:
	sqlc generate
connect:

	rm -rf ../sandslash/store

	sqlc generate
	sqlc-connect -m "github.com/codeharik/Atlantic/sandslash" -metric -tracing

	rm -rf ../sandslash/api
	rm -rf ../sandslash/internal

	rm -rf api
	rm -rf tools

	rm main.go
	rm go.mod
	rm go.sum

	sed 's/sandslash\/\.\.\///g' registry.go > temp_file && mv temp_file registry.go
	sed 's/interceptors \[\]connect\.Interceptor/option ...connect\.HandlerOption/g' registry.go > temp_file && mv temp_file registry.go

	cp gen.buf.yaml buf.gen.yaml

	mv -f internal ../sandslash
	rm -rf ../sandslash/internal/server
	mv -f registry.go ../sandslash/server/database

	buf generate

	rm buf.gen.yaml

	mv ../sandslash/server/docs/apidocs.swagger.json ../sandslash/server/docs/openapi.json

	cd .. && find . -type f -name ".DS_Store" -exec rm {} +

bufMigrate:
	buf config migrate -diff
	buf config migrate

gen: gup ainspect ahash sql connect
