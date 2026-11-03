'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  X,
  FastForward,
  Terminal,
  CheckCircle2,
  Sparkles,
  ArrowUp,
  Cpu,
  Layers,
  Code2,
} from 'lucide-react'
import { useBuildTour } from '@/context/BuildTourContext'

interface CursorState {
  id: string
  name: string
  role: string
  color: string
  x: number // percentage 0-100 of viewport width
  y: number // percentage 0-100 of viewport height
  actionTag?: string
  isClicking?: boolean
}

interface BuildStage {
  id: string
  sectionId: string
  title: string
  task: string
  logText: string
  terminalLogs: string[]
  cursorTargets: Array<{
    cursorIndex: number
    x: number
    y: number
    actionTag: string
  }>
}

const STAGES: BuildStage[] = [
  {
    id: 'hero',
    sectionId: 'hero',
    title: 'Hero Architecture & 3D Lighting',
    task: 'Mounting responsive quantum grid & billboard typography',
    logText: 'Compiling Hero components, Framer Motion springs and dual portrait frames',
    terminalLogs: [
      '> [INIT] Loading App Router root layout (layout.tsx)',
      '> [HERO] Rendering responsive Billboard font typography: MOMINUL ISLAM',
      '> [STATE] Initialized active portrait switcher [01, 02]',
      '> [STATUS] Hero stage compiled in 14ms',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 28, y: 38, actionTag: 'Click // Photo 02' },
      { cursorIndex: 1, x: 72, y: 32, actionTag: 'Mount // Live Stat Badges' },
      { cursorIndex: 2, x: 48, y: 58, actionTag: 'Render // Billboard Mesh' },
      { cursorIndex: 3, x: 22, y: 75, actionTag: 'Link // WhatsApp API' },
    ],
  },
  {
    id: 'about',
    sectionId: 'about',
    title: 'Developer Persona & Experience Core',
    task: 'Binding career credentials, verified stats & architecture timeline',
    logText: 'Resolving 1.9+ years production timeline and live UTC+6 time tracking',
    terminalLogs: [
      '> [ABOUT] Injected 50+ delivered projects metadata',
      '> [CLOCK] Synchronized Dhaka Bangladesh live local time loop',
      '> [LEGAL] Verified Bogura Sadar residency credentials',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 35, y: 45, actionTag: 'Inspect // Experience Timeline' },
      { cursorIndex: 1, x: 65, y: 55, actionTag: 'Verify // 50+ Projects Metric' },
      { cursorIndex: 2, x: 50, y: 30, actionTag: 'Optimize // Typography Scale' },
      { cursorIndex: 3, x: 80, y: 40, actionTag: 'Bind // Clean Code Philosophy' },
    ],
  },
  {
    id: 'apps',
    sectionId: 'apps',
    title: 'Flutter & Native Android Engine',
    task: 'Bundling mobile apps, Play Store sandboxes & 60fps touch momentum',
    logText: 'Testing APK deployment, touch gesture momentum, and interactive preview',
    terminalLogs: [
      '> [MOBILE] Bundling Flutter Dart AOT release assets',
      '> [DEVICE] Mounted Android Flagship mockup frame with punch-hole camera',
      '> [GESTURE] 120 FPS momentum scroll enabled for mobile preview',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 52, y: 50, actionTag: 'Launch // Flutter App Demo' },
      { cursorIndex: 1, x: 30, y: 40, actionTag: 'Switch // Car Rental View' },
      { cursorIndex: 2, x: 75, y: 60, actionTag: 'Test // Touch Momentum' },
      { cursorIndex: 3, x: 45, y: 72, actionTag: 'Verify // Play Store Link' },
    ],
  },
  {
    id: 'website',
    sectionId: 'website',
    title: 'Multi-Device 3D Showroom Matrix',
    task: 'Embedding CarBook live iframe viewport (Laptop, Android & Tablet)',
    logText: 'Optimizing iframe rasterization, zero-scrollbar styling, and live sandbox',
    terminalLogs: [
      '> [IFRAME] Connecting https://www.carbookbd.com/ live sandbox',
      '> [SCALE] Auto-calculating matrix scale factors (Laptop: 0.65, Phone: 0.85)',
      '> [PERF] Offscreen iframe decimation enabled for zero GPU lag',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 42, y: 48, actionTag: 'Click // Android Mode' },
      { cursorIndex: 1, x: 68, y: 42, actionTag: 'Scale // Laptop Viewport' },
      { cursorIndex: 2, x: 25, y: 65, actionTag: 'Toggle // 3D Studio Matrix' },
      { cursorIndex: 3, x: 58, y: 78, actionTag: 'Reload // Live Sandbox' },
    ],
  },
  {
    id: 'hometown',
    sectionId: 'hometown',
    title: 'Bogura City Video Stream & Coordinates',
    task: 'Hooking IntersectionObserver for zero-cpu video streaming',
    logText: 'Calibrating video player audio toggle, fullscreen API, and Bogura GPS coordinates',
    terminalLogs: [
      '> [STREAM] Linked bogura-stream.mp4 video pipeline',
      '> [SENSOR] Attached IntersectionObserver threshold for battery preservation',
      '> [AUDIO] Configured hover audio trigger & volume synthesis',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 50, y: 52, actionTag: 'Play // Video Stream' },
      { cursorIndex: 1, x: 70, y: 35, actionTag: 'Toggle // Audio Sound' },
      { cursorIndex: 2, x: 30, y: 60, actionTag: 'Geo // Lat: 24.8465° N' },
      { cursorIndex: 3, x: 80, y: 65, actionTag: 'Check // Fullscreen API' },
    ],
  },
  {
    id: 'skills',
    sectionId: 'skills',
    title: 'Full Stack 3D Geodesic Pyramid',
    task: 'Indexing 42 core verified technologies & Three.js wireframe globe',
    logText: 'Compiling 42 squircle tiles: Python, React, Android Studio, PHP, Laravel',
    terminalLogs: [
      '> [THREE] Initialized 3D Geodesic Wireframe Sphere (Three.js WebGL)',
      '> [PYRAMID] Formed 6-tier desktop contour (11 -> 10 -> 8 -> 6 -> 4 -> 2)',
      '> [INDEX] 42 Technologies indexed & color-coded with authentic brand hexes',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 32, y: 48, actionTag: 'Select // Android Studio' },
      { cursorIndex: 1, x: 55, y: 40, actionTag: 'Filter // Backend & APIs' },
      { cursorIndex: 2, x: 70, y: 55, actionTag: 'Orbit // 3D Cyber Globe' },
      { cursorIndex: 3, x: 44, y: 68, actionTag: 'Verify // Laravel + PHP' },
    ],
  },
  {
    id: 'contact',
    sectionId: 'contact',
    title: 'Secure Contact Channels & Production Finale',
    task: 'Activating WhatsApp, Fiverr, Email endpoints & theme token engine',
    logText: 'All 7 architectural tiers assembled. Production build status: 100% COMPLETE',
    terminalLogs: [
      '> [API] Contact endpoint POST /api/contact armed with rate-limiter',
      '> [CHANNELS] WhatsApp (+8801303482412) & Fiverr (WebEmax) operational',
      '> [BUILD SUCCESS] 100% Production Bundle Verified. Status: READY TO DEPLOY!',
    ],
    cursorTargets: [
      { cursorIndex: 0, x: 35, y: 48, actionTag: 'Test // WhatsApp Ping' },
      { cursorIndex: 1, x: 62, y: 45, actionTag: 'Verify // Fiverr API' },
      { cursorIndex: 2, x: 50, y: 65, actionTag: 'Validate // Contact Form' },
      { cursorIndex: 3, x: 78, y: 55, actionTag: 'Complete // 100% Build' },
    ],
  },
]

