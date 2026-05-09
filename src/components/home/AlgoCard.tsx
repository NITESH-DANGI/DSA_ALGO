'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlgoMeta } from '@/engine/types'

const DIFF_COLORS: Record<string, string> = {
  easy: '#8bc34a',
  medium: '#d7c4a6',
  hard: '#c45c5c',
}

interface AlgoCardProps {
  algo: AlgoMeta
  index: number
}

export default function AlgoCard({ algo, index }: AlgoCardProps) {
  const diffColor = DIFF_COLORS[algo.difficulty] || '#988f85'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <div
        style={{
          background: 'rgba(30, 32, 36, 0.7)',
          border: '1px solid rgba(243,223,192,0.08)',
          borderRadius: '14px',
          padding: '22px 24px 20px',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '12px',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          minHeight: '210px',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(243,223,192,0.3)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(243,223,192,0.1)'
          e.currentTarget.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(243,223,192,0.08)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#e2e2e8',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {algo.name}
        </h3>

        {/* Description — 2 line clamp */}
        <p
          style={{
            fontFamily: 'Hanken Grotesk, sans-serif',
            fontSize: '13px',
            lineHeight: 1.55,
            color: '#7a756e',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {algo.description}
        </p>

        {/* Complexity + Difficulty row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap' as const,
          }}
        >
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#7a756e' }}>
            Time: {algo.complexity.time.average}
          </span>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#7a756e' }}>
            Space: {algo.complexity.space}
          </span>
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: diffColor,
              marginLeft: 'auto',
            }}
          >
            {algo.difficulty.charAt(0).toUpperCase() + algo.difficulty.slice(1)}
          </span>
        </div>

        {/* Visualize button */}
        <Link
          href={`/visualize/${algo.id}`}
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '10px 0',
            borderRadius: '10px',
            background: 'rgba(243,223,192,0.06)',
            border: '1px solid rgba(243,223,192,0.1)',
            color: '#cfc5b9',
            fontFamily: 'Sora, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.25s ease',
            marginTop: '4px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#f3dfc0'
            e.currentTarget.style.color = '#1a1c20'
            e.currentTarget.style.borderColor = '#f3dfc0'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(243, 223, 192, 0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(243,223,192,0.06)'
            e.currentTarget.style.color = '#cfc5b9'
            e.currentTarget.style.borderColor = 'rgba(243,223,192,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Visualize
        </Link>
      </div>
    </motion.div>
  )
}
