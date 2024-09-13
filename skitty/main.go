package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	staticDir := os.Getenv("KO_DATA_PATH")
	if staticDir == "" {
		staticDir = "kodata"
	}

	// File server for serving static assets (CSS, JS, etc.)
	fs := http.FileServer(http.Dir(staticDir))

	// Handle requests to the static directory
	// http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Custom handler to serve index.html for unknown routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Check if the requested file exists
		path := filepath.Join(staticDir, r.URL.Path)
		_, err := os.Stat(path)
		if os.IsNotExist(err) {
			// If the file doesn't exist, serve index.html
			http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
		} else {
			// Otherwise, serve the file
			fs.ServeHTTP(w, r)
		}
	})

	// Start the server on port 3000
	log.Println("Serving files on http://localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