// 4 Collaborative Virtual Cursors
const INITIAL_CURSORS: CursorState[] = [
  {
    id: 'c1',
    name: 'Mominul',
    role: 'Lead Architect',
    color: '#10b981', // Emerald
    x: 20,
    y: 30,
  },
  {
    id: 'c2',
    name: 'Next.js 14',
    role: 'AI Compiler',
    color: '#06b6d4', // Cyan
    x: 80,
    y: 25,
  },
  {
    id: 'c3',
    name: 'Three.js',
    role: 'Shader Specialist',
    color: '#a855f7', // Purple
    x: 35,
    y: 75,
  },
  {
    id: 'c4',
    name: 'Flutter Engine',
    role: 'Mobile Architect',
    color: '#f59e0b', // Amber
    x: 70,
    y: 80,
  },
]

export default function SeeBuildTour() {
  const { isTourActive, stopTour } = useBuildTour()

  const [currentStageIdx, setCurrentStageIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1)
  const [cursors, setCursors] = useState<CursorState[]>(INITIAL_CURSORS)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [terminalExpanded, setTerminalExpanded] = useState(true)

  const isPausedRef = useRef(false)
  isPausedRef.current = isPaused

  const speedRef = useRef(1)
  speedRef.current = speed

  // Reset when tour starts
  useEffect(() => {
    if (!isTourActive) {
      setIsCompleted(false)
      setCurrentStageIdx(0)
      setTerminalHistory([])
      return
    }

    // Scroll to top to begin tour
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStageIdx(0)
    setIsPaused(false)
    setIsCompleted(false)
    setTerminalHistory(['> [SYSTEM] Initializing Cinematic "See Build" Auto-Scroll Tour...'])
  }, [isTourActive])

  // Trigger click ripple at cursor location
  const triggerRipple = useCallback((x: number, y: number, color: string) => {
    const id = Date.now() + Math.random()
    setRipples((prev) => [...prev.slice(-6), { id, x, y, color }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 700)
  }, [])

  // Tour Stage Progression & Smooth Auto-Scroll Engine
  useEffect(() => {
    if (!isTourActive || isCompleted) return

    const stage = STAGES[currentStageIdx]
    if (!stage) {
      setIsCompleted(true)
      return
    }

    // 1. Smoothly scroll down to target section
    const targetElement = document.getElementById(stage.sectionId)
    if (targetElement) {
      const topPos = targetElement.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: Math.max(0, topPos),
        behavior: 'smooth',
      })
    }

    // 2. Animate Cursors to their target tasks
    setCursors((prev) =>
      prev.map((c, idx) => {
        const target = stage.cursorTargets.find((t) => t.cursorIndex === idx)
        if (target) {
          return {
            ...c,
            x: target.x,
            y: target.y,
            actionTag: target.actionTag,
            isClicking: true,
          }
        }
        return c
      })
    )

    // Trigger ripple effects for the moving cursors
    stage.cursorTargets.forEach((t, i) => {
      setTimeout(() => {
        const cursor = INITIAL_CURSORS[t.cursorIndex]
        if (cursor) {
          triggerRipple(t.x, t.y, cursor.color)
        }
      }, 400 + i * 250)
    })

    // 3. Stream terminal logs
    stage.terminalLogs.forEach((log, logIdx) => {
      setTimeout(() => {
        setTerminalHistory((prev) => [...prev.slice(-14), log])
      }, 300 + logIdx * 650)
    })

    // 4. Timer to proceed to next stage
    const baseDuration = 4200
    const duration = baseDuration / speedRef.current

    const timer = setTimeout(() => {
      if (isPausedRef.current) return
      if (currentStageIdx < STAGES.length - 1) {
        setCurrentStageIdx((prev) => prev + 1)
      } else {
        setIsCompleted(true)
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [isTourActive, currentStageIdx, isCompleted, triggerRipple])

  // Keybindings (Escape to exit, Space to pause)
  useEffect(() => {
    if (!isTourActive) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopTour()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTourActive, stopTour])

  if (!isTourActive) return null

  const currentStage = STAGES[currentStageIdx] || STAGES[0]
  const progressPercent = Math.min(100, Math.round(((currentStageIdx + 1) / STAGES.length) * 100))

  return (
    <div className="fixed inset-0 z-[99999999] pointer-events-none select-none font-mono overflow-hidden">
      
      {/* =========================================================================
          TOP FLOATING CYBER HUD (Progress, Stage, Controls)
         ========================================================================= */}
      <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 pointer-events-auto flex items-center justify-between gap-3 max-w-5xl mx-auto">
        
        {/* HUD Box */}
        <div
          className="flex-1 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl border shadow-2xl flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-xl transition-all"
          style={{
            backgroundColor: 'rgba(8, 12, 18, 0.94)',
            borderColor: 'rgba(16, 185, 129, 0.35)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(16, 185, 129, 0.15)',
          }}
        >
          {/* Left: Live Indicator & Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
                  SEE BUILD MODE
                </span>
                <span className="text-[10px] text-stone-400 hidden md:inline">
                  // Collaborative AI Simulation
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-300 truncate font-semibold">
                {currentStage.title}
              </p>
            </div>
          </div>

          {/* Center: Stage Progress Tracker (Hidden on small mobile) */}
          <div className="hidden sm:flex flex-col items-center justify-center flex-1 max-w-xs">
            <div className="flex items-center justify-between w-full text-[10px] text-stone-400 mb-1">
              <span>Stage {currentStageIdx + 1} of {STAGES.length}</span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Pause/Play Toggle */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-stone-200 text-xs font-mono flex items-center gap-1 cursor-pointer transition-all"
              title={isPaused ? 'Resume Build' : 'Pause Build'}
            >
              {isPaused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} />}
              <span className="hidden md:inline">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            {/* Speed Toggle */}
            <button
              onClick={() => setSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
              className="px-2 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-emerald-400 text-xs font-bold font-mono cursor-pointer transition-all"
              title="Change Simulation Speed"
            >
              {speed}x
            </button>

            {/* Exit Tour Button */}
            <button
              onClick={stopTour}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/25 text-red-400 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              title="Exit Build Tour (or press Escape)"
            >
              <X size={14} />
              <span className="hidden sm:inline">EXIT</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MULTIPLE VIRTUAL COLLABORATIVE MOUSE CURSORS ("onek gulo mouse er icon")
         ========================================================================= */}
      {cursors.map((cursor) => (
        <motion.div
          key={cursor.id}
          animate={{
            left: `${cursor.x}vw`,
            top: `${cursor.y}vh`,
          }}
          transition={{
            duration: 0.85 / speed,
            ease: [0.22, 1, 0.36, 1], // Buttery smooth natural cursor glide
          }}
          className="absolute z-40 pointer-events-none -translate-x-1 -translate-y-1 flex flex-col items-start"
          style={{ willChange: 'left, top' }}
        >
          {/* Custom SVG Mouse Arrow Pointer */}
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={cursor.color}
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
            </svg>

            {/* Pulsing Core on Cursor Tip */}
            <span
              className="absolute top-0 left-0 w-2 h-2 rounded-full animate-ping opacity-60"
              style={{ backgroundColor: cursor.color }}
            />
          </div>

          {/* Cursor Name Badge (Figma / Multiplayer Style) */}
          <div
            className="mt-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-white shadow-xl flex items-center gap-1 border border-white/20 whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{cursor.name}</span>
          </div>

          {/* Real-time Work Action Tag ("ak akta ak akta kaj korbe") */}
          <AnimatePresence mode="wait">
            {cursor.actionTag && (
              <motion.div
                key={cursor.actionTag}
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="mt-1 px-2.5 py-1 rounded-lg bg-black/90 border border-emerald-400/40 text-[9px] font-mono text-emerald-300 shadow-xl backdrop-blur-md whitespace-nowrap flex items-center gap-1.5"
              >
                <Code2 size={10} className="text-emerald-400" />
                <span>{cursor.actionTag}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* =========================================================================
          CLICK RIPPLES (Expanding neon pulse rings where cursors click)
         ========================================================================= */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="absolute w-8 h-8 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${ripple.x}vw`,
            top: `${ripple.y}vh`,
            borderColor: ripple.color,
            boxShadow: `0 0 15px ${ripple.color}`,
          }}
        />
      ))}

      {/* =========================================================================
          BOTTOM-LEFT FLOATING TERMINAL BUILD STREAM (Collapsible)
         ========================================================================= */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 pointer-events-auto max-w-sm sm:max-w-md w-full hidden md:block">
        <div
          className="rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(5, 7, 10, 0.92)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Terminal Title Bar */}
          <div
            onClick={() => setTerminalExpanded(!terminalExpanded)}
            className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors select-none"
          >
            <div className="flex items-center gap-2 text-xs text-stone-300 font-bold">
              <Terminal size={13} className="text-emerald-400" />
              <span>TERMINAL // BUILD STREAM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-mono">
                {currentStage.id.toUpperCase()} COMPILING
              </span>
              <span className="text-stone-400 text-xs">
                {terminalExpanded ? '▼' : '▲'}
              </span>
            </div>
          </div>

          {/* Terminal Output Stream */}
          {terminalExpanded && (
            <div className="p-3 text-[10px] sm:text-[11px] font-mono text-emerald-300/90 max-h-36 overflow-y-auto space-y-1 scrollbar-none">
              {terminalHistory.map((log, i) => (
                <div key={i} className="leading-tight truncate">
                  {log}
                </div>
              ))}
              <div className="flex items-center gap-1 text-emerald-400 pt-0.5">
                <span className="animate-pulse">❯</span>
                <span className="w-2 h-3.5 bg-emerald-400 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          GRAND FINALE BANNER (When full auto-scroll reaches bottom)
         ========================================================================= */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md pointer-events-auto"
          >
            <div
              className="max-w-md w-full p-6 sm:p-8 rounded-3xl border text-center shadow-2xl relative"
              style={{
                backgroundColor: '#0a0d14',
                borderColor: 'rgba(16, 185, 129, 0.45)',
                boxShadow: '0 0 60px rgba(16, 185, 129, 0.25)',
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-wide">
                BUILD 100% COMPLETE!
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-mono mt-2 leading-relaxed">
                Full-Stack architecture assembled smoothly across all 7 production sections.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => {
                    stopTour()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-400 transition-all cursor-pointer"
                >
                  <ArrowUp size={14} />
                  <span>BACK TO TOP</span>
                </button>

                <button
                  onClick={stopTour}
                  className="w-full py-3 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider font-mono transition-all cursor-pointer"
                >
                  EXPLORE WEBSITE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
