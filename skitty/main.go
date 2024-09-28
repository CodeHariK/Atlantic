package main

import (
	"embed"
	"log"
	"net/http"
	"path"
	"strings"
)

//go:embed dist/*
var staticFiles embed.FS

func main() {
	// staticDir := os.Getenv("KO_DATA_PATH")
	// if staticDir == "" {
	// 	staticDir = "./kodata"
	// }

	staticDir := "dist"

	// File server for serving static assets (CSS, JS, etc.)
	// fs := http.FileServer(http.Dir(staticDir))
	fs := http.FileServer(http.FS(staticFiles))

	http.Handle("/dist/", http.StripPrefix("/dist", fs))

	// Serve index.html for any route that is not a file request
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Check if the path is to a file (has an extension)
		if !strings.Contains(path.Base(r.URL.Path), ".") {
			// If it's not a file request, serve index.html
			http.ServeFile(w, r, "dist/index.html")
		} else {
			// Otherwise, serve the requested file if it exists
			http.ServeFile(w, r, "dist"+r.URL.Path)
		}
	})

	// // Custom handler to serve index.html for unknown routes
	// http.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
	// 	// Check if the requested file exists
	// 	path := filepath.Join(staticDir, r.URL.Path)
	// 	ext := strings.ToLower(filepath.Ext(path))

	// 	fmt.Println("StaticDir:", staticDir, "Path:", path, "url:", r.URL.Path, "ext:", ext)

	// 	// If the file doesn't exist, serve index.html
	// 	if _, err := os.Stat(path); os.IsNotExist(err) || ext == "" {
	// 		fmt.Println("index.html")
	// 		w.Header().Set("Content-Type", "text/html")
	// 		// Serve index.html for unknown routes
	// 		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	// 		return
	// 	}

	// 	// Set the content type based on the file extension
	// 	switch ext {
	// 	case ".html":
	// 		w.Header().Set("Content-Type", "text/html")
	// 	case ".css":
	// 		w.Header().Set("Content-Type", "text/css")
	// 	case ".js":
	// 		w.Header().Set("Content-Type", "application/javascript")
	// 	case ".json":
	// 		w.Header().Set("Content-Type", "application/json")
	// 	case ".png":
	// 		w.Header().Set("Content-Type", "image/png")
	// 	case ".jpg", ".jpeg":
	// 		w.Header().Set("Content-Type", "image/jpeg")
	// 	case ".gif":
	// 		w.Header().Set("Content-Type", "image/gif")
	// 	case ".svg":
	// 		w.Header().Set("Content-Type", "image/svg+xml")
	// 	default:
	// 		// Let http.FileServer handle the content type for other files
	// 		w.Header().Set("Content-Type", "application/octet-stream")
	// 	}

	// 	// Serve the file
	// 	// fs.ServeHTTP(w, r)
	// })

	// Start the server on port 3000
	log.Println("Serving files on http://localhost:3000 from", staticDir)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
