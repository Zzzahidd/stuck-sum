import { useEffect, useRef, useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { products } from '../../data/products'
import type { Product } from '../../data/products'
import { formatMoney, planAnnualPrice } from '../../lib/pricing'
import { useStackStore } from '../../stores/stack-store'
import { animatePriceCounter } from '../../lib/motion/gsap-animations'
import { BrandLogo } from '../../lib/brand-logos'

export function StackSummary({ allProducts = products }: { allProducts?: Product[] }) {
  const items = useStackStore((state) => state.items)
  const removeItem = useStackStore((state) => state.remove)

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
  const prevMonthlyRef = useRef(monthlyTotal)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isSticky, setIsSticky] = useState(false)

  // Rolling counter on price changes
  useEffect(() => {
    animatePriceCounter(
      monthlyDisplayRef.current,
      prevMonthlyRef.current,
      monthlyTotal,
      (val) => formatMoney(val)
    )
    prevMonthlyRef.current = monthlyTotal
  }, [monthlyTotal])

  // Sticky scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setIsSticky(rect.top <= 12)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`stack-section ${isSticky ? 'is-sticky' : ''}`}
      aria-label="Your selected SaaS subscription stack"
    >
      <div className="stack-summary-card">
        {/* Left: Summary Count */}
        <div className="stack-intro">
          <h2>Your stack</h2>
          <p>
            {selected.length === 0
              ? '0 subscriptions'
              : `${selected.length} subscription${selected.length > 1 ? 's' : ''} added`}
          </p>
        </div>

        {/* Middle: Horizontal Selected Items */}
        <div className="stack-items-track">
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
            {selected.length > 0 && (
              <button
                type="button"
                className="theme-toggle-pill !w-7 !h-7 ml-auto inline-flex md:hidden"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Toggle stack details"
              >
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>
          <p ref={annualDisplayRef} className="stack-total-annual">
            {formatMoney(annualTotal)} /year
          </p>
        </div>
      </div>
    </section>
  )
}
