'use client'

import { useRef } from 'react'

export default function YouTube360({ videoId }) {
  const wrapperRef = useRef(null)

  const enterFullscreen = () => wrapperRef.current?.requestFullscreen?.()

  const src = `https://www.youtube.com/embed/${videoId}?si=SIwAMNsT4BVOWZUl&rel=0&modestbranding=1&color=white`

  // Thumbnails représentant les angles clés de la 911 SC Targa
  const THUMBS = [
    'Face avant',
    'Profil G',
    'Arrière',
    'Profil D',
    'Toit Targa',
  ]

  return (
    <div ref={wrapperRef} className="bg-[#0D0D0D] overflow-hidden">

      {/* ── Player 16/9 responsive ── */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={src}
          title="Visite 360° — Porsche 911 SC Targa"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* ── Barre info ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
            Visite 360° interactive — faites glisser dans la vidéo
          </span>
        </div>
        <button
          onClick={enterFullscreen}
          className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          aria-label="Plein écran"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 5V1h4M9 1h4v4M1 9v4h4M13 9v4H9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Plein écran
        </button>
      </div>

      {/* ── Strip de thumbnails ── */}
      <div className="flex gap-2 px-3 pb-3 pt-1 bg-[#111] overflow-x-auto scrollbar-hide">

        {/* Badge 360° actif */}
        <div className="flex-shrink-0 w-16 h-12 bg-[#0D0D0D] border border-[#C0392B]/60 flex items-center justify-center">
          <span className="text-[#C0392B] text-[9px] uppercase tracking-wider font-semibold">360°</span>
        </div>

        {/* Frames angulaires */}
        {THUMBS.map((label, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-16 h-12 bg-[#0D0D0D] border border-white/10 overflow-hidden"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt={label}
              className="w-full h-full object-cover opacity-40"
            />
            <span className="absolute inset-0 flex items-end justify-center pb-1 text-[8px] text-white/70 font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
