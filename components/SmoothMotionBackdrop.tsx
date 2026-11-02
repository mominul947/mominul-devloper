'use client'

import { motion } from 'framer-motion'

export default function SmoothMotionBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Mobile Lightweight Ambient Glow (No Heavy GPU Blur, Instant 60-120fps Scroll) */}
      <div
        className="md:hidden absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 10%, var(--accent) 0%, transparent 65%)',
        }}
      />

      {/* Desktop Rich Smooth Animated Glow (GPU Accelerated for larger screens) */}
      <div className="hidden md:block">
        {/* Orb 1: Theme Accent Ambient Float */}
        <motion.div
          animate={{
            x: [0, 45, -35, 0],
            y: [0, 40, -45, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full blur-[140px] opacity-10 will-change-transform"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        {/* Orb 2: Theme Secondary Glow */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, -45, 40, 0],
            scale: [1, 0.95, 1.08, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 will-change-transform"
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </div>
    </div>
  )
}
