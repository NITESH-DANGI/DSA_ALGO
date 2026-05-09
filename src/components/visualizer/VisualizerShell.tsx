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
    <div className="flex h-[calc(100vh-80px)]" style={{ marginTop: '80px' }}>
      {/* Left Sidebar */}
      <Sidebar activeCategory={algo.category} />

      {/* Center: Visualizer Stage */}
      <section className="flex-1 flex flex-col gap-6 p-6 lg:p-8 overflow-hidden">
        {/* Input Editor - compact */}
        <InputEditor algo={algo} onSubmit={handleInputSubmit} />

        {/* Canvas area */}
        <div
          className="flex-1 glass-panel rounded-xl relative overflow-hidden flex items-end justify-center visualizer-grid"
          style={{ minHeight: '280px' }}
        >
          {/* Atmospheric overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(214,195,165,0.05) 0%, transparent 70%)' }} />

          {/* Canvas */}
          <div className="relative z-10 w-full h-full">
            {currentStep?.type === 'sort' && (
              <SortingCanvas step={currentStep as SortStep} />
            )}
            {currentStep?.type === 'graph' && (
              <GraphCanvas step={currentStep as GraphStep} graphData={graphData} />
            )}
            {currentStep?.type === 'tree' && (
              <TreeCanvas step={currentStep as TreeStep} />
            )}
            {!currentStep && (
              <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--on-surface-variant)' }}>
                <p className="text-sm" style={{ fontFamily: 'var(--font-space-mono), monospace' }}>Loading…</p>
              </div>
            )}
          </div>

          {/* Controls overlay at bottom */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <ControlBar />
          </div>
        </div>

        {/* Code Editor */}
        <div className="glass-panel rounded-xl overflow-hidden" style={{ height: '30%', minHeight: '180px' }}>
          <CodePanel
            code={algo.code[language]}
            language={language}
            highlightLines={currentStep?.highlightLines || []}
          />
        </div>
      </section>

      {/* Right: Analytics Panel */}
      <aside className="hidden xl:flex flex-col w-80 gap-6 p-6 overflow-auto">
        <ComplexityCard algo={algo} />

        {/* Performance Profile */}
        <div className="glass-panel rounded-xl p-6 flex-1 flex flex-col">
          <h3 className="label-caps pb-2 mb-4" style={{ color: 'var(--primary)', borderBottom: '1px solid rgba(76, 70, 61, 0.3)' }}>
            PERFORMANCE PROFILE
          </h3>
          <div className="flex-1 relative flex items-end justify-between pt-10">
            <svg className="absolute inset-0 w-full h-full opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,90 Q20,80 40,60 T100,20" fill="none" stroke="var(--tertiary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M0,95 Q30,90 60,70 T100,40" fill="none" stroke="var(--secondary)" strokeDasharray="4" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
            </svg>
            <div className="absolute inset-0" style={{ borderLeft: '1px solid rgba(76,70,61,0.3)', borderBottom: '1px solid rgba(76,70,61,0.3)' }} />
          </div>
          <div className="flex justify-between mt-2" style={{ color: 'var(--outline)', fontSize: '11px' }}>
            <span>Elements (n)</span>
            <span>Time (ms)</span>
          </div>
        </div>

        <StatePanel step={currentStep} />
      </aside>
    </div>
  )
}
