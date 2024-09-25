package games

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
)

type ParseGame struct {
	Title            string   `json:"title"`
	ReleaseDate      string   `json:"release_date"`
	Price            float64  `json:"price"`
	ShortDescription string   `json:"short_description"`
	Website          string   `json:"website"`
	Screenshots      []string `json:"screenshots"`
	Languages        []string `json:"supported_languages"`
	Developers       []string `json:"developers"`
	Categories       []string `json:"categories"`
	Genres           []string `json:"genres"`
	Sales            string   `json:"estimated_owners"`
	Movies           []string `json:"movies"`
}

type Game struct {
	Id               uuid.UUID `json:"id"`
	Title            string    `json:"title"`
	ReleaseDate      int64     `json:"date"`
	Price            float64   `json:"price"`
	ShortDescription string    `json:"info"`
	Website          string    `json:"site"`
	Screenshots      []string  `json:"img"`
	Developers       string    `json:"dev"`
	Categories       []string  `json:"cat"`
	Genres           []string  `json:"gen"`
	Sales            int       `json:"sale"`
	Movies           []string  `json:"mov"`
}

func extractMain() {
	banned := []string{}

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

	avgprice := 0
	avgsale := 0

	filteredGames := make([]Game, len(games))
	for _, game := range games {
		// Limit screenshots to a maximum of 3
		if len(game.Screenshots) > 3 {
			game.Screenshots = game.Screenshots[:3]
		}
		if len(game.Categories) > 3 {
			game.Categories = game.Categories[:3]
		}

		t, err := parseDate(game.ReleaseDate)
		if err != nil {
			fmt.Println("Error parsing date:", err)
			return
		}

		m, _ := json.Marshal(game)

		if averageFromRange(game.Sales) > 50000 &&
			!contains(string(m), banned) &&
			len(game.Movies) > 0 &&
			arrayContains(game.Languages, "English") {

			uid, _ := uuid.NewV7()

			g := Game{
				Id:               uid,
				Title:            game.Title,
				ReleaseDate:      t.Unix(),
				Price:            game.Price,
				ShortDescription: game.ShortDescription,
				Website:          game.Website,
				Screenshots:      game.Screenshots,
				Developers:       game.Developers[0],
				Categories:       game.Categories,
				Genres:           game.Genres,
				Sales:            averageFromRange(game.Sales),
				Movies:           game.Movies,
			}

			filteredGames = append(filteredGames, g)
			avgprice += int(g.Price) * g.Sales
			avgsale += g.Sales
		}
	}

	avgsale /= len(filteredGames)
	avgprice = avgprice / avgsale
	avgprice /= len(filteredGames)

	for id, game := range filteredGames {
		if game.Price == 0 {
			game.Price = float64(avgprice * game.Sales / avgsale)
		}
		filteredGames[id] = game
	}

	// Step 4: Encode the processed data back to JSON
	newData, err := json.MarshalIndent(filteredGames, "", "  ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Step 5: Save the JSON data back to a file
	err = os.WriteFile("data/games_updated.json", newData, 0o644)
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

func averageFromRange(rangeStr string) int {
	parts := strings.Split(rangeStr, " - ")
	if len(parts) != 2 {
		return 0
	}

	minValue, err := strconv.ParseFloat(parts[0], 64)
	if err != nil {
		return 0
	}

	maxValue, err := strconv.ParseFloat(parts[1], 64)
	if err != nil {
		return 0
	}

	average := (minValue + maxValue) / 2
	return int(average)
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

func arrayContains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
