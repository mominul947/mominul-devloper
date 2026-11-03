'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, CreditCard } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { language, toggleLanguage, t } = useLanguage()

  const navItems = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.apps, href: '#apps' },
    { label: t.nav.website, href: '#website' },
    { label: t.nav.services, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = ['hero', 'about', 'apps', 'website', 'projects', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full neu-card flex items-center justify-between shadow-lg gap-2">
          
          {/* Brand Seal Monogram */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer flex-shrink-0"
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 flex-shrink-0 shadow-sm border-2"
              style={{ borderColor: 'var(--accent)' }}
            >
              <img
                src="/images/hero-portrait-01.png"
                alt="Md. Mominul Islam"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold tracking-wider theme-text-main truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none">
                Md. Mominul Islam
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase theme-text-muted truncate">
                {t.nav.role}
              </p>
            </div>
          </button>

          {/* Center Navigation Links (Visible on large screens) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-mono tracking-wider uppercase flex-shrink-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative py-1.5 px-2.5 xl:px-3 rounded-full transition-all cursor-pointer font-semibold whitespace-nowrap"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'var(--accent-subtle)' : 'transparent',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Online Payment Link (Navigates to /pay Payment Gateway) */}
            <Link
              href="/pay"
              className="px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:text-black transition-all font-bold shadow-xs whitespace-nowrap flex-shrink-0 group cursor-pointer"
            >
              <CreditCard size={14} className="flex-shrink-0 text-emerald-500 group-hover:text-current group-hover:scale-110 transition-transform" />
              <span>{t.nav.payOnline}</span>
            </Link>

            <a
              href="https://www.fiverr.com/s/WebEmax"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border theme-border hover:bg-white/80 dark:hover:bg-white/10 transition-all font-bold whitespace-nowrap flex-shrink-0"
            >
              <FiverrLogo size={16} />
              <span>Fiverr</span>
              <ArrowUpRight size={11} />
            </a>

            <button
              onClick={() => scrollTo('#contact')}
              className="hidden xl:flex px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider cursor-pointer bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-md items-center gap-1.5 whitespace-nowrap flex-shrink-0"
            >
              <span>{t.nav.letsTalk}</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          {/* Mobile Right Bar: Language Switcher, Pay Link & Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 xs:gap-2 flex-shrink-0">
            <Link
              href="/pay"
              className="sm:hidden px-2.5 py-1 rounded-full text-[11px] font-mono flex items-center gap-1 border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap"
            >
              <CreditCard size={12} className="text-emerald-500" />
              <span>PAY</span>
            </Link>

            <button
              className="p-2 rounded-full border theme-border cursor-pointer transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Slide Down Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 sm:inset-x-4 top-18 z-50 p-5 rounded-3xl border lg:hidden shadow-2xl space-y-4 max-h-[calc(100vh-90px)] overflow-y-auto"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollTo(item.href)}
                      className="text-left py-2.5 px-3.5 rounded-xl text-xs font-mono uppercase transition-colors flex items-center justify-between"
                      style={{
                        backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                        color: isActive ? 'var(--accent)' : 'var(--text-main)',
                        fontWeight: isActive ? 700 : 500,
                      }}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="pt-3 border-t theme-border flex flex-col gap-2.5">
                <Link
                  href="/pay"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 rounded-full text-center text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 font-bold shadow-md transition-colors"
                >
                  <CreditCard size={16} />
                  <span>{t.nav.payOnline}</span>
                  <ArrowUpRight size={13} />
                </Link>

                <a
                  href="https://www.fiverr.com/s/WebEmax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-center text-xs font-mono btn-theme-secondary flex items-center justify-center gap-2 font-bold"
                >
                  <FiverrLogo size={20} />
                  <span>Order on Fiverr</span>
                  <ArrowUpRight size={13} />
                </a>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-theme-primary w-full py-3 rounded-full text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  {t.nav.letsTalk}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
