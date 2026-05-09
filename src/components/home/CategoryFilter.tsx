'use client'
import { CATEGORIES } from '@/engine/registry'
import { CATEGORY_LABELS } from '@/lib/constants'

interface CategoryFilterProps {
  selected: string
  onSelect: (cat: string) => void
}

const CATEGORY_ICONS: Record<string, string> = {
  all: 'apps',
  sorting: 'swap_vert',
  searching: 'search',
  graph: 'hub',
  tree: 'account_tree',
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const allCats = ['all', ...CATEGORIES]

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px',
        borderRadius: '14px',
        background: 'rgba(30, 32, 36, 0.5)',
        border: '1px solid rgba(243,223,192,0.08)',
      }}
    >
      {allCats.map(cat => {
        const isActive = selected === cat
        const label = cat === 'all' ? 'All' : (CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat)
        const icon = CATEGORY_ICONS[cat] || 'layers'

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: 'Sora, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'all 0.25s ease',
              background: isActive
                ? 'linear-gradient(135deg, rgba(243,223,192,0.15), rgba(215,196,166,0.1))'
                : 'transparent',
              color: isActive ? '#f3dfc0' : '#7a756e',
              boxShadow: isActive
                ? '0 2px 8px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(243,223,192,0.12)'
                : 'none',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '16px',
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {icon}
            </span>
            {label}
          </button>
        )
      })}
    </div>
  )
}
