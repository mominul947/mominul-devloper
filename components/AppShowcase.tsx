'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  Sparkles,
  Zap,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  DownloadCloud,
} from 'lucide-react'
import { FaGooglePlay } from 'react-icons/fa6'
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
    accent: '#10b981',
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
  // Independent screenshot indices for each project
  const [screenshotIndices, setScreenshotIndices] = useState<Record<string, number>>({
    carbook: 0,
    servicego: 0,
    tournament: 0,
  })

  // Mobile focused app selection
  const [selectedMobileApp, setSelectedMobileApp] = useState<AppProject>(apps[0])

  // Lightbox zoom modal
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  // Live Google Play stats for Carbook
  const [carbookLive, setCarbookLive] = useState({
    downloads: '5K+',
    rating: '4.7',
  })

  const [isPaused, setIsPaused] = useState<boolean>(false)

  // Fetch live stats
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

  // Auto-cycle screenshots independently
  useEffect(() => {
    if (isPaused || zoomedImage) return

    const timer = setInterval(() => {
      setScreenshotIndices((prev) => {
        const next: Record<string, number> = { ...prev }
        apps.forEach((app) => {
          next[app.id] = ((prev[app.id] || 0) + 1) % app.screenshots.length
        })
        return next
      })
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused, zoomedImage])

  const handlePrevScreenshot = (appId: string) => {
    setScreenshotIndices((prev) => {
      const current = prev[appId] || 0
      const app = apps.find((a) => a.id === appId)
      const max = app ? app.screenshots.length : 4
      return {
        ...prev,
        [appId]: (current - 1 + max) % max,
      }
    })
  }

  const handleNextScreenshot = (appId: string) => {
    setScreenshotIndices((prev) => {
      const current = prev[appId] || 0
      const app = apps.find((a) => a.id === appId)
      const max = app ? app.screenshots.length : 4
      return {
        ...prev,
        [appId]: (current + 1) % max,
      }
    })
  }

  const currentMobileAppIdx = apps.findIndex((a) => a.id === selectedMobileApp.id)
  const nextMobileApp = apps[(currentMobileAppIdx + 1) % apps.length]

  return (
    <section id="apps" className="relative py-20 sm:py-24 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b theme-border pb-4 sm:pb-6"
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
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold">
              3 LIVE BUILDS • 60FPS NATIVE ANDROID
            </span>
          </div>
        </motion.div>

        {/* =========================================================================
            DESKTOP PC VIEW (hidden on mobile, grid on lg: screens):
            "jei koita project sei koita phone" -> 3 PROJECTS = 3 PHONES SIDE-BY-SIDE
           ========================================================================= */}
        <div
          className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {apps.map((app, idx) => {
            const isCarbook = app.id === 'carbook'
            const currentIdx = screenshotIndices[app.id] || 0
            const activeScreenshot = app.screenshots[currentIdx] || app.screenshots[0]
            const downloads = isCarbook ? carbookLive.downloads : app.downloads
            const rating = isCarbook ? carbookLive.rating : app.rating

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col rounded-3xl p-5 xl:p-6 border theme-border hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {/* Accent ambient glow */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: app.accent }}
                />

                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>0{idx + 1} • {app.category}</span>
                  </span>

                  {isCarbook ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/40 flex items-center gap-1 shadow-sm">
                      <FaGooglePlay size={10} />
                      <span>{downloads} Live</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                      Client MVP
                    </span>
                  )}
                </div>

                {/* App Name & Tagline */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-billboard text-2xl xl:text-3xl theme-text-main leading-tight">
                      {app.name}
                    </h3>
                    {isCarbook && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        PLAY STORE
                      </span>
                    )}
                  </div>
                  <p className="text-xs theme-text-muted mt-1 line-clamp-2 leading-relaxed">
                    {app.tagline}
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-2xl border theme-border bg-black/10 dark:bg-black/30">
                  <div className="text-center">
                    <p className="text-[10px] font-mono theme-text-muted flex items-center justify-center gap-1">
                      {isCarbook ? (
                        <>
                          <DownloadCloud size={11} className="text-emerald-400" />
                          <span>Downloads</span>
                        </>
                      ) : (
                        <>
                          <Smartphone size={11} className="text-emerald-400" />
                          <span>Deliverable</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs font-bold theme-text-main mt-0.5">
                      {isCarbook ? `${downloads} Live` : app.deliverable}
                    </p>
                  </div>
                  <div className="text-center border-l theme-border">
                    <p className="text-[10px] font-mono theme-text-muted flex items-center justify-center gap-1">
                      {isCarbook ? (
                        <>
                          <Star size={11} className="text-amber-400 fill-amber-400" />
                          <span>Rating</span>
                        </>
                      ) : (
                        <>
                          <Zap size={11} className="text-emerald-400" />
                          <span>Performance</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">
                      {isCarbook ? `${rating} ★ / 5.0` : app.performance}
                    </p>
                  </div>
                </div>

                {/* DEDICATED PHONE MOCKUP FOR THIS PROJECT */}
                <div className="relative flex flex-col items-center justify-center my-2">
                  <div className="relative w-full max-w-[270px] xl:max-w-[280px] rounded-[38px] p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-[3.5px] border-[#27272a] bg-[#09090b] transition-transform duration-300 group-hover:scale-[1.02]">
                    
                    {/* Hardware Buttons */}
                    <div className="absolute -right-[4.5px] top-20 w-[2.5px] h-8 rounded-r bg-[#3f3f46]" />
                    <div className="absolute -right-[4.5px] top-32 w-[2.5px] h-12 rounded-r bg-[#3f3f46]" />

                    {/* Phone Inner Screen */}
                    <div className="w-full rounded-[30px] overflow-hidden bg-white text-stone-900 flex flex-col relative shadow-inner">
                      
                      {/* Android Status Bar */}
                      <div className="w-full h-5 px-3 flex items-center justify-between text-[9px] font-mono select-none bg-white text-stone-800 z-20 flex-shrink-0 pt-0.5 border-b border-stone-100">
                        <span className="font-bold text-[9px]">9:41</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center border border-neutral-700/60 shadow-inner">
                          <span className="w-1 h-1 rounded-full bg-[#18181b]" />
                        </div>
                        <div className="flex items-center gap-1 text-stone-700">
                          <span className="text-[8px] font-bold">5G</span>
                          <div className="w-3 h-1.5 rounded-[1px] border border-stone-700 flex items-center p-0.2">
                            <div className="w-full h-full bg-stone-700 rounded-[0.5px]" />
                          </div>
                        </div>
                      </div>

                      {/* Screen Image Body with Interactive Arrows & Zoom */}
                      <div
                        className="relative w-full aspect-[390/860] bg-white cursor-zoom-in group/screen select-none overflow-hidden"
                        onClick={() => setZoomedImage(activeScreenshot)}
                        title="Click to Zoom Screenshot"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={app.id + '-' + currentIdx}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.22 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={activeScreenshot}
                              alt={`${app.name} Screen ${currentIdx + 1}`}
                              fill
                              sizes="(max-width: 1280px) 270px, 290px"
                              className="object-contain"
                              priority={idx === 0}
                            />
                            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                              <span className="px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1.5 border border-white/20 shadow-lg">
                                <Maximize2 size={11} />
                                <span>Zoom</span>
                              </span>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Interactive In-Phone Left Arrow */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePrevScreenshot(app.id)
                          }}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-emerald-500 hover:text-black text-white border border-white/20 shadow-md flex items-center justify-center transition-all cursor-pointer z-30"
                          title="Previous screenshot"
                          aria-label="Previous screenshot"
                        >
                          <ChevronLeft size={14} />
                        </button>

                        {/* Interactive In-Phone Right Arrow */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNextScreenshot(app.id)
                          }}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-emerald-500 hover:text-black text-white border border-white/20 shadow-md flex items-center justify-center transition-all cursor-pointer z-30"
                          title="Next screenshot"
                          aria-label="Next screenshot"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Android Home Navigation Bar */}
                      <div className="w-full h-3 bg-white flex items-center justify-center flex-shrink-0 z-20 pb-0.5">
                        <div className="w-14 h-0.5 rounded-full bg-stone-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screenshot Thumbnails & Counter */}
                <div className="mt-3 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl border theme-border bg-black/30 backdrop-blur-sm">
                    {app.screenshots.map((thumb, tIdx) => {
                      const isCurrent = currentIdx === tIdx
                      return (
                        <button
                          key={tIdx}
                          onClick={() =>
                            setScreenshotIndices((prev) => ({
                              ...prev,
                              [app.id]: tIdx,
                            }))
                          }
                          className={`relative w-8 xl:w-9 h-12 xl:h-13 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500/30'
                              : 'border-white/10 opacity-50 hover:opacity-90'
                          }`}
                          title={`View screen ${tIdx + 1}`}
                        >
                          <Image
                            src={thumb}
                            alt={`Screen ${tIdx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      )
                    })}
                  </div>
                  <span className="text-[10px] font-mono theme-text-muted">
                    Screen {currentIdx + 1} of {app.screenshots.length} • Click to switch
                  </span>
                </div>

                {/* Key Architectural Features */}
                <div className="mt-4 pt-3 border-t theme-border space-y-1.5 flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    Key Capabilities
                  </p>
                  {app.features.slice(0, 3).map((feat, fIdx) => (
                    <p key={fIdx} className="text-[11px] theme-text-muted leading-relaxed flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span className="line-clamp-2">{feat}</span>
                    </p>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                  {app.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono border theme-border bg-black/5 dark:bg-white/5 theme-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-2 mt-auto">
                  {isCarbook && app.playStoreUrl ? (
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                    >
                      <FaGooglePlay size={13} />
                      <span>Live on Play Store ({downloads})</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <a
                      href="https://www.fiverr.com/s/WebEmax"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl btn-theme-primary font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-md"
                    >
                      <FiverrLogo size={15} />
                      <span>Order on Fiverr</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  <a
                    href="#contact"
                    className="w-full py-2 rounded-xl btn-theme-secondary font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Custom Build</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* =========================================================================
            MOBILE VIEW (lg:hidden):
            Keeps smooth single-phone view with clean tabs so mobile isn't cramped
           ========================================================================= */}
        <div className="lg:hidden space-y-6">
          
          {/* Mobile App Selector Cards (Carbook 1st) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {apps.map((app, idx) => {
              const isActive = selectedMobileApp.id === app.id
              const isThisCarbook = app.id === 'carbook'
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedMobileApp(app)
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'theme-border bg-black/5 dark:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-bold text-emerald-500 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-500'}`} />
                      <span>0{idx + 1} • {app.category}</span>
                    </span>
                    {isThisCarbook ? (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase font-bold bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/30 flex items-center gap-1">
                        <FaGooglePlay size={9} />
                        <span>{carbookLive.downloads}</span>
                      </span>
                    ) : (
                      <span className={`text-[9px] font-mono px-2 py-0.2 rounded-full uppercase font-bold border ${
                        isActive ? 'bg-emerald-500 text-black border-emerald-500' : 'theme-border theme-text-muted'
                      }`}>
                        {isActive ? 'ACTIVE' : 'VIEW'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-billboard text-lg theme-text-main">
                    {app.name}
                  </h3>
                </button>
              )
            })}
          </div>

          {/* Mobile Phone Mockup View */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative flex items-center justify-center w-full">
              
              {/* Stacked Next App Peek */}
              <div
                onClick={() => setSelectedMobileApp(nextMobileApp)}
                className="absolute top-3 right-0 xs:right-2 w-full max-w-[250px] rounded-[34px] p-2 shadow-2xl border-[3px] border-[#27272a]/60 bg-[#09090b] scale-[0.92] origin-right opacity-35 hover:opacity-75 transition-all cursor-pointer z-0 select-none group"
                title={`Next: ${nextMobileApp.name}`}
              >
                <div className="w-full rounded-[26px] overflow-hidden bg-white aspect-[390/884] relative">
                  <Image
                    src={nextMobileApp.screenshots[0]}
                    alt={nextMobileApp.name}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-2 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[8px] font-mono uppercase mb-1">
                      Next App →
                    </span>
                    <span className="text-white font-bold text-xs font-billboard">
                      {nextMobileApp.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prev Arrow */}
              <button
                onClick={() => handlePrevScreenshot(selectedMobileApp.id)}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-900/90 text-white border border-stone-700 shadow-xl flex items-center justify-center cursor-pointer z-40 hover:bg-emerald-500 hover:text-black transition-colors"
                aria-label="Previous screen"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Mobile Phone Container */}
              <div className="relative z-20 w-full max-w-[275px] rounded-[38px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border-[3.5px] border-[#27272a] bg-[#09090b]">
                <div className="w-full rounded-[30px] overflow-hidden bg-white text-stone-900 flex flex-col relative shadow-inner">
                  {/* Status Bar */}
                  <div className="w-full h-5 px-3 flex items-center justify-between text-[9px] font-mono select-none bg-white text-stone-800 z-20 flex-shrink-0 pt-0.5">
                    <span className="font-bold text-[9px]">9:41</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center border border-neutral-700/60 shadow-inner">
                      <span className="w-1 h-1 rounded-full bg-[#18181b]" />
                    </div>
                    <div className="flex items-center gap-1 text-stone-700">
                      <span className="text-[8px] font-bold">5G</span>
                      <div className="w-3 h-1.5 rounded-[1px] border border-stone-700 flex items-center p-0.2">
                        <div className="w-full h-full bg-stone-700 rounded-[0.5px]" />
                      </div>
                    </div>
                  </div>

                  {/* Screenshot Image */}
                  <div
                    className="relative w-full aspect-[390/884] bg-white cursor-zoom-in group select-none overflow-hidden"
                    onClick={() => {
                      const cur = screenshotIndices[selectedMobileApp.id] || 0
                      setZoomedImage(selectedMobileApp.screenshots[cur])
                    }}
                  >
                    <Image
                      src={selectedMobileApp.screenshots[screenshotIndices[selectedMobileApp.id] || 0]}
                      alt={`${selectedMobileApp.name} Screen`}
                      fill
                      sizes="280px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Android Home Bar */}
                  <div className="w-full h-3 bg-white flex items-center justify-center flex-shrink-0 z-20 pb-0.5">
                    <div className="w-16 h-0.5 rounded-full bg-stone-300" />
                  </div>
                </div>
              </div>

              {/* Next Arrow */}
              <button
                onClick={() => handleNextScreenshot(selectedMobileApp.id)}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-900/90 text-white border border-stone-700 shadow-xl flex items-center justify-center cursor-pointer z-40 hover:bg-emerald-500 hover:text-black transition-colors"
                aria-label="Next screen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Mobile Thumbnails */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 p-1 rounded-xl border theme-border bg-black/40 backdrop-blur-md">
                {selectedMobileApp.screenshots.map((img, idx) => {
                  const isCur = (screenshotIndices[selectedMobileApp.id] || 0) === idx
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        setScreenshotIndices((prev) => ({
                          ...prev,
                          [selectedMobileApp.id]: idx,
                        }))
                      }
                      className={`relative w-10 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        isCur ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/25' : 'border-white/10 opacity-50'
                      }`}
                    >
                      <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] font-mono theme-text-muted">
                Screen {(screenshotIndices[selectedMobileApp.id] || 0) + 1} of {selectedMobileApp.screenshots.length} • Tap arrows or thumbnails
              </p>
            </div>
          </div>

          {/* Mobile App Details & Actions */}
          <div className="rounded-3xl p-5 border theme-border space-y-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                {selectedMobileApp.category}
              </span>
              {selectedMobileApp.playStoreUrl ? (
                <a
                  href={selectedMobileApp.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-bold border border-emerald-500/40 text-emerald-400 bg-emerald-500/15 flex items-center gap-1.5"
                >
                  <FaGooglePlay size={11} />
                  <span>{carbookLive.downloads} Live</span>
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold border theme-border text-emerald-500 bg-emerald-500/10">
                  Custom Client Release
                </span>
              )}
            </div>

            <div>
              <h3 className="font-billboard text-2xl theme-text-main">{selectedMobileApp.name}</h3>
              <p className="text-xs font-medium theme-text-muted mt-1">{selectedMobileApp.tagline}</p>
            </div>

            <p className="text-xs theme-text-muted leading-relaxed">{selectedMobileApp.description}</p>

            {/* Mobile CTAs */}
            <div className="space-y-2 pt-2">
              {selectedMobileApp.playStoreUrl && (
                <a
                  href={selectedMobileApp.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-md"
                >
                  <FaGooglePlay size={14} />
                  <span>Install on Google Play ({carbookLive.downloads})</span>
                  <ExternalLink size={12} />
                </a>
              )}
              <a
                href="https://www.fiverr.com/s/WebEmax"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full btn-theme-primary font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <FiverrLogo size={16} />
                <span>Order on Fiverr</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Screenshot Zoom Lightbox Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-xs sm:max-w-sm w-full max-h-[90vh] aspect-[390/884] rounded-2xl overflow-hidden border border-stone-700 shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={zoomedImage}
                alt="Enlarged App Screen"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setZoomedImage(null)}
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
