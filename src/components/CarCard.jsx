'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import CarSilhouette from './CarSilhouette'
import BadgeAutimmob from './BadgeAutimmob'
import { useFavoris } from '@/hooks/useFavoris'
import { CATEGORY_META } from '@/lib/cars'

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(price)
}

function formatKm(km) {
  return new Intl.NumberFormat('fr-FR').format(km) + ' km'
}

const BACK_SPECS = [
  { key: 'moteur', label: 'Moteur' },
  { key: 'puissance', label: 'Puissance', format: (v) => `${v} ch` },
  { key: 'boite', label: 'Boîte' },
  { key: 'km', label: 'Kilométrage', format: (v) => formatKm(v) },
]

export default function CarCard({ car, index = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHoverDevice, setIsHoverDevice] = useState(true)
  const { isFavori, toggle, mounted } = useFavoris()
  const active = mounted && isFavori(car.slug)

  useEffect(() => {
    setIsHoverDevice(window.matchMedia('(hover: hover)').matches)
  }, [])

  const meta = CATEGORY_META[car.category] || CATEGORY_META.accessible

  const flip = () => setIsFlipped(true)
  const unflip = () => setIsFlipped(false)

  const handleFrontClick = (e) => {
    if (!isHoverDevice && !isFlipped) {
      e.preventDefault()
      flip()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
      onMouseEnter={isHoverDevice ? flip : undefined}
      onMouseLeave={isHoverDevice ? unflip : undefined}
    >
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT FACE ── */}
        <Link
          href={`/voiture/${car.slug}`}
          onClick={handleFrontClick}
          className="block"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <article className="border border-[#E8E8E8] bg-white overflow-hidden hover:border-[#CCC] hover:shadow-lg hover:shadow-black/6 transition-shadow duration-300">
            {/* Image area */}
            <div className="relative bg-[#F7F7F7] overflow-hidden" style={{ aspectRatio: '16/10' }}>
              {/* Category badge */}
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1"
                  style={{ color: meta.color, background: meta.bg }}
                >
                  {meta.label}
                </span>
              </div>
              {/* 360° badge */}
              {car.a360 && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-[#111] text-white">
                    <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="6" cy="6" r="4.5" />
                      <path d="M2 6h8M6 2v8" strokeLinecap="round" />
                    </svg>
                    360°
                  </span>
                </div>
              )}
              {/* Car SVG */}
              <div className="absolute inset-0 flex items-center justify-center px-5 pb-2 pt-8">
                <CarSilhouette className="w-full h-auto" withShadow />
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#111] leading-tight">
                    {car.marque} {car.modele}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#888] tracking-wide">
                    {car.annee} · {formatKm(car.km)}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 mt-0.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${
                    car.vendeur === 'autimmob' ? 'bg-[#C0392B] text-white' : 'bg-[#F5F5F5] text-[#555]'
                  }`}
                >
                  {car.vendeur === 'autimmob' ? 'Autimmob' : 'Particulier'}
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[#111] tracking-tight">
                {formatPrice(car.prix)}
              </p>
              {car.vendeur === 'autimmob' && (
                <div className="mt-2">
                  <BadgeAutimmob size="sm" />
                </div>
              )}
            </div>
          </article>
        </Link>

        {/* ── BACK FACE ── */}
        <div
          className="absolute inset-0 bg-[#111] text-white overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* 360° badge + mobile close */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            {car.a360 ? (
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C0392B] border border-[#C0392B]/50 px-2 py-0.5">
                360°
              </span>
            ) : <span />}
            {!isHoverDevice && (
              <button
                onClick={unflip}
                className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col h-full px-4 pt-10 pb-4">
            {/* Car name */}
            <div>
              <h3 className="font-serif text-[1.25rem] font-semibold text-white leading-tight">
                {car.marque} {car.modele}
              </h3>
              <p className="text-xs text-white/40 mt-0.5 tracking-wide">{car.annee}</p>
            </div>

            {/* Divider */}
            <div className="mt-3 mb-3 h-px bg-white/10" />

            {/* Specs 2×2 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {BACK_SPECS.map(({ key, label, format }) => (
                <div key={key}>
                  <p className="text-[8px] font-medium uppercase tracking-widest text-white/35">{label}</p>
                  <p className="text-[11px] font-medium text-white/85 mt-0.5 leading-snug truncate">
                    {format ? format(car[key]) : car[key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer: price + favori + voir */}
            <div>
              <p className="font-serif text-lg font-semibold text-white mb-3">
                {formatPrice(car.prix)}
              </p>
              <div className="flex gap-2">
                {/* Heart / Favori */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggle(car.slug) }}
                  aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  className={`w-10 h-9 flex items-center justify-center border flex-shrink-0 transition-colors duration-200 ${
                    active
                      ? 'bg-[#C0392B] border-[#C0392B]'
                      : 'border-white/25 hover:border-white/50'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.svg
                      key={active ? 'on' : 'off'}
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                      width="13" height="13" viewBox="0 0 14 14"
                      fill={active ? 'white' : 'none'}
                    >
                      <path
                        d="M7 12S1.5 8.5 1.5 4.5a2.8 2.8 0 0 1 5.5-.8 2.8 2.8 0 0 1 5.5.8C12.5 8.5 7 12 7 12Z"
                        stroke={active ? 'none' : 'rgba(255,255,255,0.7)'}
                        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                      />
                    </motion.svg>
                  </AnimatePresence>
                </button>

                {/* Voir */}
                <Link
                  href={`/voiture/${car.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-white border border-white/25 hover:bg-white hover:text-[#111] transition-all duration-200 h-9"
                >
                  Voir →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
