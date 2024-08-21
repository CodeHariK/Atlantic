package logger

import (
	"fmt"
	"log/slog"
	"os"

	"github.com/codeharik/Atlantic/config"
)

const (
	colorNone = "\033[0m"

	Red     = "\033[0;31m"
	Yellow  = "\033[38;5;11m"
	Green   = "\033[38;5;76m"
	Blue    = "\033[38;5;39m"
	Magenta = "\x1b[35m"

	WhiteBack   = "\033[40;5;135m"
	RedBack     = "\033[41;5;135m"
	GreenBack   = "\033[42;5;135m"
	YellowBack  = "\033[43;5;135m"
	BlueBack    = "\033[44;5;135m"
	MagentaBack = "\033[45;5;135m"
	PurpleBack  = "\033[48;5;135m"
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

func Lava(msg string) {
	fmt.Fprintf(os.Stdout, Red+msg+colorNone)
}
