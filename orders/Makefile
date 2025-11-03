PORT = 4400
CONTAINER_NAME = orders

gen:
	buf dep update
	buf format -w
	buf generate
	cp -r ./proto/ ../docs/proto

run:
	go run cmd/main.go
