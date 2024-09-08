dcbuild:
	docker compose build --no-cache

dcup:
	docker compose up

caddy:
	./executables/caddy/caddy fmt --overwrite config/caddy/Caddyfile
	./executables/caddy/caddy run --config config/caddy/Caddyfile

caddyatlantic:
	./executables/caddy/caddy fmt --overwrite config/caddy/Caddyfileatlantic
	./executables/caddy/caddy run --config config/caddy/Caddyfileatlantic

minio:
	cd ./executables/minio && ./minio server --address :9000 --console-address :9001 store

meilisearch:
	cd ./executables/meilisearch && ./meilisearch --http-addr localhost:7700 --master-key aSampleMasterKey

traefik:
	cd ./executables/traefik && ./traefik --configfile ../../config/traefik/traefik.yml
