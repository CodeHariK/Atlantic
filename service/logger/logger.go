package logger

import (
	"log/slog"
	"os"

	"github.com/codeharik/Atlantic/config"
)

func SetLogger(config config.Config) {
	var handler slog.Handler
	opts := slog.HandlerOptions{
		AddSource: true,
	}
	switch {
	case config.Service.Dev:
		handler = slog.NewTextHandler(os.Stderr, &opts)
	default:
		handler = slog.NewJSONHandler(os.Stderr, &opts)
	}

	logger := slog.New(handler)
	slog.SetDefault(logger)
}
