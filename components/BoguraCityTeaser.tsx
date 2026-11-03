'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Compass,
  Sparkles,
  MapPin,
  ArrowUpRight,
  Gamepad2,
  Building,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  Film,
} from 'lucide-react'

export default function BoguraCityTeaser() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
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
        
        {/* Main Dashboard Bogura Showcase Card with Live Video */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#090d0b] via-[#0d1612] to-[#090d0b] p-5 sm:p-8 xl:p-9 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Grid Lines Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Live Embedded Video Player (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>🔴 LIVE 4K CINEMATIC DRONE FOOTAGE • BOGURA DISTRICT</span>
                </span>
                <span className="text-[10px] font-mono text-stone-400">BOGURA SADAR &amp; MAHASTHAN</span>
              </div>

              {/* The Video Player Container */}
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-black shadow-2xl group aspect-video">
                <video
                  ref={videoRef}
                  src="/images/video/bogura-stream.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Video Top Controls Overlay */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20 pointer-events-auto">
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 font-bold shadow-md">
                    <Film size={12} />
                    <span>BOGURA CINEMATIC REEL</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleSound}
                      className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer shadow-md"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer shadow-md"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
                    </button>

                    <button
                      onClick={handleFullscreen}
                      className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer shadow-md"
                      title="Fullscreen"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Bottom Sound Prompt Badge */}
                {isMuted && (
                  <button
                    onClick={toggleSound}
                    className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-stone-200 hover:text-white flex items-center gap-1.5 cursor-pointer z-20 transition-all hover:bg-black/95"
                  >
                    <VolumeX size={12} className="text-emerald-400" />
                    <span>Click for Audio / Sound 🔊</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Information & 3D Game Link (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
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
                  Watch the live drone showcase of Bogura district above, or launch the interactive 3D virtual simulation featuring Mahasthangarh, Satmatha zero point &amp; cyber waterways.
                </p>
              </div>

              {/* Cultural & Tech Highlights */}
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
