'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, MapPin, Sparkles, ArrowUpRight, Mail, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaThreads, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'
import Image from 'next/image'
import { getExperience, useLiveExperience } from '@/utils/experience'

import DhakaTime from '@/components/DhakaTime'
import { useLanguage } from '@/context/LanguageContext'

const portraits = [
  {
    src: '/images/hero-portrait-01.png',
    title: 'Lead Executive Portrait',
    label: '01',
  },
  {
    src: '/images/Approachable Young Man in Glasses.png',
    title: 'Approachable View',
    label: '02',
  },
]

export default function Hero() {
  const [activePhoto, setActivePhoto] = useState(0)
  const liveExp = useLiveExperience()
  const { t, language } = useLanguage()

  const stats = [
    { value: liveExp.yearsFormatted, label: t.hero.yearsExp, live: true },
    { value: '50+', label: t.hero.projectsCount, live: false },
    { value: '25+', label: t.hero.clientsCount, live: false },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-0 sm:min-h-screen pt-20 sm:pt-28 pb-10 sm:pb-16 overflow-hidden theme-main-bg theme-text-main">
      
      {/* Top Banner Subhead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 sm:mb-8 flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-widest uppercase border-b theme-border pb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span className="font-bold theme-text-accent truncate">
            {t.hero.roleBadge}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 theme-text-muted">
          <DhakaTime />
          <span className="opacity-40">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="theme-text-accent" />
            <span>{t.hero.availableBadge}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        
        {/* Massive Background Billboard Typography ("PORTFOLIO") - Clearly Visible Behind Cutout */}
        <div className="absolute top-[18%] sm:top-[24%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen text-center pointer-events-none select-none z-0 overflow-hidden">
          <h1
            className="font-billboard text-[24vw] sm:text-[20vw] lg:text-[18.5vw] leading-none tracking-tight font-black whitespace-nowrap transition-colors duration-300"
            style={{
              color: 'var(--billboard-color)',
              opacity: 'var(--billboard-opacity)',
            }}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE & TABLET LAYOUT (< lg): Left Text + Right Framed Image      */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:hidden space-y-5 relative z-10">
          
          {/* Row 1: Split Header (Left: Name & Actions, Right: Transparent Card with Border) */}
          <div className="grid grid-cols-12 gap-3 items-center">
            
            {/* Left Column (7 cols): Name, Subtitle, Location & Compact Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="col-span-7 space-y-2 pr-1"
            >
              <p className="font-serif-italic text-lg xs:text-xl theme-text-accent tracking-wide">
                Hello, I&apos;m
              </p>
              <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide leading-[0.9]">
                MOMINUL<br />
                <span className="theme-text-accent">ISLAM</span>
              </h2>
              <p className="text-[9px] xs:text-[10px] font-bold tracking-wider theme-text-accent font-mono uppercase">
                {t.nav.role}
              </p>

              {/* Location Tag */}
              <div className="flex items-center gap-1.5 text-[9px] xs:text-[10px] font-mono uppercase tracking-wider">
                <MapPin size={11} className="theme-text-accent flex-shrink-0" />
                <span className="font-semibold theme-text-main truncate">{t.hero.location}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row gap-1.5 pt-1.5">
                <button
                  onClick={() => scrollTo('apps')}
                  className="btn-theme-primary px-3 py-2 rounded-xl text-[10px] xs:text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1 cursor-pointer shadow-md"
                >
                  <span>{language === 'bn' ? 'প্রজেক্ট' : 'Works'}</span>
                  <ArrowUpRight size={12} />
                </button>

                <a
                  href="https://www.fiverr.com/s/WebEmax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-theme-secondary px-2.5 py-2 rounded-xl text-[10px] xs:text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <FiverrLogo size={18} />
                  <span>Fiverr</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column (5 cols): Portrait with Border & 100% Transparent Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="col-span-5 flex flex-col items-center justify-center relative"
            >
              <div
                className="relative w-full aspect-[3/4] max-w-[185px] xs:max-w-[215px] mx-auto flex items-end justify-center rounded-2xl overflow-hidden"
                style={{
                  border: '1.5px solid var(--portrait-border)',
                  backgroundColor: 'transparent',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={portraits[activePhoto].src}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={portraits[activePhoto].src}
                      alt="Md. Mominul Islam"
                      fill
                      priority
                      sizes="(max-width: 640px) 215px, (max-width: 1024px) 280px, 350px"
                      className={`object-contain object-bottom drop-shadow-md transition-transform duration-500 ${
                        activePhoto === 0 ? 'scale-[1.18] origin-bottom' : 'scale-100'
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Photo Switcher Pills (01, 02) */}
              <div className="flex items-center gap-1.5 mt-2.5">
                {portraits.map((p, idx) => (
                  <button
                    key={p.title}
                    onClick={() => setActivePhoto(idx)}
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer border shadow-xs"
                    style={{
                      backgroundColor: activePhoto === idx ? 'var(--accent)' : 'var(--bg-card)',
                      color: activePhoto === idx ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                      borderColor: activePhoto === idx ? 'var(--accent)' : 'var(--border-subtle)',
                      fontWeight: activePhoto === idx ? 700 : 500,
                    }}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2: Bio Description */}
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed font-normal">
            Engineering high-performance mobile applications (Flutter, Kotlin, React Native), scalable backends (Laravel, Node.js, Golang, Python, MongoDB), Next.js platforms, and Linux VPS cloud hosting.
          </p>

          {/* Row 3: Stats Row (3 Columns Side-by-Side) */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl border theme-border text-center flex flex-col justify-center"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <p className="font-billboard text-2xl xs:text-3xl theme-text-accent tracking-tight leading-none font-bold">
                  {stat.value}
                </p>
                <p className="text-[9px] xs:text-[10px] font-mono uppercase tracking-wider theme-text-main mt-1 flex items-center justify-center gap-1">
                  <span>{stat.label}</span>
                  {stat.live && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  )}
                </p>
                {stat.live && (
                  <p className="text-[9px] font-mono text-emerald-500 font-bold tracking-tight mt-0.5">
                    {liveExp.days}d {liveExp.timeFormatted}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Row 4: Direct Quick Contact Channels (Bigger, Beautiful & High Converting) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider theme-text-muted">
              <span className="font-bold flex items-center gap-1.5 theme-text-main">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>QUICK CONTACT CHANNELS</span>
              </span>
              <span className="text-[10px] theme-text-accent font-semibold">DIRECT REACH</span>
            </div>

            {/* Prominent Quick Contact Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/8801303482412"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border theme-border flex items-center justify-between group transition-all hover:scale-[1.02] shadow-xs cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <FaWhatsapp size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase theme-text-muted">WhatsApp / Call</p>
                    <p className="text-xs font-bold theme-text-main truncate">+880 1303 482412</p>
                  </div>
                </div>
                <ArrowUpRight size={15} className="theme-text-muted group-hover:theme-text-main transition-colors flex-shrink-0" />
              </a>

              {/* Email Card */}
              <a
                href="mailto:mominulwebwork@gmail.com"
                className="p-3.5 rounded-2xl border theme-border flex items-center justify-between group transition-all hover:scale-[1.02] shadow-xs cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <Mail size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase theme-text-muted">Direct Email</p>
                    <p className="text-xs font-bold theme-text-main truncate">mominulwebwork@gmail.com</p>
                  </div>
                </div>
                <ArrowUpRight size={15} className="theme-text-muted group-hover:theme-text-main transition-colors flex-shrink-0" />
              </a>

            </div>

            {/* Social Network Row & Scroll Indicator */}
            <div className="p-3 rounded-2xl border theme-border flex items-center justify-between" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider theme-text-muted font-bold mr-1 hidden xs:inline">
                  NETWORKS:
                </span>
                {[
                  { icon: FaWhatsapp, href: 'https://wa.me/8801303482412', label: 'WhatsApp', color: 'hover:text-emerald-500' },
                  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/mominul-islam-b02849445', label: 'LinkedIn', color: 'hover:text-sky-600' },
                  { icon: FaFacebookF, href: 'https://www.facebook.com/md.mominul.islam.80070', label: 'Facebook', color: 'hover:text-blue-600' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/mominul______29?cplk=NnozeWY1aDVlMXBv', label: 'Instagram', color: 'hover:text-pink-600' },
                  { icon: FaThreads, href: 'https://www.threads.com/@mominul______29', label: 'Threads', color: 'hover:text-black dark:hover:text-white' },
                ].map((soc) => {
                  const Icon = soc.icon
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-xl border theme-border flex items-center justify-center theme-text-muted hover:theme-text-main hover:scale-110 transition-all ${soc.color}`}
                      style={{ backgroundColor: 'var(--bg-surface)' }}
                      aria-label={soc.label}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>

              <button
                onClick={() => scrollTo('apps')}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono theme-text-muted hover:theme-text-accent transition-colors uppercase tracking-widest cursor-pointer pl-2"
              >
                <span>Scroll</span>
                <ArrowDown size={12} className="theme-text-accent animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP LAYOUT (lg:): 3-Column Billboard Showcase                  */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column (4 cols): Name, Bio, Location, Buttons & Socials */}
          <div className="lg:col-span-4 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="space-y-1"
            >
              <p className="font-serif-italic text-3xl theme-text-accent tracking-wide">
                Hello, I&apos;m
              </p>
              <h2 className="font-billboard text-7xl xl:text-8xl theme-text-main tracking-wide leading-[0.9]">
                MOMINUL<br />
                <span className="theme-text-accent">ISLAM</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm font-bold tracking-widest theme-text-accent font-mono uppercase">
                {t.hero.title1} {t.hero.title2}
              </p>
              <p className="text-sm theme-text-muted leading-relaxed font-normal">
                {t.hero.bio}
              </p>

              {/* Location Tag */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider pt-1">
                <MapPin size={14} className="theme-text-accent flex-shrink-0" />
                <span className="font-semibold theme-text-main">{t.hero.location}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex items-center gap-3 pt-2"
            >
              <button
                onClick={() => scrollTo('apps')}
                className="btn-theme-primary px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{t.hero.viewWork}</span>
                <ArrowUpRight size={14} />
              </button>

              <a
                href="https://www.fiverr.com/s/WebEmax"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-theme-secondary px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <FiverrLogo size={22} />
                <span>Hire on Fiverr</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex items-center gap-2.5 pt-2"
            >
              {[
                { icon: FaWhatsapp, href: 'https://wa.me/8801303482412', label: 'WhatsApp' },
                { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/mominul-islam-b02849445', label: 'LinkedIn' },
                { icon: FaFacebookF, href: 'https://www.facebook.com/md.mominul.islam.80070', label: 'Facebook' },
                { icon: FaInstagram, href: 'https://www.instagram.com/mominul______29?cplk=NnozeWY1aDVlMXBv', label: 'Instagram' },
                { icon: FaThreads, href: 'https://www.threads.com/@mominul______29', label: 'Threads' },
              ].map((soc) => {
                const Icon = soc.icon
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border theme-border flex items-center justify-center theme-text-muted hover:theme-text-main transition-all"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                    aria-label={soc.label}
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </motion.div>
          </div>

          {/* Center Column (4 cols): Framed Portrait Card with Border & 100% Transparent Background */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative my-0 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[360px] aspect-[3/4] mx-auto flex items-end justify-center rounded-[28px] overflow-hidden shadow-2xl transition-all duration-300"
              style={{
                border: '1.5px solid var(--portrait-border)',
                backgroundColor: 'transparent',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={portraits[activePhoto].src}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={portraits[activePhoto].src}
                    alt="Md. Mominul Islam"
                    fill
                    priority
                    sizes="(max-width: 1280px) 420px, 480px"
                    className={`object-contain object-bottom drop-shadow-2xl transition-transform duration-500 ${
                      activePhoto === 0 ? 'scale-[1.18] origin-bottom' : 'scale-100'
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Live Badge (Docked Bottom of Card) */}
              <div
                className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl backdrop-blur-md border shadow-xl"
                style={{
                  backgroundColor: 'rgba(10, 10, 14, 0.9)',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                }}
              >
                <span className="text-[11px] font-mono text-white font-bold tracking-wider truncate">
                  Md. Mominul Islam
                </span>
                <span
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded-md font-bold uppercase flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--btn-primary-text)',
                  }}
                >
                  DEVELOPER
                </span>
              </div>
            </motion.div>

            {/* Photo Switcher Pills (Only 01 & 02) */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] font-mono theme-text-muted">VIEW:</span>
              {portraits.map((p, idx) => (
                <button
                  key={p.title}
                  onClick={() => setActivePhoto(idx)}
                  className="px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border shadow-xs"
                  style={{
                    backgroundColor: activePhoto === idx ? 'var(--accent)' : 'var(--bg-card)',
                    color: activePhoto === idx ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                    borderColor: activePhoto === idx ? 'var(--accent)' : 'var(--border-subtle)',
                    fontWeight: activePhoto === idx ? 700 : 500,
                  }}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Key Stats & Statement */}
          <div className="lg:col-span-4 text-right space-y-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-end gap-2 theme-text-accent font-mono text-xs">
                <Sparkles size={12} />
                <span className="uppercase tracking-widest theme-text-muted">STATEMENT</span>
              </div>
              <p className="text-sm theme-text-muted leading-relaxed max-w-xs ml-auto">
                Turning complex business requirements into powerful, high-converting digital applications.
              </p>
            </motion.div>

            {/* Stats: Vertical Stack on Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6 pt-2"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="border-b theme-border pb-4 last:border-b-0 text-right"
                >
                  <p className="font-billboard text-5xl xl:text-6xl theme-text-accent tracking-tight leading-none font-bold">
                    {stat.value}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest theme-text-main mt-1 flex items-center justify-end gap-1.5">
                    <span>{stat.label}</span>
                    {stat.live && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" title="Auto-updating live experience" />
                    )}
                  </p>
                  {stat.live && (
                    <p className="text-xs font-mono text-emerald-500 font-bold tracking-wider mt-1">
                      {liveExp.days} Days • {liveExp.timeFormatted}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <div className="pt-2 text-right">
              <button
                onClick={() => scrollTo('apps')}
                className="inline-flex items-center gap-2 text-xs font-mono theme-text-muted hover:theme-text-accent transition-colors uppercase tracking-widest cursor-pointer"
              >
                <span>Scroll to Explore</span>
                <ArrowDown size={14} className="theme-text-accent animate-bounce" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
