dcbuild:
	docker compose build --no-cache

dcup:
	docker compose up

caddy:
	open -a "Google chrome" https://localhost
	./executables/caddy/caddy fmt --overwrite config/caddy/Caddyfile
	./executables/caddy/caddy run --config config/caddy/Caddyfile

caddyatlantic:
	open -a "Google chrome" http://atlantic.shark.run/
	./executables/caddy/caddy fmt --overwrite config/caddy/Caddyfileatlantic
	./executables/caddy/caddy run --config config/caddy/Caddyfileatlantic

traefik:
	open -a "Google chrome" http://atlantic.shark.run
	open -a "Google chrome" http://localhost
	./executables/traefik/traefik --configfile ./config/traefik/traefik.yml

minio:
	cd ./executables/minio && ./minio server --address :9000 --console-address :9001 store

meilisearch:
	cd ./executables/meilisearch && ./meilisearch  --config-file-path="../../config/meilisearch/config.toml"



skaffoldinit:
	./executables/skaffold/skaffold init
skaffoldev:
	./executables/skaffold/skaffold dev
skittyforward:
	kubectl port-forward service/skitty-service 3000:3000
