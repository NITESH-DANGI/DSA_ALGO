'use client'
import { useState, useRef, KeyboardEvent } from 'react'
import { AlgoMeta } from '@/engine/types'
import { randomArray, randomTreeValues, randomGraph } from '@/lib/utils'

interface InputEditorProps {
  algo: AlgoMeta
  onSubmit: (input: string) => void
}

/* Shared button style */
const ghostBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '4px',
  padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(243,223,192,0.1)',
  background: 'rgba(243,223,192,0.04)', color: '#988f85', cursor: 'pointer',
  fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.04em', transition: 'all 0.2s',
}

const primaryBtn: React.CSSProperties = {
  width: '100%', padding: '10px 0', borderRadius: '10px',
  border: 'none', cursor: 'pointer',
  background: 'linear-gradient(135deg, rgba(215,196,166,0.15), rgba(243,223,192,0.08))',
  color: '#d7c4a6',
  fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 500,
  boxShadow: 'inset 0 0 0 1px rgba(243,223,192,0.12)',
  transition: 'all 0.2s',
}

const chipStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '4px',
  padding: '3px 10px', borderRadius: '6px',
  background: 'rgba(215,196,166,0.15)', color: '#d7c4a6',
  fontFamily: 'var(--font-space-mono), monospace', fontSize: '12px', fontWeight: 600,
  border: '1px solid rgba(243,223,192,0.1)',
}

const inputFieldStyle: React.CSSProperties = {
  flex: 1, minWidth: '80px', background: 'transparent', outline: 'none',
  border: 'none', color: '#e2e2e8',
  fontFamily: 'var(--font-space-mono), monospace', fontSize: '12px',
}

const fieldBoxStyle: React.CSSProperties = {
  display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '6px',
  borderRadius: '8px', padding: '8px 10px',
  background: 'rgba(12,14,18,0.6)', border: '1px solid rgba(243,223,192,0.08)',
  minHeight: '40px',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#7a756e',
  marginBottom: '4px', display: 'block',
}

export default function InputEditor({ algo, onSubmit }: InputEditorProps) {
  const category = algo.category
  if (category === 'sorting' || category === 'tree') return <NumberListInput algo={algo} onSubmit={onSubmit} />
  if (category === 'searching') return <SearchInput algo={algo} onSubmit={onSubmit} />
  if (category === 'graph') return <GraphInput algo={algo} onSubmit={onSubmit} />
  return <FallbackInput algo={algo} onSubmit={onSubmit} />
}

/* ── SORTING / TREE ── */
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
    setNumbers(combined); setInputVal(''); setError(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); if (inputVal.trim()) addNumbers(inputVal) }
    if (e.key === 'Backspace' && inputVal === '' && numbers.length > 0) setNumbers(numbers.slice(0, -1))
  }

  const removeNumber = (index: number) => { setNumbers(numbers.filter((_, i) => i !== index)); setError(null) }

  const handleSubmit = () => {
    if (numbers.length < 2) { setError('Add at least 2 numbers'); return }
    setError(null); onSubmit(JSON.stringify(numbers))
  }

  const handleRandom = () => {
    const arr = algo.category === 'tree' ? randomTreeValues(7) : randomArray(10)
    setNumbers(arr); setError(null); onSubmit(JSON.stringify(arr))
  }

  return (
    <div style={{ borderRadius: '12px', border: '1px solid rgba(243,223,192,0.08)', background: 'rgba(26,28,32,0.5)', padding: '14px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>bar_chart</span>
          <span style={{ ...labelStyle, marginBottom: 0 }}>Enter Your Numbers</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => { setNumbers([]); setInputVal(''); setError(null) }} style={ghostBtn}>✕ Clear</button>
          <button onClick={handleRandom} style={{ ...ghostBtn, color: '#d7c4a6', borderColor: 'rgba(243,223,192,0.15)' }}>🎲 Random</button>
        </div>
      </div>

      {/* Chips + input */}
      <div style={{ ...fieldBoxStyle, borderColor: error ? '#C45C5C' : 'rgba(243,223,192,0.08)' }} onClick={() => inputRef.current?.focus()}>
        {numbers.map((num, i) => (
          <span key={i} style={chipStyle}>
            {num}
            <button onClick={e => { e.stopPropagation(); removeNumber(i) }} style={{ background: 'none', border: 'none', color: '#988f85', cursor: 'pointer', fontSize: '12px', lineHeight: 1, padding: 0 }}>×</button>
          </span>
        ))}
        <input
          ref={inputRef} value={inputVal}
          onChange={e => { setInputVal(e.target.value); setError(null) }}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (inputVal.trim()) addNumbers(inputVal) }}
          placeholder={numbers.length === 0 ? 'Type numbers separated by commas…' : 'Add more…'}
          style={inputFieldStyle}
        />
      </div>

      {/* Help / error */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '10px', color: error ? '#C45C5C' : '#7a756e', fontFamily: 'Hanken Grotesk, sans-serif' }}>
          {error || `${numbers.length}/30 numbers · Press Enter or comma to add`}
        </span>
        {numbers.length > 0 && (
          <span style={{ fontSize: '10px', color: '#7a756e', fontFamily: 'var(--font-space-mono), monospace' }}>
            [{numbers.join(', ')}]
          </span>
        )}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={numbers.length < 2} style={{ ...primaryBtn, marginTop: '10px', opacity: numbers.length < 2 ? 0.4 : 1 }}>
        ▶ Visualize with {numbers.length} Number{numbers.length !== 1 ? 's' : ''} →
      </button>
    </div>
  )
}

