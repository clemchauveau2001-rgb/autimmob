'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { useFavoris } from '@/hooks/useFavoris'

const NAV_LINKS = [
  { href: '/#stock', label: 'Stock' },
  { href: '/immanquables', label: 'Immanquables' },
  { href: '/nouveautes', label: 'Nouveautés' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, mounted } = useFavoris()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E8E8]' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-2xl font-semibold tracking-tight text-[#111]">
              Aut<span className="text-[#C0392B]">i</span>mmob
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-[#555] hover:text-[#111] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favoris counter */}
            <Link href="/favoris" className="relative flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#555] hover:text-[#111] transition-colors duration-200 py-2 px-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 12S1.5 8.5 1.5 4.5a2.8 2.8 0 0 1 5.5-.8 2.8 2.8 0 0 1 5.5.8C12.5 8.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {mounted && count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white bg-[#C0392B] rounded-full"
                >
                  {count}
                </motion.span>
              )}
            </Link>
            <Link
              href="/a-propos#vendre"
              className="text-xs font-medium uppercase tracking-wider text-[#111] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-white transition-all duration-200"
            >
              Vendre ma voiture
            </Link>
            <Link
              href="/rdv"
              className="text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-4 py-2 hover:bg-[#a93226] transition-all duration-200"
            >
              Prendre RDV
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#111] transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#111] transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#111] transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#E8E8E8] shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-widest text-[#555] hover:text-[#111] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#E8E8E8]">
                <Link
                  href="/favoris"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 text-center text-xs font-medium uppercase tracking-wider text-[#555] border border-[#E8E8E8] px-4 py-2.5"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M7 12S1.5 8.5 1.5 4.5a2.8 2.8 0 0 1 5.5-.8 2.8 2.8 0 0 1 5.5.8C12.5 8.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  Favoris {mounted && count > 0 && `(${count})`}
                </Link>
                <Link
                  href="/a-propos#vendre"
                  onClick={() => setMenuOpen(false)}
                  className="text-center text-xs font-medium uppercase tracking-wider text-[#111] border border-[#111] px-4 py-2.5"
                >
                  Vendre ma voiture
                </Link>
                <Link
                  href="/rdv"
                  onClick={() => setMenuOpen(false)}
                  className="text-center text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-4 py-2.5"
                >
                  Prendre RDV
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
