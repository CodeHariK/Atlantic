package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand/v2"
	"net/http"
	"os"
	"runtime"
	"strings"
	"time"
)

var SERVERID = rand.Int() % 1000

type echoResponse struct {
	Id       int                    `json:"id"`
	Time     string                 `json:"time"`
	Location map[string]interface{} `json:"location"`

	Method   string              `json:"method"`
	URL      string              `json:"url"`
	Query    map[string][]string `json:"query"`
	Headers  map[string][]string `json:"headers"`
	Body     string              `json:"body"`
	FormData map[string][]string `json:"form"`
	EnvVars  map[string]string   `json:"env"`
	ClientIP string              `json:"client_ip"`

	RuntimeVersion  string `json:"runtime_version"`
	OperatingSystem string `json:"operating_system"`
	Architecture    string `json:"architecture"`
	CPU             int    `json:"cpu"`
	MaxProcs        int    `json:"max_procs"`
	Hostname        string `json:"hostname"`
}

func echoHandler(w http.ResponseWriter, r *http.Request) {
	// Parse form data (from POST, PUT, PATCH requests)
	r.ParseForm()

	// Read the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read body", http.StatusInternalServerError)
		return
	}

	// Get environment variables
	envVars := make(map[string]string)
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		if len(pair) == 2 {
			envVars[pair[0]] = pair[1]
		}
	}

	// Collect client IP
	clientIP := r.RemoteAddr
	if forwarded := r.Header.Get("X-Forwarded-For"); forwarded != "" {
		clientIP = forwarded
	}

	hostname, err := os.Hostname()
	if err != nil {
		hostname = "Unknown"
	}

	// Prepare the response data
	response := echoResponse{
		Id:       SERVERID,
		Time:     time.Now().String(),
		Location: lookupGeo(),

		Method:   r.Method,
		URL:      r.URL.String(),
		Query:    r.URL.Query(),
		Body:     string(body),
		FormData: r.Form,
		EnvVars:  envVars,
		ClientIP: clientIP,

		RuntimeVersion:  runtime.Version(),
		OperatingSystem: runtime.GOOS,
		Architecture:    runtime.GOARCH,
		CPU:             runtime.NumCPU(),
		MaxProcs:        runtime.GOMAXPROCS(0),
		Hostname:        hostname,

		Headers: r.Header,
	}

	// Convert the response to JSON
	w.Header().Set("Content-Type", "application/json")

	b, _ := json.MarshalIndent(response, "", "  ")
	w.Write(b)
}

func main() {
	http.HandleFunc("/", echoHandler)
	fmt.Println("Server running on port 12121")
	if err := http.ListenAndServe(":12121", nil); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}

// lookupGeo retrieves and parses the location data from ipapi.co
func lookupGeo() map[string]interface{} {
	c := &http.Client{Timeout: 2 * time.Second}

	resp, err := c.Get("https://ipapi.co/json")
	if err != nil || resp == nil {
		log.Fatalf("Could not retrieve geo location data: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	// Parse the JSON response into a map
	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		log.Fatalf("Error parsing JSON: %v", err)
	}

	return result
}
