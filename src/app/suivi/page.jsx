'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const DOSSIERS = {
  'AUT-001': {
    vehicule: 'Porsche 911 SC Targa · 1982',
    statut: 'pret',
    message: 'Votre véhicule est prêt ! Venez le récupérer à votre convenance.',
    steps: [
      { label: 'Réception', description: 'Véhicule pris en charge à l\'atelier.', done: true, date: '03/03/2026' },
      { label: 'Diagnostic', description: 'Contrôle complet moteur et châssis.', done: true, date: '05/03/2026' },
      { label: 'Travaux en cours', description: 'Révision moteur, carrosserie.', done: true, date: '10/03/2026' },
      { label: 'Contrôle qualité', description: 'Essai sur route, vérifications finales.', done: true, date: '12/03/2026' },
      { label: 'Prêt à récupérer', description: 'Votre véhicule vous attend !', done: true, date: '14/03/2026' },
    ],
  },
  'AUT-002': {
    vehicule: 'BMW M3 E46 · 2003',
    statut: 'en_cours',
    message: 'Les travaux sont en cours. Livraison estimée : fin de semaine.',
    steps: [
      { label: 'Réception', description: 'Véhicule pris en charge à l\'atelier.', done: true, date: '08/04/2026' },
      { label: 'Diagnostic', description: 'Contrôle complet, devis validé.', done: true, date: '10/04/2026' },
      { label: 'Travaux en cours', description: 'Embrayage, bagues de triangle.', done: false, current: true },
      { label: 'Contrôle qualité', description: 'Essai sur route, vérifications finales.', done: false },
      { label: 'Prêt à récupérer', description: 'Votre véhicule vous attend !', done: false },
    ],
  },
  'AUT-003': {
    vehicule: 'Renault Mégane II · 2005',
    statut: 'diagnostic',
    message: 'Votre véhicule est en phase de diagnostic. Nous vous contactons sous 48h.',
    steps: [
      { label: 'Réception', description: 'Véhicule pris en charge à l\'atelier.', done: true, date: '06/05/2026' },
      { label: 'Diagnostic', description: 'Contrôle complet en cours.', done: false, current: true },
      { label: 'Travaux', description: 'En attente du diagnostic.', done: false },
      { label: 'Contrôle qualité', description: 'En attente.', done: false },
      { label: 'Prêt à récupérer', description: 'En attente.', done: false },
    ],
  },
}

function Confetti() {
  const colors = ['#C0392B', '#111', '#E8E8E8', '#888', '#F5F5F5']
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    duration: `${1.5 + Math.random() * 1}s`,
    size: `${6 + Math.random() * 8}px`,
    rotation: Math.random() * 360,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0"
          style={{ left: p.left, width: p.size, height: p.size, backgroundColor: p.color, rotate: p.rotation }}
          animate={{ y: '110vh', rotate: p.rotation + 720, opacity: [1, 1, 0] }}
          transition={{ duration: parseFloat(p.duration), delay: parseFloat(p.delay), ease: 'linear' }}
        />
      ))}
    </div>
  )
}

export default function SuiviPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const inputRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const code = input.trim().toUpperCase()
    if (DOSSIERS[code]) {
      setResult(DOSSIERS[code])
      setError(false)
      if (DOSSIERS[code].statut === 'pret') {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    } else {
      setResult(null)
      setError(true)
    }
  }

  const statusConfig = {
    pret: { label: 'Prêt à récupérer', color: '#14532d', bg: '#f0fdf4' },
    en_cours: { label: 'Travaux en cours', color: '#92400e', bg: '#fffbeb' },
    diagnostic: { label: 'Diagnostic', color: '#1e3a5f', bg: '#eff6ff' },
  }

  return (
    <>
      <Navbar />
      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>
      <main className="pt-16 min-h-screen">
        {/* Hero */}
        <section className="bg-[#111] text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Atelier Autimmob</span>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold mt-3 leading-tight">
                Suivi de réparation
              </h1>
              <p className="mt-4 text-[#888] max-w-xl leading-relaxed">
                Entrez votre numéro de dossier pour suivre l'avancement des travaux sur votre véhicule.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-6 py-16">
          {/* Search form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSearch}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              placeholder="Ex : AUT-001"
              className={`flex-1 border px-4 py-3 text-sm font-mono focus:outline-none transition-colors ${
                error ? 'border-[#C0392B] focus:border-[#C0392B]' : 'border-[#E8E8E8] focus:border-[#111]'
              }`}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C0392B] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#a93226] transition-colors duration-200"
            >
              Rechercher
            </button>
          </motion.form>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-[#C0392B]"
            >
              Numéro de dossier introuvable. Vérifiez le code reçu par SMS ou email.
            </motion.p>
          )}

          <p className="mt-3 text-xs text-[#888]">
            Codes de démo : <button onClick={() => setInput('AUT-001')} className="text-[#C0392B] hover:underline">AUT-001</button>, <button onClick={() => setInput('AUT-002')} className="text-[#C0392B] hover:underline">AUT-002</button>, <button onClick={() => setInput('AUT-003')} className="text-[#C0392B] hover:underline">AUT-003</button>
          </p>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={input}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                {/* Dossier header */}
                <div className="border border-[#E8E8E8] p-5 mb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-widest text-[#888]">Dossier {input.trim().toUpperCase()}</p>
                      <p className="font-serif text-xl font-semibold text-[#111] mt-1">{result.vehicule}</p>
                    </div>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 flex-shrink-0"
                      style={{ color: statusConfig[result.statut].color, background: statusConfig[result.statut].bg }}
                    >
                      {statusConfig[result.statut].label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#555]">{result.message}</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E8E8E8]" />
                  <div className="space-y-5">
                    {result.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.07 }}
                        className="relative pl-8"
                      >
                        <span
                          className={`absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors ${
                            step.done
                              ? 'bg-[#14532d] border-[#14532d]'
                              : step.current
                              ? 'bg-white border-[#C0392B] shadow-[0_0_0_3px_rgba(192,57,43,0.15)]'
                              : 'bg-white border-[#DDD]'
                          }`}
                        />
                        <p className={`text-sm font-semibold ${step.done ? 'text-[#111]' : step.current ? 'text-[#C0392B]' : 'text-[#888]'}`}>
                          {step.label}
                          {step.current && (
                            <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#C0392B] animate-pulse" />
                          )}
                        </p>
                        <p className={`text-xs mt-0.5 ${step.done || step.current ? 'text-[#555]' : 'text-[#AAA]'}`}>
                          {step.description}
                        </p>
                        {step.date && (
                          <p className="text-[10px] text-[#888] mt-0.5 font-mono">{step.date}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex gap-3">
                  <a
                    href="tel:+33600000000"
                    className="text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-5 py-2.5 hover:bg-[#a93226] transition-colors duration-200"
                  >
                    Appeler le garage
                  </a>
                  <Link
                    href="/rdv"
                    className="text-xs font-medium uppercase tracking-wider text-[#111] border border-[#111] px-5 py-2.5 hover:bg-[#111] hover:text-white transition-all duration-200"
                  >
                    Prendre RDV
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </>
  )
}
