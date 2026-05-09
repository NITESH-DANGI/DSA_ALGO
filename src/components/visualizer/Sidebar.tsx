'use client'
import Link from 'next/link'
import { CATEGORIES } from '@/engine/registry'

const CATEGORY_ICONS: Record<string, string> = {
  sorting: 'swap_vert',
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
      className="hidden lg:flex"
      style={{
        width: '220px',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(26,28,32,0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 700, color: '#d7c4a6', letterSpacing: '-0.01em' }}>
          ALGO_CORE
        </h2>
        <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e', marginTop: '2px' }}>
          v2.4.0 Active
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '12px 8px' }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat
          return (
            <Link
              key={cat}
              href={CATEGORY_LINKS[cat] || '#'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: 500,
                color: isActive ? '#cfb58e' : '#7a756e',
                background: isActive ? 'rgba(51,53,57,0.4)' : 'transparent',
                borderLeft: isActive ? '2px solid #cfb58e' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                {CATEGORY_ICONS[cat] || 'layers'}
              </span>
              {CATEGORY_LABELS[cat] || cat}
            </Link>
          )
        })}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', margin: '8px 12px' }} />

        <Link href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontFamily: 'Sora, sans-serif', fontWeight: 500, color: '#7a756e', borderLeft: '2px solid transparent' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>layers</span>
          Dynamic
        </Link>
        <Link href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontFamily: 'Sora, sans-serif', fontWeight: 500, color: '#7a756e', borderLeft: '2px solid transparent' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>psychology</span>
          Neural
        </Link>
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          style={{
            width: '100%', padding: '8px 0', borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: 'rgba(55,57,62,0.6)', color: '#cfc5b9',
            fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 500,
            marginBottom: '8px',
          }}
        >
          Advanced Modules
        </button>
        <Link 
          href="/settings"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '12px', color: '#7a756e', textDecoration: 'none', fontFamily: 'Hanken Grotesk, sans-serif', width: '100%', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f3dfc0'}
          onMouseLeave={e => e.currentTarget.style.color = '#7a756e'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>settings</span>Settings
        </Link>
        <Link 
          href="/support"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '12px', color: '#7a756e', textDecoration: 'none', fontFamily: 'Hanken Grotesk, sans-serif', width: '100%', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f3dfc0'}
          onMouseLeave={e => e.currentTarget.style.color = '#7a756e'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>help</span>Support
        </Link>
      </div>
    </aside>
  )
}
