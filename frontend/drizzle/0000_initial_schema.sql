CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL
);
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL,
  "company_name" text NOT NULL,
  "description" text NOT NULL,
  "category_id" uuid NOT NULL,
  "logo_url" text NOT NULL,
  "website_url" text NOT NULL,
  "pricing_url" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX "products_slug_unique" ON "products" USING btree ("slug");
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

CREATE TABLE "plans" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "product_id" uuid NOT NULL,
  "name" text NOT NULL,
  "monthly_price_cents" integer,
  "annual_price_cents" integer,
  "currency" text DEFAULT 'USD' NOT NULL,
  "billing_interval" text NOT NULL,
  "is_available" boolean DEFAULT true NOT NULL,
  "notes" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE "plans" ADD CONSTRAINT "plans_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade;

CREATE TABLE "pricing_sources" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "product_id" uuid NOT NULL,
  "url" text NOT NULL,
  "source_type" text DEFAULT 'official' NOT NULL,
  "last_verified_at" timestamp with time zone NOT NULL
);
ALTER TABLE "pricing_sources" ADD CONSTRAINT "pricing_sources_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade;
