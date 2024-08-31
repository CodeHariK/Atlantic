package sessionstore

import (
	"fmt"
	"sync"
)

// func BenchGenerateKid(b *testing.B) {
// 	cfg := config.LoadConfig(true, "config.json", "../config/config.json")

// 	j := JwtConfig{Config: &cfg}

// 	ss := []string{}
// 	counter := map[int]int{}

// 	for i := 0; i < 100000; i++ {
// 		u, _ := uuid.NewV7()
// 		token, c, _ := j.CreateJwtToken(
// 			&JwtObj{
// 				User:  u,
// 				Roles: []string{"dev", "admin"},
// 			},
// 			time.Minute*15)
// 		if c != nil {
// 		}

// 		kid := j.GenerateKid(u)
// 		ss = append(ss, token)
// 		counter[kid] += 1
// 	}

// 	fmt.Println(counter)
// 	t1 := b.Elapsed()
// 	fmt.Println(t1)
// 	extractTest(j, ss)
// 	fmt.Println(b.Elapsed() - t1)
// 	fmt.Println()
// }

func extractTest(j JwtConfig, ss []string) {
	// for _, s := range ss {
	// 	_, err := j.ExtractClaims(s)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 	}
	// }

	var wg sync.WaitGroup

	n := 12
	batch := len(ss) / n

	for i := 0; i < n; i++ {
		wg.Add(1)

		go func() {
			defer wg.Done()

			sss := ss[batch*i : batch*(i+1)]

			for _, s := range sss {
				_, err := j.VerifyJwt(s)
				if err != nil {
					fmt.Println(err)
				}
			}
		}()
	}

	wg.Wait()
}
