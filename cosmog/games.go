package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"time"
)

type ParseGame struct {
	Name             string   `json:"name"`
	ReleaseDate      string   `json:"release_date"`
	RequiredAge      int      `json:"required_age"`
	Price            float64  `json:"price"`
	ShortDescription string   `json:"short_description"`
	Website          string   `json:"website"`
	Screenshots      []string `json:"screenshots"`
	Developers       []string `json:"developers"`
	Categories       []string `json:"categories"`
	Genres           []string `json:"genres"`
	MetacriticScore  int      `json:"metacritic_score"`
	Movies           []string `json:"movies"`
}

type Game struct {
	Name             string   `json:"name"`
	ReleaseDate      int64    `json:"date"`
	RequiredAge      int      `json:"age"`
	Price            float64  `json:"price"`
	ShortDescription string   `json:"info"`
	Website          string   `json:"site"`
	Screenshots      []string `json:"img"`
	Developers       []string `json:"dev"`
	Categories       []string `json:"cat"`
	Genres           []string `json:"gen"`
	MetacriticScore  int      `json:"rat"`
	Movies           []string `json:"mov"`
}

func main() {
	// Step 1: Open the JSON file
	file, err := os.Open("data/games.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Step 2: Decode the JSON data into a map of Game structs
	var games map[string]ParseGame
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&games)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	filteredGames := make(map[string]Game)
	for id, game := range games {
		// Limit screenshots to a maximum of 3
		if len(game.Screenshots) > 3 {
			game.Screenshots = game.Screenshots[:3]
		}

		t, err := parseDate(game.ReleaseDate)
		if err != nil {
			fmt.Println("Error parsing date:", err)
			return
		}

		// Exclude games with positive value less than 10
		if game.MetacriticScore >= 67 {
			filteredGames[id] = Game{
				Name:             game.Name,
				ReleaseDate:      t.Unix(),
				RequiredAge:      game.RequiredAge,
				Price:            game.Price,
				ShortDescription: game.ShortDescription,
				Website:          game.Website,
				Screenshots:      game.Screenshots,
				Developers:       game.Developers,
				Categories:       game.Categories,
				Genres:           game.Genres,
				MetacriticScore:  game.MetacriticScore,
				Movies:           game.Movies,
			}
		}
	}

	// Step 4: Encode the processed data back to JSON
	newData, err := json.MarshalIndent(filteredGames, "", "  ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Step 5: Save the JSON data back to a file
	err = ioutil.WriteFile("data/games_updated.json", newData, 0644)
	if err != nil {
		fmt.Println("Error saving file:", err)
		return
	}

	fmt.Printf("Data processed and saved to games_updated.json %d", len(filteredGames))
}

func parseDate(dateStr string) (time.Time, error) {
	// Define a list of possible date formats
	formats := []string{
		"Jan 2, 2006",       // Example: Jun 28, 2019
		"2 Jan 2006",        // Example: 28 Jun 2019
		"2006-01-02",        // Example: 2019-06-28
		"2006/01/02",        // Example: 2019/06/28
		"01-02-2006",        // Example: 28-06-2019
		"02-01-2006",        // Example: 28-06-2019
		"2006.01.02",        // Example: 2019.06.28
		"02 Jan 2006 15:04", // Example: 28 Jun 2019 15:04
		"Jan 2, 2006 15:04", // Example: Jun 28, 2019 15:04
		"Jan 2006",          // Example: Jul 2020
		"January 2006",      // Example: July 2020
		"2006-01",           // Example: 2020-07
		"2006/01",           // Example: 2020/07
		"2006.01",           // Example: 2020.07
	}

	// Try parsing with each format
	for _, format := range formats {
		t, err := time.Parse(format, dateStr)
		if err == nil {
			return t, nil
		}
	}

	return time.Time{}, fmt.Errorf("unable to parse date: %s", dateStr)
}

func contains(check string, words []string) bool {
	low := strings.ToLower(check)
	for _, word := range words {
		if strings.Contains(low, word) {
			return true
		}
	}
	return false
}
