PORT = 7800
CONTAINER_NAME = cosmog

gen:
	buf dep update
	buf format -w
	buf generate
	cp -r ./proto/ ../docs/proto

run:
	minio_addr="localhost:9000" go run cmd/main.go
rundocker:
	minio_addr="minio:9000" go run cmd/main.go
runk8s:
	minio_addr="minio:9000" go run cmd/main.go
