'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  Sparkles,
  Maximize2,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react'
import FiverrLogo from '@/components/FiverrLogo'
import { useLanguage } from '@/context/LanguageContext'
import { appBanners, AppBanner } from '@/components/AppBannerShowcase'

export default function AppsPage() {
  const [activeFilter, setActiveFilter] = useState<AppBanner['filterTag']>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [zoomedBanner, setZoomedBanner] = useState<AppBanner | null>(null)
  const { language } = useLanguage()

  const filterTabs = useMemo(() => [
    { id: 'all', label: 'All Apps', labelBn: 'সবগুলো অ্যাপস', count: appBanners.length },
    { id: 'food', label: 'Food & Dining', labelBn: 'ফুড ও ডাইনিং', count: 2 },
    { id: 'iot', label: 'IoT & CleanTech', labelBn: 'স্মার্ট আইওটি ও ক্লিনটেক', count: 2 },
    { id: 'health', label: 'Health & Wellness', labelBn: 'স্বাস্থ্য ও ওয়েলনেস', count: 2 },
    { id: 'enterprise', label: 'Enterprise & SaaS', labelBn: 'এন্টারপ্রাইজ ও ড্যাশবোর্ড', count: 2 },
    { id: 'services', label: 'Services & Commerce', labelBn: 'সার্ভিসেস ও কমার্স', count: 4 },
    { id: 'ai-social', label: 'AI & Social', labelBn: 'এআই ও সোশ্যাল', count: 2 },
  ], [])

  const filteredBanners = useMemo(() => {
    return appBanners.filter((banner) => {
      const matchesFilter = activeFilter === 'all' || banner.filterTag === activeFilter
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesFilter

      const matchesSearch =
        banner.title.toLowerCase().includes(query) ||
        banner.titleBn.toLowerCase().includes(query) ||
        banner.category.toLowerCase().includes(query) ||
        banner.categoryBn.toLowerCase().includes(query) ||
        banner.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
        banner.tagline.toLowerCase().includes(query)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchQuery])

  // Lightbox keyboard navigation
  const handlePrevLightbox = useCallback(() => {
    if (!zoomedBanner) return
    const curIdx = appBanners.findIndex((b) => b.id === zoomedBanner.id)
    const prevIdx = (curIdx - 1 + appBanners.length) % appBanners.length
    setZoomedBanner(appBanners[prevIdx])
  }, [zoomedBanner])

  const handleNextLightbox = useCallback(() => {
    if (!zoomedBanner) return
    const curIdx = appBanners.findIndex((b) => b.id === zoomedBanner.id)
    const nextIdx = (curIdx + 1) % appBanners.length
    setZoomedBanner(appBanners[nextIdx])
  }, [zoomedBanner])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!zoomedBanner) return
      if (e.key === 'Escape') setZoomedBanner(null)
      if (e.key === 'ArrowLeft') handlePrevLightbox()
      if (e.key === 'ArrowRight') handleNextLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [zoomedBanner, handlePrevLightbox, handleNextLightbox])

  return (
    <div className="min-h-screen theme-main-bg theme-text-main flex flex-col">
      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b theme-border px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border bg-white/5 hover:bg-emerald-500 hover:text-black transition-all text-xs font-mono font-bold"
            >
              <ArrowLeft size={14} />
              <span>{language === 'bn' ? 'পোর্টফোলিওতে ফিরে যান' : 'Back to Portfolio'}</span>
            </Link>

            <span className="hidden sm:inline text-xs font-mono theme-text-muted">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>apps.mominul.dev</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.fiverr.com/s/WebEmax"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full btn-theme-primary font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold shadow-md cursor-pointer"
            >
              <FiverrLogo size={13} />
              <span className="hidden xs:inline">Order on Fiverr</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Page Hero Header */}
        <div className="border-b theme-border pb-8 mb-8 sm:mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2 flex items-center gap-2">
            <Layers size={14} />
            <span>
              {language === 'bn'
                ? 'প্রোডাকশন অ্যাপস ও আর্কিটেকচার সমাহার'
                : 'PRODUCTION APPS & ARCHITECTURE DELIVERABLES'}
            </span>
          </p>

          <h1 className="font-billboard text-3xl sm:text-4xl lg:text-5xl theme-text-main tracking-wide">
            {language === 'bn'
              ? 'সকল ফিচার্ড মোবাইল অ্যাপস ও ড্যাশবোর্ড'
              : 'ALL FEATURED MOBILE APPS & PLATFORMS'}
          </h1>

          <p className="text-sm sm:text-base theme-text-muted mt-2 max-w-3xl leading-relaxed">
            {language === 'bn'
              ? 'দেশি-বিদেশি ক্লায়েন্ট ও বাণিজ্যিক প্রজেক্টের জন্য নির্মিত ১৪টি হাই-রেজোলিউশন প্রোডাকশন অ্যাপ ও সিস্টেম আর্কিটেকচার।'
              : 'Curated collection of 14 high-resolution production applications, system interfaces, and architecture deliverables engineered for high-concurrency client environments.'}
          </p>

          {/* Search Bar & Quick Counters */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'অ্যাপের নাম, ক্যাটাগরি বা টেক স্ট্যাক খুঁজুন...'
                    : 'Search app name, category, or tech stack...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border theme-border bg-black/20 text-xs sm:text-sm theme-text-main focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>
                  {filteredBanners.length} {language === 'bn' ? 'টি অ্যাপ প্রদর্শিত' : 'Apps Shown'}
                </span>
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1 scrollbar-none select-none max-w-full">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as AppBanner['filterTag'])}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
                      : 'border theme-border theme-text-muted hover:theme-text-main bg-black/5 dark:bg-white/5 hover:border-emerald-500/40'
                  }`}
                >
                  <span>{language === 'bn' ? tab.labelBn : tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-black/20 text-slate-950' : 'bg-emerald-500/15 text-emerald-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Apps Grid */}
        {filteredBanners.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Filter size={36} className="text-stone-500 mb-3" />
            <h3 className="font-billboard text-xl theme-text-main">
              {language === 'bn' ? 'কোনো অ্যাপ খুঁজে পাওয়া যায়নি' : 'No Apps Found'}
            </h3>
            <p className="text-xs theme-text-muted mt-1">
              {language === 'bn' ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা সার্চ ক্লিয়ার করুন' : 'Try clearing your search query or choosing another category filter'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredBanners.map((banner, idx) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                className="flex flex-col rounded-3xl border theme-border hover:border-emerald-500/50 transition-all duration-300 shadow-xl overflow-hidden relative group"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {/* Accent ambient glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: banner.accent }}
                />

                {/* Banner Image Container */}
                <div
                  className="relative w-full aspect-[16/10] bg-black/40 cursor-zoom-in overflow-hidden select-none"
                  onClick={() => setZoomedBanner(banner)}
                  title="Click to Zoom Fullscreen"
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority={idx < 4}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category & Deliverable Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{language === 'bn' ? banner.categoryBn : banner.category}</span>
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-black/70 backdrop-blur-md text-stone-200 border border-white/15 shadow-md truncate max-w-[150px]">
                      {language === 'bn' ? banner.deliverableBn : banner.deliverable}
                    </span>
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-xs font-mono text-white flex items-center gap-2 border border-white/20 shadow-xl">
                      <Maximize2 size={13} className="text-emerald-400" />
                      <span>{language === 'bn' ? 'বড় করে দেখুন' : 'Click to Zoom'}</span>
                    </span>
                  </div>
                </div>

                {/* Banner Content Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-billboard text-xl lg:text-2xl theme-text-main leading-tight tracking-wide mb-1.5 group-hover:text-emerald-400 transition-colors">
                    {language === 'bn' ? banner.titleBn : banner.title}
                  </h2>

                  <p className="text-xs theme-text-muted leading-relaxed line-clamp-2 mb-3.5">
                    {language === 'bn' ? banner.taglineBn : banner.tagline}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2.5 border-t theme-border mb-3.5 flex-1">
                    {(language === 'bn' ? banner.highlightsBn : banner.highlights).slice(0, 3).map((feat, fIdx) => (
                      <p key={fIdx} className="text-[11px] theme-text-muted leading-snug flex items-start gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </p>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {banner.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono border theme-border bg-black/5 dark:bg-white/5 theme-text-muted font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t theme-border">
                    <button
                      onClick={() => setZoomedBanner(banner)}
                      className="py-2.5 rounded-xl btn-theme-secondary font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                    >
                      <Maximize2 size={12} />
                      <span>{language === 'bn' ? 'জুম ভিউ' : 'Zoom View'}</span>
                    </button>

                    <a
                      href="https://www.fiverr.com/s/WebEmax"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-xl btn-theme-primary font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 font-bold cursor-pointer shadow-md"
                    >
                      <FiverrLogo size={13} />
                      <span>{language === 'bn' ? 'অর্ডার করুন' : 'Order Build'}</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t theme-border py-8 px-4 text-center mt-auto">
        <p className="text-xs font-mono theme-text-muted">
          © {new Date().getFullYear()} Md. Mominul Islam — Mobile & Full-Stack Architect.{' '}
          <Link href="/" className="text-emerald-400 hover:underline">
            mominul.dev
          </Link>
        </p>
      </footer>

      {/* High-Resolution Banner Lightbox Modal */}
      <AnimatePresence>
        {zoomedBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setZoomedBanner(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border border-neutral-700 bg-[#09090b] shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Navigation & Title Bar */}
              <div className="px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between gap-4 bg-black/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-billboard text-base sm:text-lg text-white truncate">
                      {language === 'bn' ? zoomedBanner.titleBn : zoomedBanner.title}
                    </h4>
                    <p className="text-[10px] font-mono text-emerald-400">
                      {language === 'bn' ? zoomedBanner.categoryBn : zoomedBanner.category} • {zoomedBanner.deliverable}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[11px] font-mono text-stone-400 hidden sm:inline">
                    {appBanners.findIndex((b) => b.id === zoomedBanner.id) + 1} / {appBanners.length}
                  </span>
                  <button
                    onClick={() => setZoomedBanner(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                    title="Close (Esc)"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Banner Image Stage */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-neutral-950 flex items-center justify-center overflow-hidden">
                <Image
                  src={zoomedBanner.image}
                  alt={zoomedBanner.title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevLightbox()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-emerald-500 hover:text-black text-white border border-white/20 shadow-xl flex items-center justify-center transition-all cursor-pointer z-30"
                  title="Previous banner (Left Arrow)"
                  aria-label="Previous banner"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextLightbox()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-emerald-500 hover:text-black text-white border border-white/20 shadow-xl flex items-center justify-center transition-all cursor-pointer z-30"
                  title="Next banner (Right Arrow)"
                  aria-label="Next banner"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="px-5 py-4 border-t border-neutral-800 bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {language === 'bn' ? zoomedBanner.taglineBn : zoomedBanner.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {zoomedBanner.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-stone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-2 sm:pt-0">
                  <a
                    href="https://www.fiverr.com/s/WebEmax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl btn-theme-primary font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    <FiverrLogo size={14} />
                    <span>Order on Fiverr</span>
                    <ExternalLink size={12} />
                  </a>
                  <Link
                    href="/#contact"
                    onClick={() => setZoomedBanner(null)}
                    className="px-4 py-2 rounded-xl btn-theme-secondary font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    <span>Contact</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
