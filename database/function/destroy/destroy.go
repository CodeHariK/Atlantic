package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/codeharik/Atlantic/config"

	"github.com/jackc/pgx/v5"
)

func main() {
	DestroyConfig := config.LoadConfig()

	connString := DestroyConfig.DatabaseConnectionUri()

	conn, err := pgx.Connect(context.Background(), connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer conn.Close(context.Background())

	confirm := flag.Bool("confirm", false, "Confirm the action")
	flag.Parse()
	if *confirm {
		var response string
		fmt.Print("This will destroy everything, Do you want to proceed? (y/n): ")
		fmt.Scanln(&response)
		response = strings.ToLower(response)
		if response != "y" && response != "yes" {
			fmt.Println("Action canceled. Goose Table Destruction.")

			_, err = conn.Exec(context.Background(), dropGooseTableQuery)
			if err != nil {
				log.Fatalf("Failed to execute dropGooseTableQuery command: %v", err)
			}

			os.Exit(0)
		}
	}

	_, err = conn.Exec(context.Background(), dropTablesQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropTablesQuery command: %v", err)
	}
	_, err = conn.Exec(context.Background(), dropIndexesQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropIndexesQuery command: %v", err)
	}
	_, err = conn.Exec(context.Background(), dropTriggersQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropTriggersQuery command: %v", err)
	}
	_, err = conn.Exec(context.Background(), dropFunctionsQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropFunctionsQuery command: %v", err)
	}
	_, err = conn.Exec(context.Background(), dropEnumsQuery)
	if err != nil {
		log.Fatalf("Failed to execute dropEnumsQuery command: %v", err)
	}

	fmt.Println("Immortal Fire...")
}

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

const dropEnumsQuery = `
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT n.nspname AS schema_name, t.typname AS enum_name
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        GROUP BY schema_name, enum_name
    LOOP
        EXECUTE format('DROP TYPE IF EXISTS %I.%I CASCADE;', r.schema_name, r.enum_name);
    END LOOP;
END $$;`

const dropTriggersQuery = `
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT trigger_schema, trigger_name, event_object_table
		FROM information_schema.triggers)
    LOOP
        EXECUTE 'DROP TRIGGER ' || r.trigger_name || ' ON ' || r.event_object_table;
    END LOOP;
END $$;`

const dropFunctionsQuery = `
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT n.nspname as schema_name,
		p.proname as function_name,
			pg_catalog.pg_get_function_identity_arguments(p.oid) as args
		FROM pg_catalog.pg_proc p
			JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
		WHERE n.nspname NOT IN ('pg_catalog', 'information_schema'))
    LOOP
        EXECUTE 'DROP FUNCTION ' || r.schema_name || '.' || r.function_name || '(' || r.args || ');';
    END LOOP;
END $$;`
