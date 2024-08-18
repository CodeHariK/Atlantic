dcbuild:
	docker compose build --no-cache

dcup:
	docker compose up

caddy:
	./executables/caddy fmt --overwrite config/Caddyfile
	./executables/caddy run --config config/Caddyfile
