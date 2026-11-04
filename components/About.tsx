'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getExperience } from '@/utils/experience'
import DhakaTime from '@/components/DhakaTime'
import { useLanguage } from '@/context/LanguageContext'
import {
  Quote,
  CheckCircle2,
  MapPin,
  Smartphone,
  Server,
  Zap,
  Sparkles,
  ArrowUpRight,
  Laptop,
} from 'lucide-react'
import FiverrLogo from '@/components/FiverrLogo'

export default function About() {
  const exp = getExperience()
  const { language, t } = useLanguage()

  return (
    <section id="about" className="py-14 sm:py-24 theme-main-bg theme-text-main border-t theme-border relative overflow-hidden">
      
      {/* Subtle decorative glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24 relative z-10">
        {/* Section 1: Developer Spotlight Card & Personal Bio                */}
        {/* ================================================================== */}
        <div>
          {/* Top Section Header with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="border-b theme-border pb-4 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-3"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.about.badge}</span>
              </p>
              <h2 className="font-billboard text-3xl xs:text-4xl sm:text-6xl theme-text-main tracking-wide">
                {language === 'bn' ? 'মোঃ মোমিনুল ইসলাম' : 'ABOUT MD. MOMINUL ISLAM'}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono theme-text-muted">
              <DhakaTime />
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="theme-text-accent flex-shrink-0" />
                <span>{t.hero.location}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Framed Portrait Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="md:col-span-5 relative"
            >
              <div
                className="relative max-w-[300px] xs:max-w-[320px] sm:max-w-sm mx-auto md:max-w-none aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 group"
                style={{
                  border: '1.5px solid var(--portrait-border)',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                <Image
                  src="/images/Approachable Young Man in Glasses.png"
                  alt="Md. Mominul Islam - Full-Stack & Mobile Architect"
                  fill sizes="(max-width: 768px) 100vw, 450px"
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
                  }}
                />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/20 text-white shadow-xl flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-sm font-bold tracking-wide text-white truncate">
                      Md. Mominul Islam
                    </p>
                    <p className="text-[10px] text-white/70 font-mono flex items-center gap-1 mt-0.5 truncate">
                      <MapPin size={11} className="text-emerald-400 flex-shrink-0" />
                      <span className="truncate">Bogura Sadar, Bogura</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{language === 'bn' ? 'সক্রিয়' : 'AVAILABLE'}</span>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 p-3.5 rounded-2xl border theme-border flex items-center justify-between gap-3 text-xs font-mono"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-2">
                  <Laptop size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-[11px] theme-text-muted">
                    {language === 'bn' ? 'ল্যাব: ডুয়াল স্ক্রিন সেটআপ + ফিজিক্যাল টেস্ট ডিভাইস' : 'Dev Lab: Dual-screen setup + physical Android test devices'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                  {language === 'bn' ? 'প্রোডাকশন রেডি' : 'REAL HARDWARE'}
                </span>
              </div>
            </motion.div>

            {/* Right: Detailed Biography & Engineering Value (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="md:col-span-7 space-y-6"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>{language === 'bn' ? 'দক্ষতা ও পেশাদারিত্ব' : 'HAND-CRAFTED ENGINEERING & APPS'}</span>
                </span>
                
                <h3 className="font-billboard text-2xl sm:text-4xl xl:text-5xl theme-text-main leading-[1.05]">
                  {t.about.heading}
                </h3>

                <p className="text-sm sm:text-base theme-text-muted leading-relaxed font-normal pt-1">
                  {t.about.bio1}
                </p>

                <p className="text-xs sm:text-sm theme-text-muted leading-relaxed font-normal">
                  {t.about.bio2}
                </p>
              </div>

              {/* 3 Core Architecture Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Pillar 1 */}
                <div
                  className="p-4 rounded-2xl border theme-border space-y-2 group transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Smartphone size={18} />
                  </div>
                  <p className="text-xs font-bold font-mono theme-text-main uppercase">
                    {language === 'bn' ? 'মোবাইল অ্যাপস' : 'MOBILE APPS'}
                  </p>
                  <p className="text-[11px] theme-text-muted leading-relaxed">
                    {language === 'bn' ? '৬০ এফপিএস স্মুথ পারফরম্যান্স Flutter ও Kotlin দিয়ে বাস্তব ডিভাইসে টেস্ট করা।' : '60fps Flutter & Kotlin builds verified on physical devices with low memory footprint.'}
                  </p>
                </div>

                {/* Pillar 2 */}
                <div
                  className="p-4 rounded-2xl border theme-border space-y-2 group transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Server size={18} />
                  </div>
                  <p className="text-xs font-bold font-mono theme-text-main uppercase">
                    {language === 'bn' ? 'ক্লাউড ও ব্যাকএন্ড' : 'BACKEND & VPS'}
                  </p>
                  <p className="text-[11px] theme-text-muted leading-relaxed">
                    {language === 'bn' ? 'Laravel, Node.js ও Golang এপিআই—Nginx SSL ও লিনাক্স ভিপিএস সার্ভারে সুরক্ষিত।' : 'Laravel, Node.js & Golang APIs secured behind Nginx SSL on dedicated Linux servers.'}
                  </p>
                </div>

                {/* Pillar 3 */}
                <div
                  className="p-4 rounded-2xl border theme-border space-y-2 group transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Zap size={18} />
                  </div>
                  <p className="text-xs font-bold font-mono theme-text-main uppercase">
                    {language === 'bn' ? 'পেমেন্ট গেটওয়ে' : 'PAYMENT FUNNELS'}
                  </p>
                  <p className="text-[11px] theme-text-muted leading-relaxed">
                    {language === 'bn' ? 'বিকাশ, নগদ ও ব্যাংক পেমেন্ট ভেরিফিকেশন এবং অ্যাডমিন রিয়েল-টাইম ট্র্যাকিং।' : 'Integrated bKash, Nagad & Bank payment verification with real-time admin dispatch.'}
                  </p>
                </div>
              </div>

              {/* Quote Card */}
              <div
                className="p-5 sm:p-6 rounded-2xl border theme-border relative overflow-hidden shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <Quote size={32} className="theme-text-accent opacity-15 absolute top-3 right-4 pointer-events-none" />
                
                <p className="font-serif-italic text-sm sm:text-base theme-text-main leading-relaxed pr-6">
                  {language === 'bn'
                    ? '“ভালো সফটওয়্যার কখনো কৃত্রিম ফাঁকা কথায় তৈরি হয় না — ব্যবহারকারীর বাস্তব অভিজ্ঞতা ও মজবুত আর্কিটেকচার মাথায় রেখে প্রতিটি লাইন নিখুঁতভাবে কোড করতে হয়।”'
                    : '“Great software isn\'t generated by prompts — it is crafted line-by-line with genuine empathy for user experience and rock-solid architecture.”'}
                </p>

                <div className="pt-3 border-t theme-border mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <p className="font-serif-italic text-lg sm:text-xl theme-text-accent font-semibold tracking-wide">
                      Md. Mominul Islam
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-wider theme-text-muted">
                      Full-Stack &amp; Mobile Architect • Bogura, BD
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 size={13} />
                      <span>DIRECT DEVELOPER</span>
                    </span>

                    <a
                      href="https://www.fiverr.com/s/WebEmax"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border theme-border hover:border-emerald-500 text-[11px] font-mono font-bold transition-all shadow-xs"
                      aria-label="View Fiverr Profile"
                    >
                      <FiverrLogo size={16} />
                      <span className="theme-text-main font-semibold">Fiverr</span>
                      <ArrowUpRight size={11} className="theme-text-muted" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ================================================================== */}
        </div>
    </section>
  )
}
