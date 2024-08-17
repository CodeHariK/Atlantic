package process

import (
	"log/slog"
	"runtime"

	"go.uber.org/automaxprocs/maxprocs"
)

func SetMaxProcs() {
	_, err := maxprocs.Set()
	if err != nil {
		slog.Warn("startup", "error", err)
	}
	slog.Info("startup", "GOMAXPROCS", runtime.GOMAXPROCS(0))
}
