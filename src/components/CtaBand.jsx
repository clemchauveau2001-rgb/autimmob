'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export default function CtaBand() {
  return (
    <section className="bg-[#F5F5F5] border-y border-[#E8E8E8] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#111]">
            Une voiture à vendre ?
          </h2>
          <p className="mt-2 text-[#888]">Estimation gratuite, prise en charge rapide.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex gap-3 flex-wrap"
        >
          <Link
            href="/a-propos#vendre"
            className="text-sm font-medium uppercase tracking-wider text-white bg-[#C0392B] px-7 py-3.5 hover:bg-[#a93226] transition-colors duration-300"
          >
            Vendre ma voiture
          </Link>
          <Link
            href="/a-propos"
            className="text-sm font-medium uppercase tracking-wider text-[#111] border border-[#111] px-7 py-3.5 hover:bg-[#111] hover:text-white transition-colors duration-300"
          >
            En savoir plus
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
