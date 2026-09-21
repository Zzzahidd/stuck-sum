import { useState, useEffect } from 'react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink, Check, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import { staticProducts, getAllProducts } from '../data/products'
import type { Product } from '../data/products'
import { formatMoney } from '../lib/pricing'
import { useStackStore } from '../stores/stack-store'
import { fetchOpenRouterModels } from '../lib/api-client'
import { BrandLogo } from '../lib/brand-logos'

export const Route = createFileRoute('/products/$slug')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { slug } = useParams({ from: '/products/$slug' })
  const [allProductsList, setAllProductsList] = useState<Product[]>(staticProducts)
  const items = useStackStore((state) => state.items)
  const selectPlan = useStackStore((state) => state.selectPlan)
  const remove = useStackStore((state) => state.remove)
  const hydrate = useStackStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
    async function load() {
      try {
        const live = await fetchOpenRouterModels()
        if (live.length > 0) {
          setAllProductsList(getAllProducts(live))
        }
      } catch (err) {
        console.warn(err)
      }
    }
    load()
  }, [hydrate])

  const product = allProductsList.find((p) => p.slug === slug || p.id === slug)

  if (!product) {
    return (
      <main className="max-w-[1200px] mx-auto px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The requested product "{slug}" could not be located in our catalog.
        </p>
        <Link to="/" className="btn-primary !w-auto !inline-flex !px-6">
          <ArrowLeft size={16} /> Return to Catalog
        </Link>
      </main>
    )
  }

  const selectedStackItem = items.find((item) => item.productId === product.id)
  const alternatives = allProductsList
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleSelectPlan = (planId: string) => {
    selectPlan({
      productId: product.id,
      planId,
    })
  }

  return (
    <main className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft size={16} /> Back to SaaS Stack Calculator
        </Link>
      </div>

      {/* Product Header Card */}
      <div className="p-8 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-card)] mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] p-3 flex items-center justify-center overflow-hidden">
              <BrandLogo slug={product.slug || product.id} name={product.name} size={54} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                  {product.name}
                </h1>
                <span className="category-badge">{product.category}</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mt-1 font-medium">
                by {product.companyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !w-auto !px-4 !h-10 text-sm"
            >
              Official Website <ExternalLink size={14} />
            </a>
            <a
              href={product.pricingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !w-auto !px-4 !h-10 text-sm"
            >
              Pricing Page <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Overview
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[var(--color-brand-primary)]" />
              Verified source: {product.source}
            </span>
            <span>Last reviewed: {product.lastVerifiedAt}</span>
            {product.isLiveModel && (
              <span className="flex items-center gap-1 text-[var(--color-brand-primary)] font-medium">
                <Sparkles size={14} /> Live AI Model via OpenRouter API
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Tiers Matrix */}
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
        Available Pricing Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {product.plans.map((p) => {
          const isSelected = selectedStackItem?.planId === p.id
          return (
            <div
              key={p.id}
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface-stack)] shadow-md ring-1 ring-[var(--color-brand-primary)]'
                  : 'border-[var(--color-border-default)] bg-[var(--color-surface-card)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {p.name}
                  </h3>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-brand-primary)] text-white">
                      <Check size={12} /> Active in Stack
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                      {formatMoney(p.monthlyPriceCents ?? 0)}
                    </span>
                    <span className="text-[var(--color-text-secondary)] font-normal">
                      /month
                    </span>
                  </div>
                  {p.annualPriceCents !== null && p.annualPriceCents !== undefined && (
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {formatMoney(p.annualPriceCents)} billed annually
                    </p>
                  )}
                </div>

                {p.features && p.features.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-[var(--color-border-subtle)]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                      Plan Highlights
                    </h4>
                    <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                      {p.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-[var(--color-brand-primary)] mt-1 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-auto">
                {isSelected ? (
                  <button
                    type="button"
                    className="btn-secondary !w-full !text-red-700 dark:!text-red-400"
                    onClick={() => remove(product.id)}
                  >
                    Remove from Stack
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary !w-full"
                    onClick={() => handleSelectPlan(p.id)}
                  >
                    <Plus size={16} /> Add to Stack ({p.name})
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Alternative Recommendations */}
      {alternatives.length > 0 && (
        <section className="pt-10 border-t border-[var(--color-border-default)]">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
            Alternative {product.category} Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {alternatives.map((alt) => (
              <Link
                key={alt.id}
                to="/products/$slug"
                params={{ slug: alt.slug }}
                className="p-5 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] transition-all flex items-center gap-4 text-left group"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-surface-control)] p-2 flex items-center justify-center flex-shrink-0">
                  <BrandLogo slug={alt.slug || alt.id} name={alt.name} size={28} />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {alt.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    From {formatMoney(alt.plans[0]?.monthlyPriceCents ?? 0)}/mo
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
