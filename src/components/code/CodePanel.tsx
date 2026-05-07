'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useVisualizerStore, Language } from '@/store/visualizerStore'

interface CodePanelProps {
  code: string
  language: Language
  highlightLines: number[]
}

export default function CodePanel({ code, language, highlightLines }: CodePanelProps) {
  const setLanguage = useVisualizerStore(s => s.setLanguage)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  const lines = useMemo(() => code.split('\n'), [code])

  const languageLabels: Record<Language, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    java: 'Java',
    cpp: 'C++',
  }

  // Auto scroll to highlighted line
  useEffect(() => {
    if (codeRef.current && highlightLines.length > 0) {
      const lineEl = codeRef.current.querySelector(`[data-line="${highlightLines[0]}"]`)
      if (lineEl) {
        lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [highlightLines])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full rounded-xl border overflow-hidden" style={{ background: 'var(--code-bg)', borderColor: 'var(--border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            className="text-xs font-mono rounded px-2 py-1 border-none outline-none cursor-pointer"
            style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
          >
            {Object.entries(languageLabels).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <button
            onClick={handleCopy}
            className="text-xs font-mono px-2 py-1 rounded transition-colors"
            style={{ color: copied ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            {copied ? '✓ Copied' : '⎘ Copy'}
          </button>
        </div>
      </div>

      {/* Code */}
      <div ref={codeRef} className="flex-1 overflow-auto p-4">
        <pre className="text-sm leading-6">
          {lines.map((line, i) => {
            const lineNum = i + 1
            const isHighlighted = highlightLines.includes(lineNum)
            return (
              <div
                key={i}
                data-line={lineNum}
                className="flex transition-colors duration-200"
                style={{
                  background: isHighlighted ? 'rgba(0,255,180,0.12)' : 'transparent',
                  borderLeft: isHighlighted ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                <span
                  className="inline-block w-8 text-right mr-4 select-none flex-shrink-0"
                  style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Space Mono, monospace' }}
                >
                  {lineNum}
                </span>
                <code style={{ color: 'var(--text)', fontFamily: 'Space Mono, monospace' }}>
                  {line || ' '}
                </code>
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
