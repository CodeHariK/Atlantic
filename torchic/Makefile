PORT = 6543
CONTAINER_NAME = torchic

run:
	uvicorn main:app --reload --host localhost --port $(PORT)

act:
	conda activate torchic
env:
	conda env list
	conda env export > environment.yml
install:
	conda install -c conda-forge transformers pytorch fastapi uvicorn python-multipart pillow torchvision

once:
	curl -X POST "http://127.0.0.1:$(PORT)/generate" -H "Content-Type: application/json" -d '{"text": "Once upon a time"}'

dockerbuild:
	docker build -f Dockerfile.$(CONTAINER_NAME) -t $(CONTAINER_NAME) .
dockersh:
	docker exec -it $(CONTAINER_NAME) /bin/sh
dockerrun:
	docker run -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(CONTAINER_NAME)
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
