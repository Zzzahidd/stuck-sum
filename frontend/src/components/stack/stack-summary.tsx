import { useEffect, useRef, useState } from 'react'
import { X, ChevronUp, Layers, Trash2 } from 'lucide-react'
import { products } from '../../data/products'
import type { Product } from '../../data/products'
import { formatMoney, planAnnualPrice } from '../../lib/pricing'
import { useStackStore } from '../../stores/stack-store'
import { animatePriceCounter } from '../../lib/motion/gsap-animations'
import { BrandLogo } from '../../lib/brand-logos'

export function StackSummary({ allProducts = products }: { allProducts?: Product[] }) {
  const items = useStackStore((state) => state.items)
  const removeItem = useStackStore((state) => state.remove)
  const clearStack = useStackStore((state) => state.clear)

  const selected = items.flatMap((item) => {
    const product = allProducts.find((p) => p.id === item.productId)
    const plan = product?.plans.find((p) => p.id === item.planId)
    return product && plan ? [{ product, plan }] : []
  })

  const monthlyTotal = selected.reduce(
    (acc, item) => acc + (item.plan.monthlyPriceCents ?? 0),
    0
  )
  const annualTotal = selected.reduce(
    (acc, item) => acc + planAnnualPrice(item.plan),
    0
  )

  const sectionRef = useRef<HTMLElement>(null)
  const monthlyDisplayRef = useRef<HTMLSpanElement>(null)
  const annualDisplayRef = useRef<HTMLParagraphElement>(null)
  const mobileMonthlyDisplayRef = useRef<HTMLSpanElement>(null)
  const floatingMonthlyDisplayRef = useRef<HTMLSpanElement>(null)
  const prevMonthlyRef = useRef(monthlyTotal)
  
  const [isSticky, setIsSticky] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false)

  // Rolling counter on price changes
  useEffect(() => {
    if (monthlyDisplayRef.current) {
      animatePriceCounter(
        monthlyDisplayRef.current,
        prevMonthlyRef.current,
        monthlyTotal,
        (val) => formatMoney(val)
      )
    }
    if (mobileMonthlyDisplayRef.current) {
      animatePriceCounter(
        mobileMonthlyDisplayRef.current,
        prevMonthlyRef.current,
        monthlyTotal,
        (val) => formatMoney(val)
      )
    }
    if (floatingMonthlyDisplayRef.current) {
      animatePriceCounter(
        floatingMonthlyDisplayRef.current,
        prevMonthlyRef.current,
        monthlyTotal,
        (val) => formatMoney(val)
      )
    }
    prevMonthlyRef.current = monthlyTotal
  }, [monthlyTotal])

  // Sticky and scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setIsSticky(rect.top <= 16)
      setIsScrolledPastTop(rect.bottom < 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileDrawerOpen(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileDrawerOpen])

  return (
    <>
      <section
        ref={sectionRef}
        className={`stack-section ${isSticky ? 'is-sticky' : ''}`}
        aria-label="Your selected SaaS subscription stack"
      >
        {/* Desktop Version (>= 768px) */}
        <div className={`stack-summary-card hidden md:grid ${selected.length === 0 ? 'is-empty' : 'has-items'}`}>
          {/* Left: Summary Count */}
          <div className="stack-intro">
            <div className="flex items-center justify-between">
              <h2>Your stack</h2>
            </div>
            <p>
              {selected.length === 0
                ? '0 subscriptions'
                : `${selected.length} subscription${selected.length > 1 ? 's' : ''} added`}
            </p>
          </div>

          {/* Middle: Horizontal Selected Items */}
          <div className="stack-items-track flex">
            {selected.length > 0 ? (
              selected.map(({ product, plan }) => (
                <div className="stack-item-node" key={product.id}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] p-1">
                    <BrandLogo slug={product.slug || product.id} name={product.name} size={22} />
                  </div>
                  <div className="stack-item-info">
                    <span className="stack-item-title" title={`${product.name} ${plan.name}`}>
                      {product.name} {plan.name}
                    </span>
                    <span className="stack-item-price">
                      {formatMoney(plan.monthlyPriceCents ?? 0)} <small>/mo</small>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="stack-item-remove"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name} from stack`}
                    title={`Remove ${product.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="stack-empty-hint">
                Add tools below to see your combined monthly and yearly stack cost.
              </p>
            )}
          </div>

          {/* Right: Total Calculation */}
          <div className="stack-total-box">
            <span className="stack-total-label">Total</span>
            <div className="stack-total-row">
              <span ref={monthlyDisplayRef} className="stack-total-amount">
                {formatMoney(monthlyTotal)}
              </span>
              <span className="stack-total-suffix">/mo</span>
            </div>
            <p ref={annualDisplayRef} className="stack-total-annual">
              {formatMoney(annualTotal)} /year
            </p>
          </div>
        </div>

        {/* Mobile Inline Card (< 768px) */}
        <div className="md:hidden mobile-stack-inline-card">
          <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] flex items-center justify-center">
                <Layers size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--color-text-primary)] leading-tight">Your stack</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {selected.length === 0 ? '0 subscriptions' : `${selected.length} subscription${selected.length > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1">
                <span ref={mobileMonthlyDisplayRef} className="text-lg font-bold text-[var(--color-text-primary)]">
                  {formatMoney(monthlyTotal)}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">/mo</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                {formatMoney(annualTotal)} /yr
              </p>
            </div>
          </div>

          {selected.length > 0 ? (
            <div className="pt-2.5">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {selected.map(({ product, plan }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] flex-shrink-0 text-xs"
                  >
                    <BrandLogo slug={product.slug || product.id} name={product.name} size={16} />
                    <span className="font-medium text-[var(--color-text-primary)] max-w-[90px] truncate">
                      {product.name}
                    </span>
                    <span className="text-[var(--color-text-muted)] font-semibold">
                      {formatMoney(plan.monthlyPriceCents ?? 0)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="ml-1 text-[var(--color-text-muted)] hover:text-red-600 p-0.5"
                      aria-label={`Remove ${product.name}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--color-text-muted)] pt-2 leading-relaxed">
              Add tools below to see your combined monthly and yearly stack cost.
            </p>
          )}
        </div>
      </section>

      {/* Floating Bottom Dock on Mobile (when scrolled down and has items) */}
      {selected.length > 0 && isScrolledPastTop && (
        <aside
          className="md:hidden fixed left-0 right-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
          aria-label="Floating SaaS stack summary"
        >
          <div
            className="mobile-floating-dock pointer-events-auto flex items-center justify-between px-4 py-3 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-stack)]/95 shadow-xl backdrop-blur-lg"
            onClick={() => setMobileDrawerOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') setMobileDrawerOpen(true)
            }}
            aria-label="Open full stack details"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-[var(--color-brand-primary)] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Layers size={18} />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white dark:bg-[var(--color-surface-card)] text-[var(--color-brand-primary)] text-[11px] font-extrabold flex items-center justify-center border border-[var(--color-brand-primary)] shadow-xs">
                  {selected.length}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span ref={floatingMonthlyDisplayRef} className="text-lg font-bold text-[var(--color-text-primary)]">
                    {formatMoney(monthlyTotal)}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)] font-medium">/mo</span>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  {formatMoney(annualTotal)} /year
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary !w-auto !h-9 !px-3.5 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              onClick={(e) => {
                e.stopPropagation()
                setMobileDrawerOpen(true)
              }}
            >
              <span>View Stack</span>
              <ChevronUp size={15} />
            </button>
          </div>
        </aside>
      )}

      {/* Mobile Stack Bottom Sheet Drawer */}
      {mobileDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-stack-drawer-title"
        >
          <div
            className="w-full max-h-[85vh] bg-[var(--color-background-canvas)] rounded-t-3xl border-t border-[var(--color-border-default)] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Drag Bar */}
            <div className="w-12 h-1.5 rounded-full bg-[var(--color-border-strong)] mx-auto mt-3 mb-1" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border-subtle)]">
              <div>
                <h3 id="mobile-stack-drawer-title" className="text-base font-bold text-[var(--color-text-primary)]">
                  Your Selected Stack
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {selected.length} active subscription{selected.length > 1 ? 's' : ''}
                </p>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-[var(--color-surface-control)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-center"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close stack drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Items List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
              {selected.map(({ product, plan }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-default)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-control)] p-1.5 flex items-center justify-center flex-shrink-0 border border-[var(--color-border-subtle)]">
                      <BrandLogo slug={product.slug || product.id} name={product.name} size={28} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate">
                        {plan.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {formatMoney(plan.monthlyPriceCents ?? 0)}
                      </span>
                      <small className="text-xs text-[var(--color-text-secondary)] block">/mo</small>
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg text-[var(--color-text-muted)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center transition-colors"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer Summary & Actions */}
            <div className="p-5 border-t border-[var(--color-border-default)] bg-[var(--color-surface-stack)] pb-[max(20px,env(safe-area-inset-bottom))]">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">Monthly Total</span>
                <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {formatMoney(monthlyTotal)} <small className="text-sm font-normal text-[var(--color-text-secondary)]">/mo</small>
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-[var(--color-text-muted)]">Annualized Equivalent</span>
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  {formatMoney(annualTotal)} /year
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-secondary !w-auto !px-4 text-xs font-medium text-red-600 dark:text-red-400"
                  onClick={() => {
                    clearStack()
                    setMobileDrawerOpen(false)
                  }}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="btn-primary !flex-1 text-sm font-semibold"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
