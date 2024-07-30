package store

import (
	"context"
	"fmt"
	"os"

	"sandslash/service"

	"sandslash/store/query/user"

	"github.com/jackc/pgx/v5"
)

type Store struct {
	UserStore *user.Queries
	// ProductStore *product.Queries
}

func ConnectDatabase(config service.Config) Store {
	dsn := config.CreateDatabaseConnectionUri()

	// urlExample := "postgres://username:password@localhost:5432/database_name"
	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	return Store{
		UserStore: user.New(conn),
		// ProductStore: product.New(conn),
	}
}
