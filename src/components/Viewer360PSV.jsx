'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Viewer photo 360° (Photo Sphere Viewer v5) — image équirectangulaire (JPG).
 * Glisser pour tourner · molette/pincement pour zoomer · plein écran · gyroscope sur mobile
 */

async function fileExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

export default function Viewer360PSV({ panorama, label = 'Photo' }) {
  const containerRef = useRef(null)
  const viewerRef    = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | missing | error

  useEffect(() => {
    if (!containerRef.current || !panorama) return
    let cancelled = false

    const init = async () => {
      setStatus('loading')

      // Fichier absent (photo pas encore déposée) → message clair
      if (typeof panorama === 'string' && panorama.startsWith('/')) {
        const exists = await fileExists(panorama)
        if (cancelled) return
        if (!exists) { setStatus('missing'); return }
      }

      // CSS PSV injecté une seule fois
      if (!document.getElementById('psv-css')) {
        const link = document.createElement('link')
        link.id = 'psv-css'; link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.min.css'
        document.head.appendChild(link)
      }

      try {
        const [{ Viewer }, { GyroscopePlugin }] = await Promise.all([
          import('@photo-sphere-viewer/core'),
          import('@photo-sphere-viewer/gyroscope-plugin'),
        ])
        if (cancelled || !containerRef.current) return

        const viewer = new Viewer({
          container: containerRef.current,
          panorama,
          // le bouton gyroscope n'apparaît que sur les appareils compatibles
          plugins: [[GyroscopePlugin, { touchmove: true, absolutePosition: false, moveMode: 'smooth' }]],
          navbar: ['zoom', 'gyroscope', 'fullscreen'],
          loadingImg: null,
          touchmoveTwoFingers: false,
          mousewheel: true,
          defaultZoomLvl: 50,
          minFov: 30,
          maxFov: 90,
        })

        viewerRef.current = viewer
        viewer.addEventListener('ready', () => { if (!cancelled) setStatus('ready') })
      } catch (err) {
        console.error('[Viewer360PSV] init error:', err)
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
  }, [panorama])

  return (
    <div className="relative aspect-[4/5] max-h-[75vh] w-full sm:aspect-[16/9] sm:max-h-none bg-[#0D0D0D] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      {status === 'loading' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
          <div className="w-8 h-8 border-2 border-white/10 border-t-[#C0392B] rounded-full animate-spin" />
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">
            Chargement de la vue 360°…
          </p>
        </div>
      )}

      {status === 'missing' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-4 z-10 px-10 text-center">
          <p className="text-white/60 text-sm font-medium">Vue {label.toLowerCase()} 360° bientôt disponible</p>
          {process.env.NODE_ENV !== 'production' && (
            <code className="text-[11px] text-[#C0392B]/80 bg-white/5 border border-white/10 px-4 py-2 font-mono tracking-wide break-all">
              /public{panorama}
            </code>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-2 z-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.2" strokeOpacity=".25"/>
            <path d="M10 6v4M10 13.5h.01" stroke="white" strokeWidth="1.5" strokeOpacity=".4" strokeLinecap="round"/>
          </svg>
          <p className="text-white/30 text-xs">Vue 360° indisponible</p>
        </div>
      )}
    </div>
  )
}
