'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

export default function GlitchIntroPreloader() {
  const [phase, setPhase] = useState<'idle' | 'splitting' | 'hidden'>('idle')
  const [targetTransform, setTargetTransform] = useState({ x: 0, y: 0, scale: 1 })
  const cardRef = useRef<HTMLDivElement>(null)
  const splitTriggeredRef = useRef(false)

  // Calculate pixel-perfect destination to Hero portrait slot
  const getDestination = useCallback(() => {
    if (typeof window === 'undefined') return { x: 0, y: 0, scale: 1 }
    const isMobile = window.innerWidth < 1024
    const targetId = isMobile ? 'hero-portrait-mobile' : 'hero-portrait-desktop'
    const targetEl = document.getElementById(targetId)

    if (targetEl && cardRef.current) {
      const rect = targetEl.getBoundingClientRect()
      const currentCard = cardRef.current.getBoundingClientRect()

      const deltaX = rect.left + rect.width / 2 - (currentCard.left + currentCard.width / 2)
      const deltaY = rect.top + rect.height / 2 - (currentCard.top + currentCard.height / 2)
      const scale = rect.width / currentCard.width

      return { x: deltaX, y: deltaY, scale }
    }

    // Default responsive fallback
    return {
      x: isMobile ? window.innerWidth * 0.22 : 0,
      y: isMobile ? -window.innerHeight * 0.18 : 0,
      scale: isMobile ? 0.75 : 0.95,
    }
  }, [])

  // Trigger the 2-way Split and fly Image Card into Hero position
  const triggerSplit = useCallback(() => {
    if (splitTriggeredRef.current) return
    splitTriggeredRef.current = true

    const dest = getDestination()
    setTargetTransform(dest)
    setPhase('splitting')

    // Clean unmount once card arrives at home position
    setTimeout(() => {
      setPhase('hidden')
    }, 780)
  }, [getDestination])

  useEffect(() => {
    // Automatically trigger split after comfortable ~1.5s intro view
    const timer = setTimeout(() => {
      triggerSplit()
    }, 1500)

    // Also allow click or keypress to skip immediately
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
          TOP HALF SHUTTER DOOR (Moves UP on split: "2 ta 2 dike jabe")
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '-105%',
                transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
              }
            : { y: 0 }
        }
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#020306] border-b border-emerald-500/20 z-10 flex flex-col justify-start p-4 sm:p-7 shadow-2xl"
      >
        {/* Subtle Cyber Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Minimalist Top Terminal HUD */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold tracking-widest uppercase">
              MOMINUL ISLAM // ARCHITECT
            </span>
          </div>
          <span className="tracking-wider text-stone-500 hidden sm:inline">
            CLICK OR TAP TO ENTER ↵
          </span>
        </div>
      </motion.div>

      {/* =========================================================================
          BOTTOM HALF SHUTTER DOOR (Moves DOWN on split: "2 ta 2 dike jabe")
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '105%',
                transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
              }
            : { y: 0 }
        }
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020306] border-t border-emerald-500/20 z-10 flex flex-col justify-end p-4 sm:p-7 shadow-2xl"
      >
        {/* Subtle Cyber Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Minimalist Bottom HUD Status */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-emerald-400 animate-pulse" />
            <span className="text-stone-400">Mobile & Web Engineering Platform</span>
          </div>
          <span className="text-emerald-400 font-bold">PORTAL READY</span>
        </div>
      </motion.div>

      {/* =========================================================================
          HERO IMAGE CARD (Centered initially, then animates into exact Hero slot!)
         ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <motion.div
          ref={cardRef}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={
            isSplitting
              ? {
                  x: targetTransform.x,
                  y: targetTransform.y,
                  scale: targetTransform.scale,
                  opacity: 1,
                  transition: {
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1], // Smooth Apple-grade spring-like curve
                  },
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.4, ease: 'easeOut' },
                }
          }
          className="relative w-[210px] xs:w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/4] rounded-2xl sm:rounded-[28px] overflow-hidden flex items-end justify-center pointer-events-auto"
          style={{
            border: '1.5px solid var(--portrait-border, rgba(16, 185, 129, 0.5))',
            backgroundColor: 'rgba(10, 12, 18, 0.75)',
            boxShadow:
              '0 0 50px rgba(16, 185, 129, 0.4), 0 20px 40px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Portrait Image */}
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-portrait-01.png"
              alt="Md. Mominul Islam"
              fill
              priority
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 340px"
              className="object-contain object-bottom scale-[1.18] origin-bottom drop-shadow-2xl"
            />
          </div>

          {/* Floating Live Name Badge Docked at Bottom of Card */}
          <div
            className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between p-2 sm:p-2.5 rounded-xl backdrop-blur-md border shadow-xl z-10"
            style={{
              backgroundColor: 'rgba(10, 10, 14, 0.92)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <span className="text-[10px] sm:text-[11px] font-mono text-white font-bold tracking-wider truncate">
              Md. Mominul Islam
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-emerald-400 font-bold">
                Architect
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
