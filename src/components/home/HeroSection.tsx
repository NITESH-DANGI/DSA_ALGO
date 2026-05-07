'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden grid-bg">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'var(--accent-purple)' }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-8"
            style={{ background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            14 algorithms • 4 languages • Real-time visualization
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          style={{ color: 'var(--text)' }}
        >
          Watch algorithms{' '}
          <span style={{ color: 'var(--accent)' }}>think.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          Step through sorting, graphs, and trees — one operation at a time.
          With synchronized code highlighting. No setup required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#algorithms"
            className="px-8 py-3.5 rounded-lg font-semibold text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              boxShadow: '0 0 30px rgba(0, 255, 180, 0.3)',
            }}
          >
            Explore algorithms →
          </a>
          <Link
            href="/visualize/quick-sort"
            className="px-8 py-3.5 rounded-lg font-semibold text-base border transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: 'var(--border-hover)',
              color: 'var(--accent)',
              background: 'transparent',
            }}
          >
            Quick Sort →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
