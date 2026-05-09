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
        case 'Space': e.preventDefault(); status === 'playing' ? pause() : play(); break
        case 'ArrowRight': e.preventDefault(); stepForward(); break
        case 'ArrowLeft': e.preventDefault(); stepBack(); break
        case 'Home': e.preventDefault(); reset(); break
        case 'End': e.preventDefault(); jumpToStep(totalSteps - 1); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status, totalSteps, play, pause, stepForward, stepBack, reset, jumpToStep])

  const speedIdx = SPEED_PRESETS.indexOf(speed as typeof SPEED_PRESETS[number])
  const speedPct = speedIdx >= 0 ? ((speedIdx + 1) / SPEED_PRESETS.length) * 100 : 50

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '8px 20px',
        borderRadius: '9999px',
        background: 'rgba(26,28,32,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(243,223,192,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Play */}
      <button
        onClick={() => status === 'playing' ? pause() : play()}
        title="Play/Pause (Space)"
        style={{
          width: '34px', height: '34px',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#f3dfc0', color: '#3a2f1a',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'transform 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>
          {status === 'playing' ? 'pause' : 'play_arrow'}
        </span>
      </button>

      {/* Skip */}
      <button
        onClick={stepForward}
        title="Next Step (→)"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#988f85', display: 'flex', padding: 0 }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>skip_next</span>
      </button>

      {/* Divider */}
      <div style={{ width: '1px', height: '20px', background: 'rgba(76,70,61,0.4)' }} />

      {/* Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#988f85' }}>
          SPEED
        </span>
        <div
          style={{ width: '80px', height: '3px', borderRadius: '2px', background: '#282a2e', position: 'relative', cursor: 'pointer' }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = (e.clientX - rect.left) / rect.width
            const idx = Math.round(pct * (SPEED_PRESETS.length - 1))
            setSpeed(SPEED_PRESETS[Math.max(0, Math.min(idx, SPEED_PRESETS.length - 1))])
          }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: '2px', width: `${speedPct}%`, background: '#d7c4a6' }} />
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: `${speedPct}%`, marginLeft: '-5px', width: '10px', height: '10px', borderRadius: '50%', background: '#f3dfc0', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
        </div>
      </div>

      {/* Step counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#988f85' }}>
          STEP
        </span>
        <span style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: '11px', color: '#cfc5b9' }}>
          {currentStepIndex + 1}/{totalSteps}
        </span>
      </div>
    </div>
  )
}
