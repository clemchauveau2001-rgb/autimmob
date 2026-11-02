/**
 * Convention photos 360° — valable pour TOUTES les voitures.
 * Déposer les fichiers dans /public/360/<slug>/ :
 *   exterieur.jpg  et  interieur.jpg   (JPG équirectangulaire 2:1, ex. 7680×3840)
 * puis, dans la voiture :  media: { ..., views360: photos360('<slug>') }
 */
export function photos360(slug, vues = ['exterieur', 'interieur']) {
  const LABELS = { exterieur: 'Extérieur', interieur: 'Intérieur' }
  return vues.map((v) => ({
    id: v,
    label: LABELS[v] ?? v,
    type: 'photo',
    panorama: `/360/${slug}/${v}.jpg`,
  }))
}

/* Stock réel : ajouter ici les véhicules au fur et à mesure (voir photos360 ci-dessus). */
export const cars = []

export function getCar(slug) {
  return cars.find((c) => c.slug === slug) ?? null
}

export const stockCars = cars

export function getCarsByCategory(category) {
  if (!category || category === 'tout') return stockCars
  return stockCars.filter((c) => c.category === category)
}

export const CATEGORIES = [
  { id: 'tout',        label: 'Tout'        },
  { id: 'immanquable', label: 'Immanquables' },
  { id: 'standard',   label: 'Standard'    },
  { id: 'sportive',   label: 'Sportives'   },
  { id: 'youngtimer', label: 'Youngtimers' },
  { id: 'utilitaire', label: 'Utilitaires' },
]

export const CATEGORY_META = {
  porsche:     { label: 'Porsche',     color: '#C0392B', bg: '#fef2f2' },
  immanquable: { label: 'Immanquable', color: '#C0392B', bg: '#fef2f2' },
  youngtimer:  { label: 'Youngtimer',  color: '#92400e', bg: '#fffbeb' },
  sportive:    { label: 'Sportive',    color: '#1e3a5f', bg: '#eff6ff' },
  standard:    { label: 'Standard',   color: '#374151', bg: '#f3f4f6' },
  utilitaire:  { label: 'Utilitaire',  color: '#374151', bg: '#f3f4f6' },
  accessible:  { label: 'Accessible',  color: '#14532d', bg: '#f0fdf4' },
}
