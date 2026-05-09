'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlgoMeta } from '@/engine/types'
import { DIFFICULTY_COLORS } from '@/lib/constants'

interface AlgoCardProps {
  algo: AlgoMeta
  index: number
}

export default function AlgoCard({ algo, index }: AlgoCardProps) {
  const diffColor = DIFFICULTY_COLORS[algo.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/visualize/${algo.id}`} className="block h-full">
        <div
          className="group relative rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer h-full flex flex-col"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border-hover)'
            el.style.boxShadow = '0 8px 40px rgba(196,167,108,0.08), 0 0 20px rgba(196,167,108,0.04)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border)'
            el.style.boxShadow = 'none'
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${diffColor}, transparent)` }} />

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-5">
            {/* Category + difficulty */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="px-2.5 py-1 rounded text-[10px] uppercase tracking-wider"
                style={{
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                {algo.category}
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider"
                style={{
                  color: diffColor,
                  background: `${diffColor}15`,
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                {algo.difficulty}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
              {algo.name}
            </h3>

            {/* Description */}
            <p className="text-[13px] leading-relaxed mb-4 flex-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
              {algo.description}
            </p>

            {/* Complexity row */}
            <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Time</span>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-space-mono), monospace' }}>{algo.complexity.time.best}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Space</span>
                <span className="text-xs font-bold" style={{ color: 'var(--accent-purple)', fontFamily: 'var(--font-space-mono), monospace' }}>{algo.complexity.space}</span>
              </div>
            </div>

            {/* CTA */}
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              <span className="group-hover:tracking-wide transition-all">Visualize</span>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
