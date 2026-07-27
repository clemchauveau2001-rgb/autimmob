'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function PhotoGallery({ photos = [] }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  if (!photos.length) {
    return (
      <div className="aspect-[16/9] bg-[#111] flex items-center justify-center">
        <span className="text-white/30 text-xs font-medium uppercase tracking-widest">
          Photos bientôt disponibles
        </span>
      </div>
    )
  }

  const goTo = (i) => {
    if (i === idx) return
    setDir(i > idx ? 1 : -1)
    setIdx(i)
  }
  const prev = () => goTo((idx - 1 + photos.length) % photos.length)
  const next = () => goTo((idx + 1) % photos.length)

  return (
    <div className="bg-[#0D0D0D] select-none">

      {/* ── Main photo ── */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#111]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={idx}
            custom={dir}
            variants={{
              enter: (d) => ({ x: d > 0 ? '5%' : '-5%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (d) => ({ x: d > 0 ? '-5%' : '5%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={photos[idx].url}
              alt={photos[idx].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 flex items-center justify-center z-10 transition-colors"
              aria-label="Photo précédente"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M8.5 1.5L3.5 6.5l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 flex items-center justify-center z-10 transition-colors"
              aria-label="Photo suivante"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4.5 1.5l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 px-2.5 py-1 text-[11px] text-white/70 font-medium tabular-nums">
          {idx + 1} / {photos.length}
        </div>

        {/* Dots indicator */}
        {photos.length > 1 && photos.length <= 8 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Photo ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails strip ── */}
      {photos.length > 1 && (
        <div className="flex gap-2 px-3 py-3 bg-[#111] overflow-x-auto scrollbar-hide">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={photo.alt}
              className={`relative flex-shrink-0 w-16 h-12 overflow-hidden transition-all duration-200 ${
                i === idx
                  ? 'ring-2 ring-[#C0392B] ring-offset-1 ring-offset-[#111] opacity-100'
                  : 'opacity-45 hover:opacity-75'
              }`}
            >
              <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}

    </div>
  )
}
