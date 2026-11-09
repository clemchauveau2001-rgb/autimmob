import { cars } from '@/lib/cars'

const SITE = 'https://autimmob.fr'

export default function sitemap() {
  const now = new Date()
  const pages = [
    { path: '', priority: 1 },
    { path: '/stock', priority: 0.9 },
    { path: '/immanquables', priority: 0.8 },
    { path: '/nouveautes', priority: 0.7 },
    { path: '/services', priority: 0.8 },
    { path: '/a-propos', priority: 0.8 },
    { path: '/rdv', priority: 0.6 },
    { path: '/cgv', priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority,
  }))

  const vehicles = cars.map((car) => ({
    url: `${SITE}/voiture/${car.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...pages, ...vehicles]
}
