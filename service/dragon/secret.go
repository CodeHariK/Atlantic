package dragon

import (
	"context"
	"crypto/ed25519"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/signal"
	"sync"

	"github.com/codeharik/Atlantic/config"
	"github.com/codeharik/Atlantic/service/authbox"
	"github.com/codeharik/Atlantic/service/colorlogger"
)

func (d *Dragon) ReadKey(key string, index int) (*config.KeyPair, error) {
	// Get the serialized keypair from Redis
	data, err := d.LIndex(context.Background(), key, int64(index)).Result()
	if err != nil {
		return nil, err
	}

	// Deserialize the data back into a KeyPair struct
	var keypair config.KeyPair
	err = json.Unmarshal([]byte(data), &keypair)
	if err != nil {
		return nil, err
	}

	return &keypair, nil
}

func (d *Dragon) GenerateOrLoadKeys(cfg config.Config, key string) ([]config.KeyPair, error) {
	l, err := d.LLen(context.Background(), key).Result()
	if err != nil {
		return nil, err
	}
	if l == int64(cfg.AuthService.KeyMod) {
		return d.LoadKeys(key)
	}
	return d.GenerateAndSaveKeys(cfg, key)
}

// Function to generate and save Ed25519 key pair
func (d *Dragon) GenerateAndSaveKeys(cfg config.Config, key string) ([]config.KeyPair, error) {
	keypairs := make([]config.KeyPair, cfg.AuthService.KeyMod)
	bytekeypairs := make([]interface{}, cfg.AuthService.KeyMod)

	for i := 0; i < cfg.AuthService.KeyMod; i++ {

		// Generate the key pair
		publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
		if err != nil {
			fmt.Println("Failed to generate key ", key)
		}

		keypairs[i] = config.KeyPair{Public: publicKey, Private: privateKey}

		keyPairData, err := json.Marshal(keypairs[i])
		if err != nil {
			fmt.Printf("failed to marshal key pair: %v", err)
		}

		bytekeypairs[i] = keyPairData
	}

	_, err := d.LPush(context.Background(), key, bytekeypairs...).Result()
	if err != nil {
		return nil, err
	}

	return keypairs, nil
}

func (d *Dragon) LoadKeys(key string) ([]config.KeyPair, error) {
	// Fetch the entire list from Redis (from index 0 to -1)
	data, err := d.LRange(context.Background(), key, 0, -1).Result()
	if err != nil {
		return nil, err
	}

	var keyPairs []config.KeyPair

	// Iterate over the data and unmarshal each element back into a KeyPair
	for _, item := range data {
		var keypair config.KeyPair
		err := json.Unmarshal([]byte(item), &keypair)
		if err != nil {
			return nil, err
		}
		keyPairs = append(keyPairs, keypair)
	}

	return keyPairs, nil
}

func (d *Dragon) CacheKeys(keypairs *[]config.KeyPair, key string, i int) error {
	item, err := d.LIndex(context.Background(), key, int64(i)).Result()
	if err != nil {
		return err
	}

	var keypair config.KeyPair
	err = json.Unmarshal([]byte(item), &keypair)
	if err != nil {
		return err
	}

	colorlogger.Log("Cache", key, keypair)

	(*keypairs)[i] = keypair

	return nil
}

func (d *Dragon) ReplaceKey(key string, i int) error {
	publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		fmt.Println("ReplaceKey ", err)
	}

	keypair := config.KeyPair{Public: publicKey, Private: privateKey}

	keyPairData, err := json.Marshal(keypair)
	if err != nil {
		fmt.Printf("failed to marshal key pair: %v", err)
	}

	_, err = d.LSet(context.Background(), key, int64(i), keyPairData).Result()
	if err != nil {
		return err
	}

	colorlogger.Log("Replace", key, keypair)

	return nil
}

func (d *Dragon) SyncKeys(cfg *config.Config, wg *sync.WaitGroup) {
	sessionKeys, err := d.GenerateOrLoadKeys(*cfg, "session")
	if err != nil {
		log.Fatal(err)
	}
	accessKeys, err := d.GenerateOrLoadKeys(*cfg, "access")
	if err != nil {
		log.Fatal(err)
	}
	cfg.AuthService.SessionKeyPairs = sessionKeys
	cfg.AuthService.AccessKeyPairs = accessKeys

	go d.SyncKeySubscribe(cfg, wg)
}

type SyncKeyMessage struct {
	Key int `json:"key"`
}

func (d *Dragon) SyncKeySubscribe(cfg *config.Config, wg *sync.WaitGroup) {
	sigctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
	)

	defer stop()    // Stop receiving signal notifications when we're done
	defer wg.Done() // Notify the WaitGroup that this goroutine is done

	SyncKeyPubSub := d.Client.Subscribe(sigctx, "SyncKey")
	defer SyncKeyPubSub.Close()

	for {
		select {
		case <-sigctx.Done():
			return
		case msg := <-SyncKeyPubSub.Channel():
			var syncmsg SyncKeyMessage
			if err := json.Unmarshal([]byte(msg.Payload), &syncmsg); err != nil {
				fmt.Println("Error unmarshaling sync key message:", err)
				continue
			}

			if err := d.CacheKeys(&cfg.AuthService.AccessKeyPairs, "access", syncmsg.Key); err != nil {
				fmt.Println("SyncKeySubscribe Error:", err)
			}
		}
	}
}

func (d *Dragon) SyncKeyPublish(config *config.Config, uid string) {
	key := authbox.GenerateKid(uid, config.AuthService.KeyMod)
	if msg, err := json.Marshal(SyncKeyMessage{Key: key}); err == nil {

		if err := d.ReplaceKey("access", key); err != nil {
			fmt.Println("SyncKeySubscribe Error ", err)
		}

		d.Client.Publish(context.Background(), "SyncKey", msg)
	} else {
		fmt.Println("SyncKeyPublish Error ", err)
	}
}
