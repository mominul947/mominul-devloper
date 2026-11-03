'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Sparkles,
  Clock,
  RotateCw,
  Check,
  X,
  Terminal,
  CreditCard,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'
import CodePlayground from '@/components/CodePlayground'
import { useLanguage } from '@/context/LanguageContext'

type PackageTier = 'basic' | 'standard' | 'premium'

interface ServicePackage {
  id: PackageTier
  tabLabel: string
  title: string
  titleBn: string
  subtitle: string
  subtitleBn: string
  deliveryTime: string
  deliveryTimeBn: string
  revisions: string
  revisionsBn: string
  badge?: string
  badgeBn?: string
  included: { label: string; labelBn: string; available: boolean }[]
}

const packages: ServicePackage[] = [
  {
    id: 'basic',
    tabLabel: 'Basic',
    title: 'MVP Mobile / Web Starter',
    titleBn: 'স্টার্টার মোবাইল / ওয়েব প্যাকেজ',
    subtitle:
      'Functional 3-5 screen mobile app (Flutter / React Native) or responsive Next.js single-page application with essential UI & database integration.',
    subtitleBn:
      '৩-৫ স্ক্রিনের কার্যকর মোবাইল অ্যাপ (Flutter / React Native) অথবা রেসপনসিভ Next.js ওয়েব অ্যাপ্লিকেশন ডাটাবেজ ইন্টিগ্রেশনসহ।',
    deliveryTime: '4-6 Days Delivery',
    deliveryTimeBn: '৪-৬ দিনে ডেলিভারি',
    revisions: 'Unlimited Revisions',
    revisionsBn: 'আনলিমিটেড রিভিশন',
    included: [
      { label: 'Functional Android App (or Next.js Web)', labelBn: 'কার্যকর অ্যান্ড্রয়েড অ্যাপ (অথবা Next.js ওয়েব)', available: true },
      { label: 'Custom Modern UI/UX Implementation', labelBn: 'কাস্টম মডার্ন UI/UX ইন্টারফেস', available: true },
      { label: 'REST API & Cloud Database Connection', labelBn: 'REST API ও ক্লাউড ডাটাবেজ কানেকশন', available: true },
      { label: 'App Icon, Splash Screen & Asset Setup', labelBn: 'অ্যাপ আইকন, স্প্ল্যাশ স্ক্রিন ও অ্যাসেট সেটআপ', available: true },
      { label: 'Clean Source Code & Documentation', labelBn: 'ক্লিন সোর্স কোড ও ডকুমেন্টেশন', available: true },
      { label: 'Push Notifications & Cloud Messaging', labelBn: 'পুশ নোটিফিকেশন সার্ভিস', available: false },
      { label: 'Payment Gateway Integration', labelBn: 'অনলাইন পেমেন্ট গেটওয়ে ইন্টিগ্রেশন', available: false },
      { label: 'Production Linux VPS Server Setup', labelBn: 'প্রোডাকশন লিনাক্স VPS সার্ভার সেটআপ', available: false },
    ],
  },
  {
    id: 'standard',
    tabLabel: 'Standard',
    title: 'Production Full-Stack Application',
    titleBn: 'কমপ্লিট ফুল-স্ট্যাক প্রোডাকশন অ্যাপ',
    subtitle:
      'End-to-end commercial Android mobile application or full-stack web portal with role-based auth, REST APIs, real-time push, and database architecture.',
    subtitleBn:
      'সম্পূর্ণ কমার্শিয়াল মোবাইল অ্যাপ্লিকেশন বা ওয়েব পোর্টাল—রোল-বেসড অথেনটিকেশন, REST APIs, রিয়েল-টাইম ডাটা ও সার্ভারসহ।',
    deliveryTime: '8-12 Days Delivery',
    deliveryTimeBn: '৮-১২ দিনে ডেলিভারি',
    revisions: 'Unlimited Revisions',
    revisionsBn: 'আনলিমিটেড রিভিশন',
    badge: 'MOST POPULAR',
    badgeBn: 'সবচেয়ে জনপ্রিয়',
    included: [
      { label: 'Multi-Screen Commercial Android App', labelBn: 'মাল্টি-স্ক্রিন কমার্শিয়াল অ্যান্ড্রয়েড অ্যাপ', available: true },
      { label: 'Responsive Next.js Admin & Web Portal', labelBn: 'রেসপনসিভ Next.js অ্যাডমিন ও ওয়েব পোর্টাল', available: true },
      { label: 'Role-Based Auth (JWT, OAuth, Firebase)', labelBn: 'রোল-বেসড অথেনটিকেশন (JWT, Firebase)', available: true },
      { label: 'Real-Time Notifications & WebSockets', labelBn: 'রিয়েল-টাইম পুশ নোটিফিকেশন ও WebSockets', available: true },
      { label: 'Payment Gateway (bKash / Nagad / Stripe)', labelBn: 'পেমেন্ট গেটওয়ে (বিকাশ / নগদ / কার্ড)', available: true },
      { label: 'Production Linux VPS Deployment & Nginx', labelBn: 'লিনাক্স VPS সার্ভার ডিপ্লয়মেন্ট ও SSL', available: true },
      { label: 'Google Play Store Release & Console Support', labelBn: 'গুগল প্লে-স্টোর কনসোল রিলিজ সাপোর্ট', available: true },
      { label: 'Microservices & Enterprise Multi-Tenant', labelBn: 'এন্টারপ্রাইজ মাল্টি-টেন্যান্ট ক্লাস্টার', available: false },
    ],
  },
  {
    id: 'premium',
    tabLabel: 'Premium',
    title: 'Enterprise Scalable Ecosystem',
    titleBn: 'এন্টারপ্রাইজ কমপ্লিট ইকোসিস্টেম',
    subtitle:
      'Flagship ecosystem: Cross-platform mobile app + Next.js web portal + scalable Node.js/FastAPI backend, payment automations, and Linux VPS cloud orchestration.',
    subtitleBn:
      'মোবাইল অ্যাপ + Next.js ওয়েব পোর্টাল + হাই-থ্রুপুট ব্যাকএন্ড, পেমেন্ট অটোমেশন এবং ক্লাউড সার্ভার সহ ফুল ইকোসিস্টেম।',
    deliveryTime: '15-20 Days Delivery',
    deliveryTimeBn: '১৫-২০ দিনে ডেলিভারি',
    revisions: 'VIP Priority Support',
    revisionsBn: 'ভিআইপি প্রায়োরিটি সাপোর্ট',
    badge: 'FULL ECOSYSTEM',
    badgeBn: 'সম্পূর্ণ সিস্টেম',
    included: [
      { label: 'Cross-Platform Mobile App (Android & iOS)', labelBn: 'ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ (Android & iOS)', available: true },
      { label: 'Enterprise Next.js 14 Web Architecture', labelBn: 'এন্টারপ্রাইজ Next.js 14 ওয়েব আর্কিটেকচার', available: true },
      { label: 'High-Throughput Backend (FastAPI / Node / Go)', labelBn: 'হাই-পারফরম্যান্স ব্যাকএন্ড (FastAPI / Node / Go)', available: true },
      { label: 'Multi-Gateway Automated Payment Verification', labelBn: 'স্বয়ংক্রিয় মাল্টি-পেমেন্ট ভেরিফিকেশন', available: true },
      { label: 'Hardened Linux VPS Deployment with CI/CD', labelBn: 'সুরক্ষিত লিনাক্স VPS ডিপ্লয়মেন্ট ও CI/CD', available: true },
      { label: 'Google Play & App Store Publication Ready', labelBn: 'প্লে-স্টোর ও অ্যাপ স্টোর পাবলিকেশন সাপোর্ট', available: true },
      { label: 'Full Source Code & 30-Day VIP Warranty', labelBn: 'সম্পূর্ণ সোর্স কোড ও ৩০ দিনের ভিআইপি সাপোর্ট', available: true },
      { label: 'Direct 1-on-1 Architecture Consultation', labelBn: 'সরাসরি আর্কিটেকচার কনসালটেশন', available: true },
    ],
  },
]

