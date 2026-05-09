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

  const fileExt: Record<Language, string> = {
    python: '.py',
    javascript: '.js',
    java: '.java',
    cpp: '.cpp',
  }

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
    <div className="flex flex-col h-full p-6" style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: '14px' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="label-caps" style={{ color: 'var(--primary)', letterSpacing: '0.15em' }}>
            algorithm{fileExt[language]}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            className="text-xs rounded px-2 py-1 border-none outline-none cursor-pointer"
            style={{
              background: 'var(--surface-container-high)',
              color: 'var(--on-surface)',
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {Object.entries(languageLabels).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <button
            onClick={handleCopy}
            className="transition-colors cursor-pointer"
            style={{ color: copied ? 'var(--primary)' : 'var(--on-surface-variant)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              {copied ? 'check' : 'open_in_full'}
            </span>
          </button>
        </div>
      </div>

      {/* Code */}
      <div ref={codeRef} className="flex-1 overflow-auto leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>
        {lines.map((line, i) => {
          const lineNum = i + 1
          const isHighlighted = highlightLines.includes(lineNum)
          return (
            <div
              key={i}
              data-line={lineNum}
              className="flex transition-colors duration-200"
              style={{
                background: isHighlighted ? 'rgba(89, 70, 40, 0.2)' : 'transparent',
                borderLeft: isHighlighted ? '2px solid var(--primary)' : '2px solid transparent',
                marginLeft: isHighlighted ? '-24px' : '0',
                paddingLeft: isHighlighted ? '24px' : '0',
                paddingTop: isHighlighted ? '4px' : '0',
                paddingBottom: isHighlighted ? '4px' : '0',
              }}
            >
              <span
                className="inline-block w-8 text-right mr-4 select-none flex-shrink-0"
                style={{ color: isHighlighted ? 'var(--primary)' : 'var(--outline-variant)' }}
              >
                {lineNum}
              </span>
              <code style={{ color: isHighlighted ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>
                {line || ' '}
              </code>
            </div>
          )
        })}
      </div>
    </div>
  )
}
