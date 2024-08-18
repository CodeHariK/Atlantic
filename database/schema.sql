-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';
-- Create "locations" table
CREATE TABLE "public"."locations" ("id" serial NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "country" character varying(100) NOT NULL, "postal_code" character varying(20) NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "locations_address_check" CHECK (char_length((address)::text) > 0), CONSTRAINT "locations_city_check" CHECK (char_length((city)::text) > 0), CONSTRAINT "locations_country_check" CHECK (char_length((country)::text) > 0), CONSTRAINT "locations_latitude_check" CHECK ((latitude >= ('-90'::integer)::double precision) AND (latitude <= (90)::double precision)), CONSTRAINT "locations_longitude_check" CHECK ((longitude >= ('-180'::integer)::double precision) AND (longitude <= (180)::double precision)), CONSTRAINT "locations_postal_code_check" CHECK (char_length((postal_code)::text) > 0), CONSTRAINT "locations_state_check" CHECK (char_length((state)::text) > 0));
-- Create index "idx_locations_latitude_longitude" to table: "locations"
CREATE INDEX "idx_locations_latitude_longitude" ON "public"."locations" ("latitude", "longitude");
-- Create "goose_db_version" table
CREATE TABLE "public"."goose_db_version" ("id" serial NOT NULL, "version_id" bigint NOT NULL, "is_applied" boolean NOT NULL, "tstamp" timestamp NULL DEFAULT now(), PRIMARY KEY ("id"));
-- Create "users" table
CREATE TABLE "public"."users" ("id" serial NOT NULL, "username" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(15) NOT NULL, "gender" character varying(1) NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "date_of_birth" date NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "location" integer NULL, PRIMARY KEY ("id"), CONSTRAINT "users_email_key" UNIQUE ("email"), CONSTRAINT "users_phone_number_key" UNIQUE ("phone_number"), CONSTRAINT "users_username_key" UNIQUE ("username"), CONSTRAINT "users_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL, CONSTRAINT "users_email_check" CHECK (char_length((email)::text) > 0), CONSTRAINT "users_gender_check" CHECK ((gender)::text = ANY ((ARRAY['M'::character varying, 'F'::character varying])::text[])), CONSTRAINT "users_phone_number_check" CHECK (char_length((phone_number)::text) > 0), CONSTRAINT "users_username_check" CHECK (char_length((username)::text) > 0));
-- Create index "idx_users_email" to table: "users"
CREATE INDEX "idx_users_email" ON "public"."users" ("email");
-- Create "carts" table
CREATE TABLE "public"."carts" ("id" serial NOT NULL, "user_id" integer NOT NULL, "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_carts_user_id" to table: "carts"
CREATE INDEX "idx_carts_user_id" ON "public"."carts" ("user_id");
-- Create "product_category" table
CREATE TABLE "public"."product_category" ("id" serial NOT NULL, "name" character varying(255) NOT NULL, "parent_id" integer NULL, PRIMARY KEY ("id"), CONSTRAINT "product_category_name_key" UNIQUE ("name"), CONSTRAINT "product_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."product_category" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_category_name_check" CHECK ((char_length((name)::text) > 0) AND (char_length((name)::text) < 32)));
-- Create index "idx_category_name" to table: "product_category"
CREATE INDEX "idx_category_name" ON "public"."product_category" ("name");
-- Create "products" table
CREATE TABLE "public"."products" ("id" serial NOT NULL, "product_name" character varying(255) NULL, "category_id" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "products_product_name_key" UNIQUE ("product_name"), CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_category" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "products_product_name_check" CHECK (char_length((product_name)::text) > 0));
-- Create "product_variants" table
CREATE TABLE "public"."product_variants" ("id" serial NOT NULL, "product_id" integer NOT NULL, "variant_name" character varying(255) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_variant_name" to table: "product_variants"
CREATE INDEX "idx_variant_name" ON "public"."product_variants" ("variant_name");
-- Create index "idx_variant_product_id" to table: "product_variants"
CREATE INDEX "idx_variant_product_id" ON "public"."product_variants" ("product_id");
-- Create "cart_items" table
CREATE TABLE "public"."cart_items" ("id" serial NOT NULL, "cart_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_cart_items_cart_id" to table: "cart_items"
CREATE INDEX "idx_cart_items_cart_id" ON "public"."cart_items" ("cart_id");
-- Create "seller" table
CREATE TABLE "public"."seller" ("id" serial NOT NULL, "name" character varying(255) NOT NULL, "location" integer NULL, PRIMARY KEY ("id"), CONSTRAINT "seller_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL);
-- Create "inventory" table
CREATE TABLE "public"."inventory" ("id" serial NOT NULL, "product_id" integer NOT NULL, "seller_id" integer NOT NULL, "quantity" integer NOT NULL, "amount_units" bigint NOT NULL, "amount_nanos" integer NOT NULL, "amount_currency" character varying(4) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "inventory_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_inventory_product_id" to table: "inventory"
CREATE INDEX "idx_inventory_product_id" ON "public"."inventory" ("product_id");
-- Create index "idx_inventory_seller_id_id" to table: "inventory"
CREATE INDEX "idx_inventory_seller_id_id" ON "public"."inventory" ("seller_id");
-- Create "orders" table
CREATE TABLE "public"."orders" ("id" serial NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP, "amount_units" bigint NOT NULL, "amount_nanos" integer NOT NULL, "amount_currency" character varying(4) NOT NULL, "status" character varying(12) NOT NULL DEFAULT 'PENDING', "payment_status" character varying(12) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "orders_status_check" CHECK ((status)::text = ANY ((ARRAY['RETURNED'::character varying, 'CANCELED'::character varying, 'PENDING'::character varying, 'CONFIRMED'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'DELIVERED'::character varying])::text[])), CONSTRAINT "orders_status_check1" CHECK ((status)::text = ANY ((ARRAY['REFUNDED'::character varying, 'CASH_ON_DELIVERY'::character varying, 'PAID'::character varying])::text[])));
-- Create index "idx_orders_user_id" to table: "orders"
CREATE INDEX "idx_orders_user_id" ON "public"."orders" ("user_id");
-- Create "order_items" table
CREATE TABLE "public"."order_items" ("id" serial NOT NULL, "order_id" integer NOT NULL, "product_id" integer NOT NULL, "seller_id" integer NOT NULL, "quantity" integer NOT NULL, "amount_units" bigint NOT NULL, "amount_nanos" integer NOT NULL, "amount_currency" character varying(4) NOT NULL, "status" character varying(12) NOT NULL DEFAULT 'PENDING', "payment_status" character varying(12) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_status_check" CHECK ((status)::text = ANY ((ARRAY['RETURNED'::character varying, 'CANCELED'::character varying, 'PENDING'::character varying, 'CONFIRMED'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'DELIVERED'::character varying])::text[])), CONSTRAINT "order_items_status_check1" CHECK ((status)::text = ANY ((ARRAY['REFUNDED'::character varying, 'CASH_ON_DELIVERY'::character varying, 'PAID'::character varying])::text[])));
-- Create index "idx_order_items_order_id" to table: "order_items"
CREATE INDEX "idx_order_items_order_id" ON "public"."order_items" ("order_id");
-- Create index "idx_order_items_product_id" to table: "order_items"
CREATE INDEX "idx_order_items_product_id" ON "public"."order_items" ("product_id");
-- Create "attributes" table
CREATE TABLE "public"."attributes" ("id" serial NOT NULL, "attribute_name" character varying(255) NOT NULL, "attribute_value" character varying(255) NOT NULL, PRIMARY KEY ("id"));
-- Create index "idx_attribute_name" to table: "attributes"
CREATE INDEX "idx_attribute_name" ON "public"."attributes" ("attribute_name");
-- Create index "idx_attribute_value" to table: "attributes"
CREATE INDEX "idx_attribute_value" ON "public"."attributes" ("attribute_value");
-- Create "product_attributes" table
CREATE TABLE "public"."product_attributes" ("id" serial NOT NULL, "product_id" integer NOT NULL, "variant_id" integer NULL, "attribute_id" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "product_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "product_attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_attributes_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_attribute_id" to table: "product_attributes"
CREATE INDEX "idx_attribute_id" ON "public"."product_attributes" ("attribute_id");
-- Create index "idx_attribute_product_id" to table: "product_attributes"
CREATE INDEX "idx_attribute_product_id" ON "public"."product_attributes" ("product_id");
-- Create index "idx_attribute_variant_id" to table: "product_attributes"
CREATE INDEX "idx_attribute_variant_id" ON "public"."product_attributes" ("variant_id");
-- Create "product_reviews" table
CREATE TABLE "public"."product_reviews" ("id" serial NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, "seller_id" integer NOT NULL, "rating" integer NOT NULL, "comment" integer NULL, PRIMARY KEY ("id"), CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_reviews_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_product_reviews_product_id" to table: "product_reviews"
CREATE INDEX "idx_product_reviews_product_id" ON "public"."product_reviews" ("product_id");
-- Create index "idx_product_reviews_user_id" to table: "product_reviews"
CREATE INDEX "idx_product_reviews_user_id" ON "public"."product_reviews" ("user_id");
-- Create "product_comment" table
CREATE TABLE "public"."product_comment" ("id" serial NOT NULL, "comment" character varying(1024) NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "product_comment_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."product_reviews" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create "product_description" table
CREATE TABLE "public"."product_description" ("id" serial NOT NULL, "product_id" integer NOT NULL, "product_variant_id" integer NULL, "description" character varying(2048) NULL, "images" character varying(1024)[] NULL, "videos" character varying(1024)[] NULL, PRIMARY KEY ("id"), CONSTRAINT "unique_description_per_variant" UNIQUE ("product_id", "product_variant_id"), CONSTRAINT "product_description_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_description_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "unique_description_per_product" to table: "product_description"
CREATE UNIQUE INDEX "unique_description_per_product" ON "public"."product_description" ("product_id") WHERE (product_variant_id IS NULL);
-- Create "product_promotions" table
CREATE TABLE "public"."product_promotions" ("id" serial NOT NULL, "promotion_name" character varying(255) NOT NULL, "discount" integer NOT NULL, "product_id" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "product_promotions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE SET NULL, CONSTRAINT "product_promotions_discount_check" CHECK (discount < 100));
