import { useEffect, useMemo, useState, useRef } from 'react'
import Fuse from 'fuse.js'
import { Search, CircleX, Sparkles } from 'lucide-react'
import { staticProducts, getAllProducts } from '../data/products'
import type { Category, Product } from '../data/products'
import { useStackStore } from '../stores/stack-store'
import { fetchOpenRouterModels } from '../lib/api-client'
import { ProductCard } from './products/product-card'
import { StackSummary } from './stack/stack-summary'
import { CategoryFilter } from './filters/category-filter'
import { animateGridEntrance } from '../lib/motion/gsap-animations'

export function StackApp() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [allProductsList, setAllProductsList] = useState<Product[]>(staticProducts)
  const [loadingLiveModels, setLoadingLiveModels] = useState(false)
  
  const hydrate = useStackStore((state) => state.hydrate)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  // Hydrate local stack on start
  useEffect(() => {
    hydrate()
  }, [hydrate])

  // Fetch OpenRouter public models to expand catalog to 500+ products
  useEffect(() => {
    let isMounted = true
    async function loadModels() {
      setLoadingLiveModels(true)
      try {
        const liveModels = await fetchOpenRouterModels()
        if (isMounted && liveModels.length > 0) {
          const combined = getAllProducts(liveModels)
          setAllProductsList(combined)
        }
      } catch (err) {
        console.warn('Could not load live models:', err)
      } finally {
        if (isMounted) setLoadingLiveModels(false)
      }
    }
    loadModels()
    return () => {
      isMounted = false
    }
  }, [])

  // Fuzzy search with Fuse.js
  const filteredCatalog = useMemo(() => {
    let pool = allProductsList
    if (category !== 'All') {
      pool = pool.filter((item) => item.category === category)
    }
    if (!query.trim()) {
      return pool
    }

    const fuse = new Fuse(pool, {
      keys: [
        { name: 'name', weight: 0.5 },
        { name: 'companyName', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'description', weight: 0.1 },
        { name: 'tags', weight: 0.2 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    })

    return fuse.search(query.trim()).map((res) => res.item)
  }, [allProductsList, category, query])

  // Trigger grid entrance animation when filter or query changes
  useEffect(() => {
    animateGridEntrance(gridContainerRef.current)
  }, [category, query, filteredCatalog.length])

  const handleClear = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <div className="app-shell">
      <a className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-[var(--color-brand-primary)] focus:text-white focus:z-50" href="#catalog">
        Skip to product catalog
      </a>

      <main>
        {/* Hero Section */}
        <section className="hero" aria-label="Introduction">
          <h1>
            Build your SaaS stack <br className="hidden sm:inline" />
            see the real cost
          </h1>
          <p>
            Browse 500+ popular tools, add the ones you use, and get your monthly and yearly cost instantly.
          </p>
        </section>

        {/* Discovery: Search & Filter Pills */}
        <section className="discovery" aria-label="Search and filter tools">
          <label className="search-field" htmlFor="saas-search-input">
            <Search size={20} aria-hidden="true" />
            <input
              id="saas-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search SaaS products..."
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

          <CategoryFilter
            selectedCategory={category}
            onSelectCategory={(cat) => setCategory(cat)}
          />
        </section>

        {/* Persistent Sticky Stack Summary Card */}
        <StackSummary allProducts={allProductsList} />

        {/* Product Catalog Grid */}
        <section id="catalog" className="catalog" aria-labelledby="catalog-heading">
          <div className="catalog-header">
            <div>
              <h2 id="catalog-heading">
                {category === 'All' ? 'Browse popular tools' : `${category} Tools`}
              </h2>
              <p>
                {filteredCatalog.length} tools available
                {loadingLiveModels && ' (syncing live AI models...)'}
              </p>
            </div>
            {(query || category !== 'All') && (
              <button
                type="button"
                className="text-sm font-medium text-[var(--color-brand-primary)] hover:underline"
                onClick={handleClear}
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredCatalog.length > 0 ? (
            <div ref={gridContainerRef} className="product-grid">
              {filteredCatalog.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <Search size={32} className="text-[var(--color-text-muted)]" />
              <h3>No SaaS products found</h3>
              <p>Try searching for a different keyword or select another category.</p>
              <button
                type="button"
                className="btn-secondary !w-auto !px-6"
                onClick={handleClear}
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer>
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            StackSum — Accurate SaaS subscription stack calculator. Pricing verified from official vendors.
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Sparkles size={13} className="text-[var(--color-brand-primary)]" />
            500+ active subscriptions & models cataloged
          </span>
        </div>
      </footer>
    </div>
  )
}
