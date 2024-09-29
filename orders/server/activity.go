package server

import (
	"context"
	"fmt"
	"log"

	"github.com/codeharik/Atlantic/database/store/user"
	"github.com/google/uuid"
)

const MoneyTransferTaskQueueName = "TRANSFER_MONEY_TASK_QUEUE"

type PaymentDetails struct {
	Account     uuid.UUID
	Amount      int32
	ReferenceID uuid.UUID
}

func (o CartServiceServer) Withdraw(ctx context.Context, data PaymentDetails) (string, error) {
	balance, err := o.userStore.UpdateUserBalance(context.Background(), user.UpdateUserBalanceParams{
		ID:      data.Account,
		Balance: -data.Amount,
	})

	referenceID := fmt.Sprintf("%s-withdrawal", data.ReferenceID)

	log.Printf("Withdrawing $%d from account %s : %d\n\n",
		data.Amount,
		data.Account,
		balance,
	)

	return referenceID, err
}

func (o CartServiceServer) Deposit(ctx context.Context, data PaymentDetails) (string, error) {
	balance, err := o.userStore.UpdateUserBalance(context.Background(), user.UpdateUserBalanceParams{
		ID:      data.Account,
		Balance: data.Amount,
	})

	log.Printf("Depositing $%d into account %s : %d\n\n",
		data.Amount,
		data.Account,
		balance,
	)

	referenceID := fmt.Sprintf("%s-deposit", data.ReferenceID)

	return referenceID, err
}
