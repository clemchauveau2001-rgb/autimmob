'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ─── Date cible : 1er octobre 2026, minuit ─── */
const TARGET = new Date('2026-11-01T00:00:00').getTime()

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

/* ─── Chiffre avec flip ─── */
function FlipDigit({ value }) {
  const str = String(value).padStart(2, '0')
  return (
    <div
      className="relative overflow-hidden"
      style={{ perspective: '400px', height: '1em', lineHeight: '1em' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={str}
          initial={{ rotateX: -72, opacity: 0, y: '-30%' }}
          animate={{ rotateX: 0,   opacity: 1, y: '0%'   }}
          exit={{    rotateX:  72, opacity: 0, y: '30%'  }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: 'block', transformOrigin: '50% 50%' }}
        >
          {str}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ─── Bloc unitaire (JOURS, HEURES…) ─── */
function CountBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="font-[family-name:var(--font-cormorant)] text-[3.8rem] sm:text-[5rem] font-light text-white leading-none tabular-nums"
        style={{ minWidth: '2.4ch', textAlign: 'center' }}
      >
        <FlipDigit value={value} />
      </div>
      <span className="font-[family-name:var(--font-inter)] text-[9px] sm:text-[10px] font-medium tracking-[0.3em] text-[#888] uppercase">
        {label}
      </span>
    </div>
  )
}

/* ─── Séparateur ":" ─── */
function Sep() {
  return (
    <span
      className="font-[family-name:var(--font-cormorant)] text-[2.4rem] sm:text-[3.2rem] font-light text-[#C0392B] leading-none self-start mt-1"
      aria-hidden="true"
    >
      :
    </span>
  )
}

/* ═══════════════════════════════════════════ */
export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft())
  const [email,    setEmail]    = useState('')
  const [sent,     setSent]     = useState(false)
  const [visible,  setVisible]  = useState(false)  // évite flash SSR

  /* Tick chaque seconde */
  useEffect(() => {
    setVisible(true)
    const t = setInterval(() => {
      const tl = getTimeLeft()
      setTimeLeft(tl)
      if (!tl) clearInterval(t)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  /* Soumission email → localStorage */
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      const prev = JSON.parse(localStorage.getItem('autimmob_waitlist') || '[]')
      if (!prev.includes(email.trim())) {
        localStorage.setItem('autimmob_waitlist', JSON.stringify([...prev, email.trim()]))
      }
    } catch {}
    setSent(true)
  }, [email])

  /* Date passée → vrai site */
  if (!timeLeft) return null
  /* Évite flash blanc SSR (hydration) */
  if (!visible)  return null

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div className="fixed inset-0 z-[9998] bg-[#111] flex flex-col items-center justify-between py-12 px-6 overflow-hidden">

      {/* ── Zone centrale ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full max-w-xl">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="font-[family-name:var(--font-cormorant)] text-[2.8rem] sm:text-[3.6rem] font-light tracking-[0.22em] text-white uppercase leading-none">
            Autimmob
          </h1>

          {/* Ligne rouge */}
          <div className="mt-4 mx-auto h-px w-14 bg-[#C0392B]" />

          {/* Phrase */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-[family-name:var(--font-cormorant)] italic text-[1.25rem] sm:text-[1.5rem] font-light text-white/80 tracking-wide"
          >
            Quelque chose se prépare
          </motion.p>
        </motion.div>

        {/* Compte à rebours */}
        <div className="flex items-start gap-4 sm:gap-7 mt-2">
          {[
            { value: days,    label: 'Jours',    i: 0 },
            { value: hours,   label: 'Heures',   i: 1 },
            { value: minutes, label: 'Minutes',  i: 2 },
            { value: seconds, label: 'Secondes', i: 3 },
          ].map(({ value, label, i }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 sm:gap-7"
            >
              <CountBlock value={value} label={label} />
              {i < 3 && <Sep />}
            </motion.div>
          ))}
        </div>

        {/* Formulaire email */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm mt-4"
        >
          <p className="text-center font-[family-name:var(--font-inter)] text-[11px] tracking-[0.22em] text-[#888] uppercase mb-3.5">
            Être notifié à l&apos;ouverture
          </p>

          {sent ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center font-[family-name:var(--font-inter)] text-[13px] text-white/60 tracking-wide"
            >
              ✓ &nbsp;On vous prévient à l&apos;ouverture.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 border border-white/18">
              <input
                type="email"
                required
                placeholder="votre@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3 font-[family-name:var(--font-inter)] text-[13px] text-white placeholder:text-[#444] outline-none min-w-0"
              />
              <button
                type="submit"
                className="px-5 py-3 font-[family-name:var(--font-inter)] text-[11px] tracking-[0.18em] uppercase text-white/70 hover:text-white hover:bg-white/6 border-l border-white/18 transition-all duration-200 whitespace-nowrap"
              >
                M&apos;avertir
              </button>
            </form>
          )}
        </motion.div>

      </div>

      {/* ── Pied de page ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] text-[#555] uppercase"
      >
        autimmob.fr
      </motion.p>

    </div>
  )
}
