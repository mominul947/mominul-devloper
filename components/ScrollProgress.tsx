'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-black/5 dark:bg-white/5">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
        style={{ scaleX }}
      />
    </div>
  )
}
