import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { primaryCategories, moreCategories } from '../../data/products'
import type { Category } from '../../data/products'

interface CategoryFilterProps {
  selectedCategory: Category
  onSelectCategory: (category: Category) => void
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const [moreOpen, setMoreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isMoreCategoryActive = moreCategories.includes(selectedCategory)

  return (
    <div className="filters-wrapper" role="group" aria-label="Filter products by category">
      {primaryCategories.map((cat) => {
        const isActive = selectedCategory === cat
        return (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
            aria-pressed={isActive}
          >
            {cat}
          </button>
        )
      })}

      {/* More Categories Dropdown */}
      <div className="more-dropdown" ref={menuRef}>
        <button
          type="button"
          className={`filter-pill ${isMoreCategoryActive ? 'active' : ''}`}
          onClick={() => setMoreOpen(!moreOpen)}
          aria-expanded={moreOpen}
          aria-haspopup="true"
        >
          {isMoreCategoryActive ? (
            <>
              {selectedCategory}
              <ChevronDown size={14} />
            </>
          ) : (
            <>
              <Plus size={14} />
              More
            </>
          )}
        </button>

        {moreOpen && (
          <div className="more-menu" role="menu">
            {moreCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`more-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  onSelectCategory(cat)
                  setMoreOpen(false)
                }}
                role="menuitem"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
