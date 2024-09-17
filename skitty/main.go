package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	staticDir := os.Getenv("KO_DATA_PATH")
	if staticDir == "" {
		staticDir = "kodata"
	}

	// File server for serving static assets (CSS, JS, etc.)
	fs := http.FileServer(http.Dir(staticDir))

	// Custom handler to serve index.html for unknown routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Check if the requested file exists
		path := filepath.Join(staticDir, r.URL.Path)

		// If the file doesn't exist, serve index.html
		if _, err := os.Stat(path); os.IsNotExist(err) {

			fmt.Println("index.html")
			w.Header().Set("Content-Type", "text/html")
			// Serve index.html for unknown routes
			http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
			return
		}

		fmt.Println(filepath.Ext(path))

		// Set the content type based on the file extension
		switch ext := strings.ToLower(filepath.Ext(path)); ext {
		case ".html":
			w.Header().Set("Content-Type", "text/html")
		case ".css":
			w.Header().Set("Content-Type", "text/css")
		case ".js":
			w.Header().Set("Content-Type", "application/javascript")
		case ".json":
			w.Header().Set("Content-Type", "application/json")
		case ".png":
			w.Header().Set("Content-Type", "image/png")
		case ".jpg", ".jpeg":
			w.Header().Set("Content-Type", "image/jpeg")
		case ".gif":
			w.Header().Set("Content-Type", "image/gif")
		case ".svg":
			w.Header().Set("Content-Type", "image/svg+xml")
		default:
			// Let http.FileServer handle the content type for other files
			w.Header().Set("Content-Type", "application/octet-stream")
		}

		// Serve the file
		fs.ServeHTTP(w, r)
	})

	// Start the server on port 3000
	log.Println("Serving files on http://localhost:3000 from", staticDir)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
