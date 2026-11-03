'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const LINE_1_FULL = 'ERROR 404: Conventional'
const LINE_2_FULL = 'developer not found.'

export default function GlitchIntroPreloader() {
  const [typedLine1, setTypedLine1] = useState('')
  const [typedLine2, setTypedLine2] = useState('')
  const [activeCursor, setActiveCursor] = useState<'line1' | 'line2' | 'done'>('line1')
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'splitting' | 'hidden'>('typing')

  const splitTriggeredRef = useRef(false)

  // Trigger the 2-way split transition ("2 ta 2 dike jabe")
  const triggerSplit = useCallback(() => {
    if (splitTriggeredRef.current) return
    splitTriggeredRef.current = true

    // Show full text immediately if skipped early
    setTypedLine1(LINE_1_FULL)
    setTypedLine2(LINE_2_FULL)
    setActiveCursor('done')
    setPhase('splitting')

    setTimeout(() => {
      setPhase('hidden')
    }, 950)
  }, [])

  // Typewriter effect loop
  useEffect(() => {
    let charIndex1 = 0
    let charIndex2 = 0
    let timeoutId: NodeJS.Timeout

    // Step 1: Type Line 1 ("ERROR 404: Conventional")
    const typeLine1 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex1 < LINE_1_FULL.length) {
        charIndex1++
        setTypedLine1(LINE_1_FULL.slice(0, charIndex1))
        timeoutId = setTimeout(typeLine1, 40)
      } else {
        // Line 1 finished, switch cursor to Line 2 after brief pause
        setActiveCursor('line2')
        timeoutId = setTimeout(typeLine2, 160)
      }
    }

    // Step 2: Type Line 2 ("developer not found.")
    const typeLine2 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex2 < LINE_2_FULL.length) {
        charIndex2++
        setTypedLine2(LINE_2_FULL.slice(0, charIndex2))
        timeoutId = setTimeout(typeLine2, 45)
      } else {
        // Typing fully completed! Pause so user can read ("seikhane kicukhon oppekha kore")
        setActiveCursor('done')
        setPhase('waiting')
        timeoutId = setTimeout(() => {
          triggerSplit()
        }, 1400) // 1.4s comfortable pause
      }
    }

    // Start typing line 1
    timeoutId = setTimeout(typeLine1, 200)

    // Allow user click or any keypress to skip typing and open immediately
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

        {/* LINE 1: "ERROR 404: Conventional" (Typewriter + Moves LEFT on split) */}
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-stone-100 font-mono drop-shadow-lg whitespace-nowrap inline-flex items-center">
            <span>{typedLine1}</span>
            {activeCursor === 'line1' && (
              <span className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-purple-400 ml-1.5 animate-pulse align-middle" />
            )}
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

        {/* LINE 2: "developer not found." (Typewriter + Moves RIGHT on split) */}
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-stone-200 font-mono drop-shadow-lg whitespace-nowrap inline-flex items-center">
            <span>{typedLine2}</span>
            {(activeCursor === 'line2' || activeCursor === 'done') && (
              <span className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-purple-400 ml-1.5 animate-pulse align-middle" />
            )}
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
