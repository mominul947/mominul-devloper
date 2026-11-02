'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  Sparkles,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Globe,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Server,
  FileCode,
  Layers,
  Star,
  DownloadCloud,
} from 'lucide-react'
import { FaAndroid, FaGooglePlay } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'

interface AppProject {
  id: string
  name: string
  tagline: string
  category: string
  deliverable: string
  performance: string
  platform: string
  accent: string
  description: string
  techStack: string[]
  screenshots: string[]
  features: string[]
  isPrivateBuild: boolean
  playStoreUrl?: string
  downloads?: string
  rating?: string
}

const apps: AppProject[] = [
  {
    id: 'carbook',
    name: 'Carbook',
    tagline: 'On-Demand Car Rental, Intercity Ride & Vehicle Booking App',
    category: 'Car Rental & Travel',
    deliverable: 'Google Play Store Production Release',
    performance: '60fps Native Android UI',
    platform: 'Android (Google Play)',
    accent: '#3b82f6',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.appuser.carbook',
    downloads: '5K+',
    rating: '4.7',
    description:
      'Full-featured on-demand car rental and intercity travel platform live on Google Play with 5,000+ active downloads. Features instant vehicle reservations, real-time driver GPS tracking, automated fare calculation, multi-stop routing, digital ride invoicing, and seamless trip management.',
    techStack: ['Flutter', 'Android Native', 'Node.js', 'Google Maps API', 'Firebase', 'Cloud VPS'],
    screenshots: [
      '/images/image3/111.jpeg',
      '/images/image3/222.jpeg',
      '/images/image3/333.jpeg',
      '/images/image3/444.jpeg',
    ],
    features: [
      'Live Production Release on Google Play Store with 5K+ Downloads & 4.7★ Rating',
      'Real-Time Driver & Vehicle GPS Geolocation on Interactive Map',
      'Automated Fare Engine for Hourly & Intercity Ride Booking',
      'Instant Digital Invoicing, Push Telemetry & Ride History Tracking',
    ],
    isPrivateBuild: false,
  },
  {
    id: 'servicego',
    name: 'ServiceGo',
    tagline: 'On-Demand Electrician, AC Repair & Plumber Booking App',
    category: 'Home Services & Repairs',
    deliverable: 'Custom Client Mobile MVP',
    performance: '60fps Native Android UI',
    platform: 'Android & Web',
    accent: '#10b981',
    description:
      'On-demand home services marketplace engineered for hiring certified electricians, AC repair specialists, and plumbers. Features instant technician booking, live map geolocation tracking, digital invoicing, and client-tailored admin dispatch.',
    techStack: ['Flutter', 'Android Native', 'Node.js', 'Google Maps API', 'MongoDB', 'Cloud VPS'],
    screenshots: [
      '/images/image2/11.png',
      '/images/image2/22.png',
      '/images/image2/33.png',
      '/images/image2/44.png',
    ],
    features: [
      'Instant Booking for Certified Electricians, Plumbers & AC Technicians',
      'Real-Time Geolocation Tracking & Map Dispatch of Technicians',
      'Transparent Service Pricing Matrix & Digital In-App Invoicing',
      'Custom Engineered Client Application (Private Client Release)',
    ],
    isPrivateBuild: true,
  },
  {
    id: 'tournament',
    name: 'ArenaX Pro Tournament',
    tagline: 'Custom Esports Tournament & Live Match Bracket Engine',
    category: 'Esports & Gaming',
    deliverable: 'Custom Client Build',
    performance: 'Sub-50ms Real-Time Sync',
    platform: 'Android & Web',
    accent: '#06b6d4',
    description:
      'High-concurrency esports tournament platform custom engineered for a private client. Features live match brackets, real-time team slot registrations, automated prize pool accounting, and instant push notifications.',
    techStack: ['Flutter', 'Android Native', 'Node.js', 'MongoDB', 'WebSockets', 'Linux VPS'],
    screenshots: [
      '/images/image1/1.png',
      '/images/image1/2.png',
      '/images/image1/3.png',
      '/images/image1/4.png',
    ],
    features: [
      'Automated Tournament Brackets & Real-Time Slot Registration',
      'Real-Time Live Match Telemetry & Instant Result Verification',
      'Secure In-App Wallet & Automated Prize Pool Distribution',
      'Custom Engineered Client Application (Private Client Release)',
    ],
    isPrivateBuild: true,
  },
]

