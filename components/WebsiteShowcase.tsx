'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Laptop,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Sparkles,
  Globe,
  Layers,
  ArrowUpRight,
  Compass,
  CheckCircle2,
  Box,
} from 'lucide-react'

type DeviceMode = '3d-studio' | 'phone' | 'laptop' | 'tablet'

export default function WebsiteShowcase() {
  const [activeMode, setActiveMode] = useState<DeviceMode>('3d-studio')
  const [iframeKey, setIframeKey] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Dynamic Scale calculation for pixel-perfect non-clipped responsiveness
  const laptopRef = useRef<HTMLDivElement>(null)
  const tabletRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  const [laptopScale, setLaptopScale] = useState<number>(0.65)
  const [tabletScale, setTabletScale] = useState<number>(0.65)
  const [phoneScale, setPhoneScale] = useState<number>(0.85)

  const liveUrl = 'https://www.carbookbd.com/'

  const reloadIframe = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  useEffect(() => {
    const calcScales = () => {
      if (laptopRef.current) {
        const w = laptopRef.current.clientWidth
        setLaptopScale(Math.min(1, Math.max(0.3, w / 1280)))
      }
      if (tabletRef.current) {
        const w = tabletRef.current.clientWidth
        setTabletScale(Math.min(1, Math.max(0.4, w / 768)))
      }
      if (phoneRef.current) {
        const w = phoneRef.current.clientWidth
        setPhoneScale(Math.min(1, Math.max(0.65, w / 390)))
      }
    }

    calcScales()
    window.addEventListener('resize', calcScales)
    const t = setTimeout(calcScales, 250)
    return () => {
      window.removeEventListener('resize', calcScales)
      clearTimeout(t)
    }
  }, [activeMode])

  return (
    <section id="website" className="relative py-20 sm:py-28 overflow-hidden theme-main-bg theme-text-main border-t theme-border">
      
      {/* Subtle 3D Ambient Backdrop Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 border-b theme-border pb-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Globe size={13} />
                <span>PRODUCTION WEB ARCHITECTURE • LIVE DEMO</span>
              </p>
            </div>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              CARBOOK WEB PLATFORM
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-theme-primary px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-lg group cursor-pointer"
            >
              <span>Visit Live Website</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={reloadIframe}
              className="btn-theme-secondary px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
              title="Refresh Live Preview"
            >
              <RotateCw size={13} className={isLoading ? 'animate-spin' : ''} />
              <span className="hidden xs:inline">Reload</span>
            </button>
          </div>
        </motion.div>

        {/* 3D Mode Selector Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 p-2 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            
            <button
              onClick={() => setActiveMode('3d-studio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeMode === '3d-studio'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Box size={14} />
              <span>3D Multi-Device Studio</span>
            </button>

            <button
              onClick={() => setActiveMode('phone')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeMode === 'phone'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone size={14} />
              <span>Phone (3D Mobile)</span>
            </button>

            <button
              onClick={() => setActiveMode('laptop')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeMode === 'laptop'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Laptop size={14} />
              <span>Laptop (1280px)</span>
            </button>

            <button
              onClick={() => setActiveMode('tablet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeMode === 'tablet'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tablet size={14} />
              <span>Tablet (768px)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 px-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-500">Live URL:</span>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline truncate font-semibold"
            >
              https://www.carbookbd.com/
            </a>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MODE 1: 3D MULTI-DEVICE STUDIO (Isometric Depth & Overlap)         */}
        {/* ------------------------------------------------------------------ */}
        {activeMode === '3d-studio' && (
          <motion.div
            key="3d-studio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full py-4 sm:py-8 flex items-center justify-center"
            style={{ perspective: 1400 }}
          >
            {/* Unified 3D Stage */}
            <div className="relative w-full max-w-5xl flex items-center justify-center">
              
              {/* BACKDROP/CENTER: 3D LAPBOOK FRAME */}
              <div
                className="relative z-10 w-full max-w-4xl rounded-t-[26px] sm:rounded-t-[34px] border-[5px] sm:border-[7px] border-[#27272a] bg-[#0c0c0e] p-2 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  transform: 'rotateX(3deg)',
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Laptop Camera Notch */}
                <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-700 mx-auto mb-2 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-blue-500/80" />
                </div>

                {/* Browser Navigation Bar */}
                <div className="w-full h-8 bg-[#18181b] rounded-t-xl px-3 flex items-center justify-between text-xs text-slate-400 border-b border-white/5 select-none mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 truncate max-w-[260px] sm:max-w-xs">
                    <span className="text-emerald-400">🔒</span>
                    <span className="truncate">https://www.carbookbd.com/</span>
                  </div>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white" title="Open Full">
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Scaled Desktop Iframe Viewport */}
                <div
                  ref={laptopRef}
                  className="w-full overflow-hidden bg-white relative rounded-b-xl"
                  style={{ height: `${760 * laptopScale}px` }}
                >
                  <iframe
                    key={`studio-laptop-${iframeKey}`}
                    src={liveUrl}
                    title="Carbook 3D Studio Desktop View"
                    className="absolute top-0 left-0 border-0 pointer-events-auto"
                    style={{
                      width: '1280px',
                      height: '760px',
                      transform: `scale(${laptopScale})`,
                      transformOrigin: 'top left',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Laptop Lower Hinge Strip */}
                <div className="w-full h-3 bg-gradient-to-b from-[#27272a] to-[#121214] rounded-b-xl border-t border-white/5 flex items-center justify-center">
                  <div className="w-24 h-1 rounded-full bg-neutral-600" />
                </div>
              </div>

              {/* FOREGROUND RIGHT: 3D FLOATING SMARTPHONE (Overlapping Front in 3D) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => setActiveMode('phone')}
                className="absolute -bottom-6 -right-2 xs:-right-4 sm:-right-8 lg:-right-6 z-30 w-[170px] xs:w-[210px] sm:w-[260px] cursor-pointer group"
                style={{
                  transform: 'rotateY(-10deg) rotateX(4deg) translateZ(50px)',
                  transformStyle: 'preserve-3d',
                }}
                title="Click to zoom in Phone Mode"
              >
                <div className="w-full rounded-[38px] sm:rounded-[46px] border-[4px] sm:border-[6px] border-[#27272a] bg-[#09090b] p-1.5 sm:p-2 shadow-[0_30px_60px_rgba(0,0,0,0.9)] ring-1 ring-emerald-500/30 group-hover:ring-emerald-400 group-hover:scale-105 transition-all duration-300">
                  
                  {/* Smartphone Dynamic Island */}
                  <div className="w-16 sm:w-20 h-3 sm:h-3.5 bg-black rounded-full mx-auto mb-1 sm:mb-1.5 flex items-center justify-center border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                  </div>

                  {/* Scaled Mobile Viewport inside 3D Phone */}
                  <div
                    className="w-full overflow-hidden bg-white relative rounded-[28px] sm:rounded-[34px]"
                    style={{ height: '340px' }}
                  >
                    <iframe
                      src={liveUrl}
                      title="Carbook 3D Studio Phone View"
                      className="absolute top-0 left-0 border-0 pointer-events-none"
                      style={{
                        width: '390px',
                        height: '780px',
                        transform: 'scale(0.44)',
                        transformOrigin: 'top left',
                      }}
                      loading="lazy"
                    />
                    
                    {/* Hover Click-to-Zoom Indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono uppercase tracking-wider mb-1">
                        🔍 Tap to Zoom
                      </span>
                      <span className="text-white font-bold text-xs">
                        Mobile Mode
                      </span>
                    </div>
                  </div>

                  {/* Bottom Gesture Bar */}
                  <div className="w-14 sm:w-20 h-1 rounded-full bg-neutral-600 mx-auto mt-1 sm:mt-1.5" />
                </div>
              </motion.div>

              {/* FOREGROUND LEFT: 3D FLOATING TABLET (Overlapping Left in 3D) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={() => setActiveMode('tablet')}
                className="hidden md:block absolute -bottom-4 -left-6 sm:-left-10 z-20 w-[240px] sm:w-[290px] cursor-pointer group"
                style={{
                  transform: 'rotateY(10deg) rotateX(4deg) translateZ(30px)',
                  transformStyle: 'preserve-3d',
                }}
                title="Click to zoom in Tablet Mode"
              >
                <div className="w-full rounded-[32px] sm:rounded-[38px] border-[5px] border-[#27272a] bg-[#0c0c0e] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10 group-hover:ring-emerald-400 group-hover:scale-105 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-black border border-neutral-700 mx-auto mb-1.5" />
                  <div
                    className="w-full overflow-hidden bg-white relative rounded-[22px]"
                    style={{ height: '320px' }}
                  >
                    <iframe
                      src={liveUrl}
                      title="Carbook 3D Studio Tablet View"
                      className="absolute top-0 left-0 border-0 pointer-events-none"
                      style={{
                        width: '768px',
                        height: '900px',
                        transform: 'scale(0.35)',
                        transformOrigin: 'top left',
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono uppercase tracking-wider mb-1">
                        🔍 Tap to Zoom
                      </span>
                      <span className="text-white font-bold text-xs">
                        Tablet Mode
                      </span>
                    </div>
                  </div>
                  <div className="w-20 h-1 rounded-full bg-neutral-600 mx-auto mt-1.5" />
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* MODE 2: PHONE MODE (Fixed, Full-Height 3D Smartphone Flagship)     */}
        {/* ------------------------------------------------------------------ */}
        {activeMode === 'phone' && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full py-4"
          >
            {/* Flagship Titanium Smartphone Frame with 3D Depth */}
            <div
              className="relative w-full max-w-[340px] xs:max-w-[365px] sm:max-w-[385px] rounded-[48px] sm:rounded-[54px] border-[6px] sm:border-[8px] border-[#27272a] bg-[#09090b] p-2.5 sm:p-3 shadow-[0_30px_70px_rgba(0,0,0,0.85)] ring-1 ring-emerald-500/20"
              style={{
                transform: 'rotateX(2deg)',
              }}
            >
              {/* Smartphone Side Buttons (Volume & Power) */}
              <div className="absolute -left-[9px] top-24 w-[3px] h-10 rounded-l bg-[#3f3f46]" />
              <div className="absolute -left-[9px] top-38 w-[3px] h-10 rounded-l bg-[#3f3f46]" />
              <div className="absolute -right-[9px] top-28 w-[3px] h-14 rounded-r bg-[#3f3f46]" />

              {/* Dynamic Island Header */}
              <div className="w-28 sm:w-32 h-4 sm:h-4.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-3 border border-neutral-800 shadow-inner">
                <span className="text-[9px] font-mono text-neutral-400 font-bold">9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#18181b]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900/80" />
                </div>
                <span className="text-[8px] font-mono text-neutral-400">5G</span>
              </div>

              {/* Real Mobile Scaled Viewport - Generous Height so Hero & Form Never Cut Off */}
              <div
                ref={phoneRef}
                className="w-full overflow-hidden bg-white relative rounded-[36px] sm:rounded-[42px] shadow-inner"
                style={{
                  height: `${750 * phoneScale}px`,
                }}
              >
                <iframe
                  key={`phone-mode-${iframeKey}`}
                  src={liveUrl}
                  title="Carbook Mobile Website Live"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '390px',
                    height: '750px',
                    transform: `scale(${phoneScale})`,
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Home Gesture Bar */}
              <div className="w-28 h-1 rounded-full bg-neutral-500 mx-auto mt-2.5" />
            </div>

            <p className="mt-4 text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full Interactive Mobile Preview • Scroll and click directly inside the phone</span>
            </p>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* MODE 3: LAPTOP MODE (1280px Desktop MacBook Pro)                   */}
        {/* ------------------------------------------------------------------ */}
        {activeMode === 'laptop' && (
          <motion.div
            key="laptop"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full py-4"
          >
            <div className="w-full max-w-5xl rounded-t-[30px] sm:rounded-t-[36px] border-[5px] sm:border-[7px] border-[#27272a] bg-[#0c0c0e] p-2.5 sm:p-3 shadow-2xl relative">
              <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-700 mx-auto mb-2 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-blue-500/80" />
              </div>

              <div className="w-full h-8 bg-[#18181b] rounded-t-xl px-3 flex items-center justify-between border-b border-white/5 text-xs text-slate-400 select-none mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 max-w-md truncate">
                  <span className="text-emerald-400">🔒</span>
                  <span className="truncate">https://www.carbookbd.com/</span>
                </div>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <ExternalLink size={12} />
                </a>
              </div>

              <div
                ref={laptopRef}
                className="w-full overflow-hidden bg-white relative rounded-b-xl"
                style={{ height: `${780 * laptopScale}px` }}
              >
                <iframe
                  key={`laptop-mode-${iframeKey}`}
                  src={liveUrl}
                  title="Carbook Desktop Website Live"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '1280px',
                    height: '780px',
                    transform: `scale(${laptopScale})`,
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="w-full max-w-[104%] h-3.5 sm:h-4.5 bg-gradient-to-b from-[#27272a] via-[#1c1c1f] to-[#121214] rounded-b-2xl border-t border-white/10 shadow-2xl flex items-center justify-center">
              <div className="w-24 sm:w-32 h-1 rounded-full bg-[#3f3f46]" />
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* MODE 4: TABLET MODE (768px iPad Pro)                               */}
        {/* ------------------------------------------------------------------ */}
        {activeMode === 'tablet' && (
          <motion.div
            key="tablet"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full py-4"
          >
            <div className="w-full max-w-xl rounded-[38px] sm:rounded-[44px] border-[6px] sm:border-[8px] border-[#27272a] bg-[#0c0c0e] p-3 shadow-2xl relative">
              <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-700 mx-auto mb-2 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-blue-500/80" />
              </div>

              <div className="w-full h-7 bg-[#18181b] rounded-t-xl px-3 flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span className="text-emerald-400">🔒 carbookbd.com</span>
                <span className="text-[9px] text-slate-500 uppercase font-bold">iPad Pro (768px)</span>
              </div>

              <div
                ref={tabletRef}
                className="w-full overflow-hidden bg-white relative rounded-xl"
                style={{ height: `${940 * tabletScale}px` }}
              >
                <iframe
                  key={`tablet-mode-${iframeKey}`}
                  src={liveUrl}
                  title="Carbook Tablet Live"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '768px',
                    height: '940px',
                    transform: `scale(${tabletScale})`,
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                />
              </div>

              <div className="w-28 h-1 rounded-full bg-neutral-600 mx-auto mt-2.5" />
            </div>
          </motion.div>
        )}

        {/* Architecture Highlights Below Devices */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl border theme-border bg-black/40 space-y-1">
            <span className="text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Full-Stack Web</span>
            </span>
            <p className="text-xs theme-text-muted">
              Next.js &amp; Node.js high-performance web platform live on www.carbookbd.com
            </p>
          </div>

          <div className="p-4 rounded-2xl border theme-border bg-black/40 space-y-1">
            <span className="text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>100% Responsive</span>
            </span>
            <p className="text-xs theme-text-muted">
              Pixel-perfect UI engineered for Desktop Laptop, Tablet iPad &amp; Smartphones
            </p>
          </div>

          <div className="p-4 rounded-2xl border theme-border bg-black/40 space-y-1">
            <span className="text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Real-Time Engine</span>
            </span>
            <p className="text-xs theme-text-muted">
              Intercity car booking, multi-stop routing &amp; automated rate calculation
            </p>
          </div>

          <div className="p-4 rounded-2xl border theme-border bg-black/40 space-y-1">
            <span className="text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Cloud VPS Hosted</span>
            </span>
            <p className="text-xs theme-text-muted">
              Secured with SSL, Nginx reverse proxy &amp; 99.9% uptime cloud architecture
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
