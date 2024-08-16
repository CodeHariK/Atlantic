PORT = 8501
CONTAINER_NAME = dashboard

run:
	python3 main.py
app:
	streamlit run app.py
format:
	ruff format .
shell:
	poetry shell
	poetry env info --path

act:
	conda activate dashboard
env:
	conda env list
	conda env export > environment.yml
install:
	conda install -c conda-forge streamlit altair

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
