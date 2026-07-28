'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'

/* ─────────────────────── Gauge geometry ─── */
const CX = 150          // centre x dans viewBox
const CY = 148          // centre y (bas du demi-cercle)
const R  = 106          // rayon de la piste principale
const R_OUTER = R + 4   // bordure extérieure
const ARC = Math.PI * R // longueur du demi-cercle ≈ 333

// Point sur l'arc à la fraction t (0 = E gauche, 1 = F droit)
function arcPt(t, r = R) {
  const a = Math.PI * (1 - t)   // 180° → 0°
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)]
}

// Marques de graduation
const MAJOR = [0, 0.25, 0.5, 0.75, 1]
const MINOR = [0.125, 0.375, 0.625, 0.875]

/* ─────────────────────── Constantes ─── */
const SKIP_KEY = 'autimmob_intro_seen'
const SKIP_TTL = 24 * 60 * 60 * 1000

async function playStartSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const res = await fetch('/sounds/start.mp3')
    if (!res.ok) return
    const buf = await ctx.decodeAudioData(await res.arrayBuffer())
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start(0)
  } catch { /* son indisponible — pas bloquant */ }
}

/* ═══════════════════════════════════════ */
export default function IntroScreen() {
  // true = montrer l'intro ; false = skip (retour) ; null = pas encore déterminé
  const [show, setShow]   = useState(true)
  const [phase, setPhase] = useState('idle')
  // idle | filling | shaking | exiting | done

  const progress = useMotionValue(0)

  // Couleur du trait selon la progression
  const strokeColor = useTransform(
    progress,
    [0,        0.35,      0.65,       1       ],
    ['#444444','#444444', '#D4621A',  '#C0392B']
  )

  // offset de tiret : plein (rien affiché) → 0 (tout affiché)
  const dashOffset = useTransform(progress, [0, 1], [ARC, 0])

  // Position du point indicateur au bout de l'arc
  const indicatorX = useTransform(progress, (t) => arcPt(t)[0])
  const indicatorY = useTransform(progress, (t) => arcPt(t)[1])

  useEffect(() => {
    try {
      const seen = localStorage.getItem(SKIP_KEY)
      if (seen && Date.now() - Number(seen) < SKIP_TTL) {
        setShow(false)
      }
    } catch {}
  }, [])

  const skip = useCallback(() => {
    try { localStorage.setItem(SKIP_KEY, String(Date.now())) } catch {}
    setPhase('exiting')
    // Accélère la sortie
    animate(progress, 1, { duration: 0.01 })
    setTimeout(() => setPhase('done'), 700)
  }, [progress])

  const handlePump = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('filling')

    const animation = animate(progress, 1, {
      duration: 2.5,
      ease: [0.45, 0, 0.55, 1],
      onComplete: () => {
        setPhase('shaking')
        playStartSound()
        setTimeout(() => {
          try { localStorage.setItem(SKIP_KEY, String(Date.now())) } catch {}
          setPhase('exiting')
          setTimeout(() => setPhase('done'), 820)
        }, 540)
      },
    })

    return () => animation.stop()
  }, [phase, progress])

  if (!show || phase === 'done') return null

  const isExiting  = phase === 'exiting'
  const isFilling  = phase === 'filling'
  const isShaking  = phase === 'shaking'
  const canClick   = phase === 'idle'

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" aria-modal="true">

      {/* ── Volet gauche ── */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#111]"
        animate={{ x: isExiting ? '-100%' : 0 }}
        transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Volet droit ── */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#111]"
        animate={{ x: isExiting ? '100%' : 0 }}
        transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Contenu (layer au-dessus des volets) ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-10 select-none"
        animate={
          isShaking
            ? { x: [0,-7,9,-6,8,-4,5,-2,0], y: [0,3,-4,3,-2,4,-3,1,0] }
            : { x: 0, y: 0 }
        }
        style={{ opacity: isExiting ? 0 : 1 }}
        transition={ isShaking
          ? { duration: 0.48, ease: 'easeOut' }
          : { duration: 0.15 }
        }
      >

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-serif text-[2.6rem] font-light tracking-[0.22em] text-white uppercase leading-none">
            Autimmob
          </p>
          <div className="mt-2.5 h-px w-16 mx-auto bg-white/15" />
        </motion.div>

        {/* ── Jauge SVG ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 300 175"
            width="300" height="175"
            overflow="visible"
            aria-hidden="true"
          >
            {/* ─ Bordure extérieure (anneau) ─ */}
            <path
              d={`M ${CX - R_OUTER - 8},${CY} A ${R_OUTER + 8},${R_OUTER + 8} 0 0,1 ${CX + R_OUTER + 8},${CY}`}
              fill="none" stroke="#1f1f1f" strokeWidth="1.5"
            />

            {/* ─ Piste de fond ─ */}
            <path
              d={`M ${CX - R},${CY} A ${R},${R} 0 0,1 ${CX + R},${CY}`}
              fill="none" stroke="#252525" strokeWidth="14" strokeLinecap="round"
            />

            {/* ─ Arc rempli (animé) ─ */}
            <motion.path
              d={`M ${CX - R},${CY} A ${R},${R} 0 0,1 ${CX + R},${CY}`}
              fill="none"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={ARC}
              style={{
                stroke: strokeColor,
                strokeDashoffset: dashOffset,
              }}
            />

            {/* ─ Pointe indicatrice ─ */}
            <motion.circle
              cx={indicatorX}
              cy={indicatorY}
              r="5.5"
              fill="#111"
              strokeWidth="2"
              style={{ stroke: strokeColor }}
            />

            {/* ─ Graduation majeures ─ */}
            {MAJOR.map((t) => {
              const [ox, oy] = arcPt(t, R + 14)
              const [ix, iy] = arcPt(t, R - 14)
              return (
                <line key={t}
                  x1={ix} y1={iy} x2={ox} y2={oy}
                  stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round"
                />
              )
            })}

            {/* ─ Graduations mineures ─ */}
            {MINOR.map((t) => {
              const [ox, oy] = arcPt(t, R + 8)
              const [ix, iy] = arcPt(t, R - 8)
              return (
                <line key={t}
                  x1={ix} y1={iy} x2={ox} y2={oy}
                  stroke="#2e2e2e" strokeWidth="1" strokeLinecap="round"
                />
              )
            })}

            {/* ─ Label E ─ */}
            <text
              x={CX - R - 22} y={CY + 8}
              fill="#505050" fontSize="12"
              fontFamily="var(--font-inter)" fontWeight="700"
              letterSpacing="0"
            >E</text>

            {/* ─ Label F ─ */}
            <motion.text
              x={CX + R + 10} y={CY + 8}
              fontSize="12"
              fontFamily="var(--font-inter)" fontWeight="700"
              style={{ fill: strokeColor }}
            >F</motion.text>

            {/* ─ Icône pompe à essence (centre) ─ */}
            <g transform={`translate(${CX - 9}, ${CY - 78})`} opacity="0.3">
              <path d="M0 19V3.5A1.5 1.5 0 0 1 1.5 2h6A1.5 1.5 0 0 1 9 3.5V19"
                stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <path d="M0 19h9" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <path d="M9 6.5h1.5a1 1 0 0 1 1 1v2.5a1.2 1.2 0 0 0 1.2 1.2 1.2 1.2 0 0 0 1.2-1.2V5l-2.5-2.5"
                stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="2.5" y1="4" x2="6.5" y2="4"
                stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </g>

            {/* ─ Étiquette FUEL ─ */}
            <text
              x={CX} y={CY - 44}
              fill="#323232" fontSize="8"
              fontFamily="var(--font-inter)" fontWeight="700"
              letterSpacing="4" textAnchor="middle"
            >FUEL</text>

            {/* ─ Glow de plénitude ─ */}
            {(isShaking || isExiting) && (
              <motion.path
                d={`M ${CX - R},${CY} A ${R},${R} 0 0,1 ${CX + R},${CY}`}
                fill="none" stroke="#C0392B" strokeWidth="14" strokeLinecap="round"
                strokeDasharray={ARC} strokeDashoffset={0}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0.15, 0.4, 0.1] }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ filter: 'blur(6px)' }}
              />
            )}
          </svg>
        </motion.div>

        {/* ── Bouton pompe ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Label principal — visible dès le chargement */}
          {canClick && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.28em] text-white/55"
            >
              Appuyez pour démarrer
            </motion.p>
          )}

          {/* Flèche rebondissante */}
          {canClick && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 5, 0] }}
              transition={{
                opacity: { delay: 0.9, duration: 0.5 },
                y: { delay: 1, duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 1l6 6 6-6" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}

          <div className="relative">
            {/* Anneaux pulsants */}
            {canClick && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#C0392B]/50 pointer-events-none"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#C0392B]/30 pointer-events-none"
                  animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, delay: 0.45, repeat: Infinity, ease: 'easeOut' }}
                />
              </>
            )}

            <motion.button
              onClick={handlePump}
              disabled={!canClick}
              className="relative w-[72px] h-[72px] rounded-full border border-white/35 bg-black/20
                         flex items-center justify-center cursor-pointer
                         hover:border-[#C0392B]/70 hover:bg-[#C0392B]/8 active:scale-95
                         disabled:cursor-default disabled:opacity-60
                         transition-all duration-300 backdrop-blur-sm"
              whileTap={canClick ? { scale: 0.88 } : {}}
            >
              {/* Remplissage intérieur pendant fill */}
              {(isFilling || isShaking) && (
                <motion.div
                  className="absolute inset-1 rounded-full bg-[#C0392B]/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              <svg
                width="28" height="28" viewBox="0 0 24 24"
                fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-colors duration-300 ${
                  canClick ? 'stroke-white' : 'stroke-white/40'
                }`}
              >
                <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
                <path d="M3 22h12"/>
                <path d="M15 8h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7l-3-3"/>
                <line x1="7" y1="6" x2="11" y2="6"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>

      </motion.div>

      {/* ── Texte bas de page ── */}
      <motion.p
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/18 text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{ color: 'rgb(255 255 255 / 0.18)' }}
      >
        Autimmob · Saint-Martin-de-Crau
      </motion.p>

      {/* ── Bouton Passer ── */}
      <motion.button
        onClick={skip}
        className="absolute bottom-5 right-6 z-20 text-white/22 text-[10px] tracking-[0.15em] uppercase hover:text-white/50 transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Passer →
      </motion.button>

    </div>
  )
}
