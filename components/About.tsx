'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getExperience } from '@/utils/experience'
import DhakaTime from '@/components/DhakaTime'
import { useLanguage } from '@/context/LanguageContext'
import {
  ArrowRight,
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

  const processSteps = [
    {
      num: '01',
      title: language === 'bn' ? 'আবিষ্কার ও বিশ্লেষণ' : 'DISCOVER & AUDIT',
      desc: language === 'bn'
        ? 'ক্লায়েন্টের ব্যবসায়িক লক্ষ্য, টার্গেট ইউজার এবং টেকনিক্যাল রিকোয়ারমেন্টের গভীর পর্যালোচনা।'
        : 'Deep-dive into business requirements, user audience, technical scope, and performance KPIs without assumptions.',
    },
    {
      num: '02',
      title: language === 'bn' ? 'আর্কিটেকচার ও পরিকল্পনা' : 'ARCHITECT & PLAN',
      desc: language === 'bn'
        ? 'ডাটাবেজ স্কিমা মডেলিং, REST/GraphQL এপিআই স্ট্রাকচার এবং স্কেলেবল সিস্টেমের নীল নকশা।'
        : 'Schema modeling, REST/GraphQL API contracts, responsive wireframes, and scalable component hierarchy.',
    },
    {
      num: '03',
      title: language === 'bn' ? 'ইউআই/ইউএক্স ডিজাইন' : 'DESIGN & PROTOTYPE',
      desc: language === 'bn'
        ? 'ব্যবহারকারীর জন্য সহজ ও সুন্দর ইন্টারফেস তৈরি এবং ইন্টারঅ্যাক্টিভ প্রোটোটাইপিং।'
        : 'Crafting pixel-perfect, tactile interfaces with interactive micro-animations and intuitive workflows.',
    },
    {
      num: '04',
      title: language === 'bn' ? 'ডেভেলপমেন্ট ও অপ্টিমাইজেশন' : 'DEVELOP & BENCHMARK',
      desc: language === 'bn'
        ? '৬০ এফপিএস স্মুথ মোবাইল অ্যাপস (Flutter, Kotlin) এবং উচ্চগতির সুরক্ষিত ব্যাকএন্ড নির্মাণ।'
        : 'Engineering 60fps mobile apps (Flutter, Kotlin) alongside high-throughput backends (Node.js, Laravel) and Next.js 14.',
    },
    {
      num: '05',
      title: language === 'bn' ? 'ডিপ্লয়মেন্ট ও মনিটরিং' : 'DEPLOY & SCALE',
      desc: language === 'bn'
        ? 'স্বয়ংক্রিয় CI/CD পাইপলাইন, লিনাক্স সার্ভার কনফিগারেশন, প্লে-স্টোর লঞ্চ ও সার্বক্ষণিক সার্ভার সাপোর্ট।'
        : 'Automated CI/CD pipelines, hardened Linux VPS server configuration, Google Play Store launch, and live telemetry.',
    },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="py-14 sm:py-24 theme-main-bg theme-text-main border-t theme-border relative overflow-hidden">
      
      {/* Subtle decorative glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24 relative z-10">
        
        {/* ================================================================== */}
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

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Framed Portrait Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div
                className="relative max-w-[300px] xs:max-w-[320px] sm:max-w-sm mx-auto lg:max-w-none aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 group"
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
              className="lg:col-span-7 space-y-6"
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
        {/* Section 2: SYSTEM WORK PROCESS (5 Steps)                           */}
        {/* ================================================================== */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="border-b theme-border pb-4 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-2"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1">
                {language === 'bn' ? 'কার্যপ্রণালী ও ধাপসমূহ' : 'SYSTEM WORK METHODOLOGY'}
              </p>
              <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
                {language === 'bn' ? 'যেভাবে সফল প্রোডাক্ট তৈরি করি' : 'HOW I BUILD HIGH-IMPACT PRODUCTS'}
              </h2>
            </div>
            <span className="text-xs font-mono theme-text-muted">
              {language === 'bn' ? '৫ ধাপে নিখুঁত সফটওয়্যার ডেভেলপমেন্ট' : '5-STEP PREDICTABLE ENGINEERING WORKFLOW'}
            </span>
          </motion.div>

          {/* Process Step Cards */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
            {processSteps.map((step, idx) => (
              <div
                key={step.num}
                className="w-[80vw] xs:w-[75vw] max-w-[300px] sm:w-auto sm:max-w-none flex-shrink-0 sm:flex-shrink snap-center p-4 sm:p-5 rounded-2xl border theme-border space-y-2.5 sm:space-y-3 relative group transition-all duration-300 hover:scale-[1.02] shadow-xs"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-billboard text-lg sm:text-xl flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent)',
                    }}
                  >
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono theme-text-muted sm:hidden px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border theme-border">
                    STEP {idx + 1}/5
                  </span>
                  {idx < processSteps.length - 1 && (
                    <ArrowRight size={14} className="theme-text-muted hidden lg:block opacity-60" />
                  )}
                </div>

                <p className="font-bold text-xs sm:text-sm theme-text-main tracking-wider font-mono uppercase">
                  {step.title}
                </p>

                <p className="text-xs theme-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* Section 3: Call-To-Action Banner                                   */}
        {/* ================================================================== */}
        <div
          className="rounded-3xl p-6 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl transition-all duration-300 text-center lg:text-left border"
          style={{
            backgroundColor: 'var(--banner-cta-bg)',
            color: 'var(--banner-cta-text)',
            borderColor: 'var(--portrait-border)',
          }}
        >
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif-italic text-2xl sm:text-4xl font-normal text-white">
              {language === 'bn' ? 'আসুন একসাথে দারুণ কিছু তৈরি করি।' : "Let's build something exceptional together."}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-mono">
              {language === 'bn'
                ? 'আপনার মোবাইল অ্যাপ, ব্যাকএন্ড আর্কিটেকচার বা ওয়েবসাইটকে বাস্তবে রূপ দিতে প্রস্তুত? ফ্রিল্যান্স চুক্তি ও ফুল-টাইম কাজের জন্য সর্বদা সক্রিয়।'
                : 'Ready to bring your mobile app, backend architecture, or web platform to life? Available for freelance contracts and dedicated engagements.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-stone-900 font-mono text-xs uppercase tracking-wider font-bold hover:bg-stone-100 transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <span>{language === 'bn' ? 'প্রজেক্ট আলোচনা করুন' : 'DISCUSS YOUR PROJECT'}</span>
              <ArrowUpRight size={13} />
            </button>

            <a
              href="https://wa.me/8801303482412"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/20 transition-colors text-center font-semibold"
            >
              {language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WHATSAPP CHAT'}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
