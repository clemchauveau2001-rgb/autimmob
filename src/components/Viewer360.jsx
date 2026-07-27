'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import CarSilhouette from './CarSilhouette'

function useFullscreen(ref) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])
  const enter = useCallback(() => ref.current?.requestFullscreen?.(), [ref])
  const exit = useCallback(() => document.exitFullscreen?.(), [])
  return { isFullscreen, enter, exit }
}

const POVS = ['Extérieur', 'Intérieur', 'Détails', 'Moteur']
const ANGLE_DOTS = 16

function InteriorView() {
  return (
    <svg viewBox="0 0 500 220" className="w-full h-full opacity-90" xmlns="http://www.w3.org/2000/svg">
      {/* Dashboard */}
      <rect x="60" y="110" width="380" height="55" rx="6" fill="#1a1a1a" />
      <rect x="70" y="120" width="180" height="35" rx="4" fill="#2a2a2a" />
      <circle cx="280" cy="137" r="28" fill="#222" stroke="#444" strokeWidth="2" />
      <circle cx="280" cy="137" r="20" fill="#1a1a1a" />
      <circle cx="280" cy="137" r="3" fill="#C0392B" />
      {/* Steering wheel spokes */}
      {[0, 120, 240].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return <line key={deg} x1={280 + 3 * Math.cos(rad)} y1={137 + 3 * Math.sin(rad)} x2={280 + 18 * Math.cos(rad)} y2={137 + 18 * Math.sin(rad)} stroke="#555" strokeWidth="3" strokeLinecap="round" />
      })}
      {/* Gauges */}
      <circle cx="100" cy="137" r="18" fill="#222" stroke="#444" strokeWidth="1.5" />
      <circle cx="160" cy="137" r="14" fill="#222" stroke="#444" strokeWidth="1.5" />
      <text x="100" y="141" textAnchor="middle" fontSize="6" fill="#888">RPM</text>
      {/* Center console */}
      <rect x="210" y="165" width="80" height="45" rx="4" fill="#1a1a1a" />
      <circle cx="250" cy="185" r="8" fill="#333" />
      <rect x="225" y="200" width="50" height="4" rx="2" fill="#333" />
      {/* Seats outlines */}
      <rect x="60" y="175" width="110" height="40" rx="8" fill="#222" />
      <rect x="330" y="175" width="110" height="40" rx="8" fill="#222" />
      <text x="250" y="100" textAnchor="middle" fontSize="11" fill="#555" fontFamily="'Inter', sans-serif" letterSpacing="2">VUE INTÉRIEURE</text>
    </svg>
  )
}

function EngineView() {
  return (
    <svg viewBox="0 0 500 220" className="w-full h-full opacity-90" xmlns="http://www.w3.org/2000/svg">
      {/* Engine block */}
      <rect x="120" y="80" width="260" height="100" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
      {/* Cylinders */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={130 + i * 40} y="70" width="28" height="30" rx="3" fill="#222" stroke="#444" strokeWidth="1" />
      ))}
      {/* Intake manifold */}
      <path d="M 145 100 Q 180 85 250 82 Q 320 85 355 100" fill="none" stroke="#555" strokeWidth="8" strokeLinecap="round" />
      {/* Oil cap */}
      <circle cx="350" cy="95" r="12" fill="#333" stroke="#555" strokeWidth="1.5" />
      <text x="350" y="99" textAnchor="middle" fontSize="7" fill="#888">OIL</text>
      {/* Belts */}
      <ellipse cx="180" cy="155" rx="22" ry="18" fill="none" stroke="#444" strokeWidth="3" />
      <ellipse cx="230" cy="155" rx="15" ry="12" fill="none" stroke="#444" strokeWidth="3" />
      {/* Wiring */}
      <path d="M 160 120 Q 200 135 250 130 Q 300 125 340 140" fill="none" stroke="#C0392B" strokeWidth="2" strokeDasharray="4 2" />
      <text x="250" y="50" textAnchor="middle" fontSize="11" fill="#555" fontFamily="'Inter', sans-serif" letterSpacing="2">VUE MOTEUR</text>
    </svg>
  )
}

