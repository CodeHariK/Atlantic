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

	minikube start --network-plugin=cni --cni=false --driver=docker
cilium:
	cilium install --version 1.16.1 --set kubeProxyReplacement=true --set gatewayAPI.enabled=true
	cilium hubble enable
	cilium hubble enable --ui
ciliumstatus:
	cilium status --wait
hubblestatus:
	hubble status
hubbleui:
	cilium hubble ui
hubbleforward:
	cilium hubble port-forward

gatewayapi:
	kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml
gateway:
	kubectl get gateway -A --show-labels=true --show-kind=true
	kubectl get gatewayclass -A --show-labels=true --show-kind=true
	kubectl get httproute -A --show-labels=true --show-kind=true
descroute:
	kubectl describe httproute $(var)
descgateway:
	kubectl describe gateway %(var)

ka:
	kubectl get all -A
crds:
	kubectl get crds
kver:
	kubectl api-versions
