'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
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

  // 1. Lock page scroll strictly while intro preloader is active, and unlock 100% when hidden
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (phase !== 'hidden') {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'

      const preventDefaultScroll = (e: Event) => {
        e.preventDefault()
      }

      window.addEventListener('wheel', preventDefaultScroll, { passive: false })
      window.addEventListener('touchmove', preventDefaultScroll, { passive: false })

      return () => {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        document.body.style.touchAction = ''
        window.removeEventListener('wheel', preventDefaultScroll)
        window.removeEventListener('touchmove', preventDefaultScroll)
      }
    } else {
      // 100% Guaranteed scroll unlock once intro is finished
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [phase])

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

  // Trigger the 2-Way Vault Door Split ("majhe je 2 vag hoi")
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
    }, 1480)
  }, [getDestination])

  // Typewriter sequence for the Error text
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
        // Pause to read comfortably, then smoothly split ("animetion er time ta barao")
        timeoutId = setTimeout(() => {
          triggerSplit()
        }, 2200)
      }
    }

    timeoutId = setTimeout(typeLine1, 150)

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
      className="fixed inset-0 z-[9999999] pointer-events-auto select-none cursor-pointer overflow-hidden font-mono flex flex-col items-center justify-center bg-transparent"
      style={{ touchAction: 'none' }}
    >
      {/* =========================================================================
          TOP HALF SHUTTER (100% Solid Opaque Pitch Black, Slides UP on split)
          "majhe je 2 vag hoi seita kothay ota add kroo" + "background dekha jabe na"
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '-105%',
                transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              }
            : { y: 0 }
        }
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#020306] border-b border-emerald-500/20 z-10 flex flex-col justify-start p-4 sm:p-7 shadow-2xl"
        style={{ backgroundColor: '#020306' }}
      >
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Top HUD */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold tracking-widest uppercase">
              MOMINUL ISLAM // ARCHITECT
            </span>
          </div>
          <span className="tracking-wider text-stone-400 hidden sm:inline">
            CLICK OR TAP TO ENTER ↵
          </span>
        </div>
      </motion.div>

      {/* =========================================================================
          BOTTOM HALF SHUTTER (100% Solid Opaque Pitch Black, Slides DOWN on split)
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '105%',
                transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              }
            : { y: 0 }
        }
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020306] border-t border-emerald-500/20 z-10 flex flex-col justify-end p-4 sm:p-7 shadow-2xl"
        style={{ backgroundColor: '#020306' }}
      >
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Bottom HUD */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-400 font-mono">
          <span className="text-stone-400 hidden sm:inline">Mobile & Web Engineering Platform</span>
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold uppercase tracking-widest">
              PORTAL READY
            </span>
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          MAIN CENTERSTAGE: LARGE ERROR 404 HEADLINE + PORTRAIT CARD
          - No red badges ("lal lekha dorkar nai")
          - Big bold high-impact error typography ("404 eror boro kore lekha thakbe")
          - Image card flies smoothly straight into Hero slot
         ========================================================================= */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 w-full max-w-3xl pointer-events-none">
        
        {/* Big Bold Error Headline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            isSplitting
              ? {
                  opacity: 0,
                  y: -50,
                  scale: 0.92,
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                }
              : { opacity: 1, y: 0, scale: 1 }
          }
          className="text-center mb-3 sm:mb-5 max-w-2xl px-2"
        >
          {/* Line 1: ERROR 404: Conventional (Big Bold High-Contrast White) */}
          <h1
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-white font-mono"
            style={{
              letterSpacing: '0.04em',
              textShadow: '0 0 35px rgba(255, 255, 255, 0.5), 0 4px 15px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine1}</span>
            {activeCursor === 'line1' && (
              <span className="inline-block w-2.5 sm:w-4 h-6 sm:h-12 bg-white ml-2 animate-pulse align-middle" />
            )}
          </h1>

          {/* Line 2: developer not found. (Big High-Impact Emerald) */}
          {typedLine2 && (
            <p
              className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide text-emerald-400 font-mono mt-1 sm:mt-2"
              style={{
                textShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
              }}
            >
              <span>{typedLine2}</span>
              {(activeCursor === 'line2' || activeCursor === 'done') && (
                <span className="inline-block w-2 sm:w-3.5 h-5 sm:h-8 bg-emerald-400 ml-2 animate-pulse align-middle" />
              )}
            </p>
          )}
        </motion.div>

        {/* =========================================================================
            PORTRAIT CARD: Glides smoothly into exact Hero slot on split!
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
                  opacity: [1, 1, 0.85, 0],
                  transition: {
                    duration: 1.45,
                    ease: [0.22, 1, 0.36, 1], // Extended smooth Apple-grade curve ("animetion er time ta barao")
                    opacity: { times: [0, 0.82, 0.95, 1], duration: 1.45 },
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
            backgroundColor: '#0c0f17',
            boxShadow:
              '0 0 50px rgba(16, 185, 129, 0.45), 0 25px 60px rgba(0, 0, 0, 0.95), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
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
    </div>
  )
}
