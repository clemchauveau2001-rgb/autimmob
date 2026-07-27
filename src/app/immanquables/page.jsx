'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import { cars } from '@/lib/cars'

// Voitures immanquables = même catégorie que l'onglet stock
const ACCESSIBLES = cars.filter((c) => c.category === 'immanquable')

// Sélections budget à venir
const BONS_PLANS = [
  {
    id: 'bp1',
    marque: 'Peugeot',
    modele: '206 CC',
    annee: 2004,
    prix: '~3 500 €',
    moteur: '1.6L 16V',
    puissance: '110 ch',
    km: '142 000 km',
    description: 'Cabriolet compact fiable, toit électrique fonctionnel. Idéal pour l\'été.',
    badge: 'Bientôt',
  },
  {
    id: 'bp2',
    marque: 'Citroën',
    modele: 'C3 Pluriel',
    annee: 2005,
    prix: '~2 800 €',
    moteur: '1.4L',
    puissance: '75 ch',
    km: '98 000 km',
    description: 'Petite citadine originale, bon état général, idéale premier véhicule.',
    badge: 'Bientôt',
  },
  {
    id: 'bp3',
    marque: 'Toyota',
    modele: 'Yaris II',
    annee: 2007,
    prix: '~4 200 €',
    moteur: '1.0L VVT-i',
    puissance: '69 ch',
    km: '112 000 km',
    description: 'Fiabilité légendaire Toyota. Entretien complet, prête à rouler.',
    badge: 'Bientôt',
  },
]

const BUDGETS = [
  { label: 'Moins de 5 000 €', desc: 'Mobilité immédiate', color: '#14532d', bg: '#f0fdf4' },
  { label: '5 000 – 10 000 €', desc: 'Bon rapport qualité/prix', color: '#92400e', bg: '#fffbeb' },
  { label: '10 000 – 15 000 €', desc: 'Polyvalence & plaisir', color: '#1e3a5f', bg: '#eff6ff' },
]

function BonPlanCard({ car, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border border-[#E8E8E8] bg-white p-5 relative overflow-hidden"
    >
      {/* Badge */}
      <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#F5F5F5] text-[#888]">
        {car.badge}
      </span>

      <p className="text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1">{car.annee} · {car.km}</p>
      <h3 className="font-serif text-lg font-semibold text-[#111]">{car.marque} {car.modele}</h3>
      <p className="text-xs text-[#888] mt-0.5">{car.moteur} · {car.puissance}</p>
      <p className="text-sm text-[#555] mt-3 leading-relaxed">{car.description}</p>
      <p className="mt-3 text-xl font-semibold text-[#111]">{car.prix}</p>

      <a
        href={`mailto:contact@autimmob.fr?subject=Intérêt pour ${car.marque} ${car.modele}`}
        className="mt-4 flex items-center justify-center w-full py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white bg-[#111] hover:bg-[#C0392B] transition-colors duration-200"
      >
        Me prévenir à la mise en vente
      </a>
    </motion.div>
  )
}

export default function ImmanquablesPage() {
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
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Petits prix, grande fiabilité</span>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold mt-3 leading-tight">
                Les immanquables
              </h1>
              <p className="mt-4 text-[#888] max-w-xl leading-relaxed">
                Des véhicules fiables, contrôlés et accessibles. Pour ceux qui veulent rouler bien sans se ruiner — chaque voiture est vérifiée par Pascal avant la mise en vente.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Budgets pills */}
        <section className="border-b border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap gap-3">
            {BUDGETS.map((b) => (
              <span
                key={b.label}
                className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 flex items-center gap-2"
                style={{ color: b.color, background: b.bg }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: b.color }} />
                {b.label} — {b.desc}
              </span>
            ))}
          </div>
        </section>

        {/* Stock accessible */}
        {ACCESSIBLES.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-14">
            <div className="mb-8">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Disponibles maintenant</span>
              <h2 className="font-serif text-3xl font-semibold mt-2 text-[#111]">En stock</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACCESSIBLES.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-[#E8E8E8]" />
        </div>

        {/* Bons plans à venir */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Bientôt disponibles</span>
            <h2 className="font-serif text-3xl font-semibold mt-2 text-[#111]">Bons plans à venir</h2>
            <p className="mt-2 text-[#888] text-sm">Ces véhicules arrivent prochainement. Laissez votre email pour être alerté en premier.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BONS_PLANS.map((car, i) => (
              <BonPlanCard key={car.id} car={car} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F5F5F5] border-t border-[#E8E8E8] py-14">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#111] mb-3">Un budget précis en tête ?</h2>
            <p className="text-[#888] mb-8 max-w-sm mx-auto text-sm">
              Dites-nous votre enveloppe et ce que vous cherchez — Pascal vous trouve le bon véhicule.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+33600000000"
                className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-6 py-3 hover:bg-[#a93226] transition-colors duration-200"
              >
                Appeler Pascal
              </a>
              <a
                href="mailto:contact@autimmob.fr?subject=Recherche véhicule accessible"
                className="inline-block text-xs font-medium uppercase tracking-wider text-[#111] border border-[#111] px-6 py-3 hover:bg-[#111] hover:text-white transition-all duration-200"
              >
                Envoyer un message
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
