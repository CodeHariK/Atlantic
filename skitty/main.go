package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	dir := "dist"

	if _, err := os.Stat(dir); os.IsNotExist(err) {
		log.Fatalf("Directory %s does not exist", dir)
	}

	fileServer := http.FileServer(http.Dir(dir))

	http.Handle("/", fileServer)

	port := ":4321"
	log.Printf("Serving %s on http://localhost%s\n", dir, port)
	log.Fatal(http.ListenAndServe(port, nil))
}
