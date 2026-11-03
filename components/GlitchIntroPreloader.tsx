'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlitchIntroPreloader() {
  const [phase, setPhase] = useState<'showing' | 'splitting' | 'hidden'>('showing')

  // Trigger the 2-way split transition ("2 ta 2 dike jabe")
  const triggerSplit = useCallback(() => {
    setPhase((prev) => {
      if (prev !== 'showing') return prev
      setTimeout(() => {
        setPhase('hidden')
      }, 950)
      return 'splitting'
    })
  }, [])

  useEffect(() => {
    // 1. Wait on screen for ~1.6s so user can read comfortably
    const timer = setTimeout(() => {
      triggerSplit()
    }, 1600)

    // 2. Click or keypress skips immediately
    const handleKey = () => triggerSplit()
    window.addEventListener('keydown', handleKey, { once: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [triggerSplit])

  if (phase === 'hidden') return null

  const isSplitting = phase === 'splitting'

  return (
    <div
      onClick={triggerSplit}
      className="fixed inset-0 z-[9999999] pointer-events-auto select-none cursor-pointer overflow-hidden font-mono"
    >
      {/* =========================================================================
          TOP HALF SHUTTER DOOR (Slides UP and LEFT: "2 ta 2 dike jabe")
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '-100%',
                transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
              }
            : { y: 0 }
        }
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#040508] border-b border-white/10 flex flex-col justify-end items-center pb-2 px-4 shadow-2xl z-20"
      >
        {/* Top Scanline Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px',
          }}
        />

        {/* Minimal Terminal Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="tracking-widest">SYSTEM ALERT // 404</span>
          </div>
          <span className="text-[10px] tracking-wider text-stone-600 hidden sm:inline">
            CLICK OR PRESS ANY KEY TO ENTER
          </span>
        </div>

        {/* LINE 1: "ERROR 404: Conventional" (Moves LEFT on split) */}
        <motion.div
          animate={
            isSplitting
              ? {
                  x: '-120%',
                  opacity: 0,
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                }
              : { x: 0, opacity: 1 }
          }
          className="relative z-10 text-center"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-stone-100 font-mono drop-shadow-lg whitespace-nowrap">
            ERROR 404: Conventional
          </h1>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          BOTTOM HALF SHUTTER DOOR (Slides DOWN and RIGHT: "2 ta 2 dike jabe")
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '100%',
                transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
              }
            : { y: 0 }
        }
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#040508] border-t border-white/10 flex flex-col justify-start items-center pt-2 px-4 shadow-2xl z-20"
      >
        {/* Bottom Scanline Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px',
          }}
        />

        {/* LINE 2: "developer not found." (Moves RIGHT on split) */}
        <motion.div
          animate={
            isSplitting
              ? {
                  x: '120%',
                  opacity: 0,
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                }
              : { x: 0, opacity: 1 }
          }
          className="relative z-10 text-center"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-stone-200 font-mono drop-shadow-lg whitespace-nowrap">
            developer not found.
          </h1>
        </motion.div>

        {/* Bottom Status Hint */}
        <div className="absolute bottom-6 flex items-center gap-2 text-[11px] text-stone-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-600 animate-ping" />
          <span>Click anywhere to open website</span>
        </div>
      </motion.div>

      {/* Central Horizon Glow during split */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-xs" />
      </div>
    </div>
  )
}
