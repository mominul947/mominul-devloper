'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlitchIntroPreloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isGlitching, setIsGlitching] = useState(false)
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [overrideText, setOverrideText] = useState('')

  const fullLine1 = 'ERROR 404: Conventional'
  const fullLine2 = 'developer not found.'

  const dismiss = useCallback(() => {
    setIsGlitching(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 380)
  }, [])

  useEffect(() => {
    // 1. Fast, crisp typing of Line 1
    let i1 = 0
    const t1 = setInterval(() => {
      if (i1 < fullLine1.length) {
        setLine1(fullLine1.slice(0, i1 + 1))
        i1++
      } else {
        clearInterval(t1)

        // 2. Typing of Line 2
        let i2 = 0
        const t2 = setInterval(() => {
          if (i2 < fullLine2.length) {
            setLine2(fullLine2.slice(0, i2 + 1))
            i2++
          } else {
            clearInterval(t2)

            // 3. Pause for impact (~800ms) then trigger violent cyber GLITCH ("Gilit")
            setTimeout(() => {
              setIsGlitching(true)

              // Text glitch transformation
              setTimeout(() => {
                setOverrideText('SYSTEM OVERRIDE: MD. MOMINUL ISLAM')
              }, 200)

              // 4. Glitch tear-out into main portfolio website
              setTimeout(() => {
                setIsVisible(false)
              }, 900)
            }, 750)
          }
        }, 20)
      }
    }, 24)

    // Skip on keypress or click
    const handleKey = () => dismiss()
    window.addEventListener('keydown', handleKey, { once: true })

    return () => {
      clearInterval(t1)
      window.removeEventListener('keydown', handleKey)
    }
  }, [dismiss])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="glitch-intro-overlay"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: 'blur(10px)',
          transition: { duration: 0.4, ease: 'easeInOut' },
        }}
        onClick={dismiss}
        className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#040508] text-white select-none cursor-pointer overflow-hidden font-mono"
      >
        {/* CRT Scanline Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px',
          }}
        />

        {/* Ambient Radial Deep Glow */}
        <div
          className={`absolute w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none transition-all duration-200 ${
            isGlitching ? 'bg-red-500/25 opacity-90' : 'bg-cyan-500/10 opacity-30'
          }`}
        />

        {/* Top Minimal Status */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isGlitching ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}
            />
            <span className="tracking-widest">
              {isGlitching ? 'SYSTEM OVERRIDE DETECTED' : 'TERMINAL BOOT'}
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-stone-600 hidden sm:inline">
            CLICK OR PRESS ANY KEY TO SKIP
          </span>
        </div>

        {/* =========================================================================
            CENTER LETTERBOX BAND (Exact Match to User Reference Screenshot)
           ========================================================================= */}
        <div className="relative w-full py-12 sm:py-16 flex flex-col items-center justify-center">
          
          {/* Top & Bottom Horizontal Framing Lines (From Reference Image) */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Central Dark Letterbox Background */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs -z-10" />

          {/* Glitch Animated Container */}
          <div
            className={`relative flex flex-col items-center justify-center text-center px-4 transition-all ${
              isGlitching ? 'animate-pulse' : ''
            }`}
            style={{
              transform: isGlitching ? 'translate(-3px, 1.5px) skewX(-2.5deg)' : 'none',
            }}
          >
            {/* Red Offset Chromatic Aberration Shadow (Glitch) */}
            {isGlitching && (
              <div
                className="absolute inset-0 text-red-500 pointer-events-none select-none"
                style={{
                  transform: 'translate(-6px, 2px)',
                  clipPath: 'polygon(0 20%, 100% 20%, 100% 50%, 0 50%)',
                }}
              >
                <p className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-relaxed">
                  {overrideText || line1}
                </p>
                <p className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-relaxed mt-1 sm:mt-2">
                  {overrideText ? 'ACCESS GRANTED' : line2}
                </p>
              </div>
            )}

            {/* Cyan Offset Chromatic Aberration Shadow (Glitch) */}
            {isGlitching && (
              <div
                className="absolute inset-0 text-cyan-400 pointer-events-none select-none"
                style={{
                  transform: 'translate(6px, -2px)',
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 85%, 0 85%)',
                }}
              >
                <p className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-relaxed">
                  {overrideText || line1}
                </p>
                <p className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-relaxed mt-1 sm:mt-2">
                  {overrideText ? 'ACCESS GRANTED' : line2}
                </p>
              </div>
            )}

            {/* Main Clean Crisp Text (Exact Screenshot Typography) */}
            <h1 className="relative z-10 text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-stone-200 leading-relaxed font-mono drop-shadow-md">
              {overrideText ? (
                <span className="text-emerald-400 font-extrabold tracking-widest animate-pulse">
                  {overrideText}
                </span>
              ) : (
                <>
                  <span className="block whitespace-nowrap">
                    {line1}
                    {line2.length === 0 && (
                      <span className="inline-block w-2.5 h-6 sm:h-9 bg-purple-400 ml-2 animate-pulse align-middle" />
                    )}
                  </span>
                  <span className="block mt-1 sm:mt-2 whitespace-nowrap text-stone-300">
                    {line2}
                    {line2.length > 0 && !isGlitching && (
                      <span className="inline-block w-2.5 h-6 sm:h-9 bg-purple-400 ml-2 animate-pulse align-middle" />
                    )}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle Status Banner during glitch */}
            {isGlitching && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 px-3.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-[11px] text-emerald-400 font-bold"
              >
                INITIALIZING ARCHITECT PORTAL // 60FPS
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-6 flex items-center gap-2 text-[11px] text-stone-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-600 animate-ping" />
          <span>Click anywhere to enter</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
