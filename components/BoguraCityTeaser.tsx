'use client'

import { useState, useRef } from 'react'
import {
  MapPin,
  Heart,
  Volume2,
  VolumeX,
  Maximize2,
  Compass,
  Sparkles,
  Building,
  Quote,
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
    <section id="hometown" className="relative py-16 sm:py-20 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Showcase Container */}
        <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#090e0b] via-[#0d1612] to-[#090e0b] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Accent Background Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Clean Video Player with Hover Audio (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              
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
                    className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-mono flex items-center gap-1.5 transition-all shadow-md border ${
                      isMuted
                        ? 'bg-black/75 text-stone-300 border-white/15 hover:border-emerald-500/40'
                        : 'bg-emerald-500 text-black border-emerald-400 font-bold animate-pulse'
                    }`}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    <span>{isMuted ? 'Muted (Hover for Sound)' : 'Sound Playing'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFullscreen()
                    }}
                    className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors shadow-md"
                    title="Fullscreen"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>
              </div>

              {/* Video Credit & Sub-caption */}
              <div className="flex items-center justify-between px-1 text-xs text-stone-400 font-mono">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <span>Video credit by</span>
                  <span className="text-emerald-400 font-semibold">Utshboe</span>
                </span>
                <span className="text-[11px] text-stone-400">
                  Bogura Sadar &amp; Mahasthangarh, Bangladesh
                </span>
              </div>
            </div>

            {/* Right Column: Heartfelt Story & Hometown Pride (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div>
                {/* Hometown Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-3">
                  <Heart size={13} className="text-rose-500 fill-rose-500 animate-pulse" />
                  <span>MY HOMETOWN • BOGURA, BANGLADESH</span>
                </div>

                <h3 className="font-billboard text-3xl sm:text-4xl text-white tracking-wide leading-tight">
                  WELCOME TO BOGURA
                </h3>
                <h4 className="text-emerald-400 font-medium text-base sm:text-lg mt-1">
                  আমার প্রাণের শহর বগুড়া
                </h4>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-3">
                  বগুড়া শুধু আমার জন্মস্থান নয়, এটি আমার ভালোবাসা ও অনুপ্রেরণার উৎস। উত্তরবঙ্গের প্রবেশদ্বার, আড়াই হাজার বছরের প্রাচীন ইতিহাস ও ঐতিহ্যের এই সুন্দর শহর থেকেই প্রযুক্তি ও সফটওয়্যার ইঞ্জিনিয়ারিংয়ে আমার পথচলা শুরু।
                </p>
              </div>

              {/* Cultural & Historic Highlights */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-3 text-xs text-stone-200">
                  <Building size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">আড়াই হাজার বছরের মহাস্থানগড় (Pundranagar)</span>
                    <span className="text-stone-400 text-[11px]">খ্রিস্টপূর্ব ৩য় শতকের বাংলার প্রাচীনতম রাজধানী ও প্রত্নতাত্ত্বিক দুর্গ।</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-3 text-xs text-stone-200">
                  <Compass size={16} className="text-teal-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">ঐতিহাসিক সাতমাথা (Satmatha Zero Point)</span>
                    <span className="text-stone-400 text-[11px]">বীরশ্রেষ্ঠ স্কয়ার ও ৭টি মহাসড়কের মিলনস্থল—দিনরাত ২৪ ঘণ্টার প্রাণবন্ত আড্ডা ও চায়ের সংস্কৃতি।</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-3 text-xs text-stone-200">
                  <Sparkles size={16} className="text-amber-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">বিশ্ববিখ্যাত বগুড়ার দই (GI-Certified Curd)</span>
                    <span className="text-stone-400 text-[11px]">মাটির হাঁড়ির খাঁটি ক্ষীরসার স্বাদ, যা বিশ্বজুড়ে বাংলাদেশের পরিচয় বহন করে।</span>
                  </div>
                </div>
              </div>

              {/* Personal Quote Note */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-black/60 border border-emerald-500/20 relative">
                <div className="flex items-start gap-2.5">
                  <Quote size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-stone-300 italic leading-relaxed">
                      &quot;প্রযুক্তির দুনিয়ায় আমি যত দূরেই যাই না কেন, আমার শেকড় ও হৃদয় সর্বদা আমার প্রিয় বগুড়ার সাথেই থাকবে।&quot;
                    </p>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 block mt-1.5">
                      — মোঃ মোমিনুল ইসলাম (Md. Mominul Islam)
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
