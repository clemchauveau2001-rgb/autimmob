'use client'

import { motion } from 'motion/react'

const ITEMS = [
  'Spécialiste Porsche',
  'Youngtimers',
  'Sportives',
  'Photos 360°',
  'Marseille',
  'Passion Automobile',
  'Achat · Vente',
  'Mandataire',
  'Restauration',
  'Garage Indépendant',
]

export default function Marquee() {
  const text = [...ITEMS, ...ITEMS].map((item, i) => (
    <span key={i} className="flex items-center gap-6 md:gap-10">
      <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-[#888] whitespace-nowrap">
        {item}
      </span>
      <span className="text-[#C0392B] text-xs">✦</span>
    </span>
  ))

  return (
    <div className="overflow-hidden border-y border-[#E8E8E8] py-4 scrollbar-hide">
      <motion.div
        className="flex gap-6 md:gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {text}
      </motion.div>
    </div>
  )
}