function DetailsView({ angle, hotspots = [], onHotspotClick, activeHotspot }) {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 500 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Wheel close-up */}
        <circle cx="250" cy="130" r="80" fill="#1a1a1a" />
        <circle cx="250" cy="130" r="60" fill="#2a2a2a" />
        <circle cx="250" cy="130" r="20" fill="#1a1a1a" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const offset = (angle / 360) * Math.PI * 2
          return (
            <line
              key={deg}
              x1={250 + 22 * Math.cos(rad + offset)}
              y1={130 + 22 * Math.sin(rad + offset)}
              x2={250 + 57 * Math.cos(rad + offset)}
              y2={130 + 57 * Math.sin(rad + offset)}
              stroke="#555"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )
        })}
        {/* Tire tread */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180
          return (
            <rect
              key={deg}
              x={250 + 62 * Math.cos(rad) - 3}
              y={130 + 62 * Math.sin(rad) - 8}
              width="6"
              height="16"
              rx="2"
              fill="#333"
              transform={`rotate(${deg}, ${250 + 62 * Math.cos(rad)}, ${130 + 62 * Math.sin(rad)})`}
            />
          )
        })}
        <circle cx="250" cy="130" r="10" fill="#333" stroke="#666" strokeWidth="1.5" />
        <text x="250" y="50" textAnchor="middle" fontSize="11" fill="#555" fontFamily="'Inter', sans-serif" letterSpacing="2">DÉTAIL JANTE</text>

        {/* Hotspots */}
        {hotspots.map((h, i) => (
          <g key={i} onClick={() => onHotspotClick(activeHotspot === i ? null : i)} style={{ cursor: 'pointer' }}>
            {/* Pulsing ring */}
            <circle cx={h.x} cy={h.y} r="10" fill="none" stroke="#C0392B" strokeWidth="1.5" opacity="0">
              <animate attributeName="r" values="8;16;8" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
            </circle>
            {/* Dot */}
            <circle cx={h.x} cy={h.y} r="5" fill={activeHotspot === i ? 'white' : '#C0392B'} />
            <circle cx={h.x} cy={h.y} r="5" fill="none" stroke={activeHotspot === i ? '#C0392B' : 'none'} strokeWidth="1.5" />
          </g>
        ))}
      </svg>

      {/* Active hotspot popup */}
      <AnimatePresence>
        {activeHotspot !== null && hotspots[activeHotspot] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-white text-[#111] px-4 py-3 shadow-xl z-10 w-52 pointer-events-none"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C0392B] mb-1">{hotspots[activeHotspot].label}</p>
            <p className="text-xs text-[#555] leading-relaxed">{hotspots[activeHotspot].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Viewer360({ car }) {
  const [angle, setAngle] = useState(0)
  const [pov, setPov] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)
  const dragStartX = useRef(0)
  const dragStartAngle = useRef(0)
  const { isFullscreen, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen(wrapperRef)

  const hotspots = car?.hotspots || []

  const handlePointerDown = useCallback((e) => {
    if (pov !== 0) return
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartAngle.current = angle
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [angle, pov])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return
    const delta = e.clientX - dragStartX.current
    const sensitivity = 0.4
    const newAngle = (dragStartAngle.current + delta * sensitivity + 360) % 360
    setAngle(newAngle)
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Auto-rotate gently on load
  useEffect(() => {
    if (isDragging || pov !== 0) return
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        setAngle((a) => (a + 0.3) % 360)
      }, 16)
      // Stop auto-rotate after 4 seconds
      setTimeout(() => clearInterval(id), 4000)
    }, 800)
    return () => clearTimeout(timer)
  }, [pov]) // eslint-disable-line

  const activeDot = Math.floor((angle / 360) * ANGLE_DOTS) % ANGLE_DOTS
  const rotateY = ((angle - 0) / 360) * 360

  const carTransform = `perspective(900px) rotateY(${-rotateY * 0.6}deg) scale(0.95)`

  return (
    <div ref={wrapperRef} className="bg-[#0D0D0D] rounded-none overflow-hidden">
      {/* Main viewer */}
      <div
        ref={containerRef}
        className={`relative select-none overflow-hidden ${pov === 0 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
        style={{ height: isFullscreen ? 'calc(100vh - 112px)' : '420px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Fullscreen button */}
        <button
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-all duration-200"
          aria-label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
        >
          {isFullscreen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 1v4H1M9 1v4h4M5 13v-4H1M9 13v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 5V1h4M9 1h4v4M1 9v4h4M13 9v4H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        {/* Ambient light effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${50 + (angle / 360 - 0.5) * 30}% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
          }}
        />

        {/* Ground reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '80px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.02), transparent)',
          }}
        />

        {/* Car / POV content */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <AnimatePresence mode="wait">
            {pov === 0 && (
              <motion.div
                key="exterior"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[480px]"
                style={{ transform: carTransform, transformOrigin: 'center center' }}
              >
                <CarSilhouette
                  bodyColor="#e8e8e8"
                  windowColor="rgba(150,200,255,0.25)"
                  wheelColor="#333"
                  rimColor="#aaa"
                  withShadow={false}
                  className="w-full"
                />
                {/* Ground line */}
                <div className="mt-2 mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            )}
            {pov === 1 && (
              <motion.div key="interior" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-[480px]">
                <InteriorView />
              </motion.div>
            )}
            {pov === 2 && (
              <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-[300px]">
                <DetailsView angle={angle} hotspots={hotspots} onHotspotClick={setActiveHotspot} activeHotspot={activeHotspot} />
              </motion.div>
            )}
            {pov === 3 && (
              <motion.div key="engine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-[480px]">
                <EngineView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drag hint */}
        {pov === 0 && !isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8h8M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Faire glisser pour tourner
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M4 8h8M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}

        {/* Angle dots */}
        {pov === 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: ANGLE_DOTS }).map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setAngle((i / ANGLE_DOTS) * 360) }}
                className={`transition-all duration-200 rounded-full ${
                  i === activeDot ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* POV buttons */}
      <div className="flex border-t border-white/10">
        {POVS.map((label, i) => (
          <button
            key={label}
            onClick={() => setPov(i)}
            className={`flex-1 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-200 ${
              pov === i
                ? 'text-white border-b-2 border-[#C0392B]'
                : 'text-white/40 hover:text-white/70 border-b-2 border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Photo strip */}
      <div className="flex gap-2 p-3 bg-[#111] overflow-x-auto scrollbar-hide">
        {/* 360 thumb */}
        <button
          onClick={() => { setPov(0); setAngle(0) }}
          className="flex-shrink-0 w-16 h-12 bg-[#0D0D0D] border border-white/20 flex items-center justify-center"
        >
          <span className="text-white/60 text-[9px] uppercase tracking-wider font-medium">360°</span>
        </button>
        {/* Frame thumbs */}
        {[15, 60, 120, 200, 270].map((a, i) => (
          <button
            key={i}
            onClick={() => { setPov(0); setAngle(a) }}
            className="flex-shrink-0 w-16 h-12 bg-[#0D0D0D] border border-white/10 overflow-hidden hover:border-white/30 transition-colors"
            style={{
              background: `hsl(${220 + i * 15}, 10%, ${8 + i * 2}%)`,
            }}
          >
            <span className="block w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 40 20" className="w-10 opacity-50">
                <ellipse cx="20" cy="17" rx="14" ry="2" fill="rgba(255,255,255,0.15)" />
                <path fill="rgba(255,255,255,0.6)" d="M6 17 L5 13 Q6 10 9 8 L14 7 L22 6 Q28 6 31 10 L36 14 L36 17 L32 17 A3 3 0 1 0 26 17 L14 17 A3 3 0 1 0 8 17 Z" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
