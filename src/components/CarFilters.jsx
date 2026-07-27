'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { stockCars, CATEGORIES } from '@/lib/cars'
import CarCard from './CarCard'

export default function CarFilters() {
  const [active, setActive] = useState('tout')

  const filtered = active === 'tout' ? stockCars : stockCars.filter((c) => c.category === active)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`relative text-xs font-medium uppercase tracking-widest px-5 py-2.5 transition-all duration-200 ${
              active === cat.id
                ? 'text-white'
                : 'text-[#555] border border-[#E8E8E8] hover:border-[#CCC] hover:text-[#111]'
            }`}
          >
            {active === cat.id && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 bg-[#111]"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-[#888]">
          <p className="font-serif text-2xl">Aucun véhicule dans cette catégorie</p>
          <p className="mt-2 text-sm">Revenez bientôt, notre stock évolue régulièrement.</p>
        </div>
      )}
    </div>
  )
}
