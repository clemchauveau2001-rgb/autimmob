'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EstimationModal from '@/components/EstimationModal'
import { sendContact } from '@/lib/sendContact'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L4 8v6c0 6 4 10.5 10 12 6-1.5 10-6 10-12V8L14 3z" stroke="#C0392B" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 14l3.5 3.5L19 10" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Contrôle & transparence',
    desc: 'Chaque véhicule est contrôlé selon 133 points avant d\'être proposé. Nous vous communiquons son état réel, son historique et ses points d\'attention, sans mauvaise surprise.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="#C0392B" strokeWidth="1.5" />
        <path d="M10 8V6a4 4 0 1 1 8 0v2" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 14v3" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Achat de véhicules',
    desc: 'Vous avez une voiture à vendre ? On vous propose une estimation gratuite et un rachat rapide au juste prix.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 21L8 8l6-3 6 3 3 13" stroke="#C0392B" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="14" cy="15" r="3" stroke="#C0392B" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Mandataire auto',
    desc: 'Vous êtes particulier et souhaitez vendre votre voiture ? Nous la mettons en vente dans notre réseau avec photo 360°.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#C0392B" strokeWidth="1.5" />
        <path d="M14 9v5l3 3" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Financement',
    desc: 'Simulation en ligne ou sur place. Nous travaillons avec des partenaires financement pour vous proposer les meilleures conditions.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#C0392B" strokeWidth="1.5" />
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3" stroke="#C0392B" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Sélection & préparation',
    desc: 'Préparation, recherche et sélection de véhicules. Pascal connaît ces voitures par passion : chaque modèle, chaque particularité mécanique, chaque point d\'attention.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 21L6 12l8-7 8 7-1 9" stroke="#C0392B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="11" y="15" width="6" height="6" rx="1" stroke="#C0392B" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Photos 360°',
    desc: 'Chaque véhicule éligible est photographié avec notre équipement 360°. Explorez intérieur, extérieur et moteur sans vous déplacer.',
  },
]

const TEAM = [
  {
    initials: 'P.C',
    name: 'Pascal',
    role: 'Fondateur',
    desc: 'Pascal Coutat grandit dans l\'univers de l\'automobile, aux côtés de son père Jack, dirigeant d\'un garage Volkswagen–Audi. Il y acquiert l\'expertise et l\'exigence qui font Autimmob : un projet personnel, construit sur la transparence et l\'écoute.',
  },
]

