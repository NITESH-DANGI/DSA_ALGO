'use client'
import Link from 'next/link'
import { CATEGORIES } from '@/engine/registry'

const CATEGORY_ICONS: Record<string, string> = {
  sorting: 'reorder',
  searching: 'search',
  graph: 'hub',
  tree: 'account_tree',
}

const CATEGORY_LABELS: Record<string, string> = {
  sorting: 'Sorting',
  searching: 'Searching',
  graph: 'Graphs',
  tree: 'Trees',
}

const CATEGORY_LINKS: Record<string, string> = {
  sorting: '/visualize/bubble-sort',
  searching: '/visualize/binary-search',
  graph: '/visualize/bfs',
  tree: '/visualize/bst-insert',
}

interface SidebarProps {
  activeCategory?: string
}

export default function Sidebar({ activeCategory }: SidebarProps) {
  return (
    <aside
      className="hidden lg:flex flex-col w-64 min-h-full border-r backdrop-blur-lg"
      style={{
        background: 'rgba(26, 28, 32, 0.9)',
        borderColor: 'rgba(255,255,255,0.05)',
        boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div className="p-4 border-b mb-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <h2 className="font-bold" style={{ color: 'var(--primary)', fontFamily: 'Sora, sans-serif', fontSize: '22px' }}>
          ALGO_CORE
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
          v2.4.0 Active
        </p>
      </div>

      {/* Category nav */}
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat
          return (
            <Link
              key={cat}
              href={CATEGORY_LINKS[cat] || '#'}
              className="flex items-center gap-3 p-2 rounded-lg transition-all"
              style={{
                background: isActive ? 'rgba(51, 53, 57, 0.5)' : 'transparent',
                color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                borderLeft: isActive ? '2px solid var(--on-secondary-container)' : '2px solid transparent',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {CATEGORY_ICONS[cat] || 'layers'}
              </span>
              {CATEGORY_LABELS[cat] || cat}
            </Link>
          )
        })}
        {/* Extra categories */}
        <Link href="#" className="flex items-center gap-3 p-2 transition-all" style={{ color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>layers</span>
          Dynamic
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 transition-all" style={{ color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>psychology</span>
          Neural
        </Link>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto p-4 flex flex-col gap-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <button
          className="py-2 rounded-xl mb-4 text-center text-sm tactile-shadow"
          style={{
            background: 'var(--surface-bright)',
            color: 'var(--on-surface)',
          }}
        >
          Advanced Modules
        </button>
        <a href="#" className="flex items-center gap-3 p-2 text-sm transition-all hover:opacity-80" style={{ color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
          Settings
        </a>
        <a href="#" className="flex items-center gap-3 p-2 text-sm transition-all hover:opacity-80" style={{ color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>help</span>
          Support
        </a>
      </div>
    </aside>
  )
}
