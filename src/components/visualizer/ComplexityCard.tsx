'use client'
import { AlgoMeta } from '@/engine/types'

interface ComplexityCardProps {
  algo: AlgoMeta
}

export default function ComplexityCard({ algo }: ComplexityCardProps) {
  const { complexity } = algo
  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
        Complexity
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <span className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Best</span>
          <span className="text-sm font-mono font-bold" style={{ color: 'var(--accent)' }}>{complexity.time.best}</span>
        </div>
        <div>
          <span className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Average</span>
          <span className="text-sm font-mono font-bold" style={{ color: '#ffd080' }}>{complexity.time.average}</span>
        </div>
        <div>
          <span className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Worst</span>
          <span className="text-sm font-mono font-bold" style={{ color: 'var(--accent-red)' }}>{complexity.time.worst}</span>
        </div>
        <div>
          <span className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Space</span>
          <span className="text-sm font-mono font-bold" style={{ color: 'var(--accent-purple)' }}>{complexity.space}</span>
        </div>
      </div>
    </div>
  )
}
