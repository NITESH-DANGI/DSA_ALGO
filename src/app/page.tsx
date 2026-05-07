'use client'
import { useState, useMemo } from 'react'
import HeroSection from '@/components/home/HeroSection'
import AlgoCard from '@/components/home/AlgoCard'
import CategoryFilter from '@/components/home/CategoryFilter'
import { REGISTRY } from '@/engine/registry'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const algorithms = useMemo(() => {
    const all = Object.values(REGISTRY)
    if (selectedCategory === 'all') return all
    return all.filter(a => a.category === selectedCategory)
  }, [selectedCategory])

  return (
    <>
      <HeroSection />

      <section id="algorithms" className="py-24 px-6 sm:px-10 md:px-16 lg:px-20">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                Algorithm Library
              </h2>
              <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                {algorithms.length} algorithms ready to explore
              </p>
            </div>
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {algorithms.map((algo, i) => (
              <AlgoCard key={algo.id} algo={algo} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
