package server

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"go.temporal.io/sdk/workflow"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/codeharik/Atlantic/database/store/product"

	v1 "github.com/codeharik/Atlantic/orders/api/cart/v1"
)

// Short timeout to consider shopping cart abandoned for development purposes.
var abandonedCartTimeout = 10 * time.Second

var SignalChannels = struct {
	UPDATE_CART_CHANNEL string
	CHECKOUT_CHANNEL    string
}{
	UPDATE_CART_CHANNEL: "UPDATE_CART_CHANNEL",
	CHECKOUT_CHANNEL:    "CHECKOUT_CHANNEL",
}

func (o CartServiceServer) CartWorkflow(ctx workflow.Context, state *v1.Cart) error {
	// https://docs.temporal.io/docs/concepts/workflows/#workflows-have-options
	logger := workflow.GetLogger(ctx)

	err := workflow.SetQueryHandler(ctx, "getCart", func(input []byte) (*v1.Cart, error) {
		colorlogger.Log("getCart")
		return state, nil
	})
	if err != nil {
		logger.Info("SetQueryHandler failed.", "Error", err)
		return err
	}

	addToCartChannel := workflow.GetSignalChannel(ctx, SignalChannels.UPDATE_CART_CHANNEL)
	checkoutChannel := workflow.GetSignalChannel(ctx, SignalChannels.CHECKOUT_CHANNEL)
	checkedOut := false
	sentAbandonedCartEmail := false

	var a *Activities

	for {
		selector := workflow.NewSelector(ctx)
		selector.AddReceive(addToCartChannel, func(c workflow.ReceiveChannel, _ bool) {
			message, err := parseCartItem(c, ctx)
			if err != nil {
				return
			}

			err = UpdateCartItem(state, message)
			if err != nil {
				logger.Error("Invalid signal type %v", err)
				return
			}

			_, err = o.cartToProducts(state)
			if err != nil {
				logger.Error("Error fetching products", err)
				return
			}
		})

		selector.AddReceive(checkoutChannel, func(c workflow.ReceiveChannel, _ bool) {
			var signal interface{}
			c.Receive(ctx, &signal)

			products, err := o.HandleCheckout(context.Background(), state)
			if err != nil {
				logger.Error(err.Error())
				return
			}

			colorlogger.Log(".......", products)

			err = o.UpdateProductsTransaction(context.Background(), state, &products)
			if err != nil {
				logger.Error("Error updating products: %v", err)
				return
			}
			logger.Info("Products updated successfully")

			colorlogger.Log(products, ".......")

			ao := workflow.ActivityOptions{
				StartToCloseTimeout: time.Minute,
			}

			ctx = workflow.WithActivityOptions(ctx, ao)

			err = workflow.ExecuteActivity(ctx, a.CreateStripeCharge).Get(ctx, nil)
			if err != nil {
				logger.Error("Error creating stripe charge: %v", err)
				return
			}

			checkedOut = true
		})

		colorlogger.Log("sentAbandonedCartEmail", sentAbandonedCartEmail, len(state.Items) > 0)

		if !sentAbandonedCartEmail && len(state.Items) > 0 {
			selector.AddFuture(workflow.NewTimer(ctx, abandonedCartTimeout), func(f workflow.Future) {
				sentAbandonedCartEmail = true
				ao := workflow.ActivityOptions{
					StartToCloseTimeout: time.Minute,
				}

				colorlogger.Log("---- boom sent", sentAbandonedCartEmail)

				ctx = workflow.WithActivityOptions(ctx, ao)

				err := workflow.ExecuteActivity(ctx, a.SendAbandonedCartEmail, "state.Email").Get(ctx, nil)
				if err != nil {
					logger.Error("Error sending email %v", err)
					return
				}
			})
		}

		selector.Select(ctx)

		if checkedOut {
			break
		}
	}

	return nil
}

func parseCartItem(c workflow.ReceiveChannel, ctx workflow.Context) (*v1.CartItem, error) {
	var signal interface{}
	c.Receive(ctx, &signal)

	update, ok := signal.([]byte)
	if !ok {
		workflow.GetLogger(ctx).Error("Signal is not of type []byte")
		return &v1.CartItem{}, errors.New("Signal is not of type []byte")
	}

	var message v1.CartItem
	err := protojson.Unmarshal(update, &message)
	if err != nil {
		workflow.GetLogger(ctx).Error("Failed to unmarshal signal", "error", err)
		return &v1.CartItem{}, err
	}
	return &message, nil
}

