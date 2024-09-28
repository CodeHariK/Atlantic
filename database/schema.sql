-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';
-- Create "goose_db_version" table
CREATE TABLE "public"."goose_db_version" ("id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY, "version_id" bigint NOT NULL, "is_applied" boolean NOT NULL, "tstamp" timestamp NOT NULL DEFAULT now(), PRIMARY KEY ("id"));
-- Create "users" table
CREATE TABLE "public"."users" ("id" uuid NOT NULL, "username" character varying(255) NULL, "password_hash" character varying(255) NULL, "email" character varying(255) NULL, "verified" boolean NOT NULL DEFAULT false, "phone_number" character varying(15) NULL, "gender" character(1) NULL, "role" bigint NOT NULL DEFAULT 1, "date_of_birth" date NULL, "address" character varying(255) NOT NULL, "balance" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "users_email_key" UNIQUE ("email"), CONSTRAINT "users_phone_number_key" UNIQUE ("phone_number"), CONSTRAINT "users_username_key" UNIQUE ("username"), CONSTRAINT "users_address_check" CHECK (char_length((address)::text) > 0), CONSTRAINT "users_check" CHECK (((email IS NOT NULL) AND (char_length((email)::text) > 0)) OR ((phone_number IS NOT NULL) AND (char_length((phone_number)::text) > 0))), CONSTRAINT "users_email_check" CHECK (char_length((email)::text) > 0), CONSTRAINT "users_gender_check" CHECK (gender = ANY (ARRAY['M'::bpchar, 'F'::bpchar])), CONSTRAINT "users_phone_number_check" CHECK (char_length((phone_number)::text) > 0), CONSTRAINT "users_role_check" CHECK (role > 0), CONSTRAINT "users_username_check" CHECK (char_length((username)::text) > 0));
-- Create index "idx_users_email" to table: "users"
CREATE INDEX "idx_users_email" ON "public"."users" ("email");
-- Create "carts" table
CREATE TABLE "public"."carts" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_carts_user_id" to table: "carts"
CREATE INDEX "idx_carts_user_id" ON "public"."carts" ("user_id");
-- Create "products" table
CREATE TABLE "public"."products" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "amount_units" bigint NOT NULL, "amount_nanos" integer NOT NULL, "amount_currency" character varying(4) NOT NULL, PRIMARY KEY ("id"));
-- Create "cart_items" table
CREATE TABLE "public"."cart_items" ("id" uuid NOT NULL, "cart_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_cart_items_cart_id" to table: "cart_items"
CREATE INDEX "idx_cart_items_cart_id" ON "public"."cart_items" ("cart_id");
-- Create "orders" table
CREATE TABLE "public"."orders" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "amount_units" bigint NOT NULL, "amount_nanos" integer NOT NULL, "amount_currency" character varying(4) NOT NULL, "status" character varying(12) NOT NULL DEFAULT 'PENDING', "payment_status" character varying(12) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "orders_status_check" CHECK ((status)::text = ANY ((ARRAY['RETURNED'::character varying, 'CANCELED'::character varying, 'PENDING'::character varying, 'CONFIRMED'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'DELIVERED'::character varying])::text[])), CONSTRAINT "orders_status_check1" CHECK ((status)::text = ANY ((ARRAY['REFUNDED'::character varying, 'CASH_ON_DELIVERY'::character varying, 'PAID'::character varying])::text[])));
-- Create index "idx_orders_user_id" to table: "orders"
CREATE INDEX "idx_orders_user_id" ON "public"."orders" ("user_id");
-- Create "order_items" table
CREATE TABLE "public"."order_items" ("id" uuid NOT NULL, "order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" integer NOT NULL, "amount_units" bigint NOT NULL, "amount_nanos" integer NOT NULL, "amount_currency" character varying(4) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_order_items_order_id" to table: "order_items"
CREATE INDEX "idx_order_items_order_id" ON "public"."order_items" ("order_id");
-- Create index "idx_order_items_product_id" to table: "order_items"
CREATE INDEX "idx_order_items_product_id" ON "public"."order_items" ("product_id");
-- Create "product_reviews" table
CREATE TABLE "public"."product_reviews" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "rating" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_product_reviews_product_id" to table: "product_reviews"
CREATE INDEX "idx_product_reviews_product_id" ON "public"."product_reviews" ("product_id");
-- Create index "idx_product_reviews_user_id" to table: "product_reviews"
CREATE INDEX "idx_product_reviews_user_id" ON "public"."product_reviews" ("user_id");
-- Create "product_comment" table
CREATE TABLE "public"."product_comment" ("id" uuid NOT NULL, "comment" character varying(1024) NULL, PRIMARY KEY ("id"), CONSTRAINT "product_comment_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."product_reviews" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
