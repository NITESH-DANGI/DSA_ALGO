'use client'
import { useRef, useEffect } from 'react'
import { GraphStep } from '@/engine/types'
import * as d3 from 'd3'

interface GraphCanvasProps {
  step: GraphStep
  graphData: Record<string, string[]>
}

interface GNode extends d3.SimulationNodeDatum {
  id: string
}
interface GLink extends d3.SimulationLinkDatum<GNode> {
  source: string | GNode
  target: string | GNode
}

export default function GraphCanvas({ step, graphData }: GraphCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    if (!svgRef.current) return

    const width = svgRef.current.clientWidth || 500
    const height = svgRef.current.clientHeight || 400

    if (!initializedRef.current) {
      svg.selectAll('*').remove()
      initializedRef.current = true

      const nodes: GNode[] = Object.keys(graphData).map(id => ({ id }))
      const linkSet = new Set<string>()
      const links: GLink[] = []
      for (const [src, neighbors] of Object.entries(graphData)) {
        for (const tgt of neighbors) {
          const key = [src, tgt].sort().join('-')
          if (!linkSet.has(key)) {
            linkSet.add(key)
            links.push({ source: src, target: tgt })
          }
        }
      }

      const g = svg.append('g')

      // Zoom
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => g.attr('transform', event.transform))
      svg.call(zoom as any)

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink<GNode, GLink>(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide(40))

      // Links
      g.append('g').attr('class', 'links').selectAll('line')
        .data(links).enter().append('line')
        .attr('stroke', '#2a2520').attr('stroke-width', 2)
        .attr('data-id', d => [typeof d.source === 'string' ? d.source : d.source.id, typeof d.target === 'string' ? d.target : d.target.id].sort().join('-'))

      // Nodes
      const nodeG = g.append('g').attr('class', 'nodes').selectAll('g')
        .data(nodes).enter().append('g').attr('data-id', d => d.id)

      nodeG.append('circle').attr('r', 22).attr('fill', '#6B6560').attr('stroke', '#2a2520').attr('stroke-width', 2)
      nodeG.append('text').text(d => d.id)
        .attr('text-anchor', 'middle').attr('dy', '0.35em')
        .attr('fill', '#E8E0D4').attr('font-size', '13px').attr('font-family', 'Space Mono, monospace').attr('font-weight', 'bold')

      simulation.on('tick', () => {
        g.selectAll('.links line')
          .attr('x1', (d: unknown) => ((d as { source: GNode }).source.x ?? 0))
          .attr('y1', (d: unknown) => ((d as { source: GNode }).source.y ?? 0))
          .attr('x2', (d: unknown) => ((d as { target: GNode }).target.x ?? 0))
          .attr('y2', (d: unknown) => ((d as { target: GNode }).target.y ?? 0))

        g.selectAll('.nodes g')
          .attr('transform', (d: unknown) => `translate(${(d as GNode).x ?? 0},${(d as GNode).y ?? 0})`)
      })
    }

    // Update colors based on step
    const gSel = svg.select('g')

    // Update node colors
    gSel.selectAll('.nodes g').each(function () {
      const el = d3.select(this)
      const nodeId = el.attr('data-id')
      const circle = el.select('circle')

      if (nodeId === step.activeNode) {
        circle.attr('fill', '#C4A76C').attr('r', 28)
          .attr('filter', 'drop-shadow(0 0 10px rgba(196,167,108,0.6))')
      } else if (step.visitedNodes.includes(nodeId)) {
        circle.attr('fill', '#C4A76C').attr('r', 22).attr('filter', 'none')
      } else if (step.frontier.includes(nodeId)) {
        circle.attr('fill', '#D4B896').attr('r', 22).attr('filter', 'none')
      } else {
        circle.attr('fill', '#6B6560').attr('r', 22).attr('filter', 'none')
      }
    })

    // Update edge colors
    gSel.selectAll('.links line').each(function () {
      const el = d3.select(this)
      const edgeId = el.attr('data-id')
      if (step.visitedEdges.includes(edgeId)) {
        el.attr('stroke', '#C4A76C').attr('stroke-width', 3)
      } else {
        el.attr('stroke', '#2a2520').attr('stroke-width', 2)
      }
    })
  }, [step, graphData])

  return (
    <div className="w-full h-full min-h-[300px]" style={{ background: 'var(--surface)' }}>
      <svg ref={svgRef} width="100%" height="100%" style={{ minHeight: 300 }} />
    </div>
  )
}
