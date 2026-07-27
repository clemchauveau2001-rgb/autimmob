'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function BadgeAutimmob({ size = 'sm' }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const sizeClasses = size === 'lg'
    ? 'text-[11px] px-3 py-1.5 gap-1.5'
    : 'text-[9px] px-2.5 py-1 gap-1'

  return (
    <div className="relative inline-flex">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`relative flex items-center ${sizeClasses} font-semibold uppercase tracking-wider bg-[#111] text-white overflow-hidden select-none`}
      >
        {/* Shimmer sweep */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPositionX: ['-100%', '200%'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />
        <svg width={size === 'lg' ? 11 : 9} height={size === 'lg' ? 11 : 9} viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
          <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#C0392B" />
        </svg>
        Inspecté Autimmob
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 bg-[#111] text-white p-3 shadow-xl pointer-events-none"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C0392B] mb-1.5">Garantie Autimmob</p>
            <p className="text-xs text-white/75 leading-relaxed">
              Ce véhicule a été contrôlé et préparé dans notre atelier à Marseille. Diagnostic complet, remise en état documentée.
            </p>
            {/* Arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
