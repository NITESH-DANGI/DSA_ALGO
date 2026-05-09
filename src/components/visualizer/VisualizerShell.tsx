'use client'
import { useEffect, useState } from 'react'
import { useVisualizerStore } from '@/store/visualizerStore'
import { usePlayback } from '@/hooks/usePlayback'
import { useAudio } from '@/hooks/useAudio'
import { AlgoMeta, SortStep, GraphStep, TreeStep } from '@/engine/types'
import SortingCanvas from '@/components/canvas/SortingCanvas'
import GraphCanvas from '@/components/canvas/GraphCanvas'
import TreeCanvas from '@/components/canvas/TreeCanvas'
import CodePanel from '@/components/code/CodePanel'
import ControlBar from '@/components/visualizer/ControlBar'
import ComplexityCard from '@/components/visualizer/ComplexityCard'
import StatePanel from '@/components/visualizer/StatePanel'
import Sidebar from '@/components/visualizer/Sidebar'
import InputEditor from '@/components/visualizer/InputEditor'

interface VisualizerShellProps {
  algo: AlgoMeta
}

export default function VisualizerShell({ algo }: VisualizerShellProps) {
  const loadAlgo = useVisualizerStore(s => s.loadAlgo)
  const play = useVisualizerStore(s => s.play)
  const steps = useVisualizerStore(s => s.steps)
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex)
  const language = useVisualizerStore(s => s.language)

  usePlayback()
  useAudio()

  const [graphData, setGraphData] = useState<Record<string, string[]>>(() => {
    if (algo.category === 'graph') {
      try {
        const parsed = JSON.parse(algo.defaultInput)
        return parsed.graph || {}
      } catch { return {} }
    }
    return {}
  })

  useEffect(() => {
    const generatedSteps = algo.generate(algo.defaultInput)
    loadAlgo(algo.id, generatedSteps)
    const timer = setTimeout(() => play(), 500)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algo])

  const currentStep = currentStepIndex >= 0 && currentStepIndex < steps.length
    ? steps[currentStepIndex]
    : null

  const handleInputSubmit = (input: string) => {
    try {
      const newSteps = algo.generate(input)
      loadAlgo(algo.id, newSteps)
      setTimeout(() => play(), 300)
      if (algo.category === 'graph') {
        try {
          const parsed = JSON.parse(input)
          setGraphData(parsed.graph || {})
        } catch { /* ignore */ }
      }
    } catch (e) {
      console.error('Failed to generate steps:', e)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 56px)',
        marginTop: '56px',
        overflow: 'hidden',
      }}
    >
      {/* Left Sidebar */}
      <Sidebar activeCategory={algo.category} />

      {/* Center Stage */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px 20px',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Input Editor */}
        <InputEditor algo={algo} onSubmit={handleInputSubmit} />

        {/* Canvas */}
        <div
          className="glass-panel visualizer-grid"
          style={{
            flex: 1,
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(17,19,23,0.6) 0%, transparent 40%)',
            pointerEvents: 'none', zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, rgba(214,195,165,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          {/* Canvas content */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
            {currentStep?.type === 'sort' && <SortingCanvas step={currentStep as SortStep} />}
            {currentStep?.type === 'graph' && <GraphCanvas step={currentStep as GraphStep} graphData={graphData} />}
            {currentStep?.type === 'tree' && <TreeCanvas step={currentStep as TreeStep} />}
            {!currentStep && (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#988f85' }}>
                <p style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: '13px' }}>Loading…</p>
              </div>
            )}
          </div>

          {/* Control bar */}
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <ControlBar />
          </div>
        </div>

        {/* Code Panel */}
        <div
          className="glass-panel"
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            height: '28%',
            minHeight: '160px',
            flexShrink: 0,
          }}
        >
          <CodePanel
            code={algo.code[language]}
            language={language}
            highlightLines={currentStep?.highlightLines || []}
          />
        </div>
      </section>

      {/* Right Analytics */}
      <aside
        style={{
          display: 'none',
          width: '280px',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px 16px 16px 0',
          overflowY: 'auto',
          flexShrink: 0,
        }}
        className="xl:!flex"
      >
        <ComplexityCard algo={algo} />

        {/* Performance Profile */}
        <div className="glass-panel" style={{ borderRadius: '12px', padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '160px' }}>
          <h3 style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d7c4a6',
            paddingBottom: '8px', marginBottom: '12px',
            borderBottom: '1px solid rgba(76,70,61,0.3)',
          }}>
            PERFORMANCE PROFILE
          </h3>
          <div style={{ flex: 1, position: 'relative', minHeight: '80px' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.8 }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,90 Q20,80 40,60 T100,20" fill="none" stroke="#d5e7ca" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M0,95 Q30,90 60,70 T100,40" fill="none" stroke="#dec39b" strokeDasharray="4" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, borderLeft: '1px solid rgba(76,70,61,0.3)', borderBottom: '1px solid rgba(76,70,61,0.3)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: '#988f85', fontSize: '10px', fontFamily: 'Hanken Grotesk, sans-serif' }}>
            <span>Elements (n)</span>
            <span>Time (ms)</span>
          </div>
        </div>

        <StatePanel step={currentStep} />
      </aside>
    </div>
  )
}
