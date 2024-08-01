package docs

import (
	"embed"
	"fmt"
	"net/http"
)

//go:embed openapi.json
var openapijson embed.FS

func OpenapiHandler(app *http.ServeMux, logo string) {
	// Serve the embedded openapi.json file at /docs/openapi.json
	app.HandleFunc("GET /docs/openapi.json", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/json")

		openapiBytes, err := openapijson.ReadFile("openapi.json")
		if err != nil {
			http.Error(w, "Failed to read openapi.json", http.StatusInternalServerError)
			return
		}
		w.Write(openapiBytes)
	})

	// Serve the Redoc HTML
	app.HandleFunc("GET /docs", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Write([]byte(fmt.Sprintf(`<!DOCTYPE html>
<html>

<head>
    <title>Redoc</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <style>
        body {
            margin: 0;
            padding: 0;
        }
		.react-tabs__tab-panel {
			border-radius: 20px;
		}
		input {
			padding: 15px !important;
			margin: 6px !important;
			border: 1px solid white !important;
			border-radius: 5px !important;
			font-size: 16px !important;
		}
		div[role="search"] {
			text-align-last: center;
		}
		div[role="search"] > input{
			width: 95%%;
		}
    </style>
</head>

<body>
	<div id="redoc-container"></div>
</body>

<script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
<script>
	Redoc.init('/docs/openapi.json', {
		theme: {
			sidebar: {					
				backgroundColor: '#43395d',
				textColor: '#ffffff'
			},
			rightPanel: {					
				backgroundColor: '#43395d',
			},
			colors: {
				primary: {
					main: '#5a5a5a'
				}
			},
			typography: {
				fontSize: '16px',
				fontFamily: 'Roboto, sans-serif',
				headings: {
					fontFamily: 'Montserrat, sans-serif'
				}
			}
		}
	}, document.getElementById('redoc-container'))

	setTimeout(() => {
		var searchDiv = document.querySelector('div[role="search"]');
		var img = document.createElement('img');
		img.src = '%s';
		img.style.width = '200px'
		img.style.borderRadius = '20px'
		img.style.padding = '15px'
		// searchDiv.appendChild(img);
	}, 2000);
</script>

</html>`, logo)))
	})
}