function PhotoJeune({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`relative max-w-xl mx-auto w-full ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-white p-3 pb-10 sm:p-4 sm:pb-14 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.35)] border border-[#ECECEC]"
      >
        <div className="relative overflow-hidden bg-[#111]" style={{ aspectRatio: '3 / 2' }}>
          <img
            src="/pascal-jeune.jpg"
            alt="Pascal Coutat, jeune, au volant d'une voiture"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AboutPage() {
  const [estimOpen, setEstimOpen] = useState(false)
  const [contactStatus, setContactStatus] = useState('idle')
  const [contactError, setContactError] = useState('')

  const submitContact = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fields = Object.fromEntries(new FormData(form).entries())
    const website = fields.website
    delete fields.website
    setContactStatus('sending')
    const res = await sendContact('contact', fields, website)
    if (res.ok) {
      setContactStatus('sent')
      form.reset()
    } else {
      setContactError(res.error)
      setContactStatus('error')
    }
  }

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.span variants={fadeUp} className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">
                Notre histoire
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold mt-3 leading-tight text-[#111]"
              >
                Un projet né
                <br />
                de la passion.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-[#555] leading-relaxed max-w-lg">
                Autimmob, c'est le projet de Pascal. Passionné d'automobile, Pascal Coutat découvre très tôt l'univers de la mécanique et du commerce automobile aux côtés de son père, Jack, dirigeant d'un garage Volkswagen–Audi. Cette immersion lui permet d'acquérir une solide expertise du secteur et de développer un véritable sens de l'exigence.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-4 text-[#555] leading-relaxed max-w-lg">
                De cette passion est née Autimmob, avec une ambition simple : accompagner chaque client dans son projet automobile avec transparence, écoute et professionnalisme. Parce que chaque besoin est unique, Autimmob privilégie un accompagnement personnalisé et un suivi de qualité, de la recherche du véhicule jusqu'à sa livraison.
              </motion.p>
              <motion.div variants={fadeUp} className="lg:hidden mt-8">
                <PhotoJeune />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 flex gap-4 flex-wrap">
                <Link
                  href="/#stock"
                  className="text-sm font-medium uppercase tracking-wider text-white bg-[#111] px-6 py-3 hover:bg-[#C0392B] transition-colors duration-300"
                >
                  Voir nos véhicules
                </Link>
                <a
                  href="#rdv"
                  className="text-sm font-medium uppercase tracking-wider text-[#111] border border-[#E8E8E8] px-6 py-3 hover:border-[#111] transition-colors duration-300"
                >
                  Prendre RDV
                </a>
              </motion.div>
            </motion.div>

            {/* Photo de Pascal jeune (ordinateur : à droite du texte) */}
            <PhotoJeune className="hidden lg:block" />
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="bg-[#F5F5F5] border-y border-[#E8E8E8] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Le fondateur</span>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold mt-2 text-[#111]">
                Un homme, une passion.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-[minmax(0,360px)_1fr] gap-10 items-center">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
                <img src="/pascal.jpg" alt="Pascal Coutat, fondateur d'Autimmob" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div>
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="bg-white border border-[#E8E8E8] p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#111] flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-xl font-semibold text-white">{member.initials}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#111]">{member.name}</h3>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#C0392B] mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-[#555] leading-relaxed">{member.desc}</p>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="bg-[#0D0D0D] text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Ce qu'on fait</span>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold mt-2 text-white">
                Nos services
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#0D0D0D] p-8 hover:bg-[#151515] transition-colors duration-200"
                >
                  <div className="mb-5">{service.icon}</div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 360° TECH ── */}
        <section id="360" className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Innovation</span>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold mt-2 leading-tight text-[#111]">
                La technologie 360°
                <br />
                comme standard.
              </h2>
              <p className="mt-5 text-[#555] leading-relaxed">
                Nous avons investi dans une caméra 360° professionnelle pour offrir à nos clients une expérience de visite virtuelle unique. Plus besoin de vous déplacer pour inspecter un véhicule : explorez chaque détail depuis votre canapé.
              </p>
              <p className="mt-4 text-[#555] leading-relaxed">
                Cette technologie nous permet aussi d'être totalement transparents sur l'état de chaque véhicule. Ce que vous voyez est ce que vous obtenez.
              </p>
              <Link
                href="/#stock"
                className="inline-block mt-8 text-sm font-medium uppercase tracking-wider text-white bg-[#C0392B] px-6 py-3 hover:bg-[#a93226] transition-colors duration-300"
              >
                Voir le stock →
              </Link>
            </motion.div>

            {/* 360 icon visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  className="w-60 h-60 rounded-full border-2 border-[#E8E8E8] flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C0392B] w-3 h-3 rounded-full" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#111] w-2 h-2 rounded-full" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <p className="font-serif text-6xl font-semibold text-[#111] text-center">360°</p>
                    <p className="text-xs uppercase tracking-widest text-[#888] text-center mt-1">Vue complète</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT / RDV ── */}
        <section id="rdv" className="bg-[#F5F5F5] border-t border-[#E8E8E8] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Contact</span>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold mt-2 text-[#111]">
                  On se rencontre ?
                </h2>
                <p className="mt-4 text-[#555] leading-relaxed">
                  Autimmob est basé à Saint-Martin-de-Crau. Prenez rendez-vous pour visiter un véhicule, parler d'un projet d'achat ou de vente, ou simplement nous rencontrer.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3a1 1 0 0 1 1-1h2.5a.5.5 0 0 1 .48.36l1 3.5a.5.5 0 0 1-.26.59l-1.5.75a8 8 0 0 0 3.56 3.56l.75-1.5a.5.5 0 0 1 .59-.26l3.5 1c.24.07.39.3.36.48V13a1 1 0 0 1-1 1C5.37 14 2 9.63 2 3z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#888] uppercase tracking-wider">Téléphone</p>
                      <a href="tel:+33649507141" className="text-sm font-medium text-[#111] hover:text-[#C0392B] transition-colors">06 49 50 71 41</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="white" strokeWidth="1.3" />
                        <path d="M1.5 5l6.5 4.5L14.5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#888] uppercase tracking-wider">Email</p>
                      <a href="mailto:autimmob.contact@gmail.com" className="text-sm font-medium text-[#111] hover:text-[#C0392B] transition-colors">autimmob.contact@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" stroke="white" strokeWidth="1.3" />
                        <circle cx="8" cy="6" r="1.5" stroke="white" strokeWidth="1.3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#888] uppercase tracking-wider">Adresse</p>
                      <p className="text-sm font-medium text-[#111]">Saint-Martin-de-Crau, France</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <form className="space-y-4" onSubmit={submitContact}>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      required
                      className="border border-[#E8E8E8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors"
                    />
                    <input
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      required
                      className="border border-[#E8E8E8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse email"
                    required
                    className="w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors"
                  />
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="Téléphone (optionnel)"
                    className="w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors"
                  />
                  <select name="motif" className="w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors text-[#555]">
                    <option value="">Motif de contact</option>
                    <option>Visite d'un véhicule</option>
                    <option>Vendre ma voiture</option>
                    <option>Mandataire</option>
                    <option>Financement</option>
                    <option>Autre</option>
                  </select>
                  <textarea
                    name="message"
                    required
                    placeholder="Votre message"
                    rows={4}
                    className="w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#111] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#C0392B] transition-colors duration-300"
                  >
                    {contactStatus === 'sending' ? 'Envoi…' : 'Envoyer le message'}
                  </button>
                  {contactStatus === 'sent' && <p className="text-sm text-[#14532d]">Message envoyé ! Nous vous répondrons rapidement.</p>}
                  {contactStatus === 'error' && <p className="text-sm text-[#C0392B]">{contactError}</p>}
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SELL YOUR CAR ── */}
        <section id="vendre" className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-[#111] text-white p-10 md:p-14">
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Mandataire & rachat</span>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold mt-2">
                Vous vendez votre voiture ?
              </h2>
              <p className="mt-4 text-[#888] leading-relaxed">
                Que ce soit pour une vente directe ou via notre service mandataire, nous vous accompagnons : estimation gratuite, photos 360°, publication d'annonce, gestion des acheteurs.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  'Estimation gratuite sous 24h',
                  'Rachat direct ou mise en vente mandataire',
                  'Photos 360° incluses dans notre pack',
                  'Gestion administrative complète',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#aaa]">
                    <span className="w-1 h-1 rounded-full bg-[#C0392B] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setEstimOpen(true)}
                className="inline-block mt-8 text-sm font-medium uppercase tracking-wider text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-[#111] transition-all duration-300"
              >
                Demander une estimation →
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EstimationModal open={estimOpen} onClose={() => setEstimOpen(false)} />
    </>
  )
}
