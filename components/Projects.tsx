'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Smartphone,
  Globe,
  Layers,
  ShieldCheck,
  X,
  Cpu,
  Sparkles,
  Clock,
  RotateCw,
  Check,
  MessageSquare,
  HelpCircle,
  Terminal,
  CreditCard,
} from 'lucide-react'
import FiverrLogo from '@/components/FiverrLogo'
import BkashLogo from '@/components/BkashLogo'
import CodePlayground from '@/components/CodePlayground'

type PackageTier = 'basic' | 'standard' | 'premium'

interface ServicePackage {
  id: PackageTier
  tabLabel: string
  title: string
  subtitle: string
  deliveryTime: string
  revisions: string
  badge?: string
  included: { label: string; available: boolean }[]
}

const packages: ServicePackage[] = [
  {
    id: 'basic',
    tabLabel: 'Basic',
    title: 'MVP Mobile / Web Starter',
    subtitle:
      'Functional 3-5 screen mobile app (Flutter / React Native) or responsive Next.js single-page application with essential UI & database integration.',
    deliveryTime: '4-6 Days Delivery',
    revisions: 'Unlimited Revisions',
    included: [
      { label: 'Functional Android App (or Next.js Web)', available: true },
      { label: 'Custom Modern UI/UX Implementation', available: true },
      { label: 'REST API & Cloud Database Connection', available: true },
      { label: 'App Icon, Splash Screen & Asset Setup', available: true },
      { label: 'Clean Source Code & Documentation', available: true },
      { label: 'Push Notifications & Cloud Messaging', available: false },
      { label: 'Payment Gateway Integration', available: false },
      { label: 'Production Linux VPS Server Setup', available: false },
    ],
  },
  {
    id: 'standard',
    tabLabel: 'Standard',
    title: 'Complete Full-Stack Application',
    subtitle:
      'End-to-end production mobile app (6-12 screens) or scalable Next.js 14 web platform with robust backend APIs, database, and authentication.',
    deliveryTime: '10-14 Days Delivery',
    revisions: 'Unlimited Revisions',
    badge: 'POPULAR CHOICE',
    included: [
      { label: 'Functional Android Mobile App Suite', available: true },
      { label: 'Scalable Next.js 14 Web Frontend', available: true },
      { label: 'Custom Backend API (Node.js / Laravel)', available: true },
      { label: 'Database Schema (PostgreSQL / MongoDB)', available: true },
      { label: 'User Authentication (JWT & Social OAuth)', available: true },
      { label: 'Push Notifications & Cloud Messaging', available: true },
      { label: 'Payment Gateway (Stripe, SSLCommerz, PayPal)', available: true },
      { label: 'Production Linux VPS Server & SSL Setup', available: true },
      { label: 'Complete Source Code & Deployment Guide', available: true },
      { label: 'Google Play Store Submission Support', available: false },
    ],
  },
  {
    id: 'premium',
    tabLabel: 'Premium',
    title: 'Advanced Enterprise Ecosystem',
    subtitle:
      'Full-featured enterprise cross-platform mobile suite (up to 20+ screens), Next.js platform, microservices, and dedicated VPS cloud hosting.',
    deliveryTime: '20-25 Days Delivery',
    revisions: 'Unlimited Revisions',
    badge: 'ENTERPRISE',
    included: [
      { label: 'Cross-Platform Android Mobile Suite + Web Admin', available: true },
      { label: 'Scalable High-Throughput Microservices (Node.js / Go)', available: true },
      { label: 'Real-time WebSockets, Live Chat & Geo-tracking', available: true },
      { label: 'Role-Based Access Control (RBAC) & Security Audit', available: true },
      { label: 'Automated CI/CD Pipelines & Docker Containers', available: true },
      { label: 'Hardened Linux VPS Server & Nginx Reverse Proxy', available: true },
      { label: 'Payment Gateways & Subscription Billing Engine', available: true },
      { label: 'Google Play Store Release & Submission Support', available: true },
      { label: 'Performance Benchmarking & Sub-100ms Latency', available: true },
      { label: '30 Days Priority Post-Launch Maintenance', available: true },
      { label: 'Complete Clean Source Code & Architecture Specs', available: true },
    ],
  },
]

