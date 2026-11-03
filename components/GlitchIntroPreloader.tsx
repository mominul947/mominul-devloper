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

  // Trigger the 3D Vault Door Split Reveal
  const triggerSplit = useCallback(() => {
    if (splitTriggeredRef.current) return
    splitTriggeredRef.current = true

    setTypedLine1(LINE_1_FULL)
    setTypedLine2(LINE_2_FULL)
    setActiveCursor('done')
    setPhase('splitting')

    setTimeout(() => {
      setPhase('hidden')
    }, 950)
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
        timeoutId = setTimeout(typeLine1, 38)
      } else {
        setActiveCursor('line2')
        timeoutId = setTimeout(typeLine2, 160)
      }
    }

    const typeLine2 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex2 < LINE_2_FULL.length) {
        charIndex2++
        setTypedLine2(LINE_2_FULL.slice(0, charIndex2))
        timeoutId = setTimeout(typeLine2, 42)
      } else {
        setActiveCursor('done')
        setPhase('waiting')
        timeoutId = setTimeout(() => {
          triggerSplit()
        }, 1300) // 1.3s comfortable reading pause
      }
    }

    timeoutId = setTimeout(typeLine1, 280)

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
      style={{ perspective: '1400px' }}
    >
      {/* =========================================================================
          TOP 3D VAULT SHUTTER DOOR (Solid Black, 3D Perspective Tilt, Even Slit)
         ========================================================================= */}
      <motion.div
        initial={{ y: 0, rotateX: 0 }}
        animate={
          isSplitting
            ? {
                y: '-105%',
                rotateX: 18,
                opacity: 0,
                transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
              }
            : {
                // Symmetrical, subtle 12px gap up ("alpo faka hoi, ar soman vabe")
                y: '-12px',
                rotateX: -2.5,
                transition: { duration: 0.6, ease: 'easeOut' },
              }
        }
        style={{
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.5), inset 0 -1px 2px rgba(255, 255, 255, 0.15)',
        }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#020306] border-b-2 border-emerald-400 flex flex-col justify-end items-center pb-4 sm:pb-6 px-4 z-20"
      >
        {/* Subtle Cyber Grid Lines inside the door */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Minimalist Top HUD Bar */}
        <div className="absolute top-4 sm:top-7 left-5 sm:left-10 right-5 sm:right-10 flex items-center justify-between text-[10px] sm:text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="tracking-widest text-emerald-400 font-bold uppercase">
              ARCHITECT // SYSTEM 404
            </span>
          </div>
          <span className="tracking-wider text-stone-500 hidden sm:inline">
            CLICK OR PRESS ANY KEY TO ENTER ↵
          </span>
        </div>

        {/* Top-Left / Top-Right Futuristic Cyber Corner Brackets */}
        <div className="absolute top-3 left-3 text-emerald-500/40 text-xs font-mono pointer-events-none">
          ┌
        </div>
        <div className="absolute top-3 right-3 text-emerald-500/40 text-xs font-mono pointer-events-none">
          ┐
        </div>

        {/* LINE 1: "ERROR 404: Conventional" (Crisp, Perfectly Centered Symmetrically) */}
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
          <h1
            className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-white font-mono whitespace-nowrap inline-flex items-center"
            style={{
              letterSpacing: '0.05em',
              textShadow: '0 0 28px rgba(255, 255, 255, 0.45), 0 2px 8px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine1}</span>
            {activeCursor === 'line1' && (
              <span className="inline-block w-2 sm:w-3.5 h-5 sm:h-9 bg-emerald-400 ml-1.5 animate-pulse align-middle shadow-[0_0_12px_#10b981]" />
            )}
          </h1>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          CENTER APERTURE (Website reveals cleanly through this symmetrical crack)
          - Symmetrical 24px gap with intense neon emerald laser glow
         ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full h-[24px] bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent blur-xs shadow-[0_0_40px_rgba(16,185,129,0.8)]" />
      </div>

      {/* =========================================================================
          BOTTOM 3D VAULT SHUTTER DOOR (Solid Black, 3D Perspective Tilt, Even Slit)
         ========================================================================= */}
      <motion.div
        initial={{ y: 0, rotateX: 0 }}
        animate={
          isSplitting
            ? {
                y: '105%',
                rotateX: -18,
                opacity: 0,
                transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
              }
            : {
                // Symmetrical, subtle 12px gap down ("alpo faka hoi, ar soman vabe")
                y: '12px',
                rotateX: 2.5,
                transition: { duration: 0.6, ease: 'easeOut' },
              }
        }
        style={{
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
          boxShadow: '0 -8px 32px rgba(16, 185, 129, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
        }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020306] border-t-2 border-emerald-400 flex flex-col justify-start items-center pt-4 sm:pt-6 px-4 z-20"
      >
        {/* Subtle Cyber Grid Lines inside the door */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* LINE 2: "developer not found." (Crisp, Perfectly Centered Symmetrically) */}
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
          <h1
            className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-emerald-300 font-mono whitespace-nowrap inline-flex items-center"
            style={{
              letterSpacing: '0.05em',
              textShadow: '0 0 28px rgba(16, 185, 129, 0.6), 0 2px 8px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine2}</span>
            {(activeCursor === 'line2' || activeCursor === 'done') && (
              <span className="inline-block w-2 sm:w-3.5 h-5 sm:h-9 bg-emerald-400 ml-1.5 animate-pulse align-middle shadow-[0_0_12px_#10b981]" />
            )}
          </h1>
        </motion.div>

        {/* Bottom-Left / Bottom-Right Futuristic Cyber Corner Brackets */}
        <div className="absolute bottom-3 left-3 text-emerald-500/40 text-xs font-mono pointer-events-none">
          └
        </div>
        <div className="absolute bottom-3 right-3 text-emerald-500/40 text-xs font-mono pointer-events-none">
          ┘
        </div>

        {/* Minimalist Bottom Status */}
        <div className="absolute bottom-4 sm:bottom-7 flex items-center gap-2 text-[10px] sm:text-xs text-stone-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-stone-400">Tap anywhere to enter website</span>
        </div>
      </motion.div>
    </div>
  )
}
