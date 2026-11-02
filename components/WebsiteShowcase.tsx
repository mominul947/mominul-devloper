'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Laptop,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Globe,
  Maximize2,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from 'lucide-react'

type DeviceType = 'laptop' | 'tablet' | 'phone' | 'all'

export default function WebsiteShowcase() {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('laptop')
  const [iframeKey, setIframeKey] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Measure container dimensions for perfect mathematically-scaled iframe viewports
  const laptopContainerRef = useRef<HTMLDivElement>(null)
  const tabletContainerRef = useRef<HTMLDivElement>(null)
  const phoneContainerRef = useRef<HTMLDivElement>(null)

  const [laptopScale, setLaptopScale] = useState<number>(0.6)
  const [tabletScale, setTabletScale] = useState<number>(0.65)
  const [phoneScale, setPhoneScale] = useState<number>(0.85)

  const liveUrl = 'https://www.carbookbd.com/'

  const reloadIframe = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  // Real-time ResizeObserver ensuring iframes NEVER cut off on any screen size
  useEffect(() => {
    const updateScales = () => {
      if (laptopContainerRef.current) {
        const width = laptopContainerRef.current.clientWidth
        // Laptop base: 1280px wide
        setLaptopScale(Math.min(1, Math.max(0.25, width / 1280)))
      }
      if (tabletContainerRef.current) {
        const width = tabletContainerRef.current.clientWidth
        // Tablet base: 768px wide
        setTabletScale(Math.min(1, Math.max(0.35, width / 768)))
      }
      if (phoneContainerRef.current) {
        const width = phoneContainerRef.current.clientWidth
        // Phone base: 390px wide
        setPhoneScale(Math.min(1, Math.max(0.45, width / 390)))
      }
    }

    updateScales()
    window.addEventListener('resize', updateScales)
    const timer = setTimeout(updateScales, 200)

    return () => {
      window.removeEventListener('resize', updateScales)
      clearTimeout(timer)
    }
  }, [activeDevice])

  return (
    <section id="website" className="relative py-20 sm:py-28 overflow-hidden theme-main-bg theme-text-main border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b theme-border pb-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Globe size={13} />
                <span>LIVE WEB ARCHITECTURE &amp; PRODUCTION PLATFORM</span>
              </p>
            </div>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              CARBOOK WEB PORTAL
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
              className="btn-theme-secondary px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
              title="Refresh Live Preview"
            >
              <RotateCw size={13} className={isLoading ? 'animate-spin' : ''} />
              <span className="hidden xs:inline">Reload</span>
            </button>
          </div>
        </motion.div>

        {/* Device Switcher Bar (Laptop, Tablet, Phone, All-in-One Studio) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveDevice('laptop')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeDevice === 'laptop'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Laptop size={14} />
              <span>Laptop (1280px)</span>
            </button>

            <button
              onClick={() => setActiveDevice('tablet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeDevice === 'tablet'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tablet size={14} />
              <span>Tablet (768px)</span>
            </button>

            <button
              onClick={() => setActiveDevice('phone')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeDevice === 'phone'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone size={14} />
              <span>Phone (390px)</span>
            </button>

            <button
              onClick={() => setActiveDevice('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeDevice === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers size={14} />
              <span>All 3 Devices (Studio)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 px-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="truncate">Live URL:</span>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline truncate"
            >
              https://www.carbookbd.com/
            </a>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 1: LAPTOP VIEW (Flagship MacBook Frame with 1280px Viewport)  */}
        {/* ------------------------------------------------------------------ */}
        {activeDevice === 'laptop' && (
          <motion.div
            key="laptop"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center w-full"
          >
            {/* Laptop Lid Screen Frame */}
            <div className="w-full max-w-5xl rounded-t-[28px] sm:rounded-t-[34px] border-[5px] sm:border-[7px] border-[#27272a] bg-[#0c0c0e] p-2.5 sm:p-3 shadow-2xl shadow-emerald-500/5 relative">
              
              {/* Laptop Camera Punch Hole */}
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black border border-neutral-700 mx-auto mb-2 flex items-center justify-center">
                <span className="w-0.5 h-0.5 rounded-full bg-blue-500/80" />
              </div>

              {/* Browser Header Bar */}
              <div className="w-full h-8 sm:h-9 bg-[#18181b] rounded-t-xl px-3 flex items-center justify-between border-b border-white/5 text-xs text-slate-400 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                </div>
                
                {/* Browser Address Pill */}
                <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-300 max-w-[280px] sm:max-w-md truncate">
                  <span className="text-emerald-400">🔒</span>
                  <span className="truncate">https://www.carbookbd.com/</span>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={reloadIframe} title="Reload" className="hover:text-white transition-colors cursor-pointer">
                    <RotateCw size={12} />
                  </button>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" title="Open Fullscreen" className="hover:text-white transition-colors">
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Mathematically Scaled Responsive Desktop Viewport (1280x800) */}
              <div
                ref={laptopContainerRef}
                className="w-full overflow-hidden bg-white relative rounded-b-xl"
                style={{
                  height: `${800 * laptopScale}px`,
                }}
              >
                <iframe
                  key={`laptop-${iframeKey}`}
                  src={liveUrl}
                  title="Carbook Desktop Website Preview"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '1280px',
                    height: '800px',
                    transform: `scale(${laptopScale})`,
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Laptop Base Stand & Hinge */}
            <div className="w-full max-w-[104%] h-3 sm:h-4.5 bg-gradient-to-b from-[#27272a] via-[#1c1c1f] to-[#121214] rounded-b-2xl border-t border-white/10 shadow-2xl relative flex items-center justify-center">
              <div className="w-20 sm:w-28 h-1 rounded-full bg-[#3f3f46]" />
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 2: TABLET VIEW (iPad Pro 768px Viewport)                      */}
        {/* ------------------------------------------------------------------ */}
        {activeDevice === 'tablet' && (
          <motion.div
            key="tablet"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center w-full"
          >
            <div className="w-full max-w-xl rounded-[36px] sm:rounded-[42px] border-[6px] sm:border-[8px] border-[#27272a] bg-[#0c0c0e] p-3 shadow-2xl shadow-emerald-500/5 relative">
              {/* Tablet Top Camera Notch */}
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black border border-neutral-700 mx-auto mb-2.5 flex items-center justify-center">
                <span className="w-0.5 h-0.5 rounded-full bg-blue-500/80" />
              </div>

              {/* Browser Address Strip */}
              <div className="w-full h-7 bg-[#18181b] rounded-t-xl px-3 flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span className="text-emerald-400">🔒 carbookbd.com</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase">iPad Tablet View</span>
              </div>

              {/* Mathematically Scaled Tablet Viewport (768x1024) */}
              <div
                ref={tabletContainerRef}
                className="w-full overflow-hidden bg-white relative rounded-xl"
                style={{
                  height: `${960 * tabletScale}px`,
                }}
              >
                <iframe
                  key={`tablet-${iframeKey}`}
                  src={liveUrl}
                  title="Carbook Tablet Website Preview"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '768px',
                    height: '960px',
                    transform: `scale(${tabletScale})`,
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-28 h-1 rounded-full bg-neutral-600 mx-auto mt-2.5" />
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 3: PHONE VIEW (Smartphone 390px Viewport)                     */}
        {/* ------------------------------------------------------------------ */}
        {activeDevice === 'phone' && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center w-full"
          >
            <div className="w-full max-w-[340px] xs:max-w-[360px] sm:max-w-[375px] rounded-[44px] border-[5px] sm:border-[7px] border-[#27272a] bg-[#09090b] p-2.5 shadow-2xl relative">
              {/* Dynamic Island / Hardware Punch Hole */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-[#18181b] mr-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>

              {/* Mathematically Scaled Mobile Viewport (390x800) */}
              <div
                ref={phoneContainerRef}
                className="w-full overflow-hidden bg-white relative rounded-[28px]"
                style={{
                  height: `${800 * phoneScale}px`,
                }}
              >
                <iframe
                  key={`phone-${iframeKey}`}
                  src={liveUrl}
                  title="Carbook Mobile Website Preview"
                  onLoad={() => setIsLoading(false)}
                  className="absolute top-0 left-0 border-0 pointer-events-auto"
                  style={{
                    width: '390px',
                    height: '800px',
                    transform: `scale(${phoneScale})`,
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Bottom Gesture Line */}
              <div className="w-24 h-1 rounded-full bg-neutral-600 mx-auto mt-2" />
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 4: ALL 3 DEVICES (Studio Responsive Composition)              */}
        {/* ------------------------------------------------------------------ */}
        {activeDevice === 'all' && (
          <motion.div
            key="all"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-6 items-start"
          >
            {/* Main Center Stage: Laptop (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full rounded-t-2xl border-[4px] border-[#27272a] bg-[#0c0c0e] p-2 shadow-xl">
                <div className="w-full h-6 bg-[#18181b] rounded-t-lg px-2 flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="text-emerald-400 font-bold">💻 Laptop (Desktop 1280px)</span>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <ExternalLink size={11} />
                  </a>
                </div>
                <div
                  className="w-full overflow-hidden bg-white relative rounded-b-lg"
                  style={{ height: '360px' }}
                >
                  <iframe
                    src={liveUrl}
                    title="Carbook Desktop Studio"
                    className="absolute top-0 left-0 border-0"
                    style={{
                      width: '1280px',
                      height: '800px',
                      transform: 'scale(0.48)',
                      transformOrigin: 'top left',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-full h-2.5 bg-[#27272a] rounded-b-xl" />
            </div>

            {/* Side by Side: Tablet (3 cols) & Phone (2 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-start">
              
              {/* Tablet Preview */}
              <div className="rounded-[28px] border-[4px] border-[#27272a] bg-[#0c0c0e] p-2 shadow-lg">
                <div className="text-[10px] font-mono text-emerald-400 font-bold mb-1 truncate text-center">
                  📱 Tablet (768px)
                </div>
                <div
                  className="w-full overflow-hidden bg-white relative rounded-xl"
                  style={{ height: '320px' }}
                >
                  <iframe
                    src={liveUrl}
                    title="Carbook Tablet Studio"
                    className="absolute top-0 left-0 border-0"
                    style={{
                      width: '768px',
                      height: '960px',
                      transform: 'scale(0.33)',
                      transformOrigin: 'top left',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Phone Preview */}
              <div className="rounded-[32px] border-[4px] border-[#27272a] bg-[#0c0c0e] p-1.5 shadow-lg">
                <div className="text-[10px] font-mono text-emerald-400 font-bold mb-1 truncate text-center">
                  📲 Phone (390px)
                </div>
                <div
                  className="w-full overflow-hidden bg-white relative rounded-[20px]"
                  style={{ height: '320px' }}
                >
                  <iframe
                    src={liveUrl}
                    title="Carbook Phone Studio"
                    className="absolute top-0 left-0 border-0"
                    style={{
                      width: '390px',
                      height: '800px',
                      transform: 'scale(0.40)',
                      transformOrigin: 'top left',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Feature Highlights Grid Below Live Mockup */}
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