export default function Projects() {
  const [activeTier, setActiveTier] = useState<PackageTier>('standard')

  const currentPkg = packages.find((p) => p.id === activeTier) || packages[1]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="projects" className="py-16 sm:py-24 theme-main-bg theme-text-main border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 2-Column Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ------------------------------------------------------------------ */}
          {/* Left Column: Selected Works Showcase (8 Cols)                      */}
          {/* ------------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-8 space-y-6 sm:space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b theme-border pb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest theme-text-accent mb-1 flex items-center gap-1.5 font-bold">
                  <Terminal size={13} />
                  <span>PRODUCTION CODE ARCHITECTURE</span>
                </p>
                <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
                  DEVELOPER CONSOLE
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
                  <span>HIRE ON FIVERR</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Interactive Code IDE & Editor Box */}
            <CodePlayground />
          </motion.div>

          {/* ------------------------------------------------------------------ */}
          {/* Right Column: Fiverr-Style Service Packages (4 Cols)               */}
          {/* ------------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-4 space-y-4"
          >
            
            {/* Section Header */}
            <div className="border-b theme-border pb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>PACKAGES &amp; CAPABILITIES</span>
                </p>
                <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
                  SERVICES
                </h2>
              </div>
            </div>

            {/* Fiverr-Style Package Card Container */}
            <div
              className="rounded-3xl border theme-border overflow-hidden shadow-xl"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              {/* 3-Tier Tabs (Basic, Standard, Premium) - Exact Fiverr UI */}
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
                
                {/* Header: Title & Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-billboard text-xl sm:text-2xl theme-text-main leading-tight">
                      {currentPkg.title}
                    </h3>
                    {currentPkg.badge && (
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 uppercase flex-shrink-0">
                        {currentPkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs theme-text-muted leading-relaxed">
                    {currentPkg.subtitle}
                  </p>
                </div>

                {/* Delivery Time & Revisions Pill Row */}
                <div className="flex flex-wrap items-center gap-3 py-2 border-y theme-border text-xs font-mono theme-text-main font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="theme-text-accent flex-shrink-0" />
                    <span>{currentPkg.deliveryTime}</span>
                  </div>
                  <span className="opacity-30">•</span>
                  <div className="flex items-center gap-1.5">
                    <RotateCw size={14} className="theme-text-accent flex-shrink-0" />
                    <span>{currentPkg.revisions}</span>
                  </div>
                </div>

                {/* "What's Included" Checklist */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-mono uppercase tracking-widest theme-text-muted font-bold">
                    WHAT&apos;S INCLUDED:
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
                        <span className="leading-snug">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons (Fiverr, bKash & Contact) */}
                <div className="space-y-2 pt-2">
                  <a
                    href="https://www.fiverr.com/s/WebEmax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-theme-primary w-full py-3.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer shadow-md group"
                  >
                    <FiverrLogo size={18} />
                    <span>Order via Fiverr</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <Link
                    href={`/pay?package=${encodeURIComponent(currentPkg.title)}&tier=${currentPkg.id}`}
                    className="w-full py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <CreditCard size={14} />
                    <span>Pay for {currentPkg.tabLabel} Package</span>
                    <ArrowUpRight size={13} />
                  </Link>

                  <button
                    onClick={scrollToContact}
                    className="w-full py-3 rounded-full border theme-border hover:bg-black/5 dark:hover:bg-white/5 font-mono text-xs uppercase tracking-wider font-semibold theme-text-main transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={13} />
                    <span>Discuss Custom Scope</span>
                  </button>
                </div>

                {/* Hourly / Flexible Hiring Card (Matching Fiverr Gig Footer) */}
                <div className="pt-3 border-t theme-border flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full neu-card flex items-center justify-center flex-shrink-0 border theme-border font-bold text-xs theme-text-accent">
                    MI
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold theme-text-main leading-tight">
                      Need flexibility when hiring?
                    </p>
                    <p className="text-[10px] theme-text-muted leading-tight mt-0.5">
                      Milestone contracts &amp; dedicated sprint architecture available.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/8801303482412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-emerald-500 font-bold hover:underline flex-shrink-0"
                  >
                    Inquire ↗
                  </a>
                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}
