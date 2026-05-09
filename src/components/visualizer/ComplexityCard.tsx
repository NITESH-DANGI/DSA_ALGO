'use client'
import { AlgoMeta } from '@/engine/types'

interface ComplexityCardProps {
  algo: AlgoMeta
}

export default function ComplexityCard({ algo }: ComplexityCardProps) {
  const { complexity } = algo
  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col gap-4">
      <h3 className="label-caps pb-2" style={{ color: 'var(--primary)', borderBottom: '1px solid rgba(76, 70, 61, 0.3)', letterSpacing: '0.15em' }}>
        COMPLEXITY ANALYSIS
      </h3>

      <div className="flex flex-col gap-1 mt-2">
        <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Time Complexity</span>
        <div className="flex items-end gap-2">
          <span
            className="text-[28px] font-medium"
            style={{ color: 'var(--tertiary)', fontFamily: 'Sora, sans-serif', lineHeight: 1.2, letterSpacing: '-0.01em' }}
          >
            {complexity.time.average}
          </span>
          <span className="text-sm mb-1" style={{ color: 'var(--tertiary-fixed-dim)' }}>Average</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Space Complexity</span>
        <div className="flex items-end gap-2">
          <span
            className="text-[28px] font-medium"
            style={{ color: 'var(--secondary)', fontFamily: 'Sora, sans-serif', lineHeight: 1.2, letterSpacing: '-0.01em' }}
          >
            {complexity.space}
          </span>
          <span className="text-sm mb-1" style={{ color: 'var(--secondary-fixed-dim)' }}>Auxiliary</span>
        </div>
      </div>
    </div>
  )
}
