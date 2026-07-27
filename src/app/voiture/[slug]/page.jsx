import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cars, getCar, CATEGORY_META } from '@/lib/cars'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MediaTabs from '@/components/MediaTabs'
import VehicleClient from './VehicleClient'
import RepairTimeline from '@/components/RepairTimeline'
import VehicleHistory from '@/components/VehicleHistory'

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const car = getCar(slug)
  if (!car) return { title: 'Véhicule introuvable' }
  return {
    title: `${car.marque} ${car.modele} ${car.annee} — Autimmob`,
    description: car.description.slice(0, 160),
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

function formatKm(km) {
  return new Intl.NumberFormat('fr-FR').format(km) + ' km'
}

const SPECS_LABELS = {
  annee: 'Année',
  km: 'Kilométrage',
  moteur: 'Moteur',
  puissance: 'Puissance',
  boite: 'Boîte',
  couleur: 'Couleur',
}

export default async function VehiclePage({ params }) {
  const { slug } = await params
  const car = getCar(slug)
  if (!car) notFound()

  const meta = CATEGORY_META[car.category] || CATEGORY_META.accessible

  const specs = [
    { label: 'Année', value: car.annee },
    { label: 'Kilométrage', value: formatKm(car.km) },
    { label: 'Moteur', value: car.moteur },
    { label: 'Puissance', value: `${car.puissance} ch` },
    { label: 'Boîte', value: car.boite },
    { label: 'Couleur', value: car.couleur },
  ]

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-[#888]">
          <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/#stock" className="hover:text-[#111] transition-colors">Stock</Link>
          <span>/</span>
          <span className="text-[#111]">{car.marque} {car.modele}</span>
        </div>

        {/* Galerie médias — Photos | 360° | Vidéo */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <MediaTabs car={car} />
        </div>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left — main content */}
            <div className="lg:col-span-2">
              {/* Title + badges */}
              <div className="flex flex-wrap items-start gap-3 mb-6">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1"
                  style={{ color: meta.color, background: meta.bg }}
                >
                  {meta.label}
                </span>
                {car.media?.views360?.length > 0 && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-[#111] text-white">
                    360°
                  </span>
                )}
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 ${
                    car.vendeur === 'autimmob' ? 'bg-[#C0392B] text-white' : 'bg-[#F5F5F5] text-[#555]'
                  }`}
                >
                  {car.vendeur === 'autimmob' ? 'Autimmob' : 'Particulier'}
                </span>
              </div>

              <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-[#111]">
                {car.marque} {car.modele}
              </h1>
              <p className="mt-2 text-[#888] text-lg">
                {car.annee} · {formatKm(car.km)} · {car.moteur}
              </p>

              {/* Specs grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#E8E8E8]">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-white px-4 py-4">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#888]">{spec.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#111]">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="font-serif text-2xl font-semibold text-[#111] mb-4">Description</h2>
                <p className="text-[#555] leading-relaxed">{car.description}</p>
              </div>

              {/* Points forts */}
              <div className="mt-10">
                <h2 className="font-serif text-2xl font-semibold text-[#111] mb-4">Points forts</h2>
                <ul className="space-y-2.5">
                  {car.points_forts.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#444]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C0392B] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Garanties */}
              <div className="mt-10 flex flex-wrap gap-3">
                {car.garanties.map((g, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs font-medium text-[#555] bg-[#F5F5F5] border border-[#E8E8E8] px-3 py-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {g}
                  </span>
                ))}
              </div>

              {/* Vehicle history */}
              <VehicleHistory historique={car.historique} />

              {/* Repair timeline */}
              <RepairTimeline timeline={car.timeline} />
            </div>

            {/* Right — sidebar */}
            <VehicleClient car={car} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
