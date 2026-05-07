'use client'
import { useState, useEffect, useMemo } from 'react'
import { REGISTRY } from '@/engine/registry'
import { AlgoMeta, Step, SortStep } from '@/engine/types'
import SortingCanvas from '@/components/canvas/SortingCanvas'

export default function ComparePage() {
  const sortingAlgos = useMemo(() => Object.values(REGISTRY).filter(a => a.category === 'sorting'), [])
  const [leftAlgoId, setLeftAlgoId] = useState(sortingAlgos[0]?.id || '')
  const [rightAlgoId, setRightAlgoId] = useState(sortingAlgos[1]?.id || '')
  const [leftSteps, setLeftSteps] = useState<Step[]>([])
  const [rightSteps, setRightSteps] = useState<Step[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const leftAlgo: AlgoMeta | undefined = REGISTRY[leftAlgoId]
  const rightAlgo: AlgoMeta | undefined = REGISTRY[rightAlgoId]

  // Generate steps for both
  useEffect(() => {
    if (leftAlgo) setLeftSteps(leftAlgo.generate(leftAlgo.defaultInput))
    if (rightAlgo) setRightSteps(rightAlgo.generate(rightAlgo.defaultInput))
    setStepIndex(0)
  }, [leftAlgo, rightAlgo])

  // Playback
  useEffect(() => {
    if (!playing) return
    const maxSteps = Math.max(leftSteps.length, rightSteps.length)
    if (stepIndex >= maxSteps - 1) { setPlaying(false); return }
    const timer = setTimeout(() => setStepIndex(i => i + 1), 500)
    return () => clearTimeout(timer)
  }, [playing, stepIndex, leftSteps.length, rightSteps.length])

  const leftStep = leftSteps[Math.min(stepIndex, leftSteps.length - 1)] as SortStep | undefined
  const rightStep = rightSteps[Math.min(stepIndex, rightSteps.length - 1)] as SortStep | undefined

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          Compare <span style={{ color: 'var(--accent)' }}>Algorithms</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left */}
          <div>
            <select
              value={leftAlgoId}
              onChange={e => setLeftAlgoId(e.target.value)}
              className="w-full mb-4 px-4 py-2.5 rounded-lg text-sm font-mono border outline-none"
              style={{ background: 'var(--surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
            >
              {sortingAlgos.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', minHeight: 300 }}>
              {leftStep && <SortingCanvas step={leftStep} />}
            </div>
            {leftStep && (
              <div className="mt-3 flex gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <span>Comparisons: <span style={{ color: 'var(--accent)' }}>{leftStep.comparisons}</span></span>
                <span>Swaps: <span style={{ color: 'var(--accent-purple)' }}>{leftStep.swaps}</span></span>
              </div>
            )}
          </div>

          {/* Right */}
          <div>
            <select
              value={rightAlgoId}
              onChange={e => setRightAlgoId(e.target.value)}
              className="w-full mb-4 px-4 py-2.5 rounded-lg text-sm font-mono border outline-none"
              style={{ background: 'var(--surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
            >
              {sortingAlgos.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', minHeight: 300 }}>
              {rightStep && <SortingCanvas step={rightStep} />}
            </div>
            {rightStep && (
              <div className="mt-3 flex gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <span>Comparisons: <span style={{ color: 'var(--accent)' }}>{rightStep.comparisons}</span></span>
                <span>Swaps: <span style={{ color: 'var(--accent-purple)' }}>{rightStep.swaps}</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setStepIndex(0)}
            className="px-4 py-2 rounded-lg text-sm"
            style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
          >
            ⏮ Reset
          </button>
          <button
            onClick={() => setStepIndex(i => Math.max(0, i - 1))}
            className="px-4 py-2 rounded-lg text-sm"
            style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
          >
            ⏪ Prev
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="px-6 py-2 rounded-lg text-sm font-bold"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={() => setStepIndex(i => i + 1)}
            className="px-4 py-2 rounded-lg text-sm"
            style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
          >
            ⏩ Next
          </button>
        </div>
      </div>
    </div>
  )
}
