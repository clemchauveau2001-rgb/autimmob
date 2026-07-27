'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import PhotoGallery   from './PhotoGallery'
import Viewer360PSV   from './Viewer360PSV'
import Viewer360Video from './Viewer360Video'

/* ─────────────── icônes ── */
function IconPhotos() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1.5" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1 7.5l3-3 2.5 2.5 2-2.5 3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="1" fill="currentColor"/>
    </svg>
  )
}

function Icon360() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <ellipse cx="6.5" cy="6.5" rx="2.5" ry="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1 6.5h11" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

function IconVideo() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="2" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9.5 4.5l2-1.5v7l-2-1.5V4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4.5 5.5l3.5 1.5-3.5 1.5V5.5z" fill="currentColor"/>
    </svg>
  )
}

/* ─────────────────────────── */

export default function MediaTabs({ car }) {
  const media    = car.media    || {}
  const photos   = media.photos   || []
  const views360 = media.views360 || []
  const videos   = media.videos   || []   // [] = onglet Vidéo masqué

  const tabs = [
    photos.length   > 0 && { id: 'photos', label: 'Photos', count: photos.length,   Icon: IconPhotos },
    views360.length > 0 && { id: '360',    label: '360°',   count: views360.length, Icon: Icon360    },
    videos.length   > 0 && { id: 'video',  label: 'Vidéo',  count: 0,              Icon: IconVideo  },
  ].filter(Boolean)

  const [activeTab,   setActiveTab]   = useState(tabs[0]?.id || 'photos')
  const [selected360, setSelected360] = useState(views360[0]?.id || null)

  if (!tabs.length) return null

  const current360 = views360.find((v) => v.id === selected360) ?? views360[0]

  return (
    <div className="bg-[#0D0D0D]">

      {/* ── Barre d'onglets ── */}
      <div className="flex bg-[#111] border-b border-white/10">
        {tabs.map(({ id, label, count, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative flex items-center gap-2 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-150 ${
              activeTab === id ? 'text-white' : 'text-white/35 hover:text-white/65'
            }`}
          >
            {activeTab === id && (
              <motion.span
                layoutId="media-tab-bar"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C0392B]"
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <Icon />
            <span>{label}</span>
            {count > 0 && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 leading-none transition-colors ${
                activeTab === id ? 'bg-white/15 text-white' : 'bg-white/8 text-white/35'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Contenu ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >

          {/* ── Photos ── */}
          {activeTab === 'photos' && <PhotoGallery photos={photos} />}

          {/* ── 360° ── */}
          {activeTab === '360' && (
            <div>

              {/* Sélecteur de vue si plusieurs vues */}
              {views360.length > 1 && (
                <div className="flex gap-2 px-3 pt-3 pb-2 bg-[#111] border-b border-white/8">
                  {views360.map((view) => (
                    <button
                      key={view.id}
                      onClick={() => setSelected360(view.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all duration-150 ${
                        selected360 === view.id
                          ? 'bg-[#C0392B] text-white'
                          : 'bg-white/5 text-white/45 hover:text-white/70 border border-white/10'
                      }`}
                    >
                      <Icon360 />
                      {view.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Viewer : vidéo MP4 équirectangulaire OU panorama image */}
              {current360 && (
                current360.type === 'video'
                  ? <Viewer360Video src={current360.source} label={current360.label} />
                  : <Viewer360PSV   panorama={current360.panorama} />
              )}

              {/* Barre d'infos */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#111] border-t border-white/8">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] animate-pulse flex-shrink-0" />
                  <span className="text-[9px] font-medium uppercase tracking-widest text-white/35">
                    Cliquer-glisser pour tourner · Molette pour zoomer · Plein écran disponible
                  </span>
                </div>
                {current360 && (
                  <span className="text-[9px] text-white/25 font-medium flex-shrink-0 ml-4">
                    {current360.label}
                  </span>
                )}
              </div>

            </div>
          )}

          {/* ── Vidéo classique (onglet visible seulement si videos.length > 0) ── */}
          {activeTab === 'video' && videos.length > 0 && (
            <div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videos[0].youtubeId}?rel=0&modestbranding=1&color=white`}
                  title={videos[0].label}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="px-4 py-2.5 bg-[#111] border-t border-white/8">
                <span className="text-[9px] font-medium uppercase tracking-widest text-white/35">
                  {videos[0].label}
                </span>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  )
}
