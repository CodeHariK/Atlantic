PROJECT := SandSlash
DEV_URL := docker+postgres://_/postgres:alpine/dev
SCHEMA_FILE := store/schema.sql
FILE_SCHEMA_FILE := file://store/schema.sql
SCHEMA_DIR := file://store

help:
	@echo "Available commands:"
	
	@echo "\nAtlas"
	@echo "  ainspect       - Inspect schema and output to $(SCHEMA_FILE)"
	@echo "  aapply         - Apply schema to database using $(FILE_SCHEMA_FILE) and $(DEV_URL)"
	@echo "  apush          - Push migrations to $(DEV_URL) from $(SCHEMA_DIR)"
	@echo "  ahash          - Hash migrations from $(SCHEMA_DIR)"
	@echo "  aweb           - Inspect schema using web interface"
	@echo "  all            - Run all commands: ainspect, aapply, apush, ahash, aweb"

	@echo "\nGoose"	
	@echo "  gup            - Apply Goose migrations"
	@echo "  gdo            - Rollback Goose migrations"
	@echo "  greset         - Rollback Goose migrations to version 0"
	@echo "  gstatus        - Display the status of Goose migrations"
	@echo "  gdestroy       - Destroy Goose Table"

	@echo "\nSQLc"
	@echo "  sqlc			- sqlc generate"

	@echo "\nGen"
	@echo "  gen			- Generate All"

	@echo "\nDB Status"
	@echo "  dbstatus		- Database status"

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
		--dev-url "$(DEV_URL)" \
		--dir $(SCHEMA_DIR)
ahash:
	atlas migrate hash --dir $(SCHEMA_DIR)
aweb:
	atlas schema inspect \
		-u $(POSTGRES_URL) \
		--web
all: schema-inspect schema-apply migrate-push migrate-hash schema-inspect-web

gup:
	goose -dir store/migration postgres $(POSTGRES_URL) up
gdo:
	goose -dir store/migration postgres$(POSTGRES_URL) down
greset:
	goose -dir store/migration postgres $(POSTGRES_URL) reset
gstatus:
	goose -dir store/migration postgres $(POSTGRES_URL) status
gdestroy:
	go run store/function/destroy/destroy.go 

sql:
	sqlc generate
sqlconnect:
	sqlc-connect -tracing -metric

gen: gup ainspect ahash sql

dbstatus:
	go run store/function/status/status.go

run:
	go run cmd/main.go
