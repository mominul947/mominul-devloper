'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const LINE_1_FULL = 'ERROR 404: Conventional'
const LINE_2_FULL = 'developer not found.'

// Realistic professional hacker system logs
const HACKER_BOOT_LOGS = [
  '[00.012] KERNEL_INIT: Booting Quantum Architecture v4.2...',
  '[00.045] SECURITY_OVERRIDE: Root privileges unlocked (UID: 0)',
  '[00.089] SCANNING_TALENT_POOL: Looking for conventional developer...',
  '[00.142] MEMORY_MAP: 0x7FFF8A49... 0xFFFFFFFC [OK]',
  '[00.210] EXCEPTION: Conventional methods failed validation',
  '[00.285] STACK_TRACE: ConventionalEngineer.execute() -> null',
  '[00.340] ALERT: Conventional developer not found in database',
  '[00.412] INJECTING_PAYLOAD: Deploying Mominul Full-Stack Core...',
  '[00.490] COMPILING: Next.js 14, Flutter, FastAPIs, 3D WebGL...',
  '[00.560] ENCRYPTION_ESTABLISHED: AES-256-GCM Handshake verified',
  '[00.630] ALLOCATING_NEURAL_NODES: 42 technologies in spatial orbit',
  '[00.710] PROTOCOL_STATUS: Ready to breach main viewport',
]

