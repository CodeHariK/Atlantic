package service

import (
	"context"

	"github.com/codeharik/Atlantic/sandslash/store/product"
	"github.com/codeharik/Atlantic/sandslash/store/user"
	"github.com/exaring/otelpgx"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Store struct {
	Db           *pgxpool.Pool
	UserStore    *user.Queries
	ProductStore *product.Queries
}

func ConnectDatabase(config Config) (store Store, err error) {
	dsn := config.DatabaseConnectionUri()

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
