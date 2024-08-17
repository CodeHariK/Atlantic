package store

import (
	"context"
	"fmt"

	"github.com/codeharik/Atlantic/config"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

func dragonfly() {
	config := config.LoadConfig("config.json", "../config/config.json")

	dragonflyURI := config.DragonflyConnectionUri()

	addr, err := redis.ParseURL(dragonflyURI)
	if err != nil {
		panic(err)
	}

	dfdb := redis.NewClient(addr)

	err = dfdb.Set(ctx, "key", "hello world", 0).Err()
	if err != nil {
		panic(err)
	}

	val, err := dfdb.Get(ctx, "key").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("The value of key is:", val)
}
