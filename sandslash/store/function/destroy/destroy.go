package main

import (
	"context"
	"fmt"
	"log"

	"sandslash/service"

	"github.com/jackc/pgx/v5"
)

const dropGooseTableQuery = `DROP TABLE IF EXISTS goose_db_version;`

const dropIndexesQuery = `
DO $$ 
DECLARE
	r RECORD;
BEGIN
	FOR r IN (SELECT indexname FROM pg_indexes WHERE schemaname = 'public') LOOP
		EXECUTE 'DROP INDEX IF EXISTS ' || r.indexname || ' CASCADE;';
	END LOOP;
END $$;`

const dropTablesQuery = `
DO $$ 
DECLARE
	r RECORD;
BEGIN
	FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
		EXECUTE 'DROP TABLE IF EXISTS ' || r.tablename || ' CASCADE;';
	END LOOP;
END $$;`

func main() {
	sandslashConfig := service.LoadConfig()

	connString := sandslashConfig.CreateDatabaseConnectionUri()

	conn, err := pgx.Connect(context.Background(), connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer conn.Close(context.Background())

	_, err = conn.Exec(context.Background(), dropGooseTableQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropGooseTableQuery command: %v", err)
	}
	_, err = conn.Exec(context.Background(), dropTablesQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropTablesQuery command: %v", err)
	}
	_, err = conn.Exec(context.Background(), dropIndexesQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropIndexesQuery command: %v", err)
	}

	fmt.Println("Destoyed")
}
