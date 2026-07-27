'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const REVIEWS = [
  {
    name: 'Thomas R.',
    car: 'Porsche 911 SC Targa',
    text: 'Expérience irréprochable. La voiture était exactement comme décrite, voire mieux en vrai. Le dossier de remise en état fourni par Autimmob m\'a totalement rassuré. Je recommande sans hésitation.',
    note: 5,
    date: 'Avril 2026',
  },
  {
    name: 'Sophie M.',
    car: 'BMW M3 E46',
    text: 'Garage sérieux, passionné et honnête. Ils ne cachent rien et expliquent tout le travail effectué. La M3 roule parfaitement depuis 3 mois sans aucun souci. Merci à toute l\'équipe.',
    note: 5,
    date: 'Mars 2026',
  },
  {
    name: 'Kevin D.',
    car: 'Volkswagen Golf GTI Mk3',
    text: 'J\'ai vendu ma Golf via Autimmob en mandat. Tout s\'est fait rapidement et au bon prix. Communication claire, pas de surprise. Ce sera le même garage pour ma prochaine voiture.',
    note: 5,
    date: 'Février 2026',
  },
]

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i < n ? '#C0392B' : 'none'}>
          <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" stroke="#C0392B" strokeWidth="0.5" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % REVIEWS.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }

  const review = REVIEWS[current]

  return (
    <section className="bg-[#F5F5F5] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Témoignages</span>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold mt-2 text-[#111]">
            Ils nous font confiance
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden" style={{ minHeight: '180px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d) => ({ x: d * 40, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d) => ({ x: d * -40, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-[#E8E8E8] p-8"
              >
                {/* Quote mark */}
                <p className="font-serif text-5xl text-[#C0392B] leading-none mb-2 select-none">"</p>
                <p className="text-[#444] leading-relaxed mb-6">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#111]">{review.name}</p>
                    <p className="text-xs text-[#888] mt-0.5">{review.car} · {review.date}</p>
                  </div>
                  <Stars n={review.note} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-6 h-1.5 bg-[#C0392B]' : 'w-1.5 h-1.5 bg-[#CCC] hover:bg-[#888]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
