'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const LINE_1_FULL = 'ERROR 404: Conventional'
const LINE_2_FULL = 'developer not found.'

export default function GlitchIntroPreloader() {
  const [typedLine1, setTypedLine1] = useState('')
  const [typedLine2, setTypedLine2] = useState('')
  const [activeCursor, setActiveCursor] = useState<'line1' | 'line2' | 'done'>('line1')
  const [phase, setPhase] = useState<'peeking' | 'waiting' | 'splitting' | 'hidden'>('peeking')

  const splitTriggeredRef = useRef(false)

  // Trigger the 2-way Split Reveal
  const triggerSplit = useCallback(() => {
    if (splitTriggeredRef.current) return
    splitTriggeredRef.current = true

    setTypedLine1(LINE_1_FULL)
    setTypedLine2(LINE_2_FULL)
    setActiveCursor('done')
    setPhase('splitting')

    // Clean unmount from DOM — nothing remains
    setTimeout(() => {
      setPhase('hidden')
    }, 750)
  }, [])

  // Smooth Typewriter Sequence
  useEffect(() => {
    let charIndex1 = 0
    let charIndex2 = 0
    let timeoutId: NodeJS.Timeout

    const typeLine1 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex1 < LINE_1_FULL.length) {
        charIndex1++
        setTypedLine1(LINE_1_FULL.slice(0, charIndex1))
        timeoutId = setTimeout(typeLine1, 35)
      } else {
        setActiveCursor('line2')
        timeoutId = setTimeout(typeLine2, 140)
      }
    }

    const typeLine2 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex2 < LINE_2_FULL.length) {
        charIndex2++
        setTypedLine2(LINE_2_FULL.slice(0, charIndex2))
        timeoutId = setTimeout(typeLine2, 38)
      } else {
        setActiveCursor('done')
        setPhase('waiting')
        timeoutId = setTimeout(() => {
          triggerSplit()
        }, 1200) // 1.2s reading pause
      }
    }

    timeoutId = setTimeout(typeLine1, 200)

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
      className="fixed inset-0 z-[9999999] pointer-events-auto select-none cursor-pointer overflow-hidden font-mono"
    >
      {/* =========================================================================
          TOP SHUTTER DOOR (100% Solid Black, Opens Generously Wide, Disappears Completely)
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '-110%',
                opacity: 0,
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
              }
            : {
                // Wide, generous horizontal aperture opening ("ar o beshi khulbe")
                y: '-45px',
                transition: { duration: 0.5, ease: 'easeOut' },
              }
        }
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#020306] border-b border-white/20 flex flex-col justify-end items-center pb-3 px-4 z-20 shadow-2xl"
      >
        {/* Subtle Cyber Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Top Terminal Status */}
        <div className="absolute top-4 sm:top-6 left-5 sm:left-10 right-5 sm:right-10 flex items-center justify-between text-[11px] text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="tracking-widest text-stone-400 font-bold uppercase">
              SYSTEM ALERT // 404
            </span>
          </div>
          <span className="tracking-wider text-stone-500 hidden sm:inline">
            CLICK OR PRESS ANY KEY TO ENTER ↵
          </span>
        </div>

        {/* LINE 1: "ERROR 404: Conventional" (Crisp, High-Contrast Typography) */}
        <motion.div
          animate={
            isSplitting
              ? {
                  x: '-100%',
                  opacity: 0,
                  transition: { duration: 0.5, ease: 'easeIn' },
                }
              : { x: 0, opacity: 1 }
          }
          className="relative z-10 text-center mb-1"
        >
          <h1
            className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-white font-mono whitespace-nowrap inline-flex items-center"
            style={{
              letterSpacing: '0.04em',
              textShadow: '0 0 25px rgba(255, 255, 255, 0.4), 0 2px 10px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine1}</span>
            {activeCursor === 'line1' && (
              <span className="inline-block w-2 sm:w-3.5 h-5 sm:h-9 bg-white ml-1.5 animate-pulse align-middle" />
            )}
          </h1>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          BOTTOM SHUTTER DOOR (100% Solid Black, Opens Generously Wide, Disappears Completely)
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '110%',
                opacity: 0,
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
              }
            : {
                // Wide, generous horizontal aperture opening ("ar o beshi khulbe")
                y: '45px',
                transition: { duration: 0.5, ease: 'easeOut' },
              }
        }
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020306] border-t border-white/20 flex flex-col justify-start items-center pt-3 px-4 z-20 shadow-2xl"
      >
        {/* Subtle Cyber Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* LINE 2: "developer not found." (Crisp, High-Contrast Typography) */}
        <motion.div
          animate={
            isSplitting
              ? {
                  x: '100%',
                  opacity: 0,
                  transition: { duration: 0.5, ease: 'easeIn' },
                }
              : { x: 0, opacity: 1 }
          }
          className="relative z-10 text-center mt-1"
        >
          <h1
            className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-stone-200 font-mono whitespace-nowrap inline-flex items-center"
            style={{
              letterSpacing: '0.04em',
              textShadow: '0 0 25px rgba(255, 255, 255, 0.3), 0 2px 10px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine2}</span>
            {(activeCursor === 'line2' || activeCursor === 'done') && (
              <span className="inline-block w-2 sm:w-3.5 h-5 sm:h-9 bg-white ml-1.5 animate-pulse align-middle" />
            )}
          </h1>
        </motion.div>

        {/* Bottom Status */}
        <div className="absolute bottom-4 sm:bottom-6 flex items-center gap-2 text-[10px] sm:text-xs text-stone-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-ping" />
          <span className="font-mono text-stone-400">Click anywhere to open website</span>
        </div>
      </motion.div>
    </div>
  )
}