export default function Projects() {
  const [activeTier, setActiveTier] = useState<PackageTier>('standard')
  const { language, t } = useLanguage()

  const currentPkg = packages.find((p) => p.id === activeTier) || packages[1]

  return (
    <section id="projects" className="py-16 sm:py-24 theme-main-bg theme-text-main border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 2-Column Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Code Playground (8 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-8 space-y-6 sm:space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b theme-border pb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest theme-text-accent mb-1 flex items-center gap-1.5 font-bold">
                  <Terminal size={13} />
                  <span>{language === 'bn' ? 'প্রোডাকশন কোড আর্কিটেকচার' : 'PRODUCTION CODE ARCHITECTURE'}</span>
                </p>
                <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
                  {language === 'bn' ? 'ডেভেলপার কনসোল' : 'DEVELOPER CONSOLE'}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.fiverr.com/s/WebEmax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono theme-text-muted hover:theme-text-main transition-colors flex items-center gap-1.5 font-bold"
                >
                  <FiverrLogo size={14} />
                  <span>{language === 'bn' ? 'ফাইভার প্রোফাইল' : 'HIRE ON FIVERR'}</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <CodePlayground />
          </motion.div>

          {/* Right Column: Service Packages (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Section Header */}
            <div className="border-b theme-border pb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>{t.services.badge}</span>
                </p>
                <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
                  {language === 'bn' ? 'প্যাকেজ সমূহ' : 'SERVICES'}
                </h2>
              </div>
            </div>

            {/* Package Card Container */}
            <div
              className="rounded-3xl border theme-border overflow-hidden shadow-xl"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              {/* 3-Tier Tabs */}
              <div className="grid grid-cols-3 border-b theme-border bg-black/5 dark:bg-white/5">
                {packages.map((pkg) => {
                  const isActive = activeTier === pkg.id
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setActiveTier(pkg.id)}
                      className={`py-3.5 text-center font-mono text-xs uppercase tracking-wider font-bold transition-all relative cursor-pointer ${
                        isActive
                          ? 'theme-text-main bg-white/60 dark:bg-white/10'
                          : 'theme-text-muted hover:theme-text-main hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{pkg.tabLabel}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Package Content Area */}
              <div className="p-5 sm:p-6 space-y-5">
                
                {/* Title & Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-billboard text-xl sm:text-2xl theme-text-main leading-tight">
                      {language === 'bn' ? currentPkg.titleBn : currentPkg.title}
                    </h3>
                    {(currentPkg.badge || currentPkg.badgeBn) && (
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 uppercase flex-shrink-0">
                        {language === 'bn' ? currentPkg.badgeBn : currentPkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs theme-text-muted leading-relaxed">
                    {language === 'bn' ? currentPkg.subtitleBn : currentPkg.subtitle}
                  </p>
                </div>

                {/* Delivery Time & Revisions Row */}
                <div className="flex flex-wrap items-center gap-3 py-2 border-y theme-border text-xs font-mono theme-text-main font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="theme-text-accent flex-shrink-0" />
                    <span>{language === 'bn' ? currentPkg.deliveryTimeBn : currentPkg.deliveryTime}</span>
                  </div>
                  <span className="opacity-30">•</span>
                  <div className="flex items-center gap-1.5">
                    <RotateCw size={14} className="theme-text-accent flex-shrink-0" />
                    <span>{language === 'bn' ? currentPkg.revisionsBn : currentPkg.revisions}</span>
                  </div>
                </div>

                {/* "What's Included" Checklist */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-mono uppercase tracking-widest theme-text-muted font-bold">
                    {language === 'bn' ? 'যা যা অন্তর্ভুক্ত রয়েছে:' : "WHAT'S INCLUDED:"}
                  </p>

                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                    {currentPkg.included.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs transition-opacity ${
                          item.available
                            ? 'theme-text-main font-medium'
                            : 'theme-text-muted line-through opacity-40'
                        }`}
                      >
                        {item.available ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={11} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-stone-500/15 text-stone-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X size={11} strokeWidth={2.5} />
                          </div>
                        )}
                        <span className="leading-snug">{language === 'bn' ? item.labelBn : item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <a
                    href="https://www.fiverr.com/s/WebEmax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-theme-primary w-full py-3.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-md group"
                  >
                    <FiverrLogo size={18} />
                    <span>{language === 'bn' ? 'ফাইভারে অর্ডার দিন' : 'Order via Fiverr'}</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <Link
                    href={`/pay?package=${encodeURIComponent(currentPkg.title)}`}
                    className="w-full py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs group"
                  >
                    <CreditCard size={16} className="text-emerald-500 group-hover:text-current" />
                    <span>{language === 'bn' ? `${currentPkg.tabLabel} প্যাকেজ অর্ডার ও পে করুন` : `Order & Pay for ${currentPkg.tabLabel}`}</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
