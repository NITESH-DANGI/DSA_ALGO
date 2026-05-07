'use client'
import { useState } from 'react'
import { AlgoMeta } from '@/engine/types'
import { randomArray, randomTreeValues } from '@/lib/utils'

interface InputEditorProps {
  algo: AlgoMeta
  onSubmit: (input: string) => void
}

export default function InputEditor({ algo, onSubmit }: InputEditorProps) {
  const [input, setInput] = useState(algo.defaultInput)
  const [error, setError] = useState<string | null>(null)

  const validate = (val: string): boolean => {
    try {
      const parsed = JSON.parse(val)
      if (algo.category === 'sorting') {
        if (!Array.isArray(parsed) || !parsed.every((n: unknown) => typeof n === 'number')) {
          setError('Must be a JSON array of numbers')
          return false
        }
        if (parsed.length > 100) { setError('Max 100 elements'); return false }
      }
      setError(null)
      return true
    } catch {
      setError('Invalid JSON')
      return false
    }
  }

  const handleSubmit = () => {
    if (validate(input)) onSubmit(input)
  }

  const handleRandom = () => {
    let val: string
    if (algo.category === 'sorting') {
      val = JSON.stringify(randomArray(10))
    } else if (algo.category === 'tree') {
      val = JSON.stringify(randomTreeValues(7))
    } else if (algo.category === 'searching') {
      const arr = randomArray(8).sort((a, b) => a - b)
      val = JSON.stringify({ array: arr, target: arr[Math.floor(Math.random() * arr.length)] })
    } else {
      val = algo.defaultInput
    }
    setInput(val)
    setError(null)
    if (validate(val)) onSubmit(val)
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Custom Input
        </h3>
        <button
          onClick={handleRandom}
          className="text-xs font-mono px-3 py-1 rounded transition-all hover:scale-105"
          style={{ background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          🎲 Random
        </button>
      </div>

      <textarea
        value={input}
        onChange={e => { setInput(e.target.value); setError(null) }}
        className="w-full rounded-lg p-3 text-sm font-mono resize-none border outline-none"
        style={{
          background: 'var(--code-bg)',
          color: 'var(--text)',
          borderColor: error ? 'var(--accent-red)' : 'var(--border)',
          minHeight: '80px',
        }}
        spellCheck={false}
      />

      {error && (
        <p className="text-xs mt-1" style={{ color: 'var(--accent-red)' }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-3 w-full py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        Generate Steps →
      </button>
    </div>
  )
}
