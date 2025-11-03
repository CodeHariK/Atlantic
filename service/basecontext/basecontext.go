package basecontext

import (
	"context"
	"net"
)

const ConstantServerAddr = "ServerAddr"

func GetServerAddr(ctx context.Context) string {
	return ctx.Value(ConstantServerAddr).(string)
}

func GenerateContext(ctx context.Context) func(net.Listener) context.Context {
	return func(l net.Listener) context.Context {
		return context.WithValue(ctx, ConstantServerAddr, l.Addr().String())
	}
}
