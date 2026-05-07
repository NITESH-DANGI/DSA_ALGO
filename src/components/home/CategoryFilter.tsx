'use client'
import { CATEGORIES } from '@/engine/registry'
import { CATEGORY_LABELS } from '@/lib/constants'

interface CategoryFilterProps {
  selected: string
  onSelect: (cat: string) => void
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onSelect('all')}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        style={{
          background: selected === 'all' ? 'var(--accent)' : 'var(--surface)',
          color: selected === 'all' ? 'var(--bg)' : 'var(--text-muted)',
          border: `1px solid ${selected === 'all' ? 'var(--accent)' : 'var(--border)'}`,
        }}
      >
        All
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
          style={{
            background: selected === cat ? 'var(--accent)' : 'var(--surface)',
            color: selected === cat ? 'var(--bg)' : 'var(--text-muted)',
            border: `1px solid ${selected === cat ? 'var(--accent)' : 'var(--border)'}`,
          }}
        >
          {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
        </button>
      ))}
    </div>
  )
}
