'use client'
import { useRef, useEffect, useCallback } from 'react'
import { SortStep, ElementState } from '@/engine/types'

const STATE_COLORS: Record<ElementState, string> = {
  default: 'rgba(243,223,192,0.3)',
  active: '#d6c3a5',
  compare: 'rgba(243,223,192,0.6)',
  pivot: 'rgba(196,92,92,0.5)',
  sorted: 'rgba(213,231,202,0.45)',
  swapping: '#dec39b',
  found: '#d6c3a5',
}

interface SortingCanvasProps {
  step: SortStep
}

export default function SortingCanvas({ step }: SortingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const interpRef = useRef<number[]>([])

  const draw = useCallback(() => {
    const render = () => {
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
      const padding = 30
      const bottomPad = 60 // Space for controls overlay
      const arr = step.array
      const maxVal = Math.max(...arr, 1)
      const barCount = arr.length
      const gap = Math.max(3, Math.min(6, w / barCount / 6))
      const maxBarWidth = 50
      const barW = Math.min(maxBarWidth, (w - padding * 2 - gap * (barCount - 1)) / barCount)

      // Center the bars
      const totalWidth = barCount * barW + (barCount - 1) * gap
      const startX = (w - totalWidth) / 2

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

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < barCount; i++) {
        const val = interpRef.current[i]
        const usableHeight = h - padding - bottomPad
        const barH = (val / maxVal) * usableHeight
        const x = startX + i * (barW + gap)
        const y = h - bottomPad - barH
        const state = step.states[i] || 'default'
        const color = STATE_COLORS[state]

        // Glow for active/found bars
        if (state === 'active' || state === 'found') {
          ctx.shadowBlur = 15
          ctx.shadowColor = 'rgba(214, 195, 165, 0.4)'
        } else {
          ctx.shadowBlur = 0
        }

        // Active bar gets top border effect
        if (state === 'active') {
          ctx.fillStyle = color
          ctx.beginPath()
          const radius = Math.min(3, barW / 4)
          ctx.roundRect(x, y, barW, barH, [radius, radius, 0, 0])
          ctx.fill()
          // Top border highlight
          ctx.strokeStyle = 'rgba(244, 224, 193, 0.6)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + barW, y)
          ctx.stroke()
        } else {
          ctx.fillStyle = color
          ctx.beginPath()
          const radius = Math.min(2, barW / 4)
          ctx.roundRect(x, y, barW, barH, [radius, radius, 0, 0])
          ctx.fill()
        }

        ctx.shadowBlur = 0
      }

      if (needsAnim) {
        animRef.current = requestAnimationFrame(render)
      }
    }
    render()
  }, [step])

  useEffect(() => {
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(() => draw())
    observer.observe(container)
    return () => observer.disconnect()
  }, [draw])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  )
}
