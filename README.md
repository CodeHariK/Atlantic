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
  