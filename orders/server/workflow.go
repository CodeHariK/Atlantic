package server

import (
	"fmt"
	"time"

	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
)

func (o CartServiceServer) MoneyTransfer(ctx workflow.Context, input PaymentDetails) (string, error) {
	// RetryPolicy specifies how to automatically handle retries if an Activity fails.
	retrypolicy := &temporal.RetryPolicy{
		InitialInterval:        time.Second,
		BackoffCoefficient:     2.0,
		MaximumInterval:        100 * time.Second,
		MaximumAttempts:        500, // 0 is unlimited retries
		NonRetryableErrorTypes: []string{"InvalidAccountError", "InsufficientFundsError"},
	}

	options := workflow.ActivityOptions{
		// Timeout options specify when to automatically timeout Activity functions.
		StartToCloseTimeout: time.Minute,
		// Optionally provide a customized RetryPolicy.
		// Temporal retries failed Activities by default.
		RetryPolicy: retrypolicy,
	}

	// Apply the options.
	ctx = workflow.WithActivityOptions(ctx, options)

	// Withdraw money.
	var withdrawOutput string

	withdrawErr := workflow.ExecuteActivity(ctx, o.Withdraw, input).Get(ctx, &withdrawOutput)

	if withdrawErr != nil {
		return "", withdrawErr
	}

	// Deposit money.
	var depositOutput string

	depositErr := workflow.ExecuteActivity(ctx, o.Deposit, input).Get(ctx, &depositOutput)

	if depositErr != nil {
		// The deposit failed; put money back in original account.

		var result string

		refundErr := workflow.ExecuteActivity(ctx, o.Deposit, input).Get(ctx, &result)

		if refundErr != nil {
			return "",
				fmt.Errorf("Deposit: failed to deposit money into %v: %v. Money could not be returned to %v: %w",
					input.Account, depositErr, input.Account, refundErr)
		}

		return "", fmt.Errorf("Deposit: failed to deposit money into %v: Money returned to %v: %w",
			input.Account, input.Account, depositErr)
	}

	result := fmt.Sprintf("Transfer complete (transaction IDs: %s, %s)", withdrawOutput, depositOutput)
	return result, nil
}
