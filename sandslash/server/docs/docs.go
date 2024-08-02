package docs

import (
	"embed"
	"fmt"
	"net/http"

	"github.com/codeharik/Atlantic/sandslash/service"
)

//go:embed openapi.json
var openapijson embed.FS

func OpenapiHandler(app *http.ServeMux, config service.Config) {
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
    <title>%s</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
    <style>
		body, span {
			font-weight: 400 !important;
			outline: none;
			font-size: 14px;
		}
		.swagger-ui .info {
			margin: 10px;
		}
		.swagger-ui .opblock.opblock-post {
			background: #ffffff1a;
			border-color: #f0f0f0;
		}
		.swagger-ui .opblock.opblock-post .opblock-summary-method {
			background: #ffffff;
			border: 1px solid #74df74;
			color: black;
		}
		.swagger-ui section.models .model-container {
			background: #dedede2e;
		}
		.highlight-code pre {
			background: black;
		}
		.swagger-ui textarea {
			background: #ffffffcc;
			border: 1px solid #b3b3b3;
			color: #292929;
			font-weight: 300;
		}
    </style>
</head>

<body>
</body>

<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>

<script>

	window.onload = () => {
		window.ui = SwaggerUIBundle({
			url: '%s',
			dom_id: 'body',
		});

		setTimeout(() => {
			document.querySelector(".title").textContent = '%s'
		}, 50)
	};

</script>

</html>`, config.Service.Name, config.ServerFullUrl()+"/docs/openapi.json", config.Service.Name)))
	})
}
