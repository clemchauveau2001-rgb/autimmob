'use client'

import { useState, useEffect, useCallback } from 'react'

const KEY = 'autimmob_favoris'

export function useFavoris() {
  const [favoris, setFavoris] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setFavoris(JSON.parse(stored))
    } catch {}
  }, [])

  const toggle = useCallback((slug) => {
    setFavoris((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const isFavori = useCallback((slug) => favoris.includes(slug), [favoris])

  return { favoris, toggle, isFavori, count: favoris.length, mounted }
}
