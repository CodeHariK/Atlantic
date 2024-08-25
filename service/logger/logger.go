package logger

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"os"
	"runtime/debug"

	"github.com/codeharik/Atlantic/config"
)

const (
	colorNone = "\033[0m"

	red     = "\033[0;31m"
	green   = "\033[38;5;76m"
	blue    = "\033[38;5;39m"
	magenta = "\x1b[35m"

	whiteBg   = "\033[40;5;135m"
	redBg     = "\033[41;5;135m"
	greenBg   = "\033[42;5;135m"
	blueBg    = "\033[44;5;135m"
	magentaBg = "\033[45;5;135m"
	purpleBg  = "\033[48;5;135m"
)

var colors = []string{magenta, blue, green}

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

func Log(msgs ...any) {
	for i, msg := range msgs {

		if err, ok := msg.(error); ok {
			fmt.Fprintf(os.Stderr, red+err.Error()+colorNone+"\n")
			fmt.Fprintf(os.Stderr, red+string(debug.Stack())+colorNone+"\n")
			continue
		}

		b, err := json.MarshalIndent(msg, "", "  ")
		if err != nil {
			fmt.Println("Log Error")
		}
		fmt.Fprintf(os.Stdout, colors[i%len(colors)]+string(b)+colorNone+"\n")
	}
}
