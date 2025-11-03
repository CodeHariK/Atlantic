package electronics

import (
	"encoding/json"
	"io"
	"log"
	"os"
)

func loadMobiles() []Electronic {
	file, err := os.Open("./cosmog/data/electronics+mobile.json")
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("error reading file: %v", err)
	}

	var electronics []Electronic

	if err := json.Unmarshal(byteValue, &electronics); err != nil {
		log.Fatalf("error unmarshaling config: %v", err)
	}

	return electronics
}

func loadLaptops() []Electronic {
	file, err := os.Open("./cosmog/data/electronics+laptop.json")
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("error reading file: %v", err)
	}

	var electronics []Electronic

	if err := json.Unmarshal(byteValue, &electronics); err != nil {
		log.Fatalf("error unmarshaling config: %v", err)
	}

	return electronics
}
