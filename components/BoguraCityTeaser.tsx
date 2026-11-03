'use client'

import { useState, useRef } from 'react'
import {
  Heart,
  Volume2,
  VolumeX,
  Maximize2,
  Compass,
  Sparkles,
  Building,
} from 'lucide-react'

export default function BoguraCityTeaser() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Cursor hover on video -> Sound turns ON
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsMuted(false)
      videoRef.current.play().catch(() => {})
    }
  }

  // Cursor leaves video -> Sound turns OFF
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  // Click/tap toggle for mobile or manual control
  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen()
      }
    }
  }

  return (
    <section id="hometown" className="relative py-12 sm:py-16 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Showcase Container */}
        <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#090e0b] via-[#0d1612] to-[#090e0b] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Clean Video Player with Hover Audio (7 Cols) */}
            <div className="lg:col-span-7 space-y-2">
              
              {/* Clean Video Container */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleSound}
                className="relative rounded-2xl overflow-hidden border border-emerald-500/35 bg-black shadow-2xl group aspect-video cursor-pointer"
              >
                <video
                  ref={videoRef}
                  src="/images/video/bogura-stream.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Video Controls Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSound()
                    }}
                    className={`px-3 py-1 rounded-full backdrop-blur-md text-xs font-mono flex items-center gap-1.5 transition-all shadow-md border ${
                      isMuted
                        ? 'bg-black/75 text-stone-300 border-white/15 hover:border-emerald-500/40'
                        : 'bg-emerald-500 text-black border-emerald-400 font-bold animate-pulse'
                    }`}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                    <span>{isMuted ? 'Muted (Hover for Sound)' : 'Sound On'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFullscreen()
                    }}
                    className="w-7 h-7 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors shadow-md"
                    title="Fullscreen"
                  >
                    <Maximize2 size={12} />
                  </button>
                </div>
              </div>

              {/* Video Credit & Sub-caption */}
              <div className="flex items-center justify-between px-1 text-xs text-stone-400 font-mono">
                <span className="flex items-center gap-1 text-stone-300">
                  <span>Video credit by</span>
                  <span className="text-emerald-400 font-semibold">Utshboe</span>
                </span>
                <span className="text-[11px] text-stone-400">
                  Bogura Sadar, Bangladesh
                </span>
              </div>
            </div>

            {/* Right Column: Balanced English Presentation (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div>
                {/* Hometown Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-2">
                  <Heart size={12} className="text-rose-500 fill-rose-500" />
                  <span>MY HOMETOWN • BOGURA, BANGLADESH</span>
                </div>

                <h3 className="font-billboard text-3xl sm:text-4xl text-white tracking-wide leading-tight">
                  WELCOME TO BOGURA
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-2">
                  The historic heart of North Bengal. Where 2,500 years of civilization meet modern energy. Proudly born and raised here, crafting software for the world.
                </p>
              </div>

              {/* Compact Highlights */}
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-stone-200">
                  <Building size={14} className="text-emerald-400 flex-shrink-0" />
                  <span><strong className="text-white">Mahasthangarh</strong> — Ancient 3rd Century BC Citadel</span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-stone-200">
                  <Compass size={14} className="text-teal-300 flex-shrink-0" />
                  <span><strong className="text-white">Satmatha Zero Point</strong> — 7-Way Highway Convergence</span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-stone-200">
                  <Sparkles size={14} className="text-amber-300 flex-shrink-0" />
                  <span><strong className="text-white">Bogura Curd</strong> — World-Famous GI-Certified Delicacy</span>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Rooted in Bogura</span>
                <span className="text-emerald-400">Building Worldwide ↗</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
