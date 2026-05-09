'use client'
import { AlgoMeta } from '@/engine/types'

interface ComplexityCardProps {
  algo: AlgoMeta
}

export default function ComplexityCard({ algo }: ComplexityCardProps) {
  const { complexity } = algo
  return (
    <div
      className="glass-panel"
      style={{ borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <h3 style={{
        fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d7c4a6',
        paddingBottom: '8px', borderBottom: '1px solid rgba(76,70,61,0.3)',
      }}>
        COMPLEXITY ANALYSIS
      </h3>

      <div>
        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#988f85' }}>Time Complexity</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 500, color: '#d5e7ca', letterSpacing: '-0.01em' }}>
            {complexity.time.average}
          </span>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#baccb0' }}>Average</span>
        </div>
      </div>

      <div>
        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#988f85' }}>Space Complexity</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 500, color: '#dec39b', letterSpacing: '-0.01em' }}>
            {complexity.space}
          </span>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#dec39b', opacity: 0.7 }}>Auxiliary</span>
        </div>
      </div>
    </div>
  )
}
