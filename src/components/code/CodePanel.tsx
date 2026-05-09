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

  const languageLabels: Record<Language, string> = { python: 'Python', javascript: 'JavaScript', java: 'Java', cpp: 'C++' }
  const fileExt: Record<Language, string> = { python: '.py', javascript: '.js', java: '.java', cpp: '.cpp' }

  useEffect(() => {
    if (codeRef.current && highlightLines.length > 0) {
      const lineEl = codeRef.current.querySelector(`[data-line="${highlightLines[0]}"]`)
      if (lineEl) lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlightLines])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '14px 18px', fontFamily: 'var(--font-space-mono), monospace', fontSize: '12px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d7c4a6',
        }}>
          algorithm{fileExt[language]}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            style={{
              padding: '3px 8px', borderRadius: '6px', border: 'none', outline: 'none', cursor: 'pointer',
              background: '#282a2e', color: '#e2e2e8',
              fontFamily: 'var(--font-space-mono), monospace', fontSize: '11px',
            }}
          >
            {Object.entries(languageLabels).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#d7c4a6' : '#7a756e', display: 'flex', padding: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{copied ? 'check' : 'content_copy'}</span>
          </button>
        </div>
      </div>

      {/* Code lines */}
      <div ref={codeRef} style={{ flex: 1, overflow: 'auto', lineHeight: 1.7, color: '#988f85' }}>
        {lines.map((line, i) => {
          const lineNum = i + 1
          const isHL = highlightLines.includes(lineNum)
          return (
            <div
              key={i}
              data-line={lineNum}
              style={{
                display: 'flex',
                transition: 'background 0.2s',
                background: isHL ? 'rgba(89,70,40,0.2)' : 'transparent',
                borderLeft: isHL ? '2px solid #d7c4a6' : '2px solid transparent',
                marginLeft: isHL ? '-18px' : '0',
                paddingLeft: isHL ? '18px' : '0',
                paddingTop: isHL ? '2px' : '0',
                paddingBottom: isHL ? '2px' : '0',
              }}
            >
              <span style={{ display: 'inline-block', width: '28px', textAlign: 'right', marginRight: '14px', userSelect: 'none', flexShrink: 0, color: isHL ? '#d7c4a6' : '#4c463d', fontSize: '11px' }}>
                {lineNum}
              </span>
              <code style={{ color: isHL ? '#e2e2e8' : '#988f85' }}>{line || ' '}</code>
            </div>
          )
        })}
      </div>
    </div>
  )
}
