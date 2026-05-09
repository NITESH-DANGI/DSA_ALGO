'use client'
import { useEffect } from 'react'
import { useVisualizerStore } from '@/store/visualizerStore'
import { SPEED_PRESETS } from '@/lib/constants'

export default function ControlBar() {
  const status = useVisualizerStore(s => s.status)
  const speed = useVisualizerStore(s => s.speed)
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex)
  const steps = useVisualizerStore(s => s.steps)
  const play = useVisualizerStore(s => s.play)
  const pause = useVisualizerStore(s => s.pause)
  const stepForward = useVisualizerStore(s => s.stepForward)
  const stepBack = useVisualizerStore(s => s.stepBack)
  const reset = useVisualizerStore(s => s.reset)
  const jumpToStep = useVisualizerStore(s => s.jumpToStep)
  const setSpeed = useVisualizerStore(s => s.setSpeed)

  const totalSteps = steps.length

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          if (status === 'playing') { pause() } else { play() }
          break
        case 'ArrowRight': e.preventDefault(); stepForward(); break
        case 'ArrowLeft': e.preventDefault(); stepBack(); break
        case 'Home': e.preventDefault(); reset(); break
        case 'End': e.preventDefault(); jumpToStep(totalSteps - 1); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status, totalSteps, play, pause, stepForward, stepBack, reset, jumpToStep])

  // Speed as percentage for slider visual
  const speedIdx = SPEED_PRESETS.indexOf(speed as typeof SPEED_PRESETS[number])
  const speedPct = speedIdx >= 0 ? ((speedIdx + 1) / SPEED_PRESETS.length) * 100 : 50

  return (
    <div
      className="glass-panel rounded-full px-6 py-3 flex items-center gap-6 tactile-shadow"
    >
      {/* Play button */}
      <button
        onClick={() => status === 'playing' ? pause() : play()}
        className="w-10 h-10 rounded-full flex items-center justify-center tactile-shadow hover:scale-105 transition-transform"
        style={{ background: 'var(--primary)', color: 'var(--on-primary)' }}
        title="Play/Pause (Space)"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 22 }}>
          {status === 'playing' ? 'pause' : 'play_arrow'}
        </span>
      </button>

      {/* Step forward */}
      <button
        onClick={stepForward}
        className="transition-colors hover:opacity-80"
        style={{ color: 'var(--on-surface-variant)' }}
        title="Next Step (→)"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>skip_next</span>
      </button>

      {/* Divider */}
      <div className="h-6 w-px" style={{ background: 'rgba(76,70,61,0.5)' }} />

      {/* Speed slider */}
      <div className="flex items-center gap-3">
        <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>SPEED</span>
        <div
          className="w-24 h-1 rounded-full overflow-hidden relative cursor-pointer"
          style={{ background: 'var(--surface-container-high)' }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = (e.clientX - rect.left) / rect.width
            const idx = Math.round(pct * (SPEED_PRESETS.length - 1))
            setSpeed(SPEED_PRESETS[Math.max(0, Math.min(idx, SPEED_PRESETS.length - 1))])
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 rounded-full" style={{ width: `${speedPct}%`, background: 'var(--primary)' }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-sm -ml-1.5"
            style={{ left: `${speedPct}%`, background: 'var(--primary-fixed)' }}
          />
        </div>
      </div>

      {/* Size (step counter) */}
      <div className="flex items-center gap-3">
        <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>STEP</span>
        <span className="text-xs" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-space-mono), monospace' }}>
          {currentStepIndex + 1}/{totalSteps}
        </span>
      </div>
    </div>
  )
}
