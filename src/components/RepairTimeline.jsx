'use client'

import { motion } from 'motion/react'

export default function RepairTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="font-serif text-2xl font-semibold text-[#111] mb-6">Remise en état</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E8E8E8]" />

        <div className="space-y-6">
          {timeline.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8"
            >
              {/* Dot */}
              <span
                className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
                  i === 0
                    ? 'bg-[#C0392B] border-[#C0392B]'
                    : i === timeline.length - 1
                    ? 'bg-[#14532d] border-[#14532d]'
                    : 'bg-white border-[#CCC]'
                }`}
              />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#888]">{step.date}</p>
                <p className="text-sm font-semibold text-[#111] mt-0.5">{step.titre}</p>
                <p className="text-sm text-[#555] mt-1 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
