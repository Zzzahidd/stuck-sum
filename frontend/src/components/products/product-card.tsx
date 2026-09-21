import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Plus, ArrowRight, Check, X } from 'lucide-react'
import type { Product } from '../../data/products'
import { formatMoney } from '../../lib/pricing'
import { useStackStore } from '../../stores/stack-store'
import { animateAccordion, animateClickFeedback } from '../../lib/motion/gsap-animations'
import { BrandLogo } from '../../lib/brand-logos'

export function ProductCard({ product }: { product: Product }) {
  const items = useStackStore((state) => state.items)
  const selectPlan = useStackStore((state) => state.selectPlan)
  
  const existingStackItem = items.find((item) => item.productId === product.id)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState(
    existingStackItem?.planId || product.plans[0]?.id || ''
  )
  
  const accordionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)

  // Sync selectedPlanId when stack item updates
  useEffect(() => {
    if (existingStackItem) {
      setSelectedPlanId(existingStackItem.planId)
    }
  }, [existingStackItem?.planId])

  // Close when clicking outside the card or pressing Escape
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Animate accordion on toggle
  useEffect(() => {
    animateAccordion(accordionRef.current, isOpen)
  }, [isOpen])

  // Get lowest paid or first plan price
  const displayPlan = product.plans.find((p) => (p.monthlyPriceCents ?? 0) > 0) || product.plans[0]
  const currentPlan = product.plans.find((p) => p.id === selectedPlanId) || product.plans[0]
  const inStackPlan = product.plans.find((p) => p.id === existingStackItem?.planId)

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isOpen) {
      setIsOpen(true)
      return
    }
    
    // Add selected plan to stack and close
    if (selectedPlanId) {
      animateClickFeedback(cardRef.current)
      selectPlan({
        productId: product.id,
        planId: selectedPlanId,
      })
      setIsOpen(false)
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
  }

  return (
    <article
      ref={cardRef}
      className={`product-card ${existingStackItem ? 'in-stack' : ''}`}
      id={`product-${product.id}`}
    >
      {/* Top Bar: Initial Badge + Link */}
      <div className="product-card-top">
        <div className="product-logo-box">
          <BrandLogo slug={product.slug || product.id} name={product.name} size={44} />
        </div>
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="product-arrow-btn"
          aria-label={`View full details for ${product.name}`}
          title="View product details"
        >
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="product-header-info">
        <h3 className="product-title">{product.name}</h3>
        <span className="category-badge">{product.category}</span>
      </div>

      <p className="product-desc">{product.description}</p>

      {/* Plan Selector or Price Preview */}
      {isOpen ? (
        <div ref={accordionRef} className="plan-selector-container">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="plan-selector-heading !mb-0">Choose your plan</h4>
            <button
              type="button"
              className="plan-selector-close-btn"
              onClick={handleClose}
              aria-label={`Close plan selection for ${product.name}`}
              title="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="plan-radio-list" role="radiogroup" aria-label={`Plans for ${product.name}`}>
            {product.plans.map((p) => {
              const isChecked = selectedPlanId === p.id
              return (
                <div
                  key={p.id}
                  className={`plan-radio-row ${isChecked ? 'selected' : ''}`}
                  onClick={() => setSelectedPlanId(p.id)}
                  role="radio"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault()
                      setSelectedPlanId(p.id)
                    }
                  }}
                >
                  <div className={`custom-radio ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <div className="custom-radio-dot" />}
                  </div>
                  <span className="plan-name-label">{p.name}</span>
                  <span className="plan-price-label">
                    {formatMoney(p.monthlyPriceCents ?? 0)} <small>/mo</small>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p className="product-price-preview">
          From: <strong>{formatMoney(displayPlan?.monthlyPriceCents ?? 0)}</strong> /mo
        </p>
      )}

      {/* Action Button */}
      {isOpen ? (
        <div className="flex gap-2 mt-auto">
          <button
            type="button"
            className="btn-secondary !w-auto !px-3"
            onClick={handleClose}
            aria-label="Cancel"
            title="Cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleAddClick}
            aria-label={`Add ${product.name} ${currentPlan?.name || ''} to stack`}
          >
            <Plus size={18} />
            {existingStackItem ? `Update ${product.name}` : `Add ${product.name}`}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn-secondary"
          onClick={handleAddClick}
          aria-label={existingStackItem ? `Change plan for ${product.name}` : `Choose plan for ${product.name}`}
        >
          <Plus size={18} />
          {existingStackItem ? 'Change plan' : 'Add'}
        </button>
      )}

      {existingStackItem && (
        <div className="flex items-center gap-1.5 mt-2.5 text-[var(--color-brand-primary)] text-xs font-medium">
          <Check size={14} /> Added to stack: {inStackPlan?.name || currentPlan?.name}
        </div>
      )}
    </article>
  )
}
