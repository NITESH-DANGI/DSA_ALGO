'use client'
import { useEffect, useMemo } from 'react'
import { useVisualizerStore } from '@/store/visualizerStore'
import { usePlayback } from '@/hooks/usePlayback'
import { useAudio } from '@/hooks/useAudio'
import { AlgoMeta, SortStep, GraphStep, TreeStep } from '@/engine/types'
import { DIFFICULTY_COLORS } from '@/lib/constants'
import SortingCanvas from '@/components/canvas/SortingCanvas'
import GraphCanvas from '@/components/canvas/GraphCanvas'
import TreeCanvas from '@/components/canvas/TreeCanvas'
import CodePanel from '@/components/code/CodePanel'
import ControlBar from '@/components/visualizer/ControlBar'
import StepExplainer from '@/components/visualizer/StepExplainer'
import ComplexityCard from '@/components/visualizer/ComplexityCard'
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

  // Auto-load and auto-play on mount
  useEffect(() => {
    const generatedSteps = algo.generate(algo.defaultInput)
    loadAlgo(algo.id, generatedSteps)
    // Auto-play after a short delay to let the UI render first
    const timer = setTimeout(() => play(), 500)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algo])

  const currentStep = currentStepIndex >= 0 && currentStepIndex < steps.length
    ? steps[currentStepIndex]
    : null

  const graphData = useMemo(() => {
    if (algo.category === 'graph') {
      try {
        const parsed = JSON.parse(algo.defaultInput)
        return parsed.graph || {}
      } catch { return {} }
    }
    return {}
  }, [algo])

  const handleInputSubmit = (input: string) => {
    try {
      const newSteps = algo.generate(input)
      loadAlgo(algo.id, newSteps)
      // Auto-play after generating new steps
      setTimeout(() => play(), 300)
      // Update graph data if needed
      if (algo.category === 'graph') {
        try {
          const parsed = JSON.parse(input)
          Object.assign(graphData, parsed.graph || {})
        } catch { /* ignore */ }
      }
    } catch (e) {
      console.error('Failed to generate steps:', e)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>
            {algo.name}
          </h1>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase"
            style={{
              color: DIFFICULTY_COLORS[algo.difficulty],
              background: `${DIFFICULTY_COLORS[algo.difficulty]}15`,
              border: `1px solid ${DIFFICULTY_COLORS[algo.difficulty]}30`,
            }}
          >
            {algo.difficulty}
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-mono" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
            {algo.category}
          </span>
        </div>

        {/* Input Editor */}
        <div className="mb-6">
          <InputEditor algo={algo} onSubmit={handleInputSubmit} />
        </div>

        {/* Main content: 2 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Canvas (60%) */}
          <div className="lg:col-span-3 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', minHeight: '400px' }}>
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
              <div className="w-full h-full min-h-[400px] flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                <p className="font-mono text-sm">Click &quot;Generate Steps&quot; to start</p>
              </div>
            )}
          </div>

          {/* Code Panel (40%) */}
          <div className="lg:col-span-2" style={{ minHeight: '400px' }}>
            <CodePanel
              code={algo.code[language]}
              language={language}
              highlightLines={currentStep?.highlightLines || []}
            />
          </div>
        </div>

        {/* Step Explainer */}
        {currentStep && (
          <div className="mb-4">
            <StepExplainer
              explanation={currentStep.explanation}
              comparisons={currentStep.type === 'sort' ? (currentStep as SortStep).comparisons : undefined}
              swaps={currentStep.type === 'sort' ? (currentStep as SortStep).swaps : undefined}
              frontier={currentStep.type === 'graph' ? (currentStep as GraphStep).frontier : undefined}
              visitedCount={currentStep.type === 'graph' ? (currentStep as GraphStep).visitedNodes.length : undefined}
            />
          </div>
        )}

        {/* Complexity Card */}
        <div className="mb-4">
          <ComplexityCard algo={algo} />
        </div>

        {/* Control Bar - sticky */}
        <div className="sticky bottom-4 z-40">
          <ControlBar />
        </div>
      </div>
    </div>
  )
}
