PORT = 7800
CONTAINER_NAME = cosmog

gen:
	# buf lint
	buf dep update
	buf format -w
	buf generate --include-imports
	cp -r ./proto/ ../docs/proto

run:
	go run cmd/main.go
