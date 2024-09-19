.PHONY: start local atlantic auth inventory skitty

start:
	@VITE_DOMAIN=$(VITE_DOMAIN) ./run.sh \
   	ATLANTIC "echo Welcome to Atlantic ~> \$$VITE_DOMAIN" \
   	web "open -a 'Google chrome' \$$VITE_DOMAIN" \
      skitty "make skitty" \
      auth "make auth" \
      inventory "make inventory" \
      minio "make minio" \
      caddy "make caddy"

local:
	@VITE_DOMAIN=http://localhost make start

atlantic:
	@VITE_DOMAIN=http://atlantic.shark.run make start

atlantic:
   @make local VITE_DOMAIN=atlantic.shark.run

tunnel:
	cloudflared tunnel --url 127.0.0.1:80/ --hostname atlantic.shark.run --name atlantic
tunnellist:
	cloudflared tunnel list

caddy:
	caddy fmt --overwrite config/caddy/Caddyfile
	caddy run --config config/caddy/Caddyfile

minio:
	MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password minio server --address :9000 --console-address :9001 executables/minio

meilisearch:
	meilisearch  --config-file-path="./config/meilisearch/config.toml"

kompose:
	rm -f k8s/gen/*

	docker compose -f docker-compose.gen.yaml --env-file var.docker --profile docker config > docker-compose.yaml

	docker compose -f docker-compose.gen.yaml --env-file var.k8s config > docker-compose.k8s.yaml

	kompose convert -v --with-kompose-annotation=false -f docker-compose.k8s.yaml -n atlantic -o k8s/gen

dcbuild:
	docker compose build --no-cache
dcup:
	make kompose
	docker compose --profile docker up

img:
	docker build -f Dockerfile.$(img) -t $(img) .

test:
	make img img=test
	docker rm test || true
	docker run -it --name test --network atlantic test

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
goskitty:
	cd skitty && bun run kbuild && go run main.go
skittybuild:
	docker build --build-arg VITE_DOMAIN="http://example.com" -f Dockerfile.skitty -t skitty .
skittyrun:
	docker rm skitty || true
	docker run -p 3000:3000 --name skitty skitty
koskitty:
	# KO_DATA_PATH=. KO_DEFAULTPLATFORMS=linux/arm64 KO_DOCKER_REPO=ttl.sh/skitty ko build skitty/main.go
	# KO_DATA_PATH=. KO_DEFAULTPLATFORMS=linux/arm64 KO_DOCKER_REPO=ko.local/skitty ko build skitty/main.go
	# docker run -p 3000:3000 --name skitty $(image)

clear:
	docker system prune

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

bcrypt:
	@htpasswd -nbBC 10 "" $(PWD) | tr -d ':\n' | sed 's/$2y/$2a/'

argopassword:
	@make bcrypt PWD=password

argoforward:
	@kubectl port-forward service/argo-argocd-server -n argocd 5000:5010

headlamp:
	@kubectl create token headlamp-admin -n kube-system
	@kubectl port-forward service/headlamp -n headlamp 5001:80

dev:
	make kompose
	kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.15.3/cert-manager.yaml
	kubectl apply --server-side -f https://github.com/envoyproxy/gateway/releases/download/v1.1.1/install.yaml
	skaffold dev
