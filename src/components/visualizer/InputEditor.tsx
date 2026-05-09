'use client'
import { useState, useRef, KeyboardEvent } from 'react'
import { AlgoMeta } from '@/engine/types'
import { randomArray, randomTreeValues, randomGraph } from '@/lib/utils'

interface InputEditorProps {
  algo: AlgoMeta
  onSubmit: (input: string) => void
}

export default function InputEditor({ algo, onSubmit }: InputEditorProps) {
  const category = algo.category

  if (category === 'sorting' || category === 'tree') {
    return <NumberListInput algo={algo} onSubmit={onSubmit} />
  }
  if (category === 'searching') {
    return <SearchInput algo={algo} onSubmit={onSubmit} />
  }
  if (category === 'graph') {
    return <GraphInput algo={algo} onSubmit={onSubmit} />
  }

  return <FallbackInput algo={algo} onSubmit={onSubmit} />
}

/* ─────────────────────────────────────────────
   SORTING / TREE — Comma-separated number chips
   ───────────────────────────────────────────── */
function NumberListInput({ algo, onSubmit }: InputEditorProps) {
  const defaultNums = parseDefaultNumbers(algo)
  const [numbers, setNumbers] = useState<number[]>(defaultNums)
  const [inputVal, setInputVal] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    if (combined.length > 30) { setError('Max 30 numbers allowed'); return }
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

  const handleSubmit = () => {
    if (numbers.length < 2) { setError('Add at least 2 numbers'); return }
    setError(null)
    onSubmit(JSON.stringify(numbers))
  }

  const handleRandom = () => {
    const arr = algo.category === 'tree' ? randomTreeValues(7) : randomArray(10)
    setNumbers(arr)
    setError(null)
    onSubmit(JSON.stringify(arr))
  }

  const handleClear = () => {
    setNumbers([])
    setInputVal('')
    setError(null)
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 16 }}>📊</span>
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Enter Your Numbers
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
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

      {/* Number chips + input */}
      <div
        className="flex flex-wrap items-center gap-2 rounded-lg p-3 cursor-text"
        style={{
          background: 'var(--code-bg)',
          border: `1px solid ${error ? 'var(--accent-red)' : 'var(--border)'}`,
          minHeight: 52,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {numbers.map((num, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-mono font-bold transition-all chip-pop"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
            }}
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

      {/* Help text */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs" style={{ color: error ? 'var(--accent-red)' : 'var(--text-muted)' }}>
          {error || `${numbers.length}/30 numbers · Press Enter or comma to add`}
        </p>
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          {numbers.length > 0 && `[${numbers.join(', ')}]`}
        </span>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={numbers.length < 2}
        className="mt-3 w-full py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        ▶ Visualize with {numbers.length} Number{numbers.length !== 1 ? 's' : ''} →
      </button>


    </div>
  )
}

/* ─────────────────────────────────────────────
   SEARCHING — Array + Target
   ───────────────────────────────────────────── */
function SearchInput({ algo, onSubmit }: InputEditorProps) {
  const defaults = parseSearchDefaults(algo)
  const [numbers, setNumbers] = useState<number[]>(defaults.array)
  const [target, setTarget] = useState<string>(String(defaults.target))
  const [inputVal, setInputVal] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addNumbers = (raw: string) => {
    const parts = raw.split(/[\s,]+/).filter(Boolean)
    const valid: number[] = []
    for (const p of parts) {
      const n = Number(p)
      if (isNaN(n)) { setError(`"${p}" is not valid`); return }
      valid.push(Math.round(n))
    }
    if (valid.length === 0) return
    const combined = [...numbers, ...valid]
    if (combined.length > 30) { setError('Max 30 numbers'); return }
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
  }

  const handleSubmit = () => {
    if (numbers.length < 2) { setError('Add at least 2 numbers'); return }
    const t = Number(target)
    if (isNaN(t)) { setError('Target must be a number'); return }
    setError(null)
    const sorted = [...numbers].sort((a, b) => a - b)
    onSubmit(JSON.stringify({ array: sorted, target: t }))
  }

  const handleRandom = () => {
    const arr = randomArray(8).sort((a, b) => a - b)
    const t = arr[Math.floor(Math.random() * arr.length)]
    setNumbers(arr)
    setTarget(String(t))
    setError(null)
    onSubmit(JSON.stringify({ array: arr, target: t }))
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 16 }}>🔍</span>
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Search Input
          </h3>
        </div>
        <button
          onClick={handleRandom}
          className="text-xs font-mono px-3 py-1 rounded transition-all hover:scale-105"
          style={{ background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          🎲 Random
        </button>
      </div>

      {/* Array input */}
      <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>Array values</label>
      <div
        className="flex flex-wrap items-center gap-2 rounded-lg p-3 cursor-text mb-3"
        style={{
          background: 'var(--code-bg)',
          border: `1px solid var(--border)`,
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
          placeholder={numbers.length === 0 ? 'Type numbers…' : 'Add…'}
          className="flex-1 min-w-[80px] bg-transparent outline-none text-sm font-mono"
          style={{ color: 'var(--text)' }}
        />
      </div>

      {/* Target input */}
      <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>Target value to find</label>
      <input
        value={target}
        onChange={e => { setTarget(e.target.value); setError(null) }}
        placeholder="Enter target number…"
        className="w-full rounded-lg p-3 text-sm font-mono border outline-none mb-1"
        style={{
          background: 'var(--code-bg)',
          color: 'var(--accent)',
          borderColor: 'var(--border)',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      />

      {error && <p className="text-xs mt-1" style={{ color: 'var(--accent-red)' }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={numbers.length < 2}
        className="mt-3 w-full py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        🔎 Search for {target || '?'} →
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   GRAPH — Node/Edge Builder
   ───────────────────────────────────────────── */
function GraphInput({ algo, onSubmit }: InputEditorProps) {
  const defaults = parseGraphDefaults(algo)
  const [graph, setGraph] = useState<Record<string, string[]>>(defaults.graph)
  const [startNode, setStartNode] = useState<string>(defaults.start)
  const [newNode, setNewNode] = useState('')
  const [edgeFrom, setEdgeFrom] = useState('')
  const [edgeTo, setEdgeTo] = useState('')
  const [error, setError] = useState<string | null>(null)

  const nodes = Object.keys(graph)

  const addNode = () => {
    const name = newNode.trim().toUpperCase()
    if (!name) return
    if (name.length > 3) { setError('Node name max 3 chars'); return }
    if (graph[name]) { setError(`Node "${name}" already exists`); return }
    if (nodes.length >= 12) { setError('Max 12 nodes'); return }
    setGraph({ ...graph, [name]: [] })
    setNewNode('')
    setError(null)
    if (nodes.length === 0) setStartNode(name)
  }

  const removeNode = (name: string) => {
    const next = { ...graph }
    delete next[name]
    // Remove edges referencing this node
    for (const key of Object.keys(next)) {
      next[key] = next[key].filter(n => n !== name)
    }
    setGraph(next)
    if (startNode === name) setStartNode(Object.keys(next)[0] || '')
  }

  const addEdge = () => {
    if (!edgeFrom || !edgeTo) { setError('Select both nodes for edge'); return }
    if (edgeFrom === edgeTo) { setError('Cannot connect node to itself'); return }
    if (graph[edgeFrom]?.includes(edgeTo)) { setError('Edge already exists'); return }
    const next = { ...graph }
    next[edgeFrom] = [...(next[edgeFrom] || []), edgeTo]
    next[edgeTo] = [...(next[edgeTo] || []), edgeFrom]
    setGraph(next)
    setError(null)
  }

  const handleSubmit = () => {
    if (nodes.length < 2) { setError('Need at least 2 nodes'); return }
    setError(null)
    onSubmit(JSON.stringify({ graph, start: startNode || nodes[0] }))
  }

  const handleRandom = () => {
    const g = randomGraph()
    setGraph(g)
    setStartNode(Object.keys(g)[0])
    setError(null)
    onSubmit(JSON.stringify({ graph: g, start: Object.keys(g)[0] }))
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 16 }}>🕸️</span>
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Build Your Graph
          </h3>
        </div>
        <button
          onClick={handleRandom}
          className="text-xs font-mono px-3 py-1 rounded transition-all hover:scale-105"
          style={{ background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          🎲 Random
        </button>
      </div>

      {/* Nodes section */}
      <div className="mb-3">
        <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>Nodes</label>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {nodes.map(n => (
            <span
              key={n}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-mono font-bold"
              style={{
                background: n === startNode ? 'var(--accent)' : 'var(--surface-2)',
                color: n === startNode ? 'var(--bg)' : 'var(--text)',
                border: `1px solid ${n === startNode ? 'var(--accent)' : 'var(--border)'}`,
                cursor: 'pointer',
              }}
              onClick={() => setStartNode(n)}
              title="Click to set as start node"
            >
              {n}
              {n === startNode && <span className="text-[10px] ml-0.5">▸</span>}
              <button
                onClick={(e) => { e.stopPropagation(); removeNode(n) }}
                className="ml-0.5 opacity-60 hover:opacity-100 text-xs leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newNode}
            onChange={e => setNewNode(e.target.value.toUpperCase())}
            onKeyDown={e => { if (e.key === 'Enter') addNode() }}
            placeholder="Node name (e.g. A)"
            maxLength={3}
            className="flex-1 rounded-lg px-3 py-2 text-sm font-mono border outline-none"
            style={{ background: 'var(--code-bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
          />
          <button
            onClick={addNode}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{ background: 'var(--surface-2)', color: 'var(--accent)', border: '1px solid var(--border)' }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Edges section */}
      <div className="mb-3">
        <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
          Edges ({Object.values(graph).reduce((a, b) => a + b.length, 0) / 2} connections)
        </label>
        <div className="flex gap-2 items-center">
          <select
            value={edgeFrom}
            onChange={e => setEdgeFrom(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 text-sm font-mono border outline-none"
            style={{ background: 'var(--code-bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
          >
            <option value="">From…</option>
            {nodes.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>↔</span>
          <select
            value={edgeTo}
            onChange={e => setEdgeTo(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 text-sm font-mono border outline-none"
            style={{ background: 'var(--code-bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
          >
            <option value="">To…</option>
            {nodes.filter(n => n !== edgeFrom).map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button
            onClick={addEdge}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{ background: 'var(--surface-2)', color: 'var(--accent)', border: '1px solid var(--border)' }}
          >
            + Edge
          </button>
        </div>

        {/* Edge list preview */}
        {nodes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {nodes.map(n =>
              graph[n].filter(nbr => n < nbr).map(nbr => (
                <span key={`${n}-${nbr}`} className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                  {n}—{nbr}
                </span>
              ))
            )}
          </div>
        )}
      </div>

      {error && <p className="text-xs mt-1 mb-2" style={{ color: 'var(--accent-red)' }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={nodes.length < 2}
        className="w-full py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        ▶ Visualize Graph ({nodes.length} nodes) →
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FALLBACK — Raw JSON
   ───────────────────────────────────────────── */
function FallbackInput({ algo, onSubmit }: InputEditorProps) {
  const [input, setInput] = useState(algo.defaultInput)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    try {
      JSON.parse(input)
      setError(null)
      onSubmit(input)
    } catch {
      setError('Invalid JSON')
    }
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
        Custom Input
      </h3>
      <textarea
        value={input}
        onChange={e => { setInput(e.target.value); setError(null) }}
        className="w-full rounded-lg p-3 text-sm font-mono resize-none border outline-none"
        style={{
          background: 'var(--code-bg)',
          color: 'var(--text)',
          borderColor: error ? 'var(--accent-red)' : 'var(--border)',
          minHeight: 80,
        }}
        spellCheck={false}
      />
      {error && <p className="text-xs mt-1" style={{ color: 'var(--accent-red)' }}>{error}</p>}
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

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */
function parseDefaultNumbers(algo: AlgoMeta): number[] {
  try {
    const parsed = JSON.parse(algo.defaultInput)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch { return [] }
}

function parseSearchDefaults(algo: AlgoMeta): { array: number[]; target: number } {
  try {
    const parsed = JSON.parse(algo.defaultInput)
    if (parsed.array) return { array: parsed.array, target: parsed.target ?? 0 }
    return { array: [], target: 0 }
  } catch { return { array: [], target: 0 } }
}

function parseGraphDefaults(algo: AlgoMeta): { graph: Record<string, string[]>; start: string } {
  try {
    const parsed = JSON.parse(algo.defaultInput)
    if (parsed.graph) return { graph: parsed.graph, start: parsed.start || Object.keys(parsed.graph)[0] }
    return { graph: {}, start: '' }
  } catch { return { graph: {}, start: '' } }
}