func UpdateCartItem(state *v1.Cart, item *v1.CartItem) error {
	for i := range state.Items {
		if state.Items[i].ProductId != item.ProductId {
			continue
		}

		state.Items[i].Quantity += item.Quantity
		return nil
	}

	state.Items = append(state.Items, item)
	state.UpdatedAt = timestamppb.Now()

	return nil
}

// UpdateProductsTransaction updates product quantities in a transaction
func (o CartServiceServer) UpdateProductsTransaction(ctx context.Context, state *v1.Cart, products *[]product.Product) error {
	// Begin the transaction
	tx, err := o.storeInstance.Db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %v", err)
	}

	// Ensure rollback in case of panic
	defer func() {
		if err != nil {
			if rbErr := tx.Rollback(ctx); rbErr != nil {
				log.Printf("failed to rollback transaction: %v", rbErr)
			}
		}
	}()

	// Iterate over state items and update product quantities
	for _, item := range state.Items {
		for i, prod := range *products {
			if prod.ID.String() == item.ProductId {
				// Calculate new quantity
				newQuantity := prod.Quantity - item.Quantity
				if newQuantity < 0 {
					return fmt.Errorf("not enough quantity for product ID: %s", item.ProductId)
				}

				// Update the product in the transaction context
				p, err := o.productStore.WithTx(tx).UpdateProduct(ctx, product.UpdateProductParams{
					ID:       prod.ID,
					Quantity: newQuantity,
				})
				if err != nil {
					return fmt.Errorf("failed to update product ID %s: %v", prod.ID, err)
				}
				(*products)[i] = p
			}
		}
	}

	// q := o.userStore.WithTx(tx)
	// Withdraw(q, PaymentDetails{Account: state})

	// Commit the transaction
	err = tx.Commit(ctx)
	if err != nil {
		return fmt.Errorf("failed to commit transaction: %v", err)
	}

	return nil // Successful completion
}

func (o CartServiceServer) cartToProducts(state *v1.Cart) ([]product.Product, error) {
	pids := make([]uuid.UUID, len(state.Items))
	for i, item := range state.Items {
		pid, err := uuid.Parse(item.ProductId)
		if err != nil {
			return nil, fmt.Errorf("invalid product ID: %s, error: %v", item.ProductId, err)
		}
		pids[i] = pid
	}

	// Fetch products based on their IDs
	products, err := o.productStore.GetProductsByIds(context.Background(), pids)
	colorlogger.Log(products)

	for i, item := range state.Items {
		pid, err := uuid.Parse(item.ProductId)
		if err != nil {
			return nil, fmt.Errorf("invalid product ID: %s, error: %v", item.ProductId, err)
		}
		pids[i] = pid
		item.Name = products[i].Title
	}

	colorlogger.Log("==== AddToCart ====", state, products, "==== === === ====")

	return products, err
}

// HandleCheckout processes checkout requests by checking product quantities
func (o CartServiceServer) HandleCheckout(ctx context.Context, state *v1.Cart) ([]product.Product, error) {
	// Prepare a list of product IDs from state items
	products, err := o.cartToProducts(state)
	if err != nil {
		return nil, fmt.Errorf("Error fetching products: %v", err)
	}

	// Log the fetched products (assuming colorlogger is set up correctly)
	colorlogger.Log("checkoutChannel", "Products:")

	// Check product quantities against the items in the state
	for _, item := range state.Items {
		var matchingProduct *product.Product
		for _, product := range products {
			if product.ID.String() == item.ProductId {
				matchingProduct = &product
				break
			}
		}

		// If no matching product is found, return an error
		if matchingProduct == nil {
			return nil, fmt.Errorf("product with ID %s not found", item.ProductId)
		}

		// Check if product quantity is sufficient
		if matchingProduct.Quantity < item.Quantity {
			return nil, fmt.Errorf("not enough stock for product ID %s: available %d, required %d", item.ProductId, matchingProduct.Quantity, item.Quantity)
		}
	}

	// Continue with the rest of your checkout process
	return products, nil
}
