package server

import (
	"context"
	"errors"
	"time"

	"github.com/codeharik/Atlantic/service/colorlogger"
	"github.com/mitchellh/mapstructure"
	"go.temporal.io/sdk/workflow"

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

type UpdateCartSignal struct {
	Item *v1.CartItem
}

type UpdateEmailSignal struct {
	Email string
}

type CheckoutSignal struct {
	Email string
}

type Activities struct {
	StripeKey     string
	MailgunDomain string
	MailgunKey    string
}

func (a *Activities) CreateStripeCharge(_ context.Context, cart *v1.Cart) error {
	// stripe.Key = a.StripeKey
	// var amount float32 = 0
	// var description string = ""
	// for _, item := range cart.Items {
	// 	var product Product
	// 	for _, _product := range Products {
	// 		if _product.Id == item.ProductId {
	// 			product = _product
	// 			break
	// 		}
	// 	}
	// 	amount += float32(item.Quantity) * product.Price
	// 	if len(description) > 0 {
	// 		description += ", "
	// 	}
	// 	description += product.Name
	// }

	colorlogger.Log("CreateStripeCharge")

	return nil

	return errors.New("Error")
}

func (a *Activities) SendAbandonedCartEmail(_ context.Context, email string) error {
	// if email == "" {
	// 	return nil
	// }
	// mg := mailgun.NewMailgun(a.MailgunDomain, a.MailgunKey)
	// m := mg.NewMessage(
	// 	"noreply@"+a.MailgunDomain,
	// 	"You've abandoned your shopping cart!",
	// 	"Go to http://localhost:8080 to finish checking out!",
	// 	email,
	// )
	// _, _, err := mg.Send(m)
	// if err != nil {
	// 	fmt.Println("Mailgun err: " + err.Error())
	// 	return err
	// }

	colorlogger.Log("SendAbandonedCartEmail")

	return nil

	return errors.New("Error")
}

func CartWorkflow(ctx workflow.Context, state *v1.Cart) error {
	// https://docs.temporal.io/docs/concepts/workflows/#workflows-have-options
	logger := workflow.GetLogger(ctx)

	err := workflow.SetQueryHandler(ctx, "getCart", func(input []byte) (*v1.Cart, error) {
		colorlogger.Log("getCart", state)
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
			var signal interface{}
			c.Receive(ctx, &signal)

			colorlogger.Log("addToCartChannel")

			var message UpdateCartSignal
			err := mapstructure.Decode(signal, &message)
			if err != nil {
				logger.Error("Invalid signal type %v", err)
				return
			}

			err = UpdateCartItem(state, message.Item)
			if err != nil {
				logger.Error("Invalid signal type %v", err)
				return
			}
		})

		selector.AddReceive(checkoutChannel, func(c workflow.ReceiveChannel, _ bool) {
			var signal interface{}
			c.Receive(ctx, &signal)

			colorlogger.Log("checkoutChannel")

			var message CheckoutSignal
			err := mapstructure.Decode(signal, &message)
			if err != nil {
				logger.Error("Invalid signal type %v", err)
				return
			}

			// state.Email = message.Email

			ao := workflow.ActivityOptions{
				StartToCloseTimeout: time.Minute,
			}

			ctx = workflow.WithActivityOptions(ctx, ao)

			err = workflow.ExecuteActivity(ctx, a.CreateStripeCharge, state).Get(ctx, nil)
			if err != nil {
				logger.Error("Error creating stripe charge: %v", err)
				return
			}

			checkedOut = true
		})

		colorlogger.Log("sentAbandonedCartEmail", sentAbandonedCartEmail, len(state.Items) > 0, state)

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

func UpdateCartItem(state *v1.Cart, item *v1.CartItem) error {
	if item.Quantity < 0 {
		return errors.New("Negative quantity")
	}
	for i := range state.Items {
		if state.Items[i].ProductId != item.ProductId {
			continue
		}

		state.Items[i].Quantity = item.Quantity
		return nil
	}

	state.Items = append(state.Items, item)

	return nil
}
