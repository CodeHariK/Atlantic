package games

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"os"
)

func ValidateMain() {
	// Read the file content
	// Unmarshal JSON into Config struct
	games := loadGames()

	fmt.Println(len(games))

	CategoriesMap := make(map[string]bool)
	GenreMap := make(map[string]bool)
	DevMap := make(map[string]bool)

	for uid := range games {
		g := games[uid]

		for _, c := range g.Categories {
			CategoriesMap[c] = true
		}

		for _, c := range g.Genres {
			GenreMap[c] = true
		}

		DevMap[g.Developers] = true
	}

	for uid := range games {
		games[uid].Rating = float32(math.Log10(float64(float32(games[uid].Sales) / float32(2000))))
		games[uid].Sales = 0
		games[uid].Price *= 100
	}

	fmt.Printf("cat:%d gen:%d dev:%d len:%d\n", len(CategoriesMap), len(GenreMap), len(DevMap), len(games))

	newData, err := json.MarshalIndent(games, "", "  ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Step 5: Save the JSON data back to a file
	err = os.WriteFile("../data/games_updated.json", newData, 0o644)
	if err != nil {
		fmt.Println("Error saving file:", err)
		return
	}
}

func loadGames() []Game {
	file, err := os.Open("./data/media+games.json")
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("error reading file: %v", err)
	}

	var games []Game

	if err := json.Unmarshal(byteValue, &games); err != nil {
		log.Fatalf("error unmarshaling config: %v", err)
	}
	return games
}

// func bulkInsertUsersAndPosts(conn *pgx.Conn, usersData UsersData) error {
// 	tx, err := conn.Begin(context.Background())
// 	if err != nil {
// 		return err
// 	}
// 	defer tx.Rollback(context.Background())

// 	for _, user := range usersData.Users {
// 		// Insert user
// 		_, err := tx.Exec(context.Background(), "INSERT INTO users (id, name) VALUES ($1, $2)", user.ID, user.Name)
// 		if err != nil {
// 			return err
// 		}

// 		for _, post := range user.Posts {
// 			// Insert post
// 			_, err := tx.Exec(context.Background(), "INSERT INTO posts (id, title, user_id) VALUES ($1, $2, $3)", post.ID, post.Title, user.ID)
// 			if err != nil {
// 				return err
// 			}
// 		}
// 	}

// 	return tx.Commit(context.Background())
// }
