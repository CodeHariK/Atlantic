-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';
-- Create "goose_db_version" table
CREATE TABLE "public"."goose_db_version" ("id" serial NOT NULL, "version_id" bigint NOT NULL, "is_applied" boolean NOT NULL, "tstamp" timestamp NULL DEFAULT now(), PRIMARY KEY ("id"));
-- Create "products" table
CREATE TABLE "public"."products" ("id" serial NOT NULL, "product_name" character varying(255) NOT NULL, "description" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "products_product_name_key" UNIQUE ("product_name"));
-- Create "product_variants" table
CREATE TABLE "public"."product_variants" ("id" serial NOT NULL, "product_id" integer NOT NULL, "variant_name" character varying(255) NOT NULL, "price" bigint NOT NULL, "currency" character varying(12) NOT NULL DEFAULT 'USD', PRIMARY KEY ("id"), CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_variants_currency_check" CHECK ((currency)::text = ANY ((ARRAY['USD'::character varying, 'INR'::character varying, 'BTC'::character varying, 'ETH'::character varying, 'SOL'::character varying])::text[])));
-- Create index "idx_variant_name" to table: "product_variants"
CREATE INDEX "idx_variant_name" ON "public"."product_variants" ("variant_name");
-- Create index "idx_variant_product_id" to table: "product_variants"
CREATE INDEX "idx_variant_product_id" ON "public"."product_variants" ("product_id");
-- Create "locations" table
CREATE TABLE "public"."locations" ("id" serial NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "country" character varying(100) NOT NULL, "postal_code" character varying(20) NOT NULL, "latitude" bigint NOT NULL, "longitude" bigint NOT NULL, PRIMARY KEY ("id"));
-- Create index "idx_locations_latitude_longitude" to table: "locations"
CREATE INDEX "idx_locations_latitude_longitude" ON "public"."locations" ("latitude", "longitude");
-- Create "seller" table
CREATE TABLE "public"."seller" ("id" serial NOT NULL, "name" character varying(255) NOT NULL, "location" integer NULL, PRIMARY KEY ("id"), CONSTRAINT "seller_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL);
-- Create "inventory" table
CREATE TABLE "public"."inventory" ("id" serial NOT NULL, "product_id" integer NOT NULL, "seller_id" integer NOT NULL, "quantity" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "inventory_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create index "idx_inventory_product_id" to table: "inventory"
CREATE INDEX "idx_inventory_product_id" ON "public"."inventory" ("product_id");
-- Create index "idx_inventory_seller_id_id" to table: "inventory"
CREATE INDEX "idx_inventory_seller_id_id" ON "public"."inventory" ("seller_id");
-- Create "users" table
CREATE TABLE "public"."users" ("id" serial NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(15) NOT NULL, "gender" character varying(4) NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "date_of_birth" date NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "location" integer NULL, PRIMARY KEY ("id"), CONSTRAINT "users_email_key" UNIQUE ("email"), CONSTRAINT "users_phone_number_key" UNIQUE ("phone_number"), CONSTRAINT "users_username_key" UNIQUE ("username"), CONSTRAINT "users_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."locations" ("id") ON UPDATE NO ACTION ON DELETE SET NULL, CONSTRAINT "users_gender_check" CHECK ((gender)::text = ANY ((ARRAY['M'::character varying, 'F'::character varying])::text[])));
-- Create index "idx_users_email" to table: "users"
CREATE INDEX "idx_users_email" ON "public"."users" ("email");
-- Create "orders" table
CREATE TABLE "public"."orders" ("id" serial NOT NULL, "user_id" integer NOT NULL, "status" character varying(12) NOT NULL DEFAULT 'PENDING', "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP, "total_amount" bigint NOT NULL, "currency" character varying(12) NOT NULL DEFAULT 'USD', PRIMARY KEY ("id"), CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "orders_currency_check" CHECK ((currency)::text = ANY ((ARRAY['USD'::character varying, 'INR'::character varying, 'BTC'::character varying, 'ETH'::character varying, 'SOL'::character varying])::text[])), CONSTRAINT "orders_status_check" CHECK ((status)::text = ANY ((ARRAY['PENDING'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'CANCELED'::character varying, 'REFUNDED'::character varying])::text[])));
-- Create index "idx_orders_user_id" to table: "orders"
CREATE INDEX "idx_orders_user_id" ON "public"."orders" ("user_id");
-- Create "order_items" table
CREATE TABLE "public"."order_items" ("id" serial NOT NULL, "order_id" integer NOT NULL, "product_id" integer NOT NULL, "seller_id" integer NOT NULL, "quantity" integer NOT NULL, "price" bigint NOT NULL, "currency" character varying(12) NOT NULL DEFAULT 'USD', PRIMARY KEY ("id"), CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "order_items_currency_check" CHECK ((currency)::text = ANY ((ARRAY['USD'::character varying, 'INR'::character varying, 'BTC'::character varying, 'ETH'::character varying, 'SOL'::character varying])::text[])));
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
CREATE TABLE "public"."product_description" ("id" serial NOT NULL, "product_id" integer NULL, "product_variant_id" integer NULL, "description" character varying(2048) NULL, "images" character varying(1024)[] NULL, "videos" character varying(1024)[] NULL, PRIMARY KEY ("id"), CONSTRAINT "product_description_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_description_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "at_least_one_required" CHECK ((product_id IS NOT NULL) OR (product_variant_id IS NOT NULL)));
-- Create "product_promotions" table
CREATE TABLE "public"."product_promotions" ("id" serial NOT NULL, "promotion_name" character varying(255) NOT NULL, "discount" bigint NOT NULL, "product_variant_id" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "product_promotions_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE SET NULL);
-- Create "product_sellers" table
CREATE TABLE "public"."product_sellers" ("id" serial NOT NULL, "product_variant_id" integer NOT NULL, "seller_id" integer NOT NULL, "price" bigint NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "product_sellers_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "product_sellers_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."seller" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
