dcbuild:
	docker compose build --no-cache

dcup:
	docker compose up

caddy:
	open -a "Google chrome" https://localhost
	caddy fmt --overwrite config/caddy/Caddyfile
	caddy run --config config/caddy/Caddyfile

caddyatlantic:
	open -a "Google chrome" http://atlantic.shark.run/
	caddy fmt --overwrite config/caddy/Caddyfileatlantic
	caddy run --config config/caddy/Caddyfileatlantic

traefik:
	open -a "Google chrome" http://atlantic.shark.run
	open -a "Google chrome" http://localhost
	traefik --configfile ./config/traefik/traefik.yml

minio:
	minio server --address :9000 --console-address :9001 executables/minio

meilisearch:
	meilisearch  --config-file-path="./config/meilisearch/config.toml"

skaffoldinit:
	skaffold init
skaffoldev:
	skaffold dev
skittyforward:
	kubectl port-forward service/skitty-service 3000:3000

kompose:
	kompose convert -f docker-compose.yaml -o k8s
