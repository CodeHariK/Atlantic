.PHONY: auth inventory skitty

atlantic:
	echo Welcome to Atlantic

tunnel:
	cloudflared tunnel --url 127.0.0.1:80/ --hostname atlantic.shark.run --name atlantic
tunnellist:
	cloudflared tunnel list

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

	docker compose -f docker-compose.gen.yaml --profile docker config > docker-compose.yaml

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

img:
	docker build -f Dockerfile.$(img) -t $(img) .

auth:
	go run auth/cmd/main.go
authbuild:
	make img img=auth
authrun:
	docker run -p 7777:7777 --name auth auth

inventory:
	go run inventory/cmd/main.go
inventorybuild:
	make img img=inventory
inventoryrun:
	docker run -p 9100:9100 --name inventory inventory

skitty:
	cd skitty && bun run dev
saskitty:
	cd skitty && bun run sadev
skittybuild:
	make img img=skitty
skittyrun:
	docker run -p 3000:3000 --name skitty skitty
skittykobuild:
	# KO_DATA_PATH=. KO_DEFAULTPLATFORMS=linux/arm64 KO_DOCKER_REPO=ttl.sh/skitty ko build skitty/main.go
	# KO_DATA_PATH=. KO_DEFAULTPLATFORMS=linux/arm64 KO_DOCKER_REPO=ko.local/skitty ko build skitty/main.go
	# docker run -p 3000:3000 --name skitty $(image)

kubecreate:
	minikube delete --all --purge
	docker system prune

	minikube start

argo:
	kubectl create namespace argocd
	kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

envoy:
	helm pull oci://docker.io/envoyproxy/gateway-helm --version v0.0.0-latest --untar --untardir ./k8s/chart

certmanager:
	helm repo add jetstack https://charts.jetstack.io --force-update

	helm pull jetstack/cert-manager --version v1.15.3 --untar --untardir ./k8s/chart

argocertsync:
	argocd app sync cert-manager-local
argocertcheck:
	argocd app get cert-manager-local

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

kurl:
	kubectl run -i --tty --rm curl-test --image=curlimages/curl --restart=Never -- sh
durl:
	docker run -it --rm curlimages/curl sh

call:
	curl -s \
		--resolve atlantic.shark.run:443:172.18.255.202 \
		http://atlantic.shark.run/
	curl -s \
		--resolve atlantic.shark.run:443:172.18.255.202 \
		https://atlantic.shark.run/

	curl --resolve www.example.com:80:0.0.0.0 http://www.example.com/
	curl --resolve cow.example.com:5678:0.0.0.0 http://cow.example.com/cow
	curl cow.example.com/cow
	curl www.example.com
	curl --insecure https://cow.example.com/cow
