PORT = 4400
CONTAINER_NAME = orders

gen:
	# buf lint
	buf dep update
	buf format -w
	buf generate --include-imports
	cp -r ./proto/ ../docs/proto

run:
	go run cmd/main.go
