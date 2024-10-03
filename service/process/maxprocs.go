package process

import (
	"fmt"
	"runtime"

	"go.uber.org/automaxprocs/maxprocs"
)

func SetMaxProcs() {
	_, err := maxprocs.Set()
	if err != nil {
		fmt.Println("startup", "error", err)
	}
	fmt.Printf("GOMAXPROCS:%d NumCPU:%d NumGoroutine:%d", runtime.GOMAXPROCS(0), runtime.NumCPU(), runtime.NumGoroutine())
}
