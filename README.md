# Atlantic

* [How to design a successful eCommerce system for Amazon, eBay, FilPCart and Walmart (by Amazon TPM)](https://www.youtube.com/watch?v=E-KW1O3hLSg)

* [Implementing A Modern E-Commerce Search](https://spinscale.de/posts/2020-06-22-implementing-a-modern-ecommerce-search.html)

```code
Add to /etc/hosts

127.0.0.1 atlantic.shark.run
```
```code
make caddy or make traefik
make meilisearch
make minio
```

E-Commerce Platform

	•	User Service: Manages user information and authentication.
	•	Product Service: Handles product details, inventory, and catalog management.
	•	Order Service: Manages orders, including creation, updates, and status tracking.
	•	Analytics Service: Provides real-time analytics on user behavior, sales trends, and inventory levels.

Technologies:

	1. MeiliSearch: Provide fast and efficient search capabilities for products.
    {
      "id": "String",
      "name": "String",
      "description": "String",
      "category": "String",
      "brand": "String",
      "price": "Number",
      "specifications": {
        "type": "Mixed"
      }
    }

	2.	PostgreSQL: Manage transactions, products inventory, users, sellers, orders, carts, payments, and ensure data integrity.

    {
      "product_id": "ObjectId",
      "spec_id": "ObjectId",
      "seller_id": "ObjectId",
      "price": "Number",
      "inventory": "Number",
      "created_at": "Date",
      "updated_at": "Date"
    }

	3.	ClickHouse: For analytics. Collects and analyzes clickstream and other data.
    
    [Clicks, Ratings, Units Sold, Area, Type]

	4.	NATS: For communication between microservices.

	5.  DragonFly: Used for caching and session management.
  
### NATS Events

#### Order Service Events

1. **OrderCreated**: This event is triggered when a new order is created.
   ```json
   {
     "event": "OrderCreated",
     "timestamp": "2024-07-11T12:34:56Z",
     "orderId": "12345",
     "customerId": "67890",
     "items": [
       {
         "productId": "111",
         "quantity": 2,
         "price": 19.99
       },
       {
         "productId": "222",
         "quantity": 1,
         "price": 39.99
       }
     ],
     "totalPrice": 79.97
   }
   ```

2. **OrderValidated**: This event is triggered when the order has been validated (e.g., checking inventory, payment).
   ```json
   {
     "event": "OrderValidated",
     "timestamp": "2024-07-11T12:35:10Z",
     "orderId": "12345",
     "isValid": true,
     "validationErrors": []
   }
   ```

3. **PaymentProcessed**: This event is triggered when the payment for the order is processed.
   ```json
   {
     "event": "PaymentProcessed",
     "timestamp": "2024-07-11T12:35:30Z",
     "orderId": "12345",
     "paymentId": "98765",
     "paymentStatus": "SUCCESS",
     "amount": 79.97
   }
   ```

4. **InventoryReserved**: This event is triggered when the inventory is reserved for the order.
   ```json
   {
     "event": "InventoryReserved",
     "timestamp": "2024-07-11T12:36:00Z",
     "orderId": "12345",
     "items": [
       {
         "productId": "111",
         "quantity": 2
       },
       {
         "productId": "222",
         "quantity": 1
       }
     ]
   }
   ```

5. **OrderShipped**: This event is triggered when the order is shipped.
   ```json
   {
     "event": "OrderShipped",
     "timestamp": "2024-07-11T12:40:00Z",
     "orderId": "12345",
     "shipmentId": "54321",
     "carrier": "UPS",
     "trackingNumber": "1Z9999999999999999"
   }
   ```

6. **OrderDelivered**: This event is triggered when the order is delivered to the customer.
   ```json
   {
     "event": "OrderDelivered",
     "timestamp": "2024-07-12T15:00:00Z",
     "orderId": "12345",
     "deliveryStatus": "DELIVERED"
   }
   ```

7. **OrderCancelled**: This event is triggered if the order is cancelled.
   ```json
   {
     "event": "OrderCancelled",
     "timestamp": "2024-07-11T13:00:00Z",
     "orderId": "12345",
     "cancellationReason": "Customer request"
   }
   ```

8. **OrderReturned**: This event is triggered if the order is returned by the customer.
   ```json
   {
     "event": "OrderReturned",
     "timestamp": "2024-07-13T12:00:00Z",
     "orderId": "12345",
     "returnReason": "Damaged item",
     "refundAmount": 79.97
   }
   ```

#### Product Service Events
  product.created
  product.updated
  product.deleted

#### User Service Events
  user.created
  user.updated

#### Seller Service Events
  seller.created
  seller.updated

#### Ratings Service Events
  comment.created
  comment.updated
  comment.deleted

  rating.added
  rating.updated
  rating.deleted

#### Mail Service

#### Analytics Service Events
  click.tracked
