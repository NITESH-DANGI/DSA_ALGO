'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        background: 'rgba(8, 12, 16, 0.85)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            AF
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            Algo<span style={{ color: 'var(--accent)' }}>Flow</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--text-muted)' }}
          >
            Algorithms
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--text-muted)' }}
          >
            Compare
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--text-muted)' }}
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