export default function GlitchIntroPreloader() {
  const [typedLine1, setTypedLine1] = useState('')
  const [typedLine2, setTypedLine2] = useState('')
  const [activeCursor, setActiveCursor] = useState<'line1' | 'line2' | 'done'>('line1')
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'splitting' | 'hidden'>('typing')
  const [visibleLogs, setVisibleLogs] = useState<string[]>([])

  const splitTriggeredRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  // 1. 3D Perspective Matrix Digital Rain Canvas (Zero Lag, High FPS)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const characters =
      '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[]/*+=~$_#@&0123456789'
    const fontSize = 14
    const columns = Math.floor(width / fontSize)
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50))

    let lastTime = 0
    const fpsInterval = 1000 / 30 // Lock to smooth 30-40fps for authentic retro hacker terminal

    const draw = (currentTime: number) => {
      animationId = requestAnimationFrame(draw)

      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      // Translucent black overlay creates fading green trailing effect
      ctx.fillStyle = 'rgba(4, 5, 8, 0.15)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Head of the drop is bright white/cyan, tail is emerald green
        if (Math.random() > 0.88) {
          ctx.fillStyle = '#67e8f9' // Bright Cyan Head
        } else if (Math.random() > 0.7) {
          ctx.fillStyle = '#ffffff' // Pure White Glint
        } else {
          ctx.fillStyle = '#10b981' // Cyber Emerald Tail
        }

        ctx.fillText(text, x, y)

        if (y > height && Math.random() > 0.975) {
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

  // 2. Real-time Live Hacker Logs Feed
  useEffect(() => {
    let logIndex = 0
    const logInterval = setInterval(() => {
      if (logIndex < HACKER_BOOT_LOGS.length) {
        const nextLog = HACKER_BOOT_LOGS[logIndex]
        setVisibleLogs((prev) => [...prev.slice(-7), nextLog])
        logIndex++
      } else {
        clearInterval(logInterval)
      }
    }, 140)

    return () => clearInterval(logInterval)
  }, [])

  // 3. Typewriter Effect for Main 404 Headline
  useEffect(() => {
    let charIndex1 = 0
    let charIndex2 = 0
    let timeoutId: NodeJS.Timeout

    const typeLine1 = () => {
      if (splitTriggeredRef.current) return
      if (charIndex1 < LINE_1_FULL.length) {
        charIndex1++
        setTypedLine1(LINE_1_FULL.slice(0, charIndex1))
        timeoutId = setTimeout(typeLine1, 40)
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
        timeoutId = setTimeout(typeLine2, 45)
      } else {
        setActiveCursor('done')
        setPhase('waiting')
        timeoutId = setTimeout(() => {
          triggerSplit()
        }, 1500) // Comfortable 1.5s reading window
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
      className="fixed inset-0 z-[9999999] pointer-events-auto select-none cursor-pointer overflow-hidden font-mono bg-[#030407]"
    >
      {/* =========================================================================
          BACKGROUND LAYER: 3D PERSPECTIVE HACKER CODE RAIN & CYBER GRID
         ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{
          perspective: '900px',
        }}
      >
        {/* Tilted 3D Matrix Digital Rain */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-35"
          style={{
            transform: 'perspective(900px) rotateX(20deg) scale(1.15)',
            transformOrigin: 'center center',
          }}
        />

        {/* 3D Cyan/Emerald Floor Grid Horizon */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(600px) rotateX(65deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Central Atmospheric Vignette & Underglow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,4,7,0.85)_80%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

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
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#040508]/92 backdrop-blur-xs border-b border-emerald-500/25 flex flex-col justify-end items-center pb-3 px-4 shadow-2xl z-20"
      >
        {/* Subtle Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px',
          }}
        />

        {/* TOP TERMINAL HEADER (Cyber Hacker Details) */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold tracking-widest uppercase">
              TERMINAL // ROOT_ACCESS_GRANTED
            </span>
            <span className="hidden md:inline px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[9px]">
              ENCRYPT: SHA-512
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span className="hidden sm:inline text-emerald-400/80">NODE: MOMINUL-ARCHITECT</span>
            <span className="text-[10px] tracking-wider text-emerald-400/60 hidden xs:inline border border-emerald-500/20 px-2 py-0.5 rounded">
              PRESS ANY KEY TO BYPASS ↵
            </span>
          </div>
        </div>

        {/* LIVE STREAMING HACKER LOGS (Top Left Floating Feed) */}
        <div className="absolute top-14 left-4 sm:left-8 max-w-sm hidden sm:flex flex-col gap-1 text-[9.5px] font-mono text-emerald-400/60 pointer-events-none select-none">
          {visibleLogs.slice(0, 4).map((log, index) => (
            <div key={`log-top-${index}`} className="truncate flex items-center gap-1.5">
              <span className="text-cyan-400">&gt;</span>
              <span className="text-emerald-300/80">{log}</span>
            </div>
          ))}
        </div>

        {/* TOP RIGHT TELEMETRY HUD */}
        <div className="absolute top-14 right-4 sm:right-8 text-right hidden sm:flex flex-col gap-0.5 text-[9px] font-mono text-stone-500 pointer-events-none">
          <span className="text-cyan-400">FPS: 60.0 // LATENCY: 0.8ms</span>
          <span>MEM: 64TB // ARCHITECT_CORE: ACTIVE</span>
          <span className="text-emerald-400">STATUS: OVERRIDE IN PROGRESS</span>
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
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-stone-100 font-mono whitespace-nowrap inline-flex items-center"
            style={{
              textShadow: '0 0 25px rgba(16, 185, 129, 0.5), 0 2px 8px rgba(0,0,0,0.9)',
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
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#040508]/92 backdrop-blur-xs border-t border-emerald-500/25 flex flex-col justify-start items-center pt-3 px-4 shadow-2xl z-20"
      >
        {/* Subtle Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
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
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-emerald-300 font-mono whitespace-nowrap inline-flex items-center"
            style={{
              textShadow: '0 0 25px rgba(16, 185, 129, 0.6), 0 2px 8px rgba(0,0,0,0.9)',
            }}
          >
            <span>{typedLine2}</span>
            {(activeCursor === 'line2' || activeCursor === 'done') && (
              <span className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-emerald-400 ml-1.5 animate-pulse align-middle shadow-[0_0_12px_#10b981]" />
            )}
          </h1>
        </motion.div>

        {/* LIVE STREAMING HACKER LOGS (Bottom Left Floating Feed) */}
        <div className="absolute bottom-12 left-4 sm:left-8 max-w-sm hidden sm:flex flex-col gap-1 text-[9.5px] font-mono text-emerald-400/60 pointer-events-none select-none">
          {visibleLogs.slice(4).map((log, index) => (
            <div key={`log-bottom-${index}`} className="truncate flex items-center gap-1.5">
              <span className="text-cyan-400">&gt;</span>
              <span className="text-emerald-300/80">{log}</span>
            </div>
          ))}
        </div>

        {/* BOTTOM HUD / HINT */}
        <div className="absolute bottom-5 flex items-center gap-2 text-[11px] text-stone-400 tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-stone-300 font-mono">Click anywhere or tap screen to enter portal</span>
        </div>
      </motion.div>

      {/* Central Horizon Glow during split */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-xs shadow-[0_0_20px_#10b981]" />
      </div>
    </div>
  )
}
