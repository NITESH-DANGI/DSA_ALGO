'use client'
import { useEffect } from 'react'
import { useVisualizerStore } from '@/store/visualizerStore'
import { SPEED_PRESETS } from '@/lib/constants'

export default function ControlBar() {
  const status = useVisualizerStore(s => s.status)
  const speed = useVisualizerStore(s => s.speed)
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex)
  const steps = useVisualizerStore(s => s.steps)
  const audioEnabled = useVisualizerStore(s => s.audioEnabled)
  const play = useVisualizerStore(s => s.play)
  const pause = useVisualizerStore(s => s.pause)
  const stepForward = useVisualizerStore(s => s.stepForward)
  const stepBack = useVisualizerStore(s => s.stepBack)
  const reset = useVisualizerStore(s => s.reset)
  const jumpToStep = useVisualizerStore(s => s.jumpToStep)
  const setSpeed = useVisualizerStore(s => s.setSpeed)
  const setAudioEnabled = useVisualizerStore(s => s.setAudioEnabled)

  const totalSteps = steps.length
  const progress = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.code) {
        case 'Space': e.preventDefault(); status === 'playing' ? pause() : play(); break
        case 'ArrowRight': e.preventDefault(); stepForward(); break
        case 'ArrowLeft': e.preventDefault(); stepBack(); break
        case 'Home': e.preventDefault(); reset(); break
        case 'End': e.preventDefault(); jumpToStep(totalSteps - 1); break
        case 'Digit1': e.preventDefault(); setSpeed(0.25); break
        case 'Digit2': e.preventDefault(); setSpeed(0.5); break
        case 'Digit3': e.preventDefault(); setSpeed(1); break
        case 'Digit4': e.preventDefault(); setSpeed(2); break
        case 'Digit5': e.preventDefault(); setSpeed(4); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status, totalSteps, play, pause, stepForward, stepBack, reset, jumpToStep, setSpeed])

  const btnStyle = {
    background: 'var(--surface-2)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="px-3 py-2 rounded-lg text-sm transition-all hover:scale-105" style={btnStyle} title="First (Home)">⏮</button>
          <button onClick={stepBack} className="px-3 py-2 rounded-lg text-sm transition-all hover:scale-105" style={btnStyle} title="Prev (←)">⏪</button>
          <button
            onClick={() => status === 'playing' ? pause() : play()}
            className="px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{ background: 'var(--accent)', color: 'var(--bg)', border: 'none' }}
            title="Play/Pause (Space)"
          >
            {status === 'playing' ? '⏸ Pause' : '▶ Play'}
          </button>
          <button onClick={stepForward} className="px-3 py-2 rounded-lg text-sm transition-all hover:scale-105" style={btnStyle} title="Next (→)">⏩</button>
          <button onClick={() => jumpToStep(totalSteps - 1)} className="px-3 py-2 rounded-lg text-sm transition-all hover:scale-105" style={btnStyle} title="Last (End)">⏭</button>
        </div>

        <div className="flex items-center gap-3">
          {/* Speed */}
          <div className="flex items-center gap-1">
            {SPEED_PRESETS.map((s, i) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="px-2 py-1 rounded text-xs font-mono transition-all"
                style={{
                  background: speed === s ? 'var(--accent)' : 'var(--surface-2)',
                  color: speed === s ? 'var(--bg)' : 'var(--text-muted)',
                  border: `1px solid ${speed === s ? 'var(--accent)' : 'var(--border)'}`,
                }}
                title={`Speed ${s}x (${i + 1})`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Step counter */}
          <span className="text-xs font-mono px-3 py-1 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            {currentStepIndex + 1} / {totalSteps}
          </span>

          {/* Audio */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="px-2 py-1 rounded text-sm transition-all"
            style={{
              background: audioEnabled ? 'var(--accent)' : 'var(--surface-2)',
              color: audioEnabled ? 'var(--bg)' : 'var(--text-muted)',
              border: `1px solid ${audioEnabled ? 'var(--accent)' : 'var(--border)'}`,
            }}
            title="Toggle audio"
          >
            {audioEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden cursor-pointer"
        style={{ background: 'var(--surface-2)' }}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect()
          const pct = (e.clientX - rect.left) / rect.width
          const idx = Math.round(pct * (totalSteps - 1))
          jumpToStep(Math.max(0, Math.min(idx, totalSteps - 1)))
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{ width: `${progress}%`, background: 'var(--accent)' }}
        />
      </div>
    </div>
  )
}
