PORT = 3000
CONTAINER_NAME = skitty

dockerbuild:
	docker build -f Dockerfile.$(CONTAINER_NAME) -t $(CONTAINER_NAME) .
dockersh:
	docker exec -it -v $(shell dirname $(shell pwd))/config/config.json:/config.json $(CONTAINER_NAME) /bin/sh
dockerrun:
	docker run -p $(PORT):$(PORT) -v $(shell dirname $(shell pwd))/config/config.json:/config.json --name $(CONTAINER_NAME) $(CONTAINER_NAME)
dockerlogs:
	docker logs -f $(CONTAINER_NAME)
dockerinspect:
	docker inspect $(CONTAINER_NAME)
dockerstats:
	docker stats $(CONTAINER_NAME)
dockerrestart:
	docker restart $(CONTAINER_NAME)
dockerstop:
	docker stop $(CONTAINER_NAME)
dockerremove:
	docker rm -f $(CONTAINER_NAME)
