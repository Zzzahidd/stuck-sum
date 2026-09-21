import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import { categories, products, plans, pricingSources } from './schema'
import { staticProducts, categories as allCategories } from '../data/products'

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_RN1iDHGhun8C@ep-old-bar-azi6dofv-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

async function runSeed() {
  console.log('Connecting to Neon PostgreSQL...')
  const sql = postgres(connectionString, { max: 1, ssl: 'require' })
  const db = drizzle(sql)

  try {
    console.log('Ensuring tables exist...')
    await sql`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "slug" text NOT NULL
      );
    `
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_unique" ON "categories" USING btree ("slug");
    `
    await sql`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "slug" text NOT NULL,
        "company_name" text NOT NULL,
        "description" text NOT NULL,
        "category_id" uuid NOT NULL REFERENCES "categories"("id"),
        "logo_url" text NOT NULL,
        "website_url" text NOT NULL,
        "pricing_url" text NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_unique" ON "products" USING btree ("slug");
    `
    await sql`
      CREATE TABLE IF NOT EXISTS "plans" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
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
    `
    await sql`
      CREATE TABLE IF NOT EXISTS "pricing_sources" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
        "url" text NOT NULL,
        "source_type" text DEFAULT 'official' NOT NULL,
        "last_verified_at" timestamp with time zone NOT NULL
      );
    `

    console.log('Inserting categories...')
    const categoryMap = new Map<string, string>()

    for (const cat of allCategories) {
      if (cat === 'All') continue
      const slug = cat.toLowerCase().replace(/[^a-z0-9]/g, '-')
      const [inserted] = await db
        .insert(categories)
        .values({
          name: cat,
          slug,
        })
        .onConflictDoUpdate({
          target: categories.slug,
          set: { name: cat },
        })
        .returning({ id: categories.id })

      if (inserted) {
        categoryMap.set(cat, inserted.id)
      }
    }

    console.log('Inserting products and plans...')
    for (const prod of staticProducts) {
      const categoryId = categoryMap.get(prod.category) || categoryMap.get('Other')
      if (!categoryId) continue

      const [insertedProduct] = await db
        .insert(products)
        .values({
          name: prod.name,
          slug: prod.slug,
          companyName: prod.companyName,
          description: prod.description,
          categoryId,
          logoUrl: prod.logo,
          websiteUrl: prod.websiteUrl,
          pricingUrl: prod.pricingUrl,
        })
        .onConflictDoUpdate({
          target: products.slug,
          set: {
            name: prod.name,
            companyName: prod.companyName,
            description: prod.description,
            logoUrl: prod.logo,
            websiteUrl: prod.websiteUrl,
            pricingUrl: prod.pricingUrl,
          },
        })
        .returning({ id: products.id })

      if (insertedProduct) {
        // Clear previous plans and re-insert
        await db.delete(plans).where(eq(plans.productId, insertedProduct.id))
        
        for (const p of prod.plans) {
          await db.insert(plans).values({
            productId: insertedProduct.id,
            name: p.name,
            monthlyPriceCents: p.monthlyPriceCents,
            annualPriceCents: p.annualPriceCents,
            currency: 'USD',
            billingInterval: p.billingInterval,
            isAvailable: true,
            notes: p.features?.join('; '),
          })
        }

        // Clear and insert pricing source
        await db.delete(pricingSources).where(eq(pricingSources.productId, insertedProduct.id))
        await db.insert(pricingSources).values({
          productId: insertedProduct.id,
          url: prod.pricingUrl,
          sourceType: 'official',
          lastVerifiedAt: new Date(prod.lastVerifiedAt),
        })
      }
    }

    console.log('Database schema created and seeded successfully!')
  } catch (error) {
    console.error('Database seeding error:', error)
  } finally {
    await sql.end()
  }
}

runSeed()
