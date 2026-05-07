'use client'
import { motion, AnimatePresence } from 'framer-motion'

interface StepExplainerProps {
  explanation: string
  comparisons?: number
  swaps?: number
  frontier?: string[]
  visitedCount?: number
}

export default function StepExplainer({ explanation, comparisons, swaps, frontier, visitedCount }: StepExplainerProps) {
  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={explanation}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-mono mb-3"
          style={{ color: 'var(--text)' }}
        >
          {explanation}
        </motion.p>
      </AnimatePresence>

      <div className="flex items-center gap-4 flex-wrap">
        {comparisons !== undefined && (
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Comparisons: <span style={{ color: 'var(--accent)' }}>{comparisons}</span>
          </span>
        )}
        {swaps !== undefined && (
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Swaps: <span style={{ color: 'var(--accent-purple)' }}>{swaps}</span>
          </span>
        )}
        {frontier && frontier.length > 0 && (
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Frontier: <span style={{ color: '#ffd080' }}>[{frontier.join(', ')}]</span>
          </span>
        )}
        {visitedCount !== undefined && (
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Visited: <span style={{ color: 'var(--accent)' }}>{visitedCount}</span>
          </span>
        )}
      </div>
    </div>
  )
}
