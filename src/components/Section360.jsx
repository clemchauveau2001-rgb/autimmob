'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import CarSilhouette from './CarSilhouette'

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function Section360() {
  return (
    <section className="bg-[#0D0D0D] text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text — scale fade in */}
          <motion.div {...scaleIn} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">
              Technologie exclusive
            </span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold mt-3 leading-tight">
              Votre voiture vue
              <br />
              sous tous les angles.
            </h2>
            <p className="mt-5 text-[#888] leading-relaxed max-w-md">
              Nous équipons chaque véhicule d'une séance photo 360°. Explorez l'extérieur, l'habitacle, les détails et le compartiment moteur — avant même de vous déplacer.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Rotation interactive à la souris ou au doigt',
                'Vue intérieure complète (tableau de bord, sièges)',
                'Détails moteur et jantes en haute résolution',
                'Compatible mobile et tablette',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-[#aaa]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C0392B] flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <Link
              href="/voiture/porsche-911-sc-targa-1982"
              className="inline-block mt-8 text-xs font-medium uppercase tracking-widest text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-[#111] transition-all duration-300"
            >
              Essayer sur la 911 →
            </Link>
          </motion.div>

          {/* Orbital visual — scale fade in with slight delay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative flex items-center justify-center" style={{ height: '320px' }}>
              {/* Outer ring */}
              <motion.div
                className="absolute w-72 h-72 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C0392B]" />
              </motion.div>
              {/* Middle ring */}
              <motion.div
                className="absolute w-52 h-52 rounded-full border border-white/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
              </motion.div>
              {/* Car */}
              <motion.div
                className="relative z-10 w-56"
                animate={{ rotateY: [0, 15, 0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CarSilhouette
                  bodyColor="#e8e8e8"
                  windowColor="rgba(150,200,255,0.2)"
                  wheelColor="#333"
                  rimColor="#777"
                  withShadow={false}
                  className="w-full"
                />
              </motion.div>
              <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-white/30">Extérieur</div>
              <div className="absolute bottom-8 left-4 text-[10px] uppercase tracking-widest text-white/30">Moteur</div>
              <div className="absolute top-1/2 right-0 text-[10px] uppercase tracking-widest text-white/30">Intérieur</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
