package migrate

import (
	"database/sql"
	"embed"
	"fmt"
	"log"

	"github.com/codeharik/Atlantic/config"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

//go:embed *.sql
var embedMigrations embed.FS

func MigrateUp(cfg config.Config) {
	connString := cfg.DatabaseConnectionUri()

	fmt.Printf("---> %v\n", connString)

	// Use sql.Open with pgx driver
	db, err := sql.Open("pgx", connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer db.Close()

	goose.SetBaseFS(embedMigrations)

	// Set dialect to Postgres
	if err := goose.SetDialect("postgres"); err != nil {
		log.Fatal(err)
	}

	// Apply migrations
	if err := goose.Up(db, "."); err != nil {
		log.Fatal(err)
	}
}

func MigrateDown(cfg config.Config) {
	connString := cfg.DatabaseConnectionUri()

	// Use sql.Open with pgx driver
	db, err := sql.Open("pgx", connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer db.Close()

	goose.SetBaseFS(embedMigrations)

	// Set dialect to Postgres
	if err := goose.SetDialect("postgres"); err != nil {
		log.Fatal(err)
	}

	// Apply migrations
	if err := goose.Down(db, "."); err != nil {
		log.Fatal(err)
	}
}
