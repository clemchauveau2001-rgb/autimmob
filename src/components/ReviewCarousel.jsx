'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { REVIEWS, REVIEW_LINKS, REVIEW_EMAIL } from '@/lib/reviews'

function Stars({ n, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i < n ? '#C0392B' : 'none'}>
          <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" stroke="#C0392B" strokeWidth="0.5" />
        </svg>
      ))}
    </div>
  )
}

function ReviewForm() {
  const [note, setNote] = useState(5)
  const [name, setName] = useState('')
  const [car, setCar] = useState('')
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const subject = `Avis client — ${note}/5`
    const body = `Note : ${note}/5\nNom : ${name}\nVéhicule : ${car || '—'}\n\n${text}\n\n(J'autorise Autimmob à publier cet avis sur son site.)`
    window.location.href = `mailto:${REVIEW_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field =
    'w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm text-[#111] placeholder-[#aaa] focus:outline-none focus:border-[#111] transition-colors'

  return (
    <form onSubmit={submit} className="bg-white border border-[#E8E8E8] p-6 sm:p-8 text-left space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[#888] mb-2">Votre note</p>
        <div className="flex gap-1" role="radiogroup" aria-label="Note sur 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={note === n}
              aria-label={`${n} sur 5`}
              onClick={() => setNote(n)}
              className="w-11 h-11 flex items-center justify-center"
            >
              <svg width="26" height="26" viewBox="0 0 12 12" fill={n <= note ? '#C0392B' : 'none'}>
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" stroke="#C0392B" strokeWidth="0.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input className={field} required placeholder="Votre prénom et initiale (ex. Thomas R.)" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={field} placeholder="Véhicule concerné (facultatif)" value={car} onChange={(e) => setCar(e.target.value)} />
      </div>
      <textarea className={field} required rows={4} placeholder="Racontez votre expérience avec Autimmob…" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <p className="text-xs text-[#888]">Votre avis est relu par Autimmob avant d'être publié.</p>
        <button type="submit" className="text-xs font-medium uppercase tracking-wider text-white bg-[#111] px-6 py-3 hover:bg-[#C0392B] transition-colors duration-200">
          Envoyer mon avis
        </button>
      </div>
      {sent && <p className="text-sm text-[#14532d]">Votre application de messagerie s'est ouverte : il ne reste qu'à envoyer le mail. Merci !</p>}
    </form>
  )
}

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (REVIEWS.length < 2) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 6000)
    return () => clearInterval(id)
  }, [])

  const review = REVIEWS[current]
  const average = REVIEWS.length ? REVIEWS.reduce((s, r) => s + r.note, 0) / REVIEWS.length : 0

  const linkBtn =
    'inline-block text-xs font-medium uppercase tracking-wider text-[#111] border border-[#111] px-6 py-3 hover:bg-[#111] hover:text-white transition-all duration-200'

  return (
    <section className="bg-[#F5F5F5] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Avis clients</span>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold mt-2 text-[#111]">
            {REVIEWS.length ? 'Ils nous font confiance' : 'Votre avis compte'}
          </h2>
          {REVIEWS.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-3">
              <Stars n={Math.round(average)} size={16} />
              <span className="text-sm text-[#555]">{average.toFixed(1)}/5 · {REVIEWS.length} avis</span>
            </div>
          )}
          {REVIEWS.length === 0 && (
            <p className="mt-3 text-[#888] max-w-md mx-auto text-sm">
              Vous avez acheté, vendu ou fait confiance à Autimmob ? Dites-nous comment ça s'est passé.
            </p>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {REVIEWS.length > 0 && (
            <>
              <div className="relative" style={{ minHeight: '180px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white border border-[#E8E8E8] p-8"
                  >
                    <p className="font-serif text-5xl text-[#C0392B] leading-none mb-2 select-none">"</p>
                    <p className="text-[#444] leading-relaxed mb-6">{review.text}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#111]">{review.name}</p>
                        <p className="text-xs text-[#888] mt-0.5">{[review.car, review.date].filter(Boolean).join(' · ')}</p>
                      </div>
                      <Stars n={review.note} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {REVIEWS.length > 1 && (
                <div className="flex justify-center gap-1 mt-4">
                  {REVIEWS.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} aria-label={`Avis ${i + 1}`} className="w-6 h-6 flex items-center justify-center">
                      <span className={`block transition-all duration-300 rounded-full ${i === current ? 'w-6 h-1.5 bg-[#C0392B]' : 'w-1.5 h-1.5 bg-[#CCC]'}`} />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            {REVIEW_LINKS.google && (
              <a href={REVIEW_LINKS.google} target="_blank" rel="noopener noreferrer" className={linkBtn}>Avis sur Google →</a>
            )}
            {REVIEW_LINKS.trustpilot && (
              <a href={REVIEW_LINKS.trustpilot} target="_blank" rel="noopener noreferrer" className={linkBtn}>Avis sur Trustpilot →</a>
            )}
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-6 py-3 hover:bg-[#a93226] transition-colors duration-200"
            >
              {showForm ? 'Fermer' : 'Laisser un avis'}
            </button>
          </div>

          {showForm && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <ReviewForm />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
