'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  Compass,
  Sparkles,
  Building,
  Gamepad2,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Maximize2,
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
    <section id="bogura" className="relative py-12 sm:py-16 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#090d0b] via-[#0d1612] to-[#090d0b] p-5 sm:p-8 xl:p-9 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Clean Video Player with Hover-to-Play-Audio */}
            <div className="lg:col-span-7 space-y-2">
              
              {/* Clean Video Container */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleSound}
                className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-black shadow-2xl group aspect-video cursor-pointer"
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

                {/* Subtle Sound Status Indicator in Top-Right */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSound()
                    }}
                    className={`px-2.5 py-1 rounded-full backdrop-blur-md text-xs font-mono flex items-center gap-1.5 transition-all shadow-md border ${
                      isMuted
                        ? 'bg-black/70 text-stone-300 border-white/10 hover:border-emerald-500/40'
                        : 'bg-emerald-500 text-black border-emerald-400 font-bold animate-pulse'
                    }`}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    <span>{isMuted ? 'Muted (Hover for sound)' : 'Sound Playing'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFullscreen()
                    }}
                    className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors shadow-md"
                    title="Fullscreen"
                  >
                    <Maximize2 size={12} />
                  </button>
                </div>
              </div>

              {/* Clean Video Credit */}
              <div className="flex items-center justify-between px-1 pt-1 text-xs text-stone-400 font-mono">
                <span>Video credit by Utshboe</span>
                <span className="text-[11px] text-emerald-400/80">Bogura, Bangladesh</span>
              </div>
            </div>

            {/* Right Column: Information & 3D Game Link */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                    <Gamepad2 size={14} />
                    <span>BOGURA DISTRICT • 3D VIRTUAL CITY</span>
                  </span>
                </div>

                <h3 className="font-billboard text-2xl xs:text-3xl sm:text-4xl text-white tracking-wide leading-tight">
                  EXPLORE BOGURA: THE 3D VIRTUAL CITY
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-2">
                  Drone showcase of Bogura district above. Experience the interactive 3D virtual simulation featuring Mahasthangarh, Satmatha zero point &amp; cyber waterways.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-stone-200">
                  <Building size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>3rd Century BC Ancient Pundranagar Citadel</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-stone-200">
                  <Compass size={14} className="text-teal-300 flex-shrink-0" />
                  <span>Satmatha 7-Way Highway Convergence Plaza</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-stone-200">
                  <Sparkles size={14} className="text-amber-300 flex-shrink-0" />
                  <span>GI-Certified World Famous Bogura Curd (Doi)</span>
                </div>
              </div>

              {/* Action Button: Launch 3D Game City */}
              <div className="pt-2">
                <Link
                  href="/bogura"
                  target="_blank"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.02] cursor-pointer group"
                >
                  <Gamepad2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>ENTER 3D GAME CITY (/bogura)</span>
                  <ArrowUpRight size={16} />
                </Link>
                <p className="text-[10px] font-mono text-stone-400 text-center mt-2">
                  Interactive 3D WebGL Metaverse • Click to enter in new tab
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
