'use client'

import { motion } from 'motion/react'

const STEPS = [
  {
    num: '01',
    title: 'On inspecte',
    desc: "Chaque véhicule est minutieusement contrôlé par notre mécanicien. Diagnostic complet, test routier, relevé d'anomalies.",
  },
  {
    num: '02',
    title: 'On remet en état',
    desc: 'Vidange, freins, distribution, sellerie — tout ce qui nécessite une intervention est traité avant mise en vente.',
  },
  {
    num: '03',
    title: 'On documente tout',
    desc: "Photos 360°, carnet d'entretien vérifié, historique des propriétaires. Transparence totale sur chaque annonce.",
  },
  {
    num: '04',
    title: 'On vous accompagne',
    desc: "Financement, livraison, garantie, mandataire — nous sommes là de A à Z, même après l'achat.",
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Notre méthode</span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold mt-2 text-[#111]">
          Comment ça marche
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: i * 0.13,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="font-serif text-5xl font-semibold text-[#C0392B] opacity-25 leading-none">
              {step.num}
            </span>
            <h3 className="font-serif text-xl font-semibold mt-3 text-[#111]">{step.title}</h3>
            <p className="mt-2 text-sm text-[#888] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
