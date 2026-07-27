'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export default function Footer() {
  return (
    <motion.footer
      className="bg-[#111] text-white mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-semibold">
              Aut<span className="text-[#C0392B]">i</span>mmob
            </span>
            <p className="mt-4 text-sm text-[#888] leading-relaxed">
              Garage automobile indépendant à Marseille. Passion, expertise et honnêteté.
            </p>
            <p className="mt-4 text-xs text-[#555] uppercase tracking-wider">Spécialiste Porsche</p>
          </div>

          {/* Stock */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#888] mb-4">Nos véhicules</h4>
            <ul className="space-y-2">
              {[
                { href: '/#stock', label: 'Tout le stock' },
                { href: '/#stock', label: 'Collection Porsche' },
                { href: '/#stock', label: 'Youngtimers' },
                { href: '/#stock', label: 'Sportives' },
                { href: '/#stock', label: 'Accessibles' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#888] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#888] mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { href: '/services', label: 'Nos services' },
                { href: '/a-propos#vendre', label: 'Vendre votre voiture' },
                { href: '/rdv', label: 'Prendre RDV' },
                { href: '/suivi', label: 'Suivi réparation' },
                { href: '/favoris', label: 'Mes favoris' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#888] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#888] mb-4">Contact</h4>
            <address className="not-italic space-y-2">
              <p className="text-sm text-[#888]">Autimmob</p>
              <p className="text-sm text-[#888]">Marseille, France</p>
              <a
                href="mailto:contact@autimmob.fr"
                className="block text-sm text-[#888] hover:text-white transition-colors duration-200"
              >
                contact@autimmob.fr
              </a>
              <a
                href="tel:+33600000000"
                className="block text-sm text-[#888] hover:text-white transition-colors duration-200"
              >
                06 00 00 00 00
              </a>
            </address>
            <div className="mt-6">
              <Link
                href="/a-propos#rdv"
                className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-[#C0392B] px-5 py-2.5 hover:bg-[#a93226] transition-colors duration-200"
              >
                Prendre RDV
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#555]">
          <p>© {new Date().getFullYear()} Autimmob. Tous droits réservés.</p>
          <p>
            <a href="https://autimmob.fr" className="hover:text-[#888] transition-colors">
              autimmob.fr
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
