'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import Link from 'next/link'

/* ── Count-up hook ─────────────────────────── */
function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const animate = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return { count, ref }
}

/* ── Single stat with counter ──────────────── */
function StatItem({ end, suffix, label, delay = 0 }) {
  const { count, ref } = useCountUp(end, 1600)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <p className="font-serif text-2xl font-semibold text-[#111] lg:text-white tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-xs text-[#888] lg:text-white/65 mt-0.5 tracking-wide">{label}</p>
    </motion.div>
  )
}

function StatText({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <p className="font-serif text-2xl font-semibold text-[#111] lg:text-white">{value}</p>
      <p className="text-xs text-[#888] lg:text-white/65 mt-0.5 tracking-wide">{label}</p>
    </motion.div>
  )
}

/* ── Stagger container ─────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Hero ──────────────────────────────────── */
export default function HeroSection() {
  const { scrollY } = useScroll()
  // Parallax: text moves down slightly, car moves up
  const textY = useTransform(scrollY, [0, 600], [0, 22])
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted) v.play().catch(() => {})
  }

  return (
    <section className="relative pt-16 min-h-[88vh] lg:min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-6 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">

          {/* ── Left column — text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ y: textY }}
            className="relative z-10 lg:max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#888] lg:text-white/70 mb-6"
            >
              Garage automobile · Saint-Martin-de-Crau
            </motion.span>

            {/* Title with rotateX perspective effect */}
            <motion.div variants={fadeUp} style={{ perspective: '800px', perspectiveOrigin: '50% 0%' }}>
              <motion.h1
                initial={{ rotateX: 8, opacity: 0, y: 20 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(3rem,6.5vw,6.25rem)] font-semibold leading-[1.05] tracking-tight text-[#111] lg:text-white"
              >
                L&apos;automobile
                <br />
                <span className="text-[#C0392B] lg:text-white lg:italic lg:font-medium">autrement.</span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-lg text-[#555] lg:text-white/85 leading-relaxed max-w-md"
            >
              Achat, vente et mandataire de tout type de véhicule, à la demande, à Saint-Martin-de-Crau.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#stock"
                className="inline-block text-sm font-medium uppercase tracking-wider text-white bg-[#111] lg:bg-white lg:text-[#111] px-7 py-3.5 hover:bg-[#C0392B] lg:hover:bg-[#C0392B] lg:hover:text-white transition-colors duration-300"
              >
                Voir le stock
              </Link>
              <Link
                href="/a-propos#rdv"
                className="inline-block text-sm font-medium uppercase tracking-wider text-[#111] lg:text-white border border-[#E8E8E8] lg:border-white/40 px-7 py-3.5 hover:border-[#111] lg:hover:border-white transition-colors duration-300"
              >
                Prendre RDV →
              </Link>
            </motion.div>

            {/* Stats with count-up */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8 pt-8 border-t border-[#E8E8E8] lg:border-white/25"
            >
              <StatItem end={360} suffix="°" label="Photos 360° sur chaque véhicule" delay={0.6} />
              <StatText value="Achat · Vente" label="Et mandat de vente" delay={0.7} />
              <StatText value="Sur demande" label="Tous types de véhicules" delay={0.8} />
            </motion.div>
          </motion.div>

          {/* ── Right column — photo Porsche ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-first lg:order-none -mx-6 lg:mx-0 lg:absolute lg:inset-0"
          >
            {/* Trailer vidéo (boucle, son au choix) */}
            <div className="relative overflow-hidden bg-[#111] aspect-video lg:aspect-auto lg:h-full">
              <video
                ref={videoRef}
                src="/videos/trailer.mp4"
                poster="/videos/trailer-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Trailer Autimmob"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none" />
              <div className="hidden lg:block absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? 'Activer le son' : 'Couper le son'}
                aria-pressed={!muted}
                className="absolute bottom-3 right-3 lg:bottom-6 lg:right-8 flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wider px-3 py-2 transition-colors duration-200"
              >
                {muted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M19 5a10 10 0 0 1 0 14" /></svg>
                )}
                {muted ? 'Activer le son' : 'Son activé'}
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
