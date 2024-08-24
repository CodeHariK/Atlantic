package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/codeharik/Atlantic/config"

	"github.com/jackc/pgx/v5"
)

func main() {
	StatusConfig := config.LoadConfig(true, "../config/config.json")

	connString := StatusConfig.DatabaseConnectionUri()

	fmt.Printf("\nexport POSTGRES_URL=%s\n\n", connString)

	conn, err := pgx.Connect(context.Background(), connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer conn.Close(context.Background())

	// Query the PostgreSQL version
	var version string
	err = conn.QueryRow(context.Background(), "SELECT version()").Scan(&version)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf(version)

	printIndexSize(conn)
}

func printIndexSize(conn *pgx.Conn) {
	rows, err := conn.Query(context.Background(), info)
	if err != nil {
		log.Fatalf("query failed: %v", err)
	}
	defer rows.Close()

	fmt.Printf("%-15s %-20s %-40s %-15s\n", "Schema", "Table", "Index", "Size")
	fmt.Println(strings.Repeat("-", 90))

	for rows.Next() {
		var schemaname, tablename, indexname, index_size string
		if err := rows.Scan(&schemaname, &tablename, &indexname, &index_size); err != nil {
			log.Fatalf("row scan failed: %v", err)
		}
		fmt.Printf("%-15s %-20s %-40s %-15s\n", schemaname, tablename, indexname, index_size)
	}

	if err := rows.Err(); err != nil {
		log.Fatalf("row iteration failed: %v", err)
	}
}

const info = `
SELECT
    n.nspname AS schemaname,
    c.relname AS tablename,
    i.indexrelid::regclass AS indexname,
    pg_size_pretty(pg_relation_size(i.indexrelid)) AS index_size
FROM
    pg_stat_user_indexes i
JOIN
    pg_class c ON i.relid = c.oid
JOIN
    pg_namespace n ON c.relnamespace = n.oid
ORDER BY
    pg_relation_size(i.indexrelid) DESC;`
