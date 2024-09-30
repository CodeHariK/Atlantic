package server

import (
	"context"

	v1 "github.com/codeharik/Atlantic/orders/api/cart/v1"
	"github.com/codeharik/Atlantic/service/colorlogger"
)

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
}
