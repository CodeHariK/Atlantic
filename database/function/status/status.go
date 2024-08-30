package main

import (
	"fmt"

	"github.com/codeharik/Atlantic/config"
)

func main() {
	StatusConfig := config.LoadConfig(true, "../config/config.json")

	connString := StatusConfig.DatabaseConnectionUri()

	fmt.Printf("\nexport POSTGRES_URL=%s\n\n", connString)
}
