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
import GooglePlayLogo from '@/components/GooglePlayLogo'
import FiverrLogo from '@/components/FiverrLogo'
import { useLanguage } from '@/context/LanguageContext'

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
  hasOwnStatusBar?: boolean
}

const apps: AppProject[] = [
  {
    id: 'carbook',
    name: 'Carbook',
    tagline: 'On-Demand Car Rental, Intercity Ride & Vehicle Booking App',
    category: 'Car Rental',
    deliverable: 'Google Play Store Release',
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
      'Live Production Release on Google Play Store with 5K+ Downloads & 4.7 Rating',
      'Real-Time Driver & Vehicle GPS Geolocation on Interactive Map',
      'Automated Fare Engine for Hourly & Intercity Ride Booking',
      'Instant Digital Invoicing, Push Telemetry & Ride History Tracking',
    ],
    isPrivateBuild: false,
    hasOwnStatusBar: true,
  },
  {
    id: 'repairmate',
    name: 'Repairmate Pro',
    tagline: 'Smart Task Management, Workflow Organizer & Productivity Utility',
    category: 'Productivity',
    deliverable: 'Google Play Store Release',
    performance: '60fps Native Android UI',
    platform: 'Android (Google Play)',
    accent: '#10b981',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.appuser.repaimatepro',
    downloads: 'Live',
    rating: '5.0',
    description:
      'Production-grade daily workflow and smart task organization app live on Google Play Store. Features structured task notes, item cart & favorites workflow system, intuitive clean interface, and secure cloud synchronization.',
    techStack: ['Flutter', 'Android Native', 'Firebase Cloud', 'REST API', 'Node.js', 'State Management'],
    screenshots: [
      '/images/image4/1111.jpg',
      '/images/image4/2222.jpg',
      '/images/image4/3333.jpg',
      '/images/image4/4444.jpg',
    ],
    features: [
      'Live Production Release on Google Play Store (SwiftBox Tools)',
      'Smart Task Management: Seamlessly organize notes, items & tasks',
      'Favorites & Cart Workflow Engine with Instant State Sync',
      'Clean 60fps Native Android UI with Secure Cloud Synchronization',
    ],
    isPrivateBuild: false,
    hasOwnStatusBar: true,
  },
  {
    id: 'servicego',
    name: 'ServiceGo',
    tagline: 'On-Demand Electrician, AC Repair & Plumber Booking App',
    category: 'Home Services',
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
    category: 'Esports Gaming',
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
    repairmate: 0,
    servicego: 0,
    tournament: 0,
  })

  // Mobile focused app selection
  const [selectedMobileApp, setSelectedMobileApp] = useState<AppProject>(apps[0])

  // Lightbox zoom modal
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  // Live Google Play stats for apps
  const [playStats, setPlayStats] = useState<Record<string, { downloads: string; rating: string }>>({
    carbook: { downloads: '5K+', rating: '4.7' },
    repairmate: { downloads: 'Live', rating: '5.0' },
  })

  const [isPaused, setIsPaused] = useState<boolean>(false)

  // Fetch live stats from Play Store API
  useEffect(() => {
    fetch('/api/playstore?id=com.appuser.carbook')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.downloads) {
          setPlayStats((prev) => ({
            ...prev,
            carbook: {
              downloads: data.downloads,
              rating: data.rating || '4.7',
            },
          }))
        }
      })
      .catch(() => {})

    fetch('/api/playstore?id=com.appuser.repaimatepro')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.downloads) {
          setPlayStats((prev) => ({
            ...prev,
            repairmate: {
              downloads: data.downloads,
              rating: data.rating || '5.0',
            },
          }))
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
  const { language, t } = useLanguage()

  return (
    <section id="apps" className="relative py-20 sm:py-24 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b theme-border pb-4 sm:pb-6"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>{t.apps.badge}</span>
            </p>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              {t.apps.heading}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold">
              {language === 'bn' ? '৪টি প্রোডাকশন অ্যাপ • ২টি গুগল প্লে স্টোরে লাইভ' : '4 APPS • 2 LIVE ON GOOGLE PLAY'}
            </span>
          </div>
        </motion.div>

        {/* =========================================================================
            DESKTOP PC VIEW:
            4 PROJECTS = 4 DEDICATED PHONE SHOWCASES
           ========================================================================= */}
        <div
          className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {apps.map((app, idx) => {
            const isPlayStore = Boolean(app.playStoreUrl)
            const liveStat = playStats[app.id] || { downloads: app.downloads || 'Live', rating: app.rating || '5.0' }
            const downloads = liveStat.downloads
            const rating = liveStat.rating
            const currentIdx = screenshotIndices[app.id] || 0
            const activeScreenshot = app.screenshots[currentIdx] || app.screenshots[0]

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col rounded-3xl p-5 border theme-border hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {/* Accent ambient glow */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: app.accent }}
                />

                {/* Top Badge & Number - Fixed height to ensure 100% horizontal alignment */}
                <div className="flex items-center justify-between mb-2.5 h-6">
                  <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                    <span>0{idx + 1} • {app.category}</span>
                  </span>

                  {isPlayStore ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold bg-[#34A853]/15 text-[#34A853] border border-[#34A853]/35 flex items-center gap-1.5 shadow-xs flex-shrink-0">
                      <GooglePlayLogo size={11} />
                      <span>{downloads} Live</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 flex-shrink-0">
                      Client MVP
                    </span>
                  )}
                </div>

                {/* App Name & Tagline - Fixed height so 1-line and multi-line titles fit without truncation and all phones align identically */}
                <div className="mb-3 h-[78px] flex flex-col justify-start">
                  <div className="min-h-[34px] flex items-center">
                    <h3 className="font-billboard text-xl xl:text-2xl theme-text-main leading-tight tracking-wide">
                      {app.name}
                    </h3>
                  </div>
                  <p className="text-xs theme-text-muted mt-0.5 line-clamp-2 leading-relaxed">
                    {app.tagline}
                  </p>
                </div>

                {/* Key Metrics Strip - Fixed height */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-2xl border theme-border bg-black/10 dark:bg-black/30 h-[58px] items-center">
                  <div className="text-center">
                    <p className="text-[10px] font-mono theme-text-muted flex items-center justify-center gap-1">
                      {isPlayStore ? (
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
                    <p className="text-xs font-bold theme-text-main mt-0.5 truncate px-1">
                      {isPlayStore ? `${downloads} Live` : app.deliverable}
                    </p>
                  </div>
                  <div className="text-center border-l theme-border">
                    <p className="text-[10px] font-mono theme-text-muted flex items-center justify-center gap-1">
                      {isPlayStore ? (
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
                      {isPlayStore ? `${rating} / 5.0 Rating` : app.performance}
                    </p>
                  </div>
                </div>

                {/* DEDICATED PHONE MOCKUP FOR THIS PROJECT (Identical fixed dimensions on desktop) */}
                <div className="relative flex flex-col items-center justify-center my-1">
                  <div className="relative w-full max-w-[215px] xl:max-w-[230px] rounded-[34px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-[3.5px] border-[#27272a] bg-[#09090b] transition-transform duration-300 group-hover:scale-[1.02]">
                    
                    {/* Hardware Buttons */}
                    <div className="absolute -right-[4.5px] top-20 w-[2.5px] h-8 rounded-r bg-[#3f3f46]" />
                    <div className="absolute -left-[4.5px] top-16 w-[2.5px] h-7 rounded-l bg-[#3f3f46]" />
                    <div className="absolute -left-[4.5px] top-26 w-[2.5px] h-7 rounded-l bg-[#3f3f46]" />

                    {/* Phone Screen Container */}
                    <div className="w-full rounded-[28px] overflow-hidden bg-white text-stone-900 flex flex-col relative shadow-inner">
                      
                      {/* Android Status Bar (Omitted when app screenshots already contain status bar) */}
                      {!app.hasOwnStatusBar && (
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
                      )}

                      {/* Main Screenshot Screen with Zoom Lightbox Click */}
                      <div
                        className="relative w-full aspect-[390/884] bg-white cursor-zoom-in group/screen select-none overflow-hidden"
                        onClick={() => setZoomedImage(activeScreenshot)}
                        title="Click to Zoom Fullscreen"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeScreenshot}
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
                              sizes="(max-width: 1280px) 250px, 270px"
                              className="object-contain"
                              priority={idx < 2}
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
                          className={`relative w-8 xl:w-8.5 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
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
                  {isPlayStore && app.playStoreUrl ? (
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                    >
                      <GooglePlayLogo size={14} />
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
            Interactive tabs for all 4 apps
           ========================================================================= */}
        <div className="lg:hidden space-y-6">
          
          {/* Mobile 4 Mini Phone Previews (All 4 apps visible together in small phone size) */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-2">
            {apps.map((app, idx) => {
              const isActive = selectedMobileApp.id === app.id
              const isPlay = Boolean(app.playStoreUrl)
              const firstScreenshot = app.screenshots[0]
              const liveStat = playStats[app.id] || { downloads: app.downloads || 'Live' }

              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedMobileApp(app)}
                  className={`flex flex-col items-center p-1.5 sm:p-2 rounded-2xl border transition-all cursor-pointer text-center relative group ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/40 scale-[1.03]'
                      : 'theme-border bg-black/5 dark:bg-white/5 opacity-75 hover:opacity-100 hover:border-neutral-600'
                  }`}
                >
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border-2 border-slate-900 z-10" />
                  )}

                  {/* Tiny Phone Frame */}
                  <div
                    className={`relative w-full aspect-[9/18.5] max-w-[66px] sm:max-w-[74px] rounded-[16px] p-1 bg-[#09090b] shadow-md border-[2px] transition-colors ${
                      isActive ? 'border-emerald-500' : 'border-[#27272a]'
                    }`}
                  >
                    <div className="w-full h-full rounded-[12px] overflow-hidden bg-white relative">
                      <Image
                        src={firstScreenshot}
                        alt={app.name}
                        fill
                        sizes="74px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* App Mini Label */}
                  <div className="mt-1.5 w-full">
                    <p className="font-billboard text-[11px] sm:text-xs theme-text-main truncate leading-tight">
                      {app.name}
                    </p>
                    <span className={`text-[8px] font-mono px-1 rounded uppercase font-bold inline-flex items-center justify-center gap-1 mt-0.5 truncate max-w-full ${
                      isActive ? 'text-emerald-400 bg-emerald-500/20' : 'theme-text-muted'
                    }`}>
                      {isPlay && <GooglePlayLogo size={8} />}
                      <span>{isPlay ? `${liveStat.downloads} Play` : 'Client MVP'}</span>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Medium-Sized Active Phone Mockup View ("majhari size") */}
          <div className="flex flex-col items-center justify-center relative pt-1">
            <div className="relative flex items-center justify-center w-full">
              
              {/* Prev Arrow */}
              <button
                onClick={() => handlePrevScreenshot(selectedMobileApp.id)}
                className="absolute left-2 xs:left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-900/90 text-white border border-stone-700 shadow-xl flex items-center justify-center cursor-pointer z-40 hover:bg-emerald-500 hover:text-black transition-colors"
                aria-label="Previous screen"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Medium Phone Container (Balanced "Majhari" Size) */}
              <div className="relative z-20 w-full max-w-[205px] xs:max-w-[215px] sm:max-w-[230px] rounded-[34px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border-[3.5px] border-[#27272a] bg-[#09090b] transition-transform duration-300">
                <div className="w-full rounded-[26px] overflow-hidden bg-white text-stone-900 flex flex-col relative shadow-inner">
                  {/* Status Bar (Omitted when app screenshots already contain status bar) */}
                  {!selectedMobileApp.hasOwnStatusBar && (
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
                  )}

                  {/* Screenshot Image with Lightbox Zoom */}
                  <div
                    className="relative w-full aspect-[390/884] bg-white cursor-zoom-in group select-none overflow-hidden"
                    onClick={() => {
                      const cur = screenshotIndices[selectedMobileApp.id] || 0
                      setZoomedImage(selectedMobileApp.screenshots[cur])
                    }}
                    title="Tap to zoom"
                  >
                    <Image
                      src={selectedMobileApp.screenshots[screenshotIndices[selectedMobileApp.id] || 0]}
                      alt={`${selectedMobileApp.name} Screen`}
                      fill
                      sizes="230px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Android Home Bar */}
                  <div className="w-full h-3 bg-white flex items-center justify-center flex-shrink-0 z-20 pb-0.5">
                    <div className="w-14 h-0.5 rounded-full bg-stone-300" />
                  </div>
                </div>
              </div>

              {/* Next Arrow */}
              <button
                onClick={() => handleNextScreenshot(selectedMobileApp.id)}
                className="absolute right-2 xs:right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-900/90 text-white border border-stone-700 shadow-xl flex items-center justify-center cursor-pointer z-40 hover:bg-emerald-500 hover:text-black transition-colors"
                aria-label="Next screen"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mobile Thumbnails */}
            <div className="mt-3 flex flex-col items-center gap-1.5">
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
                      className={`relative w-9 h-13 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
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
                  <GooglePlayLogo size={12} />
                  <span>{playStats[selectedMobileApp.id]?.downloads || selectedMobileApp.downloads} Live</span>
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
                  <GooglePlayLogo size={15} />
                  <span>Install on Google Play ({playStats[selectedMobileApp.id]?.downloads || selectedMobileApp.downloads})</span>
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
