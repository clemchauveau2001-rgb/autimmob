'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { sendContact } from '@/lib/sendContact'

const input =
  'w-full border border-[#E8E8E8] bg-white px-3.5 py-3 text-sm text-[#111] focus:outline-none focus:border-[#111] transition-colors'
const label = 'block text-[10px] font-medium uppercase tracking-widest text-[#888] mb-1.5'

export default function EstimationModal({ open, onClose }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const fields = Object.fromEntries(fd.entries())
    const website = fields.website
    delete fields.website
    setStatus('sending')
    const res = await sendContact('estimation', fields, website)
    if (res.ok) {
      setStatus('sent')
      form.reset()
    } else {
      setError(res.error)
      setStatus('error')
    }
  }

  const close = () => {
    onClose()
    setTimeout(() => setStatus('idle'), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Demande d'estimation"
            className="bg-white w-full sm:max-w-lg max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} aria-label="Fermer" className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-[#888] hover:text-[#111]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>

            {status === 'sent' ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 bg-[#f0fdf4] border border-[#14532d]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 11l5 5 11-11" stroke="#14532d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="font-serif text-2xl font-semibold text-[#111] mb-2">Demande envoyée !</p>
                <p className="text-sm text-[#888]">Pascal vous répond sous 24h avec votre estimation.</p>
                <button onClick={close} className="mt-6 text-xs font-medium uppercase tracking-wider text-white bg-[#111] px-6 py-3 hover:bg-[#C0392B] transition-colors">Fermer</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#111]">Estimation gratuite</h2>
                  <p className="text-sm text-[#888] mt-1">Décrivez votre voiture, Pascal vous répond sous 24h.</p>
                </div>
                {/* champ piège anti-spam */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={label}>Prénom</label><input required name="prenom" className={input} /></div>
                  <div><label className={label}>Nom</label><input required name="nom" className={input} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={label}>Téléphone</label><input required type="tel" name="telephone" className={input} /></div>
                  <div><label className={label}>Email</label><input required type="email" name="email" className={input} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={label}>Marque</label><input required name="marque" placeholder="Peugeot" className={input} /></div>
                  <div><label className={label}>Modèle</label><input required name="modele" placeholder="206 CC" className={input} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={label}>Année</label><input required name="annee" inputMode="numeric" placeholder="2008" className={input} /></div>
                  <div><label className={label}>Kilométrage</label><input required name="km" inputMode="numeric" placeholder="120 000" className={input} /></div>
                </div>
                <div>
                  <label className={label}>Message (optionnel)</label>
                  <textarea name="message" rows={3} placeholder="État, options, entretien, prix souhaité…" className={`${input} resize-none`} />
                </div>
                {status === 'error' && <p className="text-sm text-[#C0392B]">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-[#C0392B] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#a93226] transition-colors disabled:opacity-60"
                >
                  {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
