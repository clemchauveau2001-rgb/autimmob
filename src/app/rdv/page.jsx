'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const MOTIFS = ['Essai d\'un véhicule', 'Remise de véhicule', 'Vendre ma voiture', 'Autre']

// Crénaux selon le jour : semaine = 17h-19h30, week-end = toutes les heures
function getCreneaux(dateStr) {
  if (!dateStr) return []
  const day = new Date(dateStr).getDay() // 0=dim, 6=sam
  const isWeekend = day === 0 || day === 6
  if (isWeekend) {
    return ['9h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00', '19h00']
  }
  return ['17h00', '17h30', '18h00', '18h30', '19h00', '19h30']
}

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}
function getMaxDate() {
  const d = new Date()
  d.setDate(d.getDate() + 60)
  return d.toISOString().split('T')[0]
}

function RdvForm() {
  const [sent, setSent] = useState(false)
  const [motif, setMotif] = useState('')
  const [date, setDate] = useState('')
  const [creneau, setCreneau] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const creneaux = getCreneaux(date)
  const isWeekend = date ? [0, 6].includes(new Date(date).getDay()) : false

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-2"
    >
      <div className="border border-[#E8E8E8] p-8">
        <h2 className="font-serif text-2xl font-semibold text-[#111] mb-1">Demande de rendez-vous</h2>
        <p className="text-sm text-[#888] mb-8">Remplissez le formulaire, Pascal vous répond sous 24h.</p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <div className="w-14 h-14 bg-[#f0fdf4] border border-[#14532d]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 11l5 5 11-11" stroke="#14532d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-serif text-2xl font-semibold text-[#111] mb-2">Demande envoyée !</p>
              <p className="text-[#888] text-sm">Pascal vous contacte sous 24h pour confirmer le créneau.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Nom + Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Prénom</label>
                  <input required type="text" placeholder="Jean" className="w-full border border-[#E8E8E8] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Nom</label>
                  <input required type="text" placeholder="Dupont" className="w-full border border-[#E8E8E8] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors" />
                </div>
              </div>

              {/* Tel + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Téléphone</label>
                  <input required type="tel" placeholder="06 00 00 00 00" className="w-full border border-[#E8E8E8] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Email</label>
                  <input required type="email" placeholder="jean@email.fr" className="w-full border border-[#E8E8E8] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors" />
                </div>
              </div>

              {/* Motif */}
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Motif du rendez-vous</label>
                <div className="flex flex-wrap gap-2">
                  {MOTIFS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMotif(m)}
                      className={`text-xs font-medium px-3.5 py-1.5 border transition-all duration-150 ${
                        motif === m
                          ? 'bg-[#111] text-white border-[#111]'
                          : 'border-[#E8E8E8] text-[#555] hover:border-[#CCC]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date + créneau */}
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Date souhaitée</label>
                <input
                  required
                  type="date"
                  min={getMinDate()}
                  max={getMaxDate()}
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setCreneau('') }}
                  className="w-full border border-[#E8E8E8] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors"
                />
                {date && (
                  <p className="text-[10px] text-[#888] mt-1.5">
                    {isWeekend ? 'Week-end · créneaux disponibles toute la journée' : 'Semaine · créneaux disponibles de 17h à 19h30'}
                  </p>
                )}
              </div>

              {/* Créneau horaire */}
              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Créneau horaire</label>
                  <div className={`grid gap-2 ${isWeekend ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-3 sm:grid-cols-6'}`}>
                    {creneaux.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setCreneau(h)}
                        className={`py-2 text-xs font-semibold border transition-all duration-150 ${
                          creneau === h
                            ? 'bg-[#111] text-white border-[#111]'
                            : 'border-[#E8E8E8] text-[#555] hover:border-[#CCC] hover:text-[#111]'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5">Message (optionnel)</label>
                <textarea rows={3} placeholder="Précisez votre demande..." className="w-full border border-[#E8E8E8] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors resize-none" />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C0392B] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#a93226] transition-colors duration-200"
              >
                Envoyer ma demande
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function RdvPage() {
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
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Prise de rendez-vous</span>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold mt-3 leading-tight">
                Venez nous rencontrer
              </h1>
              <p className="mt-4 text-[#888] max-w-xl leading-relaxed">
                Essai d'un véhicule, consultation mécanique ou remise de voiture — choisissez votre créneau directement dans notre agenda.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calendly embed area */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-2xl font-semibold text-[#111] mb-6">Informations pratiques</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#F5F5F5] border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1.5C6.5 1.5 4.5 3.5 4.5 6c0 3.5 4.5 10.5 4.5 10.5S13.5 9.5 13.5 6c0-2.5-2-4.5-4.5-4.5Z" stroke="#111" strokeWidth="1.3" />
                      <circle cx="9" cy="6" r="1.5" stroke="#111" strokeWidth="1.3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111]">Adresse</p>
                    <p className="text-sm text-[#888] mt-0.5">Autimmob · Marseille, France</p>
                    <p className="text-xs text-[#888] mt-0.5">Adresse complète communiquée par SMS après confirmation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#F5F5F5] border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="7" stroke="#111" strokeWidth="1.3" />
                      <path d="M9 5v4.5l3 1.5" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111]">Horaires</p>
                    <p className="text-sm text-[#888] mt-0.5">Lun — Sam : 9h → 19h</p>
                    <p className="text-xs text-[#888] mt-0.5">Sur rendez-vous uniquement</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#F5F5F5] border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M2 3.5a1 1 0 0 1 1-1h3a.5.5 0 0 1 .47.33l1.3 4a.5.5 0 0 1-.22.6l-2 1a10 10 0 0 0 4.5 4.5l1-2a.5.5 0 0 1 .6-.22l4 1.3a.5.5 0 0 1 .33.47V15a1 1 0 0 1-1 1C7 16 2 11 2 3.5z" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111]">Contact direct</p>
                    <a href="tel:+33600000000" className="text-sm text-[#888] mt-0.5 hover:text-[#111] transition-colors block">06 00 00 00 00</a>
                    <a href="mailto:contact@autimmob.fr" className="text-xs text-[#888] mt-0.5 hover:text-[#111] transition-colors block">contact@autimmob.fr</a>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Formulaire de demande de RDV */}
            <RdvForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
