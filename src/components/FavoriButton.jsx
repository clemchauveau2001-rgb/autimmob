'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useFavoris } from '@/hooks/useFavoris'

export default function FavoriButton({ slug, className = '' }) {
  const { isFavori, toggle, mounted } = useFavoris()
  const active = mounted && isFavori(slug)

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug) }}
      aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 ${
        active ? 'bg-[#C0392B]' : 'bg-white/90 hover:bg-white'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.svg
          key={active ? 'filled' : 'empty'}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={active ? 'white' : 'none'}
        >
          <path
            d="M7 12S1.5 8.5 1.5 4.5a2.8 2.8 0 0 1 5.5-.8 2.8 2.8 0 0 1 5.5.8C12.5 8.5 7 12 7 12Z"
            stroke={active ? 'none' : '#555'}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
