'use client'

import { motion } from 'motion/react'

export default function VehicleHistory({ historique }) {
  if (!historique) return null

  const rows = [
    { label: 'Propriétaires', value: `${historique.nb_proprietaires} au total`, icon: '👤' },
    { label: '1ère mise en circulation', value: historique.premiere_mise_en_circulation, icon: '📅' },
    { label: 'Pays d\'origine', value: historique.pays_origine, icon: '🌍' },
    { label: 'Carnet d\'entretien', value: historique.carnet_entretien ? 'Complet et présent' : 'Non disponible', icon: '📋', positive: historique.carnet_entretien },
    { label: 'Validité CT', value: historique.ct_validite, icon: '✅' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10"
    >
      <h2 className="font-serif text-2xl font-semibold text-[#111] mb-4">Historique du véhicule</h2>
      <div className="border border-[#E8E8E8] overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center gap-4 px-5 py-3.5 ${i < rows.length - 1 ? 'border-b border-[#E8E8E8]' : ''}`}
          >
            <span className="text-base w-5 flex-shrink-0">{row.icon}</span>
            <p className="text-xs font-medium uppercase tracking-widest text-[#888] w-44 flex-shrink-0">{row.label}</p>
            <p className={`text-sm font-semibold flex-1 ${row.positive === false ? 'text-[#888]' : 'text-[#111]'}`}>
              {row.value}
              {row.positive === true && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline ml-1.5 -mt-0.5">
                  <path d="M2 6l3 3 5-5" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
