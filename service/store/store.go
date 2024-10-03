package store

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/config"

	"github.com/codeharik/Atlantic/database/store/product"
	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/exaring/otelpgx"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Store struct {
	Db           *pgxpool.Pool
	UserStore    *user.Queries
	ProductStore *product.Queries
}

func ConnectDatabase(config config.Config) (store Store, err error) {
	dsn := config.DatabaseConnectionUri()

	fmt.Printf("Database host %v\n", config.Database.Host)

	var db *pgxpool.Pool
	if config.OTLP.GRPC != "" {

		dbCfg, err := pgxpool.ParseConfig(dsn)
		if err != nil {
			return Store{}, err
		}
		dbCfg.ConnConfig.Tracer = otelpgx.NewTracer()
		db, err = pgxpool.NewWithConfig(context.Background(), dbCfg)
		if err != nil {
			return Store{}, err
		}

	} else {
		db, err = pgxpool.New(context.Background(), dsn)
		if err != nil {
			return Store{}, err
		}
	}

	return Store{
		Db:           db,
		UserStore:    user.New(db),
		ProductStore: product.New(db),
	}, nil
}
