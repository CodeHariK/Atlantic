atlantic:
	echo Welcome to Atlantic

caddy:
	open -a "Google chrome" http://localhost
	caddy fmt --overwrite config/caddy/Caddyfile
	caddy run --config config/caddy/Caddyfile

caddyatlantic:
	open -a "Google chrome" http://atlantic.shark.run/
	caddy fmt --overwrite config/caddy/Caddyfileatlantic
	caddy run --config config/caddy/Caddyfileatlantic

minio:
	MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password minio server --address :9000 --console-address :9001 executables/minio

meilisearch:
	meilisearch  --config-file-path="./config/meilisearch/config.toml"

kompose:
	rm -f k8s/gen/*

	docker compose -f docker-compose.gen.yaml config > docker-compose.yaml

	docker compose -f docker-compose.gen.yaml --env-file var.k8s config > docker-compose.k8s.yaml

	kompose convert -v --with-kompose-annotation=false -f docker-compose.k8s.yaml -n atlantic -o k8s/gen

dcbuild:
	docker compose build --no-cache
dcup:
	make kompose
	docker compose up

skaffoldinit:
	skaffold init
skaffoldev:
	make kompose
	skaffold dev

dbuild:
	docker build -f Dockerfile.$(image) -t $(image) .

skittybuild:
	docker build -f Dockerfile.skitty -t skitty .
skittyrun:
	docker run -p 3000:3000 --name skitty skitty
skittykobuild:
	KO_DATA_PATH=. KO_DEFAULTPLATFORMS=linux/arm64 KO_DOCKER_REPO=ttl.sh/skitty ko build main.go

kubecreate:
	minikube delete --all --purge
	docker system prune

	minikube start

envoy:
	helm install eg oci://docker.io/envoyproxy/gateway-helm --version v0.0.0-latest -n envoy-gateway-system --create-namespace

gateway:
	kubectl get gatewayclass -A --show-labels=true --show-kind=true
	kubectl get gateway -A --show-labels=true --show-kind=true
	kubectl get httproute -A --show-labels=true --show-kind=true

ka:
	kubectl get all -A
crds:
	kubectl get crds
kver:
	kubectl api-versions

configview:
	kubectl config view

call:
	curl -s \
		--resolve atlantic.shark.run:443:172.18.255.202 \
		http://atlantic.shark.run/
	curl -s \
		--resolve atlantic.shark.run:443:172.18.255.202 \
		https://atlantic.shark.run/

	curl --resolve www.example.com:80:127.0.0.1 http://www.example.com/
	curl --resolve www.example.com:80:0.0.0.0 http://www.example.com/
	curl --resolve www.example.com:80:0.0.0.0 http://www.example.com/
	curl --resolve cow.example.com:8080:0.0.0.0 http://cow.example.com/
	curl --resolve cow.example.com:8080:0.0.0.0 http://cow.example.com/cow
