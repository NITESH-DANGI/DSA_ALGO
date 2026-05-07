'use client'
import { useRef, useEffect, useCallback } from 'react'
import { TreeStep, TreeNode } from '@/engine/types'

interface TreeCanvasProps {
  step: TreeStep
}

interface PositionedNode extends TreeNode {
  cx: number
  cy: number
}

export default function TreeCanvas({ step }: TreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
    const nodes = step.nodes
    if (!nodes || nodes.length === 0) return

    // Position nodes in tree layout
    const positioned: PositionedNode[] = []
    const nodeMap = new Map<string, PositionedNode>()

    function layoutNode(nodeId: string, x: number, y: number, spread: number) {
      const node = nodes.find(n => n.id === nodeId)
      if (!node) return
      const pn: PositionedNode = { ...node, cx: x, cy: y }
      positioned.push(pn)
      nodeMap.set(nodeId, pn)
      if (node.left) layoutNode(node.left, x - spread, y + 70, spread * 0.55)
      if (node.right) layoutNode(node.right, x + spread, y + 70, spread * 0.55)
    }

    if (nodes.length > 0) {
      layoutNode(nodes[0].id, w / 2, 50, w / 4.5)
    }

    // Clear
    ctx.clearRect(0, 0, w, h)

    // Draw edges
    for (const node of positioned) {
      if (node.left) {
        const child = nodeMap.get(node.left)
        if (child) {
          ctx.strokeStyle = step.visitedNodes.includes(node.id) && step.visitedNodes.includes(child.id) ? '#00ffb4' : '#2a3a4a'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(node.cx, node.cy)
          ctx.lineTo(child.cx, child.cy)
          ctx.stroke()
        }
      }
      if (node.right) {
        const child = nodeMap.get(node.right)
        if (child) {
          ctx.strokeStyle = step.visitedNodes.includes(node.id) && step.visitedNodes.includes(child.id) ? '#00ffb4' : '#2a3a4a'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(node.cx, node.cy)
          ctx.lineTo(child.cx, child.cy)
          ctx.stroke()
        }
      }
    }

    // Draw nodes
    for (const node of positioned) {
      const isActive = node.id === step.activeNode
      const isVisited = step.visitedNodes.includes(node.id)
      const radius = isActive ? 24 : 20

      // Glow
      if (isActive) {
        ctx.shadowBlur = 20
        ctx.shadowColor = '#00ffb4'
      }

      ctx.fillStyle = isActive ? '#00ffb4' : isVisited ? 'rgba(0,255,180,0.3)' : '#1a2a3a'
      ctx.strokeStyle = isActive ? '#00ffb4' : isVisited ? '#00ffb4' : '#2a3a4a'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(node.cx, node.cy, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.shadowBlur = 0

      // Label
      ctx.fillStyle = isActive ? '#080c10' : '#e8f0f8'
      ctx.font = 'bold 13px "Space Mono", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(node.value), node.cx, node.cy)
    }
  }, [step])

  useEffect(() => { draw() }, [draw])

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
