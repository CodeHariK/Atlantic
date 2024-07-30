package main

import (
	"context"
	"fmt"
	"log"

	"sandslash/service"

	"github.com/jackc/pgx/v5"
)

func main() {
	sandslashConfig := service.LoadConfig()

	connString := sandslashConfig.CreateDatabaseConnectionUri()

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
}