/* ── SEARCHING ── */
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
    for (const p of parts) { const n = Number(p); if (isNaN(n)) { setError(`"${p}" is not valid`); return }; valid.push(Math.round(n)) }
    if (valid.length === 0) return
    const combined = [...numbers, ...valid]
    if (combined.length > 30) { setError('Max 30 numbers'); return }
    setNumbers(combined); setInputVal(''); setError(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); if (inputVal.trim()) addNumbers(inputVal) }
    if (e.key === 'Backspace' && inputVal === '' && numbers.length > 0) setNumbers(numbers.slice(0, -1))
  }

  const removeNumber = (index: number) => setNumbers(numbers.filter((_, i) => i !== index))

  const handleSubmit = () => {
    if (numbers.length < 2) { setError('Add at least 2 numbers'); return }
    const t = Number(target); if (isNaN(t)) { setError('Target must be a number'); return }
    setError(null); const sorted = [...numbers].sort((a, b) => a - b)
    onSubmit(JSON.stringify({ array: sorted, target: t }))
  }

  const handleRandom = () => {
    const arr = randomArray(8).sort((a, b) => a - b)
    const t = arr[Math.floor(Math.random() * arr.length)]
    setNumbers(arr); setTarget(String(t)); setError(null)
    onSubmit(JSON.stringify({ array: arr, target: t }))
  }

  return (
    <div style={{ borderRadius: '12px', border: '1px solid rgba(243,223,192,0.08)', background: 'rgba(26,28,32,0.5)', padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>search</span>
          <span style={{ ...labelStyle, marginBottom: 0 }}>Search Input</span>
        </div>
        <button onClick={handleRandom} style={{ ...ghostBtn, color: '#d7c4a6' }}>🎲 Random</button>
      </div>

      <span style={labelStyle}>Array values</span>
      <div style={{ ...fieldBoxStyle, marginBottom: '10px' }} onClick={() => inputRef.current?.focus()}>
        {numbers.map((num, i) => (
          <span key={i} style={chipStyle}>
            {num}
            <button onClick={e => { e.stopPropagation(); removeNumber(i) }} style={{ background: 'none', border: 'none', color: '#988f85', cursor: 'pointer', fontSize: '12px', padding: 0 }}>×</button>
          </span>
        ))}
        <input ref={inputRef} value={inputVal} onChange={e => { setInputVal(e.target.value); setError(null) }} onKeyDown={handleKeyDown} onBlur={() => { if (inputVal.trim()) addNumbers(inputVal) }} placeholder={numbers.length === 0 ? 'Type numbers…' : 'Add…'} style={inputFieldStyle} />
      </div>

      <span style={labelStyle}>Target value</span>
      <input
        value={target} onChange={e => { setTarget(e.target.value); setError(null) }}
        placeholder="Enter target…"
        style={{ ...inputFieldStyle, width: '100%', padding: '8px 10px', borderRadius: '8px', background: 'rgba(12,14,18,0.6)', border: '1px solid rgba(243,223,192,0.08)', color: '#d7c4a6', fontWeight: 700, fontSize: '14px', flex: 'none' }}
      />

      {error && <p style={{ fontSize: '10px', color: '#C45C5C', marginTop: '6px' }}>{error}</p>}

      <button onClick={handleSubmit} disabled={numbers.length < 2} style={{ ...primaryBtn, marginTop: '10px', opacity: numbers.length < 2 ? 0.4 : 1 }}>
        🔎 Search for {target || '?'} →
      </button>
    </div>
  )
}

/* ── GRAPH ── */
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
    if (graph[name]) { setError(`Node "${name}" exists`); return }
    if (nodes.length >= 12) { setError('Max 12 nodes'); return }
    setGraph({ ...graph, [name]: [] }); setNewNode(''); setError(null)
    if (nodes.length === 0) setStartNode(name)
  }

  const removeNode = (name: string) => {
    const next = { ...graph }; delete next[name]
    for (const key of Object.keys(next)) next[key] = next[key].filter(n => n !== name)
    setGraph(next); if (startNode === name) setStartNode(Object.keys(next)[0] || '')
  }

  const addEdge = () => {
    if (!edgeFrom || !edgeTo) { setError('Select both nodes'); return }
    if (edgeFrom === edgeTo) { setError('Cannot self-connect'); return }
    if (graph[edgeFrom]?.includes(edgeTo)) { setError('Edge exists'); return }
    const next = { ...graph }
    next[edgeFrom] = [...(next[edgeFrom] || []), edgeTo]
    next[edgeTo] = [...(next[edgeTo] || []), edgeFrom]
    setGraph(next); setError(null)
  }

  const handleSubmit = () => {
    if (nodes.length < 2) { setError('Need at least 2 nodes'); return }
    setError(null); onSubmit(JSON.stringify({ graph, start: startNode || nodes[0] }))
  }

  const handleRandom = () => {
    const g = randomGraph(); setGraph(g); setStartNode(Object.keys(g)[0]); setError(null)
    onSubmit(JSON.stringify({ graph: g, start: Object.keys(g)[0] }))
  }

  const selectStyle: React.CSSProperties = {
    flex: 1, padding: '6px 10px', borderRadius: '8px',
    background: 'rgba(12,14,18,0.6)', border: '1px solid rgba(243,223,192,0.08)',
    color: '#e2e2e8', fontFamily: 'var(--font-space-mono), monospace', fontSize: '12px',
    outline: 'none',
  }

  return (
    <div style={{ borderRadius: '12px', border: '1px solid rgba(243,223,192,0.08)', background: 'rgba(26,28,32,0.5)', padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>hub</span>
          <span style={{ ...labelStyle, marginBottom: 0 }}>Build Your Graph</span>
        </div>
        <button onClick={handleRandom} style={{ ...ghostBtn, color: '#d7c4a6' }}>🎲 Random</button>
      </div>

      {/* Nodes */}
      <span style={labelStyle}>Nodes</span>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginBottom: '8px' }}>
        {nodes.map(n => (
          <span key={n} onClick={() => setStartNode(n)} title="Click to set start"
            style={{ ...chipStyle, cursor: 'pointer', background: n === startNode ? 'rgba(215,196,166,0.2)' : 'rgba(215,196,166,0.08)', borderColor: n === startNode ? 'rgba(243,223,192,0.2)' : 'rgba(243,223,192,0.08)' }}>
            {n}{n === startNode && <span style={{ fontSize: '10px', color: '#d7c4a6' }}>▸</span>}
            <button onClick={e => { e.stopPropagation(); removeNode(n) }} style={{ background: 'none', border: 'none', color: '#7a756e', cursor: 'pointer', fontSize: '12px', padding: 0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        <input value={newNode} onChange={e => setNewNode(e.target.value.toUpperCase())} onKeyDown={e => { if (e.key === 'Enter') addNode() }} placeholder="Node (e.g. A)" maxLength={3}
          style={{ ...inputFieldStyle, flex: 1, padding: '6px 10px', borderRadius: '8px', background: 'rgba(12,14,18,0.6)', border: '1px solid rgba(243,223,192,0.08)' }} />
        <button onClick={addNode} style={ghostBtn}>+ Add</button>
      </div>

      {/* Edges */}
      <span style={labelStyle}>Edges ({Object.values(graph).reduce((a, b) => a + b.length, 0) / 2})</span>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>
        <select value={edgeFrom} onChange={e => setEdgeFrom(e.target.value)} style={selectStyle}>
          <option value="">From…</option>
          {nodes.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span style={{ color: '#7a756e', fontSize: '12px' }}>↔</span>
        <select value={edgeTo} onChange={e => setEdgeTo(e.target.value)} style={selectStyle}>
          <option value="">To…</option>
          {nodes.filter(n => n !== edgeFrom).map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={addEdge} style={ghostBtn}>+ Edge</button>
      </div>
      {nodes.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginBottom: '8px' }}>
          {nodes.map(n => graph[n].filter(nbr => n < nbr).map(nbr => (
            <span key={`${n}-${nbr}`} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(30,32,36,0.8)', color: '#7a756e', fontFamily: 'var(--font-space-mono), monospace' }}>
              {n}—{nbr}
            </span>
          )))}
        </div>
      )}

      {error && <p style={{ fontSize: '10px', color: '#C45C5C', marginTop: '4px', marginBottom: '4px' }}>{error}</p>}

      <button onClick={handleSubmit} disabled={nodes.length < 2} style={{ ...primaryBtn, marginTop: '6px', opacity: nodes.length < 2 ? 0.4 : 1 }}>
        ▶ Visualize Graph ({nodes.length} nodes) →
      </button>
    </div>
  )
}

/* ── FALLBACK ── */
function FallbackInput({ algo, onSubmit }: InputEditorProps) {
  const [input, setInput] = useState(algo.defaultInput)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    try { JSON.parse(input); setError(null); onSubmit(input) } catch { setError('Invalid JSON') }
  }

  return (
    <div style={{ borderRadius: '12px', border: '1px solid rgba(243,223,192,0.08)', background: 'rgba(26,28,32,0.5)', padding: '14px 16px' }}>
      <span style={{ ...labelStyle, marginBottom: '8px' }}>Custom Input</span>
      <textarea
        value={input} onChange={e => { setInput(e.target.value); setError(null) }}
        style={{ width: '100%', minHeight: '60px', padding: '8px 10px', borderRadius: '8px', background: 'rgba(12,14,18,0.6)', border: `1px solid ${error ? '#C45C5C' : 'rgba(243,223,192,0.08)'}`, color: '#e2e2e8', fontFamily: 'var(--font-space-mono), monospace', fontSize: '12px', resize: 'none', outline: 'none' }}
        spellCheck={false}
      />
      {error && <p style={{ fontSize: '10px', color: '#C45C5C', marginTop: '4px' }}>{error}</p>}
      <button onClick={handleSubmit} style={{ ...primaryBtn, marginTop: '8px' }}>Generate Steps →</button>
    </div>
  )
}

/* ── Helpers ── */
function parseDefaultNumbers(algo: AlgoMeta): number[] {
  try { const p = JSON.parse(algo.defaultInput); if (Array.isArray(p)) return p; return [] } catch { return [] }
}
function parseSearchDefaults(algo: AlgoMeta): { array: number[]; target: number } {
  try { const p = JSON.parse(algo.defaultInput); if (p.array) return { array: p.array, target: p.target ?? 0 }; return { array: [], target: 0 } } catch { return { array: [], target: 0 } }
}
function parseGraphDefaults(algo: AlgoMeta): { graph: Record<string, string[]>; start: string } {
  try { const p = JSON.parse(algo.defaultInput); if (p.graph) return { graph: p.graph, start: p.start || Object.keys(p.graph)[0] }; return { graph: {}, start: '' } } catch { return { graph: {}, start: '' } }
}
