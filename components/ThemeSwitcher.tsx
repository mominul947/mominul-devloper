'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Palette,
  Check,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  X,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
} from 'lucide-react'
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaThreads,
} from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'
import { useTheme, themes } from '@/context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme, currentMeta } = useTheme()
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleTheme = () => {
    setIsThemeOpen((prev) => !prev)
    if (!isThemeOpen) setIsContactOpen(false)
  }

  const toggleContact = () => {
    setIsContactOpen((prev) => !prev)
    if (!isContactOpen) setIsThemeOpen(false)
  }

  const scrollToContact = () => {
    setIsContactOpen(false)
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end gap-2 sm:gap-2.5 pointer-events-none">
      {/* ------------------------------------------------------------------ */}
      {/* 1. CONTACT POPUP MODAL                                              */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-1 p-3.5 sm:p-4 rounded-3xl bg-[#0e1015]/95 backdrop-blur-2xl border border-white/15 shadow-2xl w-[calc(100vw-28px)] max-w-[320px] sm:max-w-[340px] space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-200/70 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-stone-900 dark:text-white">
                  Direct Contact
                </span>
              </div>
              <button
                onClick={() => setIsContactOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close contact popup"
              >
                <X size={15} />
              </button>
            </div>

            {/* Channels List */}
            <div className="space-y-1.5">
              {/* WhatsApp */}
              <a
                href="https://wa.me/8801303482412"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FaWhatsapp size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      WhatsApp Chat
                    </p>
                    <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                      +880 1303 482412
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors"
                />
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+8801303482412"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-stone-200/60 dark:border-white/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      Direct Voice Call
                    </p>
                    <p className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      +880 1303 482412
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors"
                />
              </a>

              {/* Direct Email */}
              <a
                href="mailto:mominulwebwork@gmail.com"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-stone-200/60 dark:border-white/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      Direct Email
                    </p>
                    <p className="text-[10px] font-mono text-stone-500 dark:text-stone-400 truncate">
                      mominulwebwork@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors"
                />
              </a>

              {/* Fiverr Profile */}
              <a
                href="https://www.fiverr.com/s/WebEmax"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-stone-200/60 dark:border-white/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FiverrLogo size={32} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      Fiverr Profile
                    </p>
                    <p className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      fiverr.com/s/WebEmax
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mominul-islam-b02849445"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-stone-200/60 dark:border-white/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <FaLinkedinIn size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      LinkedIn
                    </p>
                    <p className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      Professional Network
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors"
                />
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="pt-1 flex items-center justify-between border-t border-stone-200/60 dark:border-white/10">
              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold">
                Socials
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://www.facebook.com/md.mominul.islam.80070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={12} />
                </a>
                <a
                  href="https://www.instagram.com/mominul______29?cplk=NnozeWY1aDVlMXBv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-[#E4405F]/15 text-[#E4405F] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Instagram"
                >
                  <FaInstagram size={13} />
                </a>
                <a
                  href="https://www.threads.com/@mominul______29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-white/15 text-stone-900 dark:text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Threads"
                >
                  <FaThreads size={12} />
                </a>
              </div>
            </div>

            {/* Message Form Jump Button */}
            <button
              onClick={scrollToContact}
              className="w-full py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
            >
              <span>SEND A DETAILED MESSAGE</span>
              <ArrowUpRight size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* 2. THEME SELECTION MODAL                                            */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {isThemeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-1 p-3.5 rounded-3xl bg-[#0e1015]/95 backdrop-blur-2xl border border-white/15 shadow-2xl w-[calc(100vw-28px)] max-w-[280px] space-y-2"
          >
            <div className="px-2 py-1 border-b border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-bold flex items-center gap-1.5">
                <Palette size={13} />
                <span>CHOOSE DESIGN THEME</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-stone-300">
                5 THEMES
              </span>
            </div>

            <div className="space-y-1 pt-1">
              {themes.map((t) => {
                const isSelected = theme === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id)
                      setIsThemeOpen(false)
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/15 text-white font-bold shadow-xs'
                        : 'hover:bg-white/5 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-full border border-white/20 shadow-xs flex items-center justify-center flex-shrink-0"
                        style={{ background: t.primaryColor }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: t.accentColor }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold leading-tight text-white">{t.name}</p>
                        <p className="text-[10px] font-mono opacity-60 leading-tight mt-0.5 text-stone-400">
                          {t.label}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check size={15} className="text-emerald-400" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SCROLL TO TOP BUTTON (Appears when scrolling down)               */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="pointer-events-auto flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#12141a]/95 backdrop-blur-xl border border-white/20 text-white shadow-xl hover:shadow-2xl hover:border-emerald-500/60 hover:text-emerald-400 transition-all cursor-pointer group"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={16} className="sm:w-[18px] sm:h-[18px] group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* 4. THEME TOGGLE ICON BUTTON (Compact & Sleek Icon)                 */}
      {/* ------------------------------------------------------------------ */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTheme}
        className="pointer-events-auto relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#12141a]/95 backdrop-blur-xl border border-white/20 text-white shadow-xl hover:shadow-2xl hover:border-emerald-500/60 transition-all cursor-pointer group"
        title={`Theme: ${currentMeta.name}`}
        aria-label="Toggle theme selector"
      >
        <Palette size={16} className="sm:w-[18px] sm:h-[18px] group-hover:rotate-12 transition-transform" />
        
        {/* Active Theme Color Dot Indicator */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-[#12141a] shadow-xs"
          style={{ backgroundColor: currentMeta.accentColor }}
        />

        {/* Hover Tooltip on Desktop */}
        <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-white font-mono text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
          Theme: {currentMeta.name}
        </span>
      </motion.button>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FLOATING CONTACT BUTTON (Opens all contact options)              */}
      {/* ------------------------------------------------------------------ */}
      <motion.button
        onClick={toggleContact}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto relative group flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-xl shadow-emerald-500/30 transition-all cursor-pointer"
        aria-label="Open contact channels"
      >
        {/* Animated Live Dot */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 animate-ping opacity-75 pointer-events-none" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-300 border-2 border-stone-950" />

        <span className="relative z-10">
          {isContactOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          ) : (
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          )}
        </span>

        {/* Floating Tooltip for Desktop */}
        {!isContactOpen && (
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-white font-mono text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
            Contact Me
          </span>
        )}
      </motion.button>
    </div>
  )
}
