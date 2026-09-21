import { boolean, integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
}, (table) => [uniqueIndex('categories_slug_unique').on(table.slug)])

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  companyName: text('company_name').notNull(),
  description: text('description').notNull(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  logoUrl: text('logo_url').notNull(),
  websiteUrl: text('website_url').notNull(),
  pricingUrl: text('pricing_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('products_slug_unique').on(table.slug)])

export const plans = pgTable('plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  monthlyPriceCents: integer('monthly_price_cents'),
  annualPriceCents: integer('annual_price_cents'),
  currency: text('currency').notNull().default('USD'),
  billingInterval: text('billing_interval').notNull(),
  isAvailable: boolean('is_available').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const pricingSources = pgTable('pricing_sources', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  sourceType: text('source_type').notNull().default('official'),
  lastVerifiedAt: timestamp('last_verified_at', { withTimezone: true }).notNull(),
})
