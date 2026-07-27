'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import FavoriButton from '@/components/FavoriButton'
import BadgeAutimmob from '@/components/BadgeAutimmob'

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

export default function VehicleClient({ car }) {
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: `${car.marque} ${car.modele} ${car.annee}`, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {}
  }

  const handleWhatsApp = () => {
    if (typeof window === 'undefined') return
    const text = encodeURIComponent(`${car.marque} ${car.modele} ${car.annee} — ${window.location.href}`)
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener')
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="lg:sticky lg:top-24 self-start"
    >
      <div className="border border-[#E8E8E8] p-6">
        {/* Price + favori */}
        <div className="pb-5 border-b border-[#E8E8E8]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#888] mb-1">Prix</p>
              <p className="font-serif text-4xl font-semibold text-[#111]">{formatPrice(car.prix)}</p>
              <p className="text-xs text-[#888] mt-1">Prix TTC · Financement disponible</p>
            </div>
            <FavoriButton slug={car.slug} />
          </div>
          {car.vendeur === 'autimmob' && (
            <div className="mt-3">
              <BadgeAutimmob size="lg" />
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="pt-5 space-y-3">
          <a
            href="tel:+33600000000"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#C0392B] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#a93226] transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3a1 1 0 0 1 1-1h2.5a.5.5 0 0 1 .48.36l1 3.5a.5.5 0 0 1-.26.59l-1.5.75a8 8 0 0 0 3.56 3.56l.75-1.5a.5.5 0 0 1 .59-.26l3.5 1c.24.07.39.3.36.48V13a1 1 0 0 1-1 1C5.37 14 2 9.63 2 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Appeler
          </a>

          <button
            onClick={() => setContactOpen((v) => !v)}
            className="flex items-center justify-center gap-2 w-full py-3.5 border border-[#111] text-[#111] text-sm font-medium uppercase tracking-wider hover:bg-[#111] hover:text-white transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Envoyer un message
          </button>

          {contactOpen && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
              onSubmit={(e) => { e.preventDefault(); setContactOpen(false); alert('Message envoyé !') }}
            >
              <input
                type="text"
                placeholder="Votre nom"
                required
                className="w-full border border-[#E8E8E8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors"
              />
              <input
                type="email"
                placeholder="Votre email"
                required
                className="w-full border border-[#E8E8E8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors"
              />
              <textarea
                placeholder="Votre message"
                rows={3}
                className="w-full border border-[#E8E8E8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors resize-none"
                defaultValue={`Bonjour, je suis intéressé(e) par le ${car.marque} ${car.modele} ${car.annee}.`}
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#111] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#C0392B] transition-colors duration-200"
              >
                Envoyer
              </button>
            </motion.form>
          )}

          <a
            href="/a-propos#financement"
            className="flex items-center justify-center gap-2 w-full py-3 text-xs font-medium uppercase tracking-wider text-[#888] border border-[#E8E8E8] hover:border-[#CCC] hover:text-[#555] transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 6h12" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 9h2M8 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Simuler un financement
          </a>

          {/* Share buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium uppercase tracking-wider text-[#888] border border-[#E8E8E8] hover:border-[#CCC] hover:text-[#555] transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="9" cy="2" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="2" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7.5 2.8L3.5 5.2M7.5 9.2L3.5 6.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {copied ? 'Copié !' : 'Copier le lien'}
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium uppercase tracking-wider text-[#888] border border-[#E8E8E8] hover:border-[#CCC] hover:text-[#555] transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1C3.2 1 1 3.2 1 6c0 .9.2 1.7.6 2.4L1 11l2.7-.6C4.4 10.8 5.2 11 6 11c2.8 0 5-2.2 5-5S8.8 1 6 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M4.5 5.5c.3.8.9 1.6 1.6 2 .1.1.3.1.4 0l.5-.5c.1-.1.3-.1.4 0l1 .7c.2.1.2.3.1.4-.4.8-1.3 1-2.1.6a6 6 0 0 1-2.4-2.4c-.4-.8-.2-1.7.5-2.1.2-.1.4 0 .4.1l.5.9c.1.1.1.2 0 .3h.1Z" fill="currentColor" />
              </svg>
              WhatsApp
            </button>
          </div>
        </div>

        {/* Seller info */}
        <div className="mt-6 pt-5 border-t border-[#E8E8E8]">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#888] mb-3">Vendeur</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#111] flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-sm font-semibold text-white">
                {car.vendeur === 'autimmob' ? 'A' : 'P'}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111]">
                {car.vendeur === 'autimmob' ? 'Autimmob' : 'Particulier vérifié'}
              </p>
              <p className="text-xs text-[#888]">
                {car.vendeur === 'autimmob' ? 'Marseille — Garage professionnel' : 'Annonce mandataire'}
              </p>
            </div>
          </div>
        </div>

        {/* Garanties pill */}
        {car.vendeur === 'autimmob' && (
          <div className="mt-5 pt-5 border-t border-[#E8E8E8] space-y-2">
            {car.garanties.slice(0, 2).map((g, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#555]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {g}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RDV card */}
      <div className="mt-4 bg-[#F5F5F5] border border-[#E8E8E8] p-5">
        <p className="text-sm font-semibold text-[#111]">Voir le véhicule en vrai ?</p>
        <p className="text-xs text-[#888] mt-1 mb-4">Prenez RDV à notre atelier à Marseille.</p>
        <a
          href="/a-propos#rdv"
          className="block text-center text-xs font-medium uppercase tracking-wider text-[#111] border border-[#CCC] px-4 py-2.5 hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-200"
        >
          Prendre rendez-vous
        </a>
      </div>
    </motion.aside>
  )
}
