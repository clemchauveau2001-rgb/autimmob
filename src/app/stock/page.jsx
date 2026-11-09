import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarFilters from '@/components/CarFilters'

export const metadata = {
  title: 'Véhicules à vendre | Autimmob',
  description:
    'Les véhicules disponibles chez Autimmob à Saint-Martin-de-Crau : photos, détails et prix.',
}

// Page d'arrivée du QR code des cartes de visite : directement les voitures à vendre
export default function StockPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
          <div className="mb-10">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Notre stock</span>
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold mt-2 text-[#111]">
              Véhicules à vendre
            </h1>
          </div>
          <CarFilters />
        </section>
      </main>
      <Footer />
    </>
  )
}
