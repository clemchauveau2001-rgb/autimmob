'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Wrapper Photo Sphere Viewer v5 — panoramas équirectangulaires interactifs.
 * Drag pour tourner · molette/pinch pour zoomer · bouton plein écran intégré
 */
export default function Viewer360PSV({ panorama }) {
  const containerRef = useRef(null)
  const viewerRef    = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    if (!containerRef.current || !panorama) return
    setStatus('loading')

    // Injecte le CSS PSV une seule fois dans le document
    if (!document.getElementById('psv-css')) {
      const link  = document.createElement('link')
      link.id     = 'psv-css'
      link.rel    = 'stylesheet'
      // CDN aligné sur la version npm installée
      link.href   = 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.min.css'
      document.head.appendChild(link)
    }

    let cancelled = false

    import('@photo-sphere-viewer/core').then(({ Viewer }) => {
      if (cancelled || !containerRef.current) return

      const viewer = new Viewer({
        container: containerRef.current,
        panorama,
        navbar: ['zoom', 'fullscreen'],
        loadingImg: null,
        touchmoveTwoFingers: false,
        mousewheel: true,
        defaultZoomLvl: 50,
        minFov: 30,
        maxFov: 90,
      })

      viewerRef.current = viewer
      viewer.addEventListener('ready', () => {
        if (!cancelled) setStatus('ready')
      })
    }).catch(() => {
      if (!cancelled) setStatus('error')
    })

    return () => {
      cancelled = true
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [panorama])

  return (
    <div className="relative aspect-[16/9] bg-[#0D0D0D] overflow-hidden">
      {/* Container PSV */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Loading overlay */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
          <div className="w-8 h-8 border-2 border-white/10 border-t-[#C0392B] rounded-full animate-spin" />
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">
            Chargement du panorama…
          </p>
        </div>
      )}

      {/* Error overlay */}
      {status === 'error' && (
        <div className="absolute inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-2 z-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.2" strokeOpacity=".25"/>
            <path d="M10 6v4M10 13.5h.01" stroke="white" strokeWidth="1.5" strokeOpacity=".4" strokeLinecap="round"/>
          </svg>
          <p className="text-white/30 text-xs">Panorama indisponible</p>
        </div>
      )}
    </div>
  )
}
