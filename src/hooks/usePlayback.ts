'use client'
import { useEffect, useRef } from 'react'
import { useVisualizerStore } from '@/store/visualizerStore'

const SPEED_TO_MS: Record<number, number> = {
  0.25: 2000,
  0.5: 1200,
  1: 700,
  2: 350,
  4: 150,
}

export function usePlayback() {
  const status = useVisualizerStore(s => s.status)
  const speed = useVisualizerStore(s => s.speed)
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex)
  const advanceStep = useVisualizerStore(s => s.advanceStep)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (status === 'playing') {
      const delay = SPEED_TO_MS[speed] ?? 700
      timerRef.current = setTimeout(() => {
        advanceStep()
      }, delay)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [status, speed, currentStepIndex, advanceStep])
}
