'use client'
import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react'
import { REGISTRY } from '@/engine/registry'
import { AlgoMeta, SortStep } from '@/engine/types'
import SortingCanvas from '@/components/canvas/SortingCanvas'
import { randomArray } from '@/lib/utils'

export default function ComparePage() {
  const sortingAlgos = useMemo(() => Object.values(REGISTRY).filter(a => a.category === 'sorting'), [])
  const [leftAlgoId, setLeftAlgoId] = useState(sortingAlgos[0]?.id || '')
  const [rightAlgoId, setRightAlgoId] = useState(sortingAlgos[1]?.id || '')
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  // Custom number input
  const [numbers, setNumbers] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [inputVal, setInputVal] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const leftAlgo: AlgoMeta | undefined = REGISTRY[leftAlgoId]
  const rightAlgo: AlgoMeta | undefined = REGISTRY[rightAlgoId]

  const inputStr = JSON.stringify(numbers)

  // Generate steps for both using custom numbers
  const leftSteps = useMemo(() => {
    if (!leftAlgo || numbers.length < 2) return []
    return leftAlgo.generate(inputStr)
  }, [leftAlgo, inputStr, numbers.length])

  const rightSteps = useMemo(() => {
    if (!rightAlgo || numbers.length < 2) return []
    return rightAlgo.generate(inputStr)
  }, [rightAlgo, inputStr, numbers.length])

  useEffect(() => {
    const timer = setTimeout(() => setStepIndex(0), 0)
    return () => clearTimeout(timer)
  }, [leftSteps, rightSteps])

  // Playback
  useEffect(() => {
    if (!playing) return
    const maxSteps = Math.max(leftSteps.length, rightSteps.length)
    if (stepIndex >= maxSteps - 1) {
      const timer = setTimeout(() => setPlaying(false), 0)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setStepIndex(i => i + 1), 500)
    return () => clearTimeout(timer)
  }, [playing, stepIndex, leftSteps.length, rightSteps.length])

  const leftStep = leftSteps[Math.min(stepIndex, leftSteps.length - 1)] as SortStep | undefined
  const rightStep = rightSteps[Math.min(stepIndex, rightSteps.length - 1)] as SortStep | undefined

  // Number input handlers
  const addNumbers = (raw: string) => {
    const parts = raw.split(/[\s,]+/).filter(Boolean)
    const valid: number[] = []
    for (const p of parts) {
      const n = Number(p)
      if (isNaN(n)) { setError(`"${p}" is not a valid number`); return }
      if (n < 0 || n > 999) { setError('Numbers must be 0–999'); return }
      valid.push(Math.round(n))
    }
    if (valid.length === 0) return
    const combined = [...numbers, ...valid]
    if (combined.length > 20) { setError('Max 20 numbers for comparison'); return }
    setNumbers(combined)
    setInputVal('')
    setError(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputVal.trim()) addNumbers(inputVal)
    }
    if (e.key === 'Backspace' && inputVal === '' && numbers.length > 0) {
      setNumbers(numbers.slice(0, -1))
    }
  }

  const removeNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index))
    setError(null)
  }

  const handleRandom = () => {
    const arr = randomArray(8)
    setNumbers(arr)
    setError(null)
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          Compare <span style={{ color: 'var(--accent)' }}>Algorithms</span>
        </h1>

        {/* Custom number input */}
        <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16 }}>📊</span>
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Enter Numbers to Compare
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setNumbers([]); setInputVal(''); setError(null) }}
                className="text-xs font-mono px-3 py-1 rounded transition-all hover:scale-105"
                style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                ✕ Clear
              </button>
              <button
                onClick={handleRandom}
                className="text-xs font-mono px-3 py-1 rounded transition-all hover:scale-105"
                style={{ background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
              >
                🎲 Random
              </button>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-2 rounded-lg p-3 cursor-text"
            style={{
              background: 'var(--code-bg)',
              border: `1px solid ${error ? 'var(--accent-red)' : 'var(--border)'}`,
              minHeight: 48,
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {numbers.map((num, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-mono font-bold"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                {num}
                <button
                  onClick={(e) => { e.stopPropagation(); removeNumber(i) }}
                  className="ml-0.5 opacity-70 hover:opacity-100 text-xs leading-none"
                  style={{ color: 'var(--bg)' }}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              value={inputVal}
              onChange={e => { setInputVal(e.target.value); setError(null) }}
              onKeyDown={handleKeyDown}
              onBlur={() => { if (inputVal.trim()) addNumbers(inputVal) }}
              placeholder={numbers.length === 0 ? 'Type numbers separated by commas…' : 'Add more…'}
              className="flex-1 min-w-[120px] bg-transparent outline-none text-sm font-mono"
              style={{ color: 'var(--text)' }}
            />
          </div>

          <p className="text-xs mt-2" style={{ color: error ? 'var(--accent-red)' : 'var(--text-muted)' }}>
            {error || `${numbers.length}/20 numbers · Both algorithms will use the same input`}
          </p>
        </div>

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
