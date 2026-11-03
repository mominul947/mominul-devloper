'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const LINE_1_FULL = 'ERROR 404: Conventional'
const LINE_2_FULL = 'developer not found.'

export default function GlitchIntroPreloader() {
  const [phase, setPhase] = useState<'peeking' | 'waiting' | 'splitting' | 'hidden'>('peeking')
  const [typedLine1, setTypedLine1] = useState('')
  const [typedLine2, setTypedLine2] = useState('')
  const [activeCursor, setActiveCursor] = useState<'line1' | 'line2' | 'done'>('line1')
  const [targetTransform, setTargetTransform] = useState({ x: 0, y: 0, scale: 1 })

  const cardRef = useRef<HTMLDivElement>(null)
  const splitTriggeredRef = useRef(false)

  // 1. Completely lock page scroll while intro preloader is active ("ayi page thaktei scrol kora jacche amn jeno na hoi")
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prevOverflow = document.body.style.overflow
    const prevDocOverflow = document.documentElement.style.overflow
    const prevTouchAction = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    // Force window to top so hero target coordinates are 100% stable
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })

    const preventDefaultScroll = (e: Event) => {
      e.preventDefault()
    }

    window.addEventListener('wheel', preventDefaultScroll, { passive: false })
    window.addEventListener('touchmove', preventDefaultScroll, { passive: false })

    return () => {
      document.body.style.overflow = prevOverflow
      document.documentElement.style.overflow = prevDocOverflow
      document.body.style.touchAction = prevTouchAction
      window.removeEventListener('wheel', preventDefaultScroll)
      window.removeEventListener('touchmove', preventDefaultScroll)
    }
  }, [])

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

    // Default responsive fallback if element not yet measured
    return {
      x: isMobile ? window.innerWidth * 0.22 : 0,
      y: isMobile ? -window.innerHeight * 0.18 : 0,
      scale: isMobile ? 0.75 : 0.95,
    }
  }, [])

  // Trigger the 4D/5D Smoke Dispersion & Smooth Card Flight
  const triggerSplit = useCallback(() => {
    if (splitTriggeredRef.current) return
    splitTriggeredRef.current = true

    // Make sure typewriter completes if skipped early
    setTypedLine1(LINE_1_FULL)
    setTypedLine2(LINE_2_FULL)
    setActiveCursor('done')

    const dest = getDestination()
    setTargetTransform(dest)
    setPhase('splitting')

    // Clean unmount from DOM once the card smoothly settles into Hero
    setTimeout(() => {
      setPhase('hidden')
      // Unlock scroll
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }, 980)
  }, [getDestination])

  // Typewriter sequence for the Error text ("ar ayikhane jei ager eror lekha eta ene deo")
  useEffect(() => {
    let charIndex1 = 0
    let charIndex2 = 0
    let timeoutId: NodeJS.Timeout

    const typeLine1 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex1 < LINE_1_FULL.length) {
        charIndex1++
        setTypedLine1(LINE_1_FULL.slice(0, charIndex1))
        timeoutId = setTimeout(typeLine1, 32)
      } else {
        setActiveCursor('line2')
        timeoutId = setTimeout(typeLine2, 120)
      }
    }

    const typeLine2 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex2 < LINE_2_FULL.length) {
        charIndex2++
        setTypedLine2(LINE_2_FULL.slice(0, charIndex2))
        timeoutId = setTimeout(typeLine2, 35)
      } else {
        setActiveCursor('done')
        setPhase('waiting')
        // Pause to admire the error + portrait card, then smoothly transition
        timeoutId = setTimeout(() => {
          triggerSplit()
        }, 1200)
      }
    }

    timeoutId = setTimeout(typeLine1, 180)

    // Allow user to click or press any key to enter immediately
    const handleKey = () => triggerSplit()
    window.addEventListener('keydown', handleKey, { once: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('keydown', handleKey)
    }
  }, [triggerSplit])

  if (phase === 'hidden') return null

  const isSplitting = phase === 'splitting'

  return (
    <div
      onClick={triggerSplit}
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onTouchMove={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      className="fixed inset-0 z-[9999999] pointer-events-auto select-none cursor-pointer overflow-hidden font-mono flex flex-col items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* =========================================================================
          4D / 5D VOLUMETRIC SMOKE & MIST BACKDROP ("ota dhuya type kore deo 4d,5d")
          No hard black bars! Instead, realistic cinematic smoke dissolves into light.
         ========================================================================= */}
      <motion.div
        initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        animate={
          isSplitting
            ? {
                opacity: 0,
                scale: 1.18,
                filter: 'blur(35px)',
                transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
              }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Base Deep Obsidian Mist Floor */}
        <div className="absolute inset-0 bg-[#020306]/95 backdrop-blur-2xl" />

        {/* Dense Swirling Smoke Cloud - Top Center */}
        <motion.div
          animate={
            isSplitting
              ? { y: -160, scale: 1.5, opacity: 0 }
              : { y: [0, -15, 0], scale: [1, 1.05, 1], opacity: 0.55 }
          }
          transition={
            isSplitting
              ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[110vw] h-[70vh] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.12) 40%, rgba(2, 3, 6, 0.85) 75%, transparent 100%)',
            filter: 'blur(65px)',
          }}
        />

        {/* Dense Swirling Smoke Cloud - Bottom Center */}
        <motion.div
          animate={
            isSplitting
              ? { y: 160, scale: 1.5, opacity: 0 }
              : { y: [0, 15, 0], scale: [1, 1.05, 1], opacity: 0.5 }
          }
          transition={
            isSplitting
              ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[110vw] h-[70vh] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.18) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(2, 3, 6, 0.9) 75%, transparent 100%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Center Dissolving Smoke Ring (clears out the center first as smoke dissipates) */}
        <motion.div
          animate={
            isSplitting
              ? {
                  scale: [1, 2.6],
                  opacity: [0.7, 0],
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                }
              : { scale: 1, opacity: 0.4 }
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(2, 3, 6, 0.6) 45%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />

        {/* Micro Cyber Atmospheric Dust Particles */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </motion.div>

      {/* =========================================================================
          TOP HUD TERMINAL (Subtle ambient info)
         ========================================================================= */}
      <motion.div
        animate={isSplitting ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 sm:top-6 left-5 sm:left-10 right-5 sm:right-10 flex items-center justify-between text-[11px] text-stone-500 font-mono pointer-events-none z-20"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest text-emerald-400 font-bold uppercase text-[10px] sm:text-xs">
            MOMINUL ISLAM // ARCHITECT
          </span>
        </div>
        <span className="tracking-wider text-stone-500 hidden sm:inline text-[10px] sm:text-xs">
          CLICK OR TAP TO ENTER ↵
        </span>
      </motion.div>

      {/* =========================================================================
          MAIN CENTERSTAGE: ERROR 404 TEXT + PORTRAIT CARD
         ========================================================================= */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 w-full max-w-2xl pointer-events-none">
        {/* Hacker / Glitch Error 404 Headline ("ar ayikhane jei ager eror lekha eta ene deo") */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            isSplitting
              ? {
                  opacity: 0,
                  y: -50,
                  scale: 0.92,
                  filter: 'blur(14px)',
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                }
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          }
          className="text-center mb-3 sm:mb-5 max-w-xl px-2"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] sm:text-xs tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold uppercase tracking-widest">SYSTEM ALERT // 404</span>
          </div>

          {/* Line 1: ERROR 404: Conventional */}
          <h1
            className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-white font-mono"
            style={{
              letterSpacing: '0.03em',
              textShadow: '0 0 25px rgba(255, 255, 255, 0.35), 0 2px 10px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine1}</span>
            {activeCursor === 'line1' && (
              <span className="inline-block w-2 sm:w-3 h-4 sm:h-7 bg-red-400 ml-1.5 animate-pulse align-middle" />
            )}
          </h1>

          {/* Line 2: developer not found. */}
          {typedLine2 && (
            <p
              className="text-xs xs:text-sm sm:text-base md:text-lg font-bold tracking-wide text-emerald-400 font-mono mt-1"
              style={{
                textShadow: '0 0 20px rgba(16, 185, 129, 0.45)',
              }}
            >
              <span>{typedLine2}</span>
              {(activeCursor === 'line2' || activeCursor === 'done') && (
                <span className="inline-block w-1.5 sm:w-2.5 h-3 sm:h-5 bg-emerald-400 ml-1.5 animate-pulse align-middle" />
              )}
            </p>
          )}
        </motion.div>

        {/* =========================================================================
            PORTRAIT CARD: Glides smoothly through smoke straight into Hero slot!
           ========================================================================= */}
        <motion.div
          ref={cardRef}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={
            isSplitting
              ? {
                  x: targetTransform.x,
                  y: targetTransform.y,
                  scale: targetTransform.scale,
                  opacity: [1, 1, 0.85, 0], // Smooth handoff at destination
                  transition: {
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1], // Ultra-smooth Apple-grade cubic-bezier ("oenk sommoth koro")
                    opacity: { times: [0, 0.75, 0.92, 1], duration: 0.95 },
                  },
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.5, ease: 'easeOut' },
                }
          }
          className="relative w-[190px] xs:w-[215px] sm:w-[270px] md:w-[310px] aspect-[3/4] rounded-2xl sm:rounded-[28px] overflow-hidden flex items-end justify-center pointer-events-auto cursor-pointer"
          style={{
            border: '1.5px solid var(--portrait-border, rgba(16, 185, 129, 0.6))',
            backgroundColor: 'rgba(10, 12, 18, 0.85)',
            boxShadow:
              '0 0 50px rgba(16, 185, 129, 0.4), 0 25px 60px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Portrait Image */}
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-portrait-01.png"
              alt="Md. Mominul Islam"
              fill
              priority
              sizes="(max-width: 640px) 215px, (max-width: 1024px) 270px, 310px"
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

      {/* =========================================================================
          BOTTOM HUD STATUS
         ========================================================================= */}
      <motion.div
        animate={isSplitting ? { y: 40, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-6 left-5 sm:left-10 right-5 sm:right-10 flex items-center justify-between text-[10px] sm:text-xs text-stone-500 font-mono pointer-events-none z-20"
      >
        <span className="text-stone-400 hidden sm:inline">Mobile & Web Engineering Platform</span>
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
            CLICK ANYWHERE TO ENTER
          </span>
        </div>
      </motion.div>
    </div>
  )
}
