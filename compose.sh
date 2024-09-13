export SKITTY_CPU_LIMIT=0.5
export SKITTY_MEMORY_LIMIT=256M
export SKITTY_PORT=3000
export DEBUG="debug-mode"

kompose convert -f docker-compose.yaml -o k8s
