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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Trigger the 2-way split transition ("2 ta 2 dike jabe")
  const triggerSplit = useCallback(() => {
    if (splitTriggeredRef.current) return
    splitTriggeredRef.current = true

    setTypedLine1(LINE_1_FULL)
    setTypedLine2(LINE_2_FULL)
    setActiveCursor('done')
    setPhase('splitting')

    setTimeout(() => {
      setPhase('hidden')
    }, 900)
  }, [])

  // 1. Subtle, Elegant Background 3D Cyber Code Rain (Subtle, Dark, Ultra-Premium)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const characters = '01ABCDEF0123456789{}[]/*+=~$_#@&<>'
    const fontSize = 13
    const columns = Math.floor(width / fontSize)
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -40))

    let lastTime = 0
    const fpsInterval = 1000 / 30

    const draw = (currentTime: number) => {
      animationId = requestAnimationFrame(draw)

      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      // Solid pitch black overlay for ultra-crisp contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        const x = i * fontSize
        const y = drops[i] * fontSize

        if (Math.random() > 0.94) {
          ctx.fillStyle = '#67e8f9' // Subtle cyan head
        } else {
          ctx.fillStyle = '#059669' // Deep emerald tail
        }

        ctx.fillText(text, x, y)

        if (y > height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    animationId = requestAnimationFrame(draw)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 2. Sequential Typewriter Effect with comfortable reading pause
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
        }, 1300)
      }
    }

    timeoutId = setTimeout(typeLine1, 250)

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
          TOP HALF SOLID SHUTTER DOOR (100% Solid Black — Zero Muddy Bleed-through)
          - Slides UP on split to unveil website
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '-100%',
                transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
              }
            : {
                // Sleek, razor-sharp 16px aperture gap in center ("majhe faka hoye website dekha jabe")
                y: '-16px',
                transition: { duration: 0.5, ease: 'easeOut' },
              }
        }
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#000000] border-b-2 border-emerald-400/90 flex flex-col justify-end items-center pb-3 px-4 z-20"
        style={{
          boxShadow: '0 6px 30px rgba(16, 185, 129, 0.45)',
        }}
      >
        {/* Subtle Ambient 3D Code Rain inside the Door */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{
              transform: 'perspective(800px) rotateX(25deg) scale(1.1)',
              transformOrigin: 'center center',
            }}
          />
        </div>

        {/* Minimalist Professional Terminal Top Header (Matching Reference Image) */}
        <div className="absolute top-5 sm:top-7 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="tracking-widest font-bold text-stone-400">SYSTEM ALERT // 404</span>
          </div>
          <span className="text-[10px] tracking-wider text-stone-500 hidden sm:inline">
            CLICK OR PRESS ANY KEY TO ENTER
          </span>
        </div>

        {/* LINE 1: "ERROR 404: Conventional" (Crisp, High-Contrast Typography) */}
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
          className="relative z-10 text-center mb-1"
        >
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-white font-mono whitespace-nowrap inline-flex items-center"
            style={{
              letterSpacing: '0.04em',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 2px 10px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine1}</span>
            {activeCursor === 'line1' && (
              <span className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-emerald-400 ml-1.5 animate-pulse align-middle shadow-[0_0_12px_#10b981]" />
            )}
          </h1>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          CENTER APERTURE (Website reveals directly through this glowing crack)
         ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full h-[32px] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent blur-xs shadow-[0_0_35px_rgba(16,185,129,0.7)]" />
      </div>

      {/* =========================================================================
          BOTTOM HALF SOLID SHUTTER DOOR (100% Solid Black — Zero Muddy Bleed-through)
          - Slides DOWN on split to unveil website
         ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={
          isSplitting
            ? {
                y: '100%',
                transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
              }
            : {
                // Sleek, razor-sharp 16px aperture gap in center ("majhe faka hoye website dekha jabe")
                y: '16px',
                transition: { duration: 0.5, ease: 'easeOut' },
              }
        }
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#000000] border-t-2 border-emerald-400/90 flex flex-col justify-start items-center pt-3 px-4 z-20"
        style={{
          boxShadow: '0 -6px 30px rgba(16, 185, 129, 0.45)',
        }}
      >
        {/* Subtle Cyber Floor Grid Horizon inside Bottom Door */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(65deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* LINE 2: "developer not found." (Crisp, High-Contrast Typography) */}
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
          className="relative z-10 text-center mt-1"
        >
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-stone-200 font-mono whitespace-nowrap inline-flex items-center"
            style={{
              letterSpacing: '0.04em',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 2px 10px rgba(0,0,0,1)',
            }}
          >
            <span>{typedLine2}</span>
            {(activeCursor === 'line2' || activeCursor === 'done') && (
              <span className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-emerald-400 ml-1.5 animate-pulse align-middle shadow-[0_0_12px_#10b981]" />
            )}
          </h1>
        </motion.div>

        {/* Minimalist Bottom Status */}
        <div className="absolute bottom-6 flex items-center gap-2 text-[11px] text-stone-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-stone-400">Click anywhere to open website</span>
        </div>
      </motion.div>
    </div>
  )
}
