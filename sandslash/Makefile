run:
	go run cmd/main.go

dockerbuild:
	docker build -f Dockerfile.sandslash -t sandslash .

dockersh:
	docker run -it -v $(shell dirname $(shell pwd))/config/config.json:/config.json --entrypoint /bin/sh sandslash

dockerrun:
	make dockerrm
	docker run -p 8080:8080 -v $(shell dirname $(shell pwd))/config/config.json:/config.json --name sandslash sandslash

dockerrm:
	docker rm -f sandslash