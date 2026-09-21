import type { Plan, Product } from '../data/products'

export const formatMoney = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: cents % 100 === 0 ? 0 : 2 }).format(cents / 100)

export const planAnnualPrice = (plan: Plan) => plan.annualPriceCents ?? (plan.monthlyPriceCents ?? 0) * 12

export const findPlan = (products: Product[], productId: string, planId: string) =>
  products.find((item) => item.id === productId)?.plans.find((plan) => plan.id === planId)
