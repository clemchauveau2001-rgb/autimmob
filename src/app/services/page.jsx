'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const SERVICES = [
  {
    titre: 'Vente de véhicule',
    description: 'Chaque véhicule vendu par Autimmob est inspecté, remis en état si nécessaire, photographié à 360° et livré avec son historique complet.',
    prix: 'Voir le stock',
    garanties: ['Garantie 6 mois pièces & main d\'œuvre', 'Contrôle technique valide', 'Historique vérifié', 'Photos 360° sur chaque véhicule'],
    lien: '/#stock',
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 22L8 10h16l4 12H4z" strokeLinejoin="round" />
        <path d="M10 22v4M22 22v4" strokeLinecap="round" />
        <circle cx="11" cy="17" r="2" />
        <circle cx="21" cy="17" r="2" />
        <path d="M16 6v-4M13 4l3-2 3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titre: 'Mandataire',
    description: 'Nous vendons votre voiture pour vous : photos 360°, annonces, visites, négociation. Vous fixez le prix, nous gérons le reste.',
    prix: '5 % du prix de vente',
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4l4 8h8l-6.5 5 2.5 8L16 21l-8 4 2.5-8L4 12h8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titre: 'Financement auto',
    description: 'Partenariat avec organismes de crédit agréés. Simulation gratuite, réponse sous 24h, taux compétitifs.',
    prix: 'Simulation gratuite',
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="8" width="26" height="18" rx="2" />
        <path d="M3 14h26" strokeLinecap="round" />
        <path d="M8 20h4M18 20h6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  const [hovered, setHovered] = useState(null)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#111] text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Notre atelier</span>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold mt-3 leading-tight">
                Nos services
              </h1>
              <p className="mt-4 text-[#888] max-w-xl leading-relaxed">
                De la révision courante à la remise en état complète, notre équipe prend en charge votre véhicule avec le même soin qu'un modèle de collection.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E8E8]">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.titre}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative bg-white p-8 transition-colors duration-300 group overflow-hidden ${
                  hovered === i ? 'bg-[#111]' : ''
                }`}
              >
                {/* Fill background on hover */}
                <motion.div
                  className="absolute inset-0 bg-[#111] pointer-events-none"
                  initial={false}
                  animate={{ opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className={`mb-4 transition-colors duration-300 ${hovered === i ? 'text-[#C0392B]' : 'text-[#111]'}`}>
                    {s.icon}
                  </div>
                  <h3 className={`font-serif text-xl font-semibold mb-2 transition-colors duration-300 ${hovered === i ? 'text-white' : 'text-[#111]'}`}>
                    {s.titre}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${hovered === i ? 'text-white/60' : 'text-[#666]'}`}>
                    {s.description}
                  </p>
                  <p className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${hovered === i ? 'text-[#C0392B]' : 'text-[#888]'}`}>
                    {s.prix}
                  </p>
                  {s.garanties && (
                    <ul className="mt-4 space-y-1.5">
                      {s.garanties.map((g) => (
                        <li key={g} className="flex items-center gap-2">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke={hovered === i ? '#C0392B' : '#14532d'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className={`text-xs transition-colors duration-300 ${hovered === i ? 'text-white/60' : 'text-[#555]'}`}>{g}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.lien && (
                    <Link
                      href={s.lien}
                      className={`mt-5 inline-block text-[10px] font-semibold uppercase tracking-widest border px-4 py-2 transition-all duration-300 ${
                        hovered === i
                          ? 'border-white/30 text-white hover:bg-white hover:text-[#111]'
                          : 'border-[#111] text-[#111] hover:bg-[#111] hover:text-white'
                      }`}
                    >
                      Voir le stock →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F5F5F5] border-t border-[#E8E8E8] py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl font-semibold text-[#111] mb-4">Besoin d'un devis ?</h2>
            <p className="text-[#888] mb-8 max-w-md mx-auto">
              Contactez-nous ou prenez directement rendez-vous à notre atelier à Marseille.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rdv"
                className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-6 py-3 hover:bg-[#a93226] transition-colors duration-200"
              >
                Prendre RDV
              </Link>
              <a
                href="tel:+33600000000"
                className="inline-block text-xs font-medium uppercase tracking-wider text-[#111] border border-[#111] px-6 py-3 hover:bg-[#111] hover:text-white transition-all duration-200"
              >
                Appeler le garage
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
