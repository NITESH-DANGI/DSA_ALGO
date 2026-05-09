'use client'
import { SortStep, GraphStep, TreeStep, Step } from '@/engine/types'

interface StatePanelProps {
  step: Step | null
}

export default function StatePanel({ step }: StatePanelProps) {
  if (!step) return null

  const entries: { key: string; value: string }[] = []

  if (step.type === 'sort') {
    const s = step as SortStep
    const activeIndices = Object.entries(s.states)
      .filter(([, v]) => v === 'active')
      .map(([k]) => Number(k))
    const compareIndices = Object.entries(s.states)
      .filter(([, v]) => v === 'compare')
      .map(([k]) => Number(k))

    if (activeIndices.length > 0) entries.push({ key: 'active', value: `[${activeIndices.join(', ')}]` })
    if (compareIndices.length > 0) entries.push({ key: 'compare', value: `[${compareIndices.join(', ')}]` })
    entries.push({ key: 'comparisons', value: String(s.comparisons) })
    entries.push({ key: 'swaps', value: String(s.swaps) })
  }

  if (step.type === 'graph') {
    const g = step as GraphStep
    if (g.activeNode) entries.push({ key: 'current', value: g.activeNode })
    if (g.frontier.length > 0) entries.push({ key: 'frontier', value: `[${g.frontier.join(', ')}]` })
    entries.push({ key: 'visited', value: String(g.visitedNodes.length) })
  }

  if (step.type === 'tree') {
    const t = step as TreeStep
    if (t.activeNode) entries.push({ key: 'node', value: t.activeNode })
    if (t.path.length > 0) entries.push({ key: 'path', value: `[${t.path.join(' → ')}]` })
    entries.push({ key: 'visited', value: String(t.visitedNodes.length) })
  }

  if (entries.length === 0) return null

  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="label-caps pb-2 mb-4" style={{ color: 'var(--primary)', borderBottom: '1px solid rgba(76, 70, 61, 0.3)', letterSpacing: '0.15em' }}>
        STATE
      </h3>
      <div className="flex flex-col gap-3 text-sm" style={{ fontFamily: 'var(--font-space-mono), monospace' }}>
        {entries.map(({ key, value }) => (
          <div key={key} className="flex justify-between">
            <span style={{ color: 'var(--on-surface-variant)' }}>{key}</span>
            <span style={{ color: 'var(--primary-fixed-dim)' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
