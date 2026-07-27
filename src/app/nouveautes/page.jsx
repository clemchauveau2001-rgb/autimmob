'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarSilhouette from '@/components/CarSilhouette'

const BIENTOT = [
  {
    id: 'b1',
    marque: 'Porsche',
    modele: '944 S2',
    annee: 1990,
    prix_estime: '~22 000 €',
    moteur: '3.0L 4-cylindres',
    puissance: '211 ch',
    couleur: 'Argent',
    statut: 'En cours de remise en état',
    delai: 'Disponible mi-juin',
    description: 'Un 944 S2 dans un état de conservation remarquable. Moteur 3.0L atmosphérique en pleine forme, carrosserie saine. En cours de préparation dans notre atelier.',
    category_color: '#C0392B',
    category_bg: '#fef2f2',
    category_label: 'Porsche',
  },
  {
    id: 'b2',
    marque: 'BMW',
    modele: '2002 Turbo',
    annee: 1974,
    prix_estime: 'Sur estimation',
    moteur: '2.0L Turbo',
    puissance: '170 ch',
    couleur: 'Blanc Polaire',
    statut: 'Récemment acquis',
    delai: 'Disponible fin juin',
    description: 'Le mythique 2002 Turbo, première voiture turbo produite en série en Europe. Vient d\'être acquis, diagnostic en cours. Un vrai collector.',
    category_color: '#1e3a5f',
    category_bg: '#eff6ff',
    category_label: 'Youngtimer',
  },
  {
    id: 'b3',
    marque: 'Alfa Romeo',
    modele: 'GTV 916',
    annee: 1997,
    prix_estime: '~12 500 €',
    moteur: '2.0L Twin Spark',
    puissance: '150 ch',
    couleur: 'Rouge Alfa',
    statut: 'Arrivée imminente',
    delai: 'Disponible semaine prochaine',
    description: 'GTV 916 en excellent état, carnet complet. Une des plus belles lignes de l\'époque signée Pininfarina. Presque prête, dernières vérifications en cours.',
    category_color: '#92400e',
    category_bg: '#fffbeb',
    category_label: 'Youngtimer',
    soon: true,
  },
]

const STATUT_CONFIG = {
  'Arrivée imminente':       { dot: 'bg-[#C0392B] animate-pulse', text: 'text-[#C0392B]' },
  'En cours de remise en état': { dot: 'bg-[#92400e]',           text: 'text-[#92400e]' },
  'Récemment acquis':        { dot: 'bg-[#1e3a5f]',               text: 'text-[#1e3a5f]' },
}

function CarComingSoonCard({ car, index }) {
  const [alerted, setAlerted] = useState(false)
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const s = STATUT_CONFIG[car.statut] || STATUT_CONFIG['Récemment acquis']

  const handleAlert = (e) => {
    e.preventDefault()
    setAlerted(true)
    setOpen(false)
    setEmail('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border border-[#E8E8E8] bg-white overflow-hidden"
    >
      {/* Image area */}
      <div className="relative bg-[#F0F0F0] overflow-hidden" style={{ aspectRatio: '16/10' }}>
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1"
            style={{ color: car.category_color, background: car.category_bg }}
          >
            {car.category_label}
          </span>
        </div>

        {/* "Bientôt" stamp */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#111] text-white">
            Bientôt
          </span>
        </div>

        {/* Car silhouette — blurred / low opacity */}
        <div className="absolute inset-0 flex items-center justify-center px-5 pb-2 pt-8" style={{ filter: 'blur(2px)', opacity: 0.35 }}>
          <CarSilhouette className="w-full h-auto" withShadow={false} />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F0F0]/60 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Status dot + label */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${s.text}`}>{car.statut}</span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-[#111] leading-tight">
          {car.marque} {car.modele}
        </h3>
        <p className="mt-0.5 text-xs text-[#888] tracking-wide">
          {car.annee} · {car.moteur} · {car.puissance}
        </p>

        <p className="mt-3 text-sm text-[#555] leading-relaxed">{car.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#888]">Prix estimé</p>
            <p className="text-xl font-semibold text-[#111] mt-0.5">{car.prix_estime}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#888]">Délai</p>
            <p className="text-xs font-semibold text-[#111] mt-0.5">{car.delai}</p>
          </div>
        </div>

        {/* Alert button */}
        <div className="mt-4">
          {alerted ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-[#14532d] font-medium py-2.5"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5l3 3 6-6" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Vous serez alerté dès la mise en vente !
            </motion.div>
          ) : (
            <>
              <button
                onClick={() => setOpen((v) => !v)}
                className="w-full py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white bg-[#111] hover:bg-[#C0392B] transition-colors duration-200"
              >
                {open ? 'Annuler' : '🔔 M\'alerter à la mise en vente'}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleAlert}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 mt-2">
                      <input
                        type="email"
                        required
                        placeholder="votre@email.fr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border border-[#E8E8E8] px-3 py-2 text-xs focus:outline-none focus:border-[#111] transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#C0392B] text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-[#a93226] transition-colors"
                      >
                        OK
                      </button>
                    </div>
                    <p className="text-[10px] text-[#888] mt-1.5">Un email dès qu'il est en vente. Aucun spam.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function NouveautesPage() {
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
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Avant tout le monde</span>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold mt-3 leading-tight">
                Les nouveautés
              </h1>
              <p className="mt-4 text-[#888] max-w-xl leading-relaxed">
                Ces véhicules sont dans notre atelier, pas encore en vente. Ils arrivent bientôt — soyez le premier alerté.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cars grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          {BIENTOT.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BIENTOT.map((car, i) => (
                <CarComingSoonCard key={car.id} car={car} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl font-semibold text-[#111] mb-3">Rien pour l'instant</p>
              <p className="text-[#888]">Revenez bientôt, de nouveaux véhicules arrivent régulièrement.</p>
            </div>
          )}
        </section>

        {/* Info band */}
        <section className="bg-[#F5F5F5] border-t border-[#E8E8E8] py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: '🔔', titre: 'Alerte email', desc: 'Soyez prévenu dès qu\'un véhicule passe en vente.' },
                { icon: '🔍', titre: 'Inspection complète', desc: 'Chaque immanquable est contrôlé et préparé avant mise en vente.' },
                { icon: '🤝', titre: 'Réservation possible', desc: 'Contactez-nous pour réserver un véhicule avant sa mise en ligne.' },
              ].map((item, i) => (
                <motion.div
                  key={item.titre}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <p className="font-serif text-lg font-semibold text-[#111] mb-1">{item.titre}</p>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
