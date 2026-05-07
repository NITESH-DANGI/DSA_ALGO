'use client'
import { useRef, useEffect, useCallback } from 'react'
import { SortStep, ElementState } from '@/engine/types'
import { COLORS } from '@/lib/constants'

const STATE_COLORS: Record<ElementState, string> = {
  default: COLORS.barDefault,
  active: COLORS.barActive,
  compare: COLORS.barCompare,
  pivot: COLORS.barPivot,
  sorted: COLORS.barSorted,
  swapping: COLORS.barSwapping,
  found: COLORS.barFound,
}

interface SortingCanvasProps {
  step: SortStep
}

export default function SortingCanvas({ step }: SortingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevArrayRef = useRef<number[]>([])
  const animRef = useRef<number>(0)
  const interpRef = useRef<number[]>([])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const padding = 20
    const arr = step.array
    const maxVal = Math.max(...arr, 1)
    const barCount = arr.length
    const gap = Math.max(2, Math.min(4, w / barCount / 8))
    const barW = (w - padding * 2 - gap * (barCount - 1)) / barCount

    // Initialize interpolation
    if (interpRef.current.length !== arr.length) {
      interpRef.current = [...arr]
    }

    // Lerp towards target
    let needsAnim = false
    for (let i = 0; i < arr.length; i++) {
      const diff = arr[i] - interpRef.current[i]
      if (Math.abs(diff) > 0.5) {
        interpRef.current[i] += diff * 0.2
        needsAnim = true
      } else {
        interpRef.current[i] = arr[i]
      }
    }

    // Clear
    ctx.clearRect(0, 0, w, h)

    for (let i = 0; i < barCount; i++) {
      const val = interpRef.current[i]
      const barH = ((val / maxVal) * (h - padding * 2 - 20))
      const x = padding + i * (barW + gap)
      const y = h - padding - barH
      const state = step.states[i] || 'default'
      const color = STATE_COLORS[state]

      // Glow for active bars
      if (state === 'active' || state === 'found') {
        ctx.shadowBlur = 15
        ctx.shadowColor = COLORS.barActive
      } else {
        ctx.shadowBlur = 0
      }

      // Bar
      ctx.fillStyle = color
      ctx.beginPath()
      const radius = Math.min(4, barW / 4)
      ctx.roundRect(x, y, barW, barH, [radius, radius, 0, 0])
      ctx.fill()
      ctx.shadowBlur = 0

      // Value label
      if (barW > 14) {
        ctx.fillStyle = 'var(--text)' 
        ctx.fillStyle = '#e8f0f8'
        ctx.font = `${Math.min(11, barW * 0.6)}px "Space Mono", monospace`
        ctx.textAlign = 'center'
        ctx.fillText(String(Math.round(arr[i])), x + barW / 2, y - 6)
      }
    }

    prevArrayRef.current = [...arr]

    if (needsAnim) {
      animRef.current = requestAnimationFrame(draw)
    }
  }, [step])

  useEffect(() => {
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  // Resize observer
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(() => draw())
    observer.observe(container)
    return () => observer.disconnect()
  }, [draw])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px]" style={{ background: 'var(--bg)' }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  )
}
