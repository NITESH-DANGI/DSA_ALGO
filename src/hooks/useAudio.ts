'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useVisualizerStore } from '@/store/visualizerStore'

export function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioEnabled = useVisualizerStore(s => s.audioEnabled)
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex)
  const steps = useVisualizerStore(s => s.steps)

  const playTone = useCallback((frequency: number) => {
    if (!audioEnabled) return
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    const ctx = audioCtxRef.current
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.08)
  }, [audioEnabled])

  useEffect(() => {
    if (!audioEnabled || currentStepIndex < 0 || !steps[currentStepIndex]) return
    const step = steps[currentStepIndex]
    let activeValue = 50
    if (step.type === 'sort') {
      const activeIdx = Object.entries(step.states).find(([, s]) => s === 'active')?.[0]
      if (activeIdx !== undefined) {
        activeValue = step.array[Number(activeIdx)] ?? 50
      }
      const maxVal = Math.max(...step.array, 1)
      const pitch = 200 + (activeValue / maxVal) * 600
      playTone(pitch)
    } else {
      playTone(400)
    }
  }, [currentStepIndex, audioEnabled, steps, playTone])
}
