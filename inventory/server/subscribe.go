package server

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/nats-io/nats.go/jetstream"
)

func (i InventoryServiceServer) Subscribe() {
	ordersPlacedStream, err := i.natClient.Js.Stream(
		context.Background(),
		i.cfg.Nats.Topics.OrderStream,
	)
	if err != nil {
		log.Fatal(err)
	}

	consumer, err := ordersPlacedStream.CreateOrUpdateConsumer(context.Background(), jetstream.ConsumerConfig{
		Name:        "InventoryOrdersProcessor",
		Durable:     "InventoryOrdersProcessor",
		Description: "InventoryOrdersProcessor",
		AckPolicy:   jetstream.AckExplicitPolicy,
	})
	if err != nil {
		log.Fatal(err)
	}

	cctx, err := consumer.Consume(
		func(msg jetstream.Msg) {
			fmt.Printf("Data : %s, Reply : %s, Subject : %s", string(msg.Data()), msg.Reply(), msg.Subject())
			msg.Ack()
		},
		jetstream.ConsumeErrHandler(func(consumeCtx jetstream.ConsumeContext, err error) {
			log.Println(err)
		}),
	)
	if err != nil {
		log.Fatal(err)
	}
	defer cctx.Stop()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
}
