'use client'
import { useState, useMemo } from 'react'
import AlgoCard from '@/components/home/AlgoCard'
import CategoryFilter from '@/components/home/CategoryFilter'
import { REGISTRY } from '@/engine/registry'

export default function AlgorithmsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const algorithms = useMemo(() => {
    const all = Object.values(REGISTRY)
    if (selectedCategory === 'all') return all
    return all.filter(a => a.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section style={{ padding: '40px 48px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ color: '#d7c4a6', fontSize: '28px' }}>library_books</span>
            <h1
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '36px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#e2e2e8',
                margin: 0,
              }}
            >
              Algorithm Library
            </h1>
          </div>
          <p style={{ color: '#988f85', fontSize: '16px', marginBottom: '32px', fontFamily: 'Hanken Grotesk, sans-serif' }}>
            {algorithms.length} algorithms ready to explore. Select a category or dive straight in.
          </p>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {algorithms.map((algo, i) => (
            <AlgoCard key={algo.id} algo={algo} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
