'use client'

import { useFavoris } from '@/hooks/useFavoris'
import { cars } from '@/lib/cars'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import Link from 'next/link'
import { motion } from 'motion/react'

export default function FavorisPage() {
  const { favoris, mounted } = useFavoris()

  const favorisCars = mounted ? cars.filter((c) => favoris.includes(c.slug)) : []

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Vos favoris</span>
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold mt-2 text-[#111]">
              Véhicules sauvegardés
            </h1>
            {mounted && favorisCars.length > 0 && (
              <p className="mt-3 text-[#888]">{favorisCars.length} véhicule{favorisCars.length > 1 ? 's' : ''} dans vos favoris</p>
            )}
          </div>

          {!mounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 bg-[#F5F5F5] animate-pulse" />
              ))}
            </div>
          ) : favorisCars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-24"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-6 opacity-20">
                <path d="M24 42S6 30 6 17a9 9 0 0 1 18-2.8A9 9 0 0 1 42 17C42 30 24 42 24 42Z" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-serif text-2xl font-semibold text-[#111] mb-3">Aucun favori pour l'instant</p>
              <p className="text-[#888] mb-8">Cliquez sur le cœur d'un véhicule pour le sauvegarder ici.</p>
              <Link
                href="/#stock"
                className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-6 py-3 hover:bg-[#a93226] transition-colors duration-200"
              >
                Voir le stock →
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorisCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
