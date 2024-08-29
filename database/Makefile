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

up:
	goose -dir migrations postgres $(POSTGRES_URL) up
down:
	goose -dir migrations postgres $(POSTGRES_URL) down
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
	sqlc generate
	sqlc-connect -m "github.com/codeharik/Atlantic/database" -metric -tracing

	cp gen.buf.yaml buf.gen.yaml

	buf generate

	rm -rf tools
	rm -rf internal/server
	rm main.go
	rm registry.go
	rm buf.gen.yaml

	go mod tidy

	cp -r ./proto/ ../docs/proto

	rm api/apidocs.swagger.json
	cd .. && find . -type f -name ".DS_Store" -exec rm {} +

bufMigrate:
	buf config migrate -diff
	buf config migrate

gen: up ainspect ahash sql connect
