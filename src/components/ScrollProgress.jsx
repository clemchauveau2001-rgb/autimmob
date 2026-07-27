'use client'

import { motion, useScroll } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-[#C0392B] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
