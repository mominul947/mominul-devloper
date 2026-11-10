'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Laptop,
  Tablet,
  ExternalLink,
  RotateCw,
  Sparkles,
  Globe,
  Layers,
  ArrowUpRight,
  Compass,
  CheckCircle2,
  Box,
  Lock,
  ZoomIn,
} from 'lucide-react'
import { FaAndroid } from 'react-icons/fa6'
import { useLanguage } from '@/context/LanguageContext'

type DeviceMode = '3d-studio' | 'phone' | 'laptop' | 'tablet'

export default function WebsiteShowcase() {
  const [activeMode, setActiveMode] = useState<DeviceMode>('3d-studio')
  const [iframeKey, setIframeKey] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { language, t } = useLanguage()

  // Dynamic Scale calculation for pixel-perfect non-clipped responsiveness
  const laptopRef = useRef<HTMLDivElement>(null)
  const tabletRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const studioPhoneRef = useRef<HTMLDivElement>(null)
  const studioTabletRef = useRef<HTMLDivElement>(null)

  const [laptopScale, setLaptopScale] = useState<number>(0.65)
  const [tabletScale, setTabletScale] = useState<number>(0.65)
  const [phoneScale, setPhoneScale] = useState<number>(0.85)
  const [studioPhoneScale, setStudioPhoneScale] = useState<number>(0.56)
  const [studioTabletScale, setStudioTabletScale] = useState<number>(0.34)

  const liveUrl = 'https://www.carbookbd.com/'

  const reloadIframe = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setActiveMode('phone')
    }
  }, [])

  const calcScales = useCallback(() => {
    if (laptopRef.current) {
      const w = laptopRef.current.clientWidth
      if (w > 0) setLaptopScale(Math.min(1, Math.max(0.3, w / 1280)))
    }
    if (tabletRef.current) {
      const w = tabletRef.current.clientWidth
      if (w > 0) setTabletScale(Math.min(1, Math.max(0.4, w / 768)))
    }
    if (phoneRef.current) {
      const w = phoneRef.current.clientWidth
      if (w > 0) setPhoneScale(Math.min(1, Math.max(0.65, w / 390)))
    }
    if (studioPhoneRef.current) {
      const w = studioPhoneRef.current.clientWidth
      if (w > 0) setStudioPhoneScale(w / 390)
    }
    if (studioTabletRef.current) {
      const w = studioTabletRef.current.clientWidth
      if (w > 0) setStudioTabletScale(w / 768)
    }
  }, [])

  useEffect(() => {
    calcScales()
    window.addEventListener('resize', calcScales)
    const t1 = setTimeout(calcScales, 150)
    const t2 = setTimeout(calcScales, 500)
    return () => {
      window.removeEventListener('resize', calcScales)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [activeMode, calcScales])

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
                <span>{t.website.badge} • LIVE DEMO</span>
              </p>
            </div>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              {language === 'bn' ? 'কারবুক ওয়েব প্ল্যাটফর্ম' : 'CARBOOK WEB PLATFORM'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-theme-primary px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-lg group cursor-pointer"
            >
              <span>{t.website.visitSite}</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={reloadIframe}
              className="btn-theme-secondary px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
              title="Refresh Live Preview"
            >
              <RotateCw size={13} className={isLoading ? 'animate-spin' : ''} />
              <span className="hidden xs:inline">{language === 'bn' ? 'রিফ্রেশ' : 'Reload'}</span>
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
              <FaAndroid size={14} className={activeMode === 'phone' ? 'text-black' : 'text-[#3ddc84]'} />
              <span>Android Phone (3D)</span>
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
              
              {/* BACKDROP/CENTER: 3D LAPTOP FRAME */}
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
                    <Lock size={10} className="text-emerald-400 shrink-0" />
                    <span className="truncate">https://www.carbookbd.com/</span>
                  </div>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white" title="Open Full">
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Scaled Desktop Iframe Viewport (Zero Scrollbar) */}
                <div
                  ref={laptopRef}
                  className="w-full overflow-hidden bg-white relative rounded-b-xl"
                  style={{ height: `${800 * laptopScale}px` }}
                >
                  <iframe
                    key={`studio-laptop-${iframeKey}`}
                    src={liveUrl}
                    scrolling="no"
                    title="Carbook 3D Studio Desktop View"
                    className="absolute top-0 left-0 border-0 pointer-events-auto"
                    style={{
                      width: '1280px',
                      height: '800px',
                      transform: `scale(${laptopScale})`,
                      transformOrigin: 'top left',
                      overflow: 'hidden',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Laptop Lower Hinge Strip */}
                <div className="w-full h-3 bg-gradient-to-b from-[#27272a] to-[#121214] rounded-b-xl border-t border-white/5 flex items-center justify-center">
                  <div className="w-24 h-1 rounded-full bg-neutral-600" />
                </div>
              </div>

              {/* FOREGROUND RIGHT: 3D FLOATING ANDROID FLAGSHIP PHONE (Zero Scrollbar, Edge-to-Edge) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => setActiveMode('phone')}
                className="absolute -bottom-8 -right-2 xs:-right-4 sm:-right-8 lg:-right-4 z-30 w-[170px] xs:w-[200px] sm:w-[235px] cursor-pointer group"
                style={{
                  transform: 'rotateY(-8deg) rotateX(3deg) translateZ(50px)',
                  transformStyle: 'preserve-3d',
                }}
                title="Click to view in Android Phone Mode"
              >
                {/* Modern Android Flagship Frame */}
                <div className="w-full rounded-[38px] sm:rounded-[44px] border-[3.5px] sm:border-[4.5px] border-[#2c2d30] bg-[#0c0d0e] p-1.5 sm:p-2 shadow-[0_30px_70px_rgba(0,0,0,0.95)] ring-1 ring-emerald-500/30 group-hover:ring-emerald-400 group-hover:scale-105 transition-all duration-300 relative">
                  
                  {/* Android Hardware Side Buttons */}
                  <div className="absolute -right-[4.5px] top-14 w-[2.5px] h-7 rounded-r bg-[#3f3f46]" />
                  <div className="absolute -right-[4.5px] top-24 w-[2.5px] h-12 rounded-r bg-[#3f3f46]" />

                  {/* Micro Speaker Ear-Piece */}
                  <div className="w-10 sm:w-12 h-[2px] rounded-full bg-neutral-700/80 mx-auto mb-1" />

                  {/* Inner Screen Display */}
                  <div className="w-full rounded-[28px] sm:rounded-[34px] overflow-hidden bg-white flex flex-col relative shadow-inner">
                    
                    {/* Native Android Status Bar with Centered Punch-Hole Camera */}
                    <div className="w-full h-5 sm:h-5.5 px-3 flex items-center justify-between text-[9px] font-mono select-none bg-white text-stone-800 z-20 flex-shrink-0 pt-0.5 border-b border-stone-100">
                      <span className="font-bold text-[9px] text-stone-800">9:41</span>
                      
                      {/* Centered Android Punch-Hole Camera Dot */}
                      <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center border border-neutral-700 shadow-inner">
                        <span className="w-1 h-1 rounded-full bg-[#18181b]" />
                      </div>

                      <div className="flex items-center gap-1 text-stone-700">
                        <span className="text-[8px] font-bold">5G</span>
                        <div className="w-3 h-1.5 rounded-[1px] border border-stone-700 flex items-center p-0.2">
                          <div className="w-full h-full bg-stone-700 rounded-[0.5px]" />
                        </div>
                      </div>
                    </div>

                    {/* Pixel-Perfect Scaled Mobile Viewport with Zero Scrollbar */}
                    <div
                      ref={studioPhoneRef}
                      className="w-full overflow-hidden bg-white relative"
                      style={{
                        height: `${780 * studioPhoneScale}px`,
                      }}
                    >
                      <iframe
                        src={liveUrl}
                        scrolling="no"
                        title="Carbook 3D Studio Android View"
                        className="absolute top-0 left-0 border-0 pointer-events-none"
                        style={{
                          width: '390px',
                          height: '780px',
                          transform: `scale(${studioPhoneScale})`,
                          transformOrigin: 'top left',
                          overflow: 'hidden',
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                        }}
                        loading="lazy"
                      />
                      
                      {/* Hover Click-to-Zoom Indicator */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1 shadow-md">
                          <FaAndroid size={11} />
                          <span>Tap to Zoom</span>
                        </span>
                        <span className="text-white font-bold text-xs font-billboard">
                          Android Mode
                        </span>
                      </div>
                    </div>

                    {/* Android Gesture Navigation Line */}
                    <div className="w-full h-3 bg-white flex items-center justify-center flex-shrink-0 z-20 pb-0.5">
                      <div className="w-16 h-0.5 rounded-full bg-stone-300" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FOREGROUND LEFT: 3D FLOATING TABLET (Zero Scrollbar) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={() => setActiveMode('tablet')}
                className="hidden md:block absolute -bottom-6 -left-6 sm:-left-10 z-20 w-[220px] sm:w-[270px] cursor-pointer group"
                style={{
                  transform: 'rotateY(8deg) rotateX(3deg) translateZ(30px)',
                  transformStyle: 'preserve-3d',
                }}
                title="Click to zoom in Tablet Mode"
              >
                <div className="w-full rounded-[32px] sm:rounded-[38px] border-[5px] border-[#27272a] bg-[#0c0c0e] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10 group-hover:ring-emerald-400 group-hover:scale-105 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-black border border-neutral-700 mx-auto mb-1.5" />
                  
                  <div
                    ref={studioTabletRef}
                    className="w-full overflow-hidden bg-white relative rounded-[20px]"
                    style={{
                      height: `${850 * studioTabletScale}px`,
                    }}
                  >
                    <iframe
                      src={liveUrl}
                      scrolling="no"
                      title="Carbook 3D Studio Tablet View"
                      className="absolute top-0 left-0 border-0 pointer-events-none"
                      style={{
                        width: '768px',
                        height: '850px',
                        transform: `scale(${studioTabletScale})`,
                        transformOrigin: 'top left',
                        overflow: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                        <ZoomIn size={10} /> Tap to Zoom
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
        {/* MODE 2: ANDROID PHONE MODE (Full-Height Flagship Android Smartphone)*/}
        {/* ------------------------------------------------------------------ */}
        {activeMode === 'phone' && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full py-4"
          >
            {/* Flagship Android Smartphone Frame */}
            <div
              className="relative w-full max-w-[340px] xs:max-w-[365px] sm:max-w-[385px] rounded-[42px] sm:rounded-[48px] border-[4.5px] sm:border-[6px] border-[#27272a] bg-[#09090b] p-2 sm:p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.85)] ring-1 ring-emerald-500/20"
              style={{
                transform: 'rotateX(2deg)',
              }}
            >
              {/* Android Hardware Side Buttons */}
              <div className="absolute -right-[6px] top-24 w-[2.5px] h-10 rounded-r bg-[#3f3f46]" />
              <div className="absolute -right-[6px] top-38 w-[2.5px] h-14 rounded-r bg-[#3f3f46]" />

              {/* Top Speaker Ear-piece Slit */}
              <div className="w-14 sm:w-16 h-[2px] rounded-full bg-neutral-700/80 mx-auto mb-1.5" />

              {/* Inner Screen */}
              <div className="w-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-white flex flex-col relative shadow-inner">
                
                {/* Android Status Bar with Centered Punch-Hole Camera */}
                <div className="w-full h-6 px-3.5 flex items-center justify-between text-[10px] font-mono select-none bg-white text-stone-800 z-20 flex-shrink-0 border-b border-stone-100">
                  <span className="font-bold text-[10px] text-stone-900">9:41</span>
                  
                  {/* Centered Android Punch-Hole Camera */}
                  <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center border border-neutral-700 shadow-inner">
                    <span className="w-1 h-1 rounded-full bg-[#1e293b]" />
                  </div>

                  <div className="flex items-center gap-1.5 text-stone-700">
                    <span className="text-[9px] font-bold">5G</span>
                    <div className="w-3.5 h-1.5 rounded-[1px] border border-stone-700 flex items-center p-0.2">
                      <div className="w-full h-full bg-stone-700 rounded-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* Real Mobile Scaled Viewport - Zero Scrollbar */}
                <div
                  ref={phoneRef}
                  className="w-full overflow-hidden bg-white relative"
                  style={{
                    height: `${780 * phoneScale}px`,
                  }}
                >
                  <iframe
                    key={`phone-mode-${iframeKey}`}
                    src={liveUrl}
                    scrolling="no"
                    title="Carbook Mobile Website Live"
                    onLoad={() => setIsLoading(false)}
                    className="absolute top-0 left-0 border-0 pointer-events-auto"
                    style={{
                      width: '390px',
                      height: '780px',
                      transform: `scale(${phoneScale})`,
                      transformOrigin: 'top left',
                      overflow: 'hidden',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Android Bottom Gesture Navigation Line */}
                <div className="w-full h-3.5 bg-white flex items-center justify-center flex-shrink-0 z-20 pb-0.5">
                  <div className="w-20 h-0.5 rounded-full bg-stone-300" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs font-mono text-slate-400 flex items-center gap-2">
              <FaAndroid className="text-[#3ddc84]" size={14} />
              <span>Flagship Android View • Live Interactive Mobile Responsive Engine</span>
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
                  <Lock size={10} className="text-emerald-400 shrink-0" />
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
                  scrolling="no"
                  title="Carbook Desktop Website Live"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '1280px',
                    height: '780px',
                    transform: `scale(${laptopScale})`,
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
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
                <span className="text-emerald-400 flex items-center gap-1"><Lock size={10} /> carbookbd.com</span>
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
                  scrolling="no"
                  title="Carbook Tablet Live"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '768px',
                    height: '940px',
                    transform: `scale(${tabletScale})`,
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
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
