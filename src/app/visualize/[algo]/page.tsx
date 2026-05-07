'use client'
import { use } from 'react'
import { REGISTRY } from '@/engine/registry'
import VisualizerShell from '@/components/visualizer/VisualizerShell'
import Link from 'next/link'

export default function VisualizePage({ params }: { params: Promise<{ algo: string }> }) {
  const { algo: algoId } = use(params)
  const algo = REGISTRY[algoId]

  if (!algo) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-20">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--text)' }}>404</h1>
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Algorithm not found</p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        >
          ← Back to Home
        </Link>
      </div>
    )
  }

  return <VisualizerShell algo={algo} />
}
