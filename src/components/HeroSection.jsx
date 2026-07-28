'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'

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
      <p className="font-serif text-2xl font-semibold text-[#111] tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-xs text-[#888] mt-0.5 tracking-wide">{label}</p>
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
  const carY = useTransform(scrollY, [0, 600], [0, -40])

  return (
    <section className="pt-16 min-h-[88vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left column — text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ y: textY }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#888] mb-6"
            >
              Garage automobile · Marseille
            </motion.span>

            {/* Title with rotateX perspective effect */}
            <motion.div variants={fadeUp} style={{ perspective: '800px', perspectiveOrigin: '50% 0%' }}>
              <motion.h1
                initial={{ rotateX: 8, opacity: 0, y: 20 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-[#111]"
              >
                L&apos;automobile
                <br />
                <span className="text-[#C0392B]">autrement.</span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-lg text-[#555] leading-relaxed max-w-md"
            >
              Achat, vente, réparation et mandataire. Spécialiste Porsche, youngtimers et sportives à Marseille — avec photo 360° sur chaque véhicule.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#stock"
                className="inline-block text-sm font-medium uppercase tracking-wider text-white bg-[#111] px-7 py-3.5 hover:bg-[#C0392B] transition-colors duration-300"
              >
                Voir le stock
              </Link>
              <Link
                href="/a-propos#rdv"
                className="inline-block text-sm font-medium uppercase tracking-wider text-[#111] border border-[#E8E8E8] px-7 py-3.5 hover:border-[#111] transition-colors duration-300"
              >
                Prendre RDV →
              </Link>
            </motion.div>

            {/* Stats with count-up */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-8 pt-8 border-t border-[#E8E8E8]"
            >
              <StatItem end={47} suffix="+" label="Véhicules remis en état" delay={0.6} />
              <StatItem end={360} suffix="°" label="Technologie exclusive" delay={0.7} />
              <StatItem end={100} suffix="%" label="Honnêteté & transparence" delay={0.8} />
            </motion.div>
          </motion.div>

          {/* ── Right column — photo Porsche ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
            style={{ y: carY }}
          >
            {/* Cadre photo principal */}
            <div className="relative overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/hero.jpg"
                alt="Porsche 911 Turbo Cabriolet — Autimmob Marseille"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 50vw, 640px"
              />
              {/* Légère vignette en bas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Trait rouge décoratif */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#C0392B]/30 pointer-events-none" style={{ aspectRatio: '4/3' }} />

            {/* Badge Spécialiste Porsche */}
            <motion.div
              className="absolute top-4 -left-4 bg-white border border-[#E8E8E8] shadow-lg px-3 py-1.5 text-xs font-semibold text-[#C0392B] uppercase tracking-widest"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              Spécialiste Porsche
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