export default function AppShowcase() {
  const [selectedApp, setSelectedApp] = useState<AppProject>(apps[0])
  const [selectedScreenshotIdx, setSelectedScreenshotIdx] = useState<number>(0)
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const [carbookLive, setCarbookLive] = useState({
    downloads: '5K+',
    rating: '4.7',
  })

  // Live Google Play Downloads & Rating Auto-Updater
  useEffect(() => {
    fetch('/api/playstore?id=com.appuser.carbook')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.downloads) {
          setCarbookLive({
            downloads: data.downloads,
            rating: data.rating || '4.7',
          })
        }
      })
      .catch(() => {})
  }, [])

  const handlePrev = () => {
    setSelectedScreenshotIdx((prev) => (prev - 1 + selectedApp.screenshots.length) % selectedApp.screenshots.length)
  }

  const handleNext = () => {
    setSelectedScreenshotIdx((prev) => (prev + 1) % selectedApp.screenshots.length)
  }

  const isCarbook = selectedApp.id === 'carbook'
  const currentDownloads = isCarbook ? carbookLive.downloads : selectedApp.downloads
  const currentRating = isCarbook ? carbookLive.rating : selectedApp.rating

  return (
    <section id="apps" className="relative py-24 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 border-b theme-border pb-4 sm:pb-6"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>CLIENT APPLICATIONS &amp; MOBILE SHOWCASE</span>
            </p>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              FEATURED APPLICATIONS
            </h2>
          </div>
          <span className="text-xs font-mono theme-text-muted">
            ANDROID &amp; CROSS-PLATFORM NATIVE 60FPS BUILDS
          </span>
        </motion.div>

        {/* 3 Prominent High-Impact App Switcher Cards (Carbook 1st!) with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {apps.map((app, idx) => {
            const isActive = selectedApp.id === app.id
            const isThisCarbook = app.id === 'carbook'
            return (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                onClick={() => {
                  setSelectedApp(app)
                  setSelectedScreenshotIdx(0)
                }}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'theme-border hover:border-emerald-500/40 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-500'}`} />
                    <span>0{idx + 1} • {app.category}</span>
                  </span>

                  {isThisCarbook ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/30 flex items-center gap-1">
                      <FaGooglePlay size={10} />
                      <span>{carbookLive.downloads} Live</span>
                    </span>
                  ) : (
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold border transition-colors ${
                      isActive
                        ? 'bg-emerald-500 text-black border-emerald-500'
                        : 'border-stone-700 theme-text-muted group-hover:border-stone-500'
                    }`}>
                      {isActive ? 'ACTIVE VIEW' : 'VIEW'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="font-billboard text-xl sm:text-2xl theme-text-main leading-snug">
                    {app.name}
                  </h3>
                  {isThisCarbook && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      PLAY STORE
                    </span>
                  )}
                </div>

                <p className="text-xs theme-text-muted mt-1 leading-relaxed line-clamp-2">
                  {app.tagline}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* 3D Interactive Device Stage */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: App Details & Engineering Specs (4 Cols) */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6 order-2 lg:order-1">
            <motion.div
              key={selectedApp.id + '-info'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Header Card */}
              <div
                className="rounded-3xl p-6 border theme-border space-y-4 shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider theme-text-accent">
                    {selectedApp.category}
                  </span>
                  
                  {selectedApp.playStoreUrl ? (
                    <a
                      href={selectedApp.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold border border-emerald-500/40 text-emerald-400 bg-emerald-500/15 flex items-center gap-1.5 hover:bg-emerald-500 hover:text-black transition-all shadow-xs"
                    >
                      <FaGooglePlay size={12} />
                      <span>Live on Google Play ({currentDownloads})</span>
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold border theme-border text-emerald-500 bg-emerald-500/10"
                    >
                      Custom Client Release
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-billboard text-3xl theme-text-main">{selectedApp.name}</h3>
                  <p className="text-sm font-medium theme-text-main leading-snug mt-1">
                    {selectedApp.tagline}
                  </p>
                </div>

                <p className="text-xs theme-text-muted leading-relaxed">
                  {selectedApp.description}
                </p>

                {/* Engineering Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div
                    className="p-3 rounded-2xl border theme-border text-center"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <p className="text-xs theme-text-muted font-mono flex items-center justify-center gap-1">
                      {selectedApp.playStoreUrl ? (
                        <>
                          <DownloadCloud size={12} className="text-emerald-500" />
                          <span>Downloads</span>
                        </>
                      ) : (
                        <>
                          <Smartphone size={12} className="text-emerald-500" />
                          <span>Deliverable</span>
                        </>
                      )}
                    </p>
                    <p className="text-sm font-bold theme-text-main mt-1 leading-tight">
                      {selectedApp.playStoreUrl ? `${currentDownloads} (Live)` : selectedApp.deliverable}
                    </p>
                  </div>
                  
                  <div
                    className="p-3 rounded-2xl border theme-border text-center"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <p className="text-xs theme-text-muted font-mono flex items-center justify-center gap-1">
                      {selectedApp.playStoreUrl ? (
                        <>
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span>Rating</span>
                        </>
                      ) : (
                        <>
                          <Zap size={12} className="text-emerald-500" />
                          <span>Benchmark</span>
                        </>
                      )}
                    </p>
                    <p className="text-sm font-bold text-emerald-500 mt-1 leading-tight">
                      {selectedApp.playStoreUrl ? `${currentRating} ★ / 5.0` : selectedApp.performance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core App Features */}
              <div
                className="rounded-3xl p-6 border theme-border space-y-3 shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <p className="text-xs font-mono uppercase tracking-wider theme-text-main font-bold flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10b981]" />
                  Key Architectural Capabilities
                </p>
                <div className="space-y-2.5">
                  {selectedApp.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs theme-text-muted">
                      <span className="theme-text-accent mt-0.5">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {selectedApp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-[11px] font-mono border theme-border"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center: Slideable Android Flagship Phone View (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 relative">
            
            {/* Phone Slide Stage with Left / Right Arrows */}
            <div className="relative flex items-center justify-center w-full">
              
              {/* Left Slide Arrow */}
              <button
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900/90 hover:bg-emerald-500 hover:text-black text-white border border-stone-700 shadow-xl flex items-center justify-center transition-all cursor-pointer z-40 group"
                title="Previous screen"
                aria-label="Previous screen"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Android Mockup Frame */}
              <div className="relative w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[295px] rounded-[36px] sm:rounded-[40px] p-2 sm:p-2.5 shadow-2xl border-[3.5px] border-[#27272a] bg-[#09090b]">
                
                {/* Android Hardware Side Buttons */}
                <div className="absolute -right-[4.5px] top-24 w-[2.5px] h-9 rounded-r bg-[#3f3f46]" />
                <div className="absolute -right-[4.5px] top-36 w-[2.5px] h-14 rounded-r bg-[#3f3f46]" />

                {/* Inner Screen Container */}
                <div className="w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white text-stone-900 flex flex-col relative shadow-inner">
                  
                  {/* Native Android Status Bar */}
                  <div className="w-full h-5 sm:h-5.5 px-3 flex items-center justify-between text-[9px] font-mono select-none bg-white text-stone-800 z-20 flex-shrink-0 pt-0.5">
                    <span className="font-bold text-[9px] tracking-tight">9:41</span>
                    
                    {/* Centered Android Punch-Hole Camera */}
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black flex items-center justify-center border border-neutral-700/60 shadow-inner">
                      <span className="w-1 h-1 rounded-full bg-[#18181b]" />
                    </div>

                    <div className="flex items-center gap-1 text-stone-700">
                      <span className="text-[8px] font-bold">5G</span>
                      <div className="w-3 h-1.5 rounded-[1px] border border-stone-700 flex items-center p-0.2">
                        <div className="w-full h-full bg-stone-700 rounded-[0.5px]" />
                      </div>
                    </div>
                  </div>

                  {/* Slideable Screenshot Body (Touch-Swipeable & Click-Zoomable) */}
                  <div
                    className="relative w-full aspect-[390/884] bg-white cursor-zoom-in group select-none overflow-hidden"
                    onClick={() => setIsZoomed(true)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedApp.id + '-' + selectedScreenshotIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, { offset }) => {
                          if (offset.x > 35) handlePrev()
                          else if (offset.x < -35) handleNext()
                        }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={selectedApp.screenshots[selectedScreenshotIdx]}
                          alt={`${selectedApp.name} Screen ${selectedScreenshotIdx + 1}`}
                          fill
                          className="object-contain"
                          priority
                          
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1.5 border border-white/20">
                            <Maximize2 size={11} />
                            <span>Click to Zoom</span>
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Native Android Gesture Navigation Bar */}
                  <div className="w-full h-3 sm:h-3.5 bg-white flex items-center justify-center flex-shrink-0 z-20 pb-0.5">
                    <div className="w-16 h-0.5 rounded-full bg-stone-300" />
                  </div>

                </div>
              </div>

              {/* Right Slide Arrow */}
              <button
                onClick={handleNext}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900/90 hover:bg-emerald-500 hover:text-black text-white border border-stone-700 shadow-xl flex items-center justify-center transition-all cursor-pointer z-40 group"
                title="Next screen"
                aria-label="Next screen"
              >
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Screenshots Slide Dots & Thumbnail Strip */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl border theme-border bg-black/40 backdrop-blur-md">
                {selectedApp.screenshots.map((img, idx) => {
                  const isSelected = selectedScreenshotIdx === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedScreenshotIdx(idx)}
                      className={`relative w-11 sm:w-12 h-16 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-500/30'
                          : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                      }`}
                      title={`View Screen ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        
                      />
                      <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono px-1 rounded bg-black/85 text-white font-bold">
                        {idx + 1}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Slide Navigation Hint */}
              <p className="text-[10px] font-mono theme-text-muted flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Slide or tap arrows to view all 4 screens</span>
                <span className="opacity-50">({selectedScreenshotIdx + 1}/{selectedApp.screenshots.length})</span>
              </p>
            </div>

          </div>

          {/* Right Column: Custom Client Deliverables & CTAs (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 order-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Order / Inquiry CTA Card */}
              <div
                className="rounded-3xl p-6 border theme-border space-y-4 shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="theme-text-accent" />
                  <p className="text-xs font-mono uppercase tracking-wider theme-text-main font-bold">
                    {selectedApp.playStoreUrl ? 'Explore On Google Play' : 'Need A Custom Mobile Application?'}
                  </p>
                </div>
                
                <p className="text-xs theme-text-muted leading-relaxed">
                  {selectedApp.playStoreUrl
                    ? 'Download and test the live production build directly from Google Play Store with real-time GPS tracking and booking.'
                    : 'I engineer production-ready Android & Web applications custom built to your specific business workflow.'}
                </p>

                <div className="space-y-3">
                  {selectedApp.playStoreUrl && (
                    <a
                      href={selectedApp.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                    >
                      <FaGooglePlay size={15} />
                      <span>Install on Google Play ({currentDownloads})</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <a
                    href="https://www.fiverr.com/s/WebEmax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-full btn-theme-primary font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer"
                  >
                    <FiverrLogo size={18} />
                    <span>Order on Fiverr</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href="#contact"
                    className="w-full py-3.5 rounded-full btn-theme-secondary font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Custom Quote &amp; Architecture</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Custom Client Deliverables */}
              <div
                className="rounded-3xl p-6 border theme-border space-y-4 shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <p className="text-xs font-mono uppercase tracking-wider theme-text-muted font-bold">
                  Custom Client Deliverables
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-3 rounded-2xl border theme-border flex items-center gap-2.5"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    {selectedApp.playStoreUrl ? (
                      <FaGooglePlay size={20} className="text-[#34A853] flex-shrink-0" />
                    ) : (
                      <FaAndroid size={22} className="text-[#22c55e] flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-[10px] theme-text-muted font-mono">
                        {selectedApp.playStoreUrl ? 'Play Store' : 'Production'}
                      </p>
                      <p className="text-xs font-bold theme-text-main">
                        {selectedApp.playStoreUrl ? 'Released Live' : 'Android APK'}
                      </p>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-2xl border theme-border flex items-center gap-2.5"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <Server size={20} className="text-[#06b6d4] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] theme-text-muted font-mono">Real-Time</p>
                      <p className="text-xs font-bold theme-text-main">Backend API</p>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-2xl border theme-border flex items-center gap-2.5"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <Cpu size={20} className="text-[#10b981] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] theme-text-muted font-mono">Cloud VPS</p>
                      <p className="text-xs font-bold theme-text-main">Dedicated Deploy</p>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-2xl border theme-border flex items-center gap-2.5"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <FileCode size={20} className="text-[#8b5cf6] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] theme-text-muted font-mono">Source Code</p>
                      <p className="text-xs font-bold theme-text-main">Full Handover</p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* High-Resolution Screenshot Zoom Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && selectedApp.screenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-xs sm:max-w-sm w-full max-h-[90vh] aspect-[390/884] rounded-2xl overflow-hidden border border-stone-700 shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedApp.screenshots[selectedScreenshotIdx]}
                alt="Enlarged App Screen"
                fill
                className="object-contain"
                
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 border border-white/25 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer z-30"
                title="Close Lightbox"
              >
                <X size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
