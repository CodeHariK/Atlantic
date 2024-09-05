PORT = 7800
CONTAINER_NAME = cosmog

gen:
	buf dep update
	buf format -w
	buf generate
	cp -r ./proto/ ../docs/proto

run:
	go run cmd/main.go
