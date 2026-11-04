import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Marquee from '@/components/Marquee'
import CarFilters from '@/components/CarFilters'
import HeroSection from '@/components/HeroSection'
import Section360 from '@/components/Section360'
import HowItWorks from '@/components/HowItWorks'
import CtaBand from '@/components/CtaBand'
import ReviewCarousel from '@/components/ReviewCarousel'

export const metadata = {
  title: 'Autimmob — Garage Automobile Saint-Martin-de-Crau',
  description:
    'Achat, vente et mandataire automobile à Saint-Martin-de-Crau. Tout type de véhicule, à la demande.',
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <HeroSection />

        {/* ── MARQUEE ── */}
        <Marquee />

        {/* ── STOCK ── */}
        <section id="stock" className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">Notre stock</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold mt-2 text-[#111]">
              Véhicules disponibles
            </h2>
            <p className="mt-3 text-[#888] max-w-md leading-relaxed">
              Chaque véhicule est contrôlé et photographié à 360°.
            </p>
          </div>
          <CarFilters />
        </section>

        {/* ── 360° SECTION ── */}
        <Section360 />

        {/* ── HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── REVIEWS ── */}
        <ReviewCarousel />

        {/* ── CTA BAND ── */}
        <CtaBand />
      </main>

      <Footer />
    </>
  )
}
