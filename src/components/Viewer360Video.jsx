'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Viewer 360° vidéo avec Photo Sphere Viewer VideoPlugin
 * Supporte les MP4 équirectangulaires locaux (/public/videos/*.mp4)
 * Drag/glisser, zoom molette/pinch, contrôles vidéo, plein écran
 */

const CDN_CSS = [
  { id: 'psv-core-css',  href: 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.min.css'         },
  { id: 'psv-video-css', href: 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/video-plugin@5/index.min.css' },
]

async function fileExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

export default function Viewer360Video({ src, label = 'Vidéo 360°' }) {
  const containerRef = useRef(null)
  const viewerRef    = useRef(null)
  const [status, setStatus] = useState('checking')
  // checking | loading | ready | missing | error

  useEffect(() => {
    if (!src) { setStatus('missing'); return }
    let cancelled = false
    setStatus('checking')

    const init = async () => {
      // 1. Vérifie si le fichier existe (évite une attente PSV silencieuse)
      const exists = await fileExists(src)
      if (cancelled) return
      if (!exists) { setStatus('missing'); return }

      setStatus('loading')

      // 2. Injecte le CSS PSV une seule fois
      CDN_CSS.forEach(({ id, href }) => {
        if (!document.getElementById(id)) {
          const link = document.createElement('link')
          link.id = id; link.rel = 'stylesheet'; link.href = href
          document.head.appendChild(link)
        }
      })

      // 3. Imports dynamiques (évite les erreurs SSR)
      try {
        const [
          { Viewer },
          { EquirectangularVideoAdapter },
          { VideoPlugin },
        ] = await Promise.all([
          import('@photo-sphere-viewer/core'),
          import('@photo-sphere-viewer/equirectangular-video-adapter'),
          import('@photo-sphere-viewer/video-plugin'),
        ])

        if (cancelled || !containerRef.current) return

        const viewer = new Viewer({
          container: containerRef.current,
          adapter:   EquirectangularVideoAdapter,
          panorama:  { source: src },

          plugins: [
            [VideoPlugin, {
              autoplay: false,
              progressbar: true,
              bigbutton:   true,
            }],
          ],

          // Contrôles dans la barre inférieure PSV
          navbar: ['video-play', 'video-time', 'video-volume', 'zoom', 'fullscreen'],

          touchmoveTwoFingers: false,
          mousewheel:          true,
          defaultZoomLvl:      50,
          minFov:              30,
          maxFov:              90,
        })

        viewerRef.current = viewer
        viewer.addEventListener('ready', () => { if (!cancelled) setStatus('ready') })

      } catch (err) {
        console.error('[Viewer360Video] init error:', err)
        if (!cancelled) setStatus('error')
      }
    }

    init()

    return () => {
      cancelled = true
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [src])

  return (
    <div className="relative aspect-[16/9] bg-[#0D0D0D] overflow-hidden">

      {/* Container PSV (toujours présent pour l'init) */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* ── Chargement ── */}
      {(status === 'checking' || status === 'loading') && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[#C0392B] rounded-full animate-spin" />
          </div>
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">
            {status === 'checking' ? 'Vérification…' : 'Chargement vidéo 360°…'}
          </p>
        </div>
      )}

      {/* ── Fichier manquant ── */}
      {status === 'missing' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-5 z-10 px-10 text-center">

          {/* Icône 360° */}
          <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="text-white/25">
              <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.3"/>
              <ellipse cx="13" cy="13" rx="5" ry="11" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M2 13h22" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4.5 7.5C6.8 6 9.8 5 13 5s6.2 1 8.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M4.5 18.5C6.8 20 9.8 21 13 21s6.2-1 8.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>

          <div>
            <p className="text-white/60 text-sm font-medium mb-1.5">Vidéo 360° bientôt disponible</p>
            <p className="text-white/25 text-xs leading-relaxed max-w-sm">
              Exportez votre vidéo MP4 équirectangulaire (Insta360 Studio, GoPro MAX…) et déposez-la ici :
            </p>
          </div>

          <code className="text-[11px] text-[#C0392B]/80 bg-white/5 border border-white/10 px-4 py-2 font-mono tracking-wide">
            /public/videos/porsche-360.mp4
          </code>

          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            Format attendu · MP4 équirectangulaire · H.264 ou H.265
          </p>
        </div>
      )}

      {/* ── Erreur ── */}
      {status === 'error' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-2 z-10">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="white" strokeWidth="1.2" strokeOpacity=".2"/>
            <path d="M9 5v4M9 12.5h.01" stroke="white" strokeWidth="1.5" strokeOpacity=".4" strokeLinecap="round"/>
          </svg>
          <p className="text-white/25 text-xs">Impossible de charger la vidéo</p>
        </div>
      )}

    </div>
  )
}
