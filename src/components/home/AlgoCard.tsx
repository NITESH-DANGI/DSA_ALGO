'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { AlgoMeta } from '@/engine/types'
import { DIFFICULTY_COLORS } from '@/lib/constants'

interface AlgoCardProps {
  algo: AlgoMeta
  index: number
}

const CATEGORY_IMAGES: Record<string, string> = {
  sorting: '/algo-art/sorting.png',
  searching: '/algo-art/searching.png',
  graph: '/algo-art/graph.png',
  tree: '/algo-art/tree.png',
}

export default function AlgoCard({ algo, index }: AlgoCardProps) {
  const diffColor = DIFFICULTY_COLORS[algo.difficulty]
  const image = CATEGORY_IMAGES[algo.category] || CATEGORY_IMAGES.sorting

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/visualize/${algo.id}`} className="block h-full">
        <div
          className="group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer h-full flex flex-col"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border-hover)'
            el.style.boxShadow = '0 8px 40px rgba(0,255,180,0.12), 0 0 20px rgba(0,255,180,0.06)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border)'
            el.style.boxShadow = 'none'
          }}
        >
          {/* Image Section */}
          <div className="relative w-full h-40 overflow-hidden">
            <Image
              src={image}
              alt={algo.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 30%, var(--surface) 100%)',
              }}
            />
            {/* Difficulty badge on image */}
            <div className="absolute top-3 right-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                style={{
                  color: diffColor,
                  background: `${diffColor}20`,
                  border: `1px solid ${diffColor}40`,
                }}
              >
                {algo.difficulty}
              </span>
            </div>
            {/* Category badge on image */}
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                style={{
                  background: 'rgba(0,255,180,0.12)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(0,255,180,0.2)',
                }}
              >
                {algo.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-5">
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
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>{algo.complexity.time.best}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Space</span>
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-purple)' }}>{algo.complexity.space}</span>
              </div>
            </div>

            {/* CTA */}
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              <span className="group-hover:tracking-wide transition-all">Visualize</span>
              <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                style={{ background: 'rgba(0,255,180,0.1)', border: '1px solid rgba(0,255,180,0.2)' }}
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
