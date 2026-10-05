import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react'
import { Search, Plus, Check, ExternalLink, Cpu, CircleX } from 'lucide-react'
import { fetchOpenRouterModels } from '../lib/api-client'
import type { OpenRouterModel } from '../lib/api-client'
import { convertOpenRouterModelToProduct } from '../data/products'
import { useStackStore } from '../stores/stack-store'
import { formatMoney } from '../lib/pricing'

export const Route = createFileRoute('/models')({
  component: ModelsPage,
})

export function ModelsPage() {
  const [models, setModels] = useState<OpenRouterModel[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [providerFilter, setProviderFilter] = useState('All')
  
  const items = useStackStore((state) => state.items)
  const selectPlan = useStackStore((state) => state.selectPlan)
  const remove = useStackStore((state) => state.remove)
  const hydrate = useStackStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
    async function load() {
      setLoading(true)
      const data = await fetchOpenRouterModels()
      setModels(data)
      setLoading(false)
    }
    load()
  }, [hydrate])

  const providers = useMemo(() => {
    const set = new Set<string>()
    models.forEach((m) => {
      const p = m.id.includes('/') ? m.id.split('/')[0] : 'other'
      set.add(p)
    })
    return ['All', ...Array.from(set).sort()]
  }, [models])

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchesProvider =
        providerFilter === 'All' || m.id.startsWith(`${providerFilter}/`)
      const matchesQuery =
        !query.trim() ||
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.id.toLowerCase().includes(query.toLowerCase()) ||
        (m.description && m.description.toLowerCase().includes(query.toLowerCase()))
      return matchesProvider && matchesQuery
    })
  }, [models, providerFilter, query])

  const handleAddCustomModel = (m: OpenRouterModel) => {
    const converted = convertOpenRouterModelToProduct(m)
    const planId = converted.plans[0]?.id
    if (planId) {
      selectPlan({
        productId: converted.id,
        planId,
      })
    }
  }

  const handleClearFilters = () => {
    setQuery('')
    setProviderFilter('All')
  }

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6 sm:py-12">
      {/* Hero Header */}
      <div className="max-w-[800px] mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          AI Models & Token Pricing Matrix
        </h1>
        <p className="text-sm sm:text-lg text-[var(--color-text-secondary)] mt-2 sm:mt-3 leading-relaxed">
          Explore over 280+ active frontier and open-weight models. Compare token rates, context windows, and add developer API subscriptions directly to your stack.
        </p>
      </div>

      {/* Search & Provider Filter Bar */}
      <div className="discovery mb-6 sm:mb-8" aria-label="Search and filter AI models">
        <label className="search-field" htmlFor="model-search-input">
          <Search size={20} aria-hidden="true" />
          <input
            id="model-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI models by name, provider (e.g. OpenAI, Anthropic, DeepSeek)..."
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            className={`clear-search ${query ? 'visible' : ''}`}
            onClick={() => setQuery('')}
            aria-label="Clear search input"
          >
            <CircleX size={18} />
          </button>
        </label>

        {/* Provider Filter Horizontal Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none touch-pan-x mt-3">
          {providers.map((prov) => {
            const isActive = providerFilter === prov
            return (
              <button
                key={prov}
                type="button"
                className={`filter-pill whitespace-nowrap capitalize flex-shrink-0 ${isActive ? 'active' : ''}`}
                onClick={() => setProviderFilter(prov)}
                aria-pressed={isActive}
              >
                {prov}
              </button>
            )
          })}
        </div>
      </div>

      {/* Count and Active Filter Status */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">
          {loading ? 'Loading models...' : `${filteredModels.length} models available`}
        </p>
        {(query || providerFilter !== 'All') && (
          <button
            type="button"
            className="text-sm font-medium text-[var(--color-brand-primary)] hover:underline"
            onClick={handleClearFilters}
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Models Table / Grid */}
      {loading ? (
        <div className="py-16 sm:py-24 text-center">
          <Cpu size={36} className="mx-auto text-[var(--color-brand-primary)] animate-pulse mb-4" />
          <p className="text-[var(--color-text-secondary)] font-medium">
            Fetching latest models and live token rates from OpenRouter...
          </p>
        </div>
      ) : filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredModels.map((m) => {
            const promptPrice = parseFloat(String(m.pricing?.prompt || '0')) * 1000000
            const completionPrice = parseFloat(String(m.pricing?.completion || '0')) * 1000000
            const isFree = promptPrice === 0 && completionPrice === 0
            const converted = convertOpenRouterModelToProduct(m)
            const isAdded = items.some((item) => item.productId === converted.id)

            return (
              <div
                key={m.id}
                className={`p-4 sm:p-6 rounded-xl border flex flex-col justify-between transition-all ${
                  isAdded
                    ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface-stack)]'
                    : 'border-[var(--color-border-default)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        {m.id.split('/')[0]}
                      </span>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                        {m.name || m.id.split('/').pop()}
                      </h3>
                    </div>
                    {isFree ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                        Free API
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                        ${promptPrice.toFixed(2)} / ${completionPrice.toFixed(2)} M
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">
                    {m.description || 'Frontier generative intelligence model.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 py-3 px-4 rounded-lg bg-[var(--color-surface-control)] text-xs text-[var(--color-text-secondary)] mb-6">
                    <div>
                      <span className="text-[var(--color-text-muted)] block">Context:</span>
                      <strong className="text-[var(--color-text-primary)]">
                        {m.context_length ? `${(m.context_length / 1000).toFixed(0)}k tokens` : 'Standard'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] block">Est. Monthly:</span>
                      <strong className="text-[var(--color-text-primary)]">
                        {isFree ? 'Free' : `${formatMoney(converted.plans[0]?.monthlyPriceCents ?? 0)}/mo`}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    className={isAdded ? 'btn-secondary !w-full' : 'btn-primary !w-full'}
                    onClick={() => {
                      if (isAdded) {
                        remove(converted.id)
                      } else {
                        handleAddCustomModel(m)
                      }
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} /> Added in Stack
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Add to Stack
                      </>
                    )}
                  </button>
                  <a
                    href={`https://openrouter.ai/models/${m.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-toggle-pill !w-10 !h-10 flex-shrink-0"
                    title="Open model specs on OpenRouter"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-catalog-state">
          <Search size={32} />
          <h3>No AI models found matching "{query}"</h3>
          <p>Try searching for a different architecture or provider.</p>
          <button
            type="button"
            className="btn-secondary !w-auto !px-6"
            onClick={() => {
              setQuery('')
              setProviderFilter('All')
            }}
          >
            Reset search
          </button>
        </div>
      )}
    </main>
  )
}
