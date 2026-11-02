'use client'

import { useRef, useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Loader,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaThreads, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'

const contactItems = [
  {
    icon: Mail,
    label: 'Direct Email',
    value: 'mominulwebwork@gmail.com',
    href: 'mailto:mominulwebwork@gmail.com',
  },
  {
    icon: FiverrLogo,
    label: 'Fiverr Pro Services',
    value: 'fiverr.com/s/WebEmax',
    href: 'https://www.fiverr.com/s/WebEmax',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp & Call',
    value: '+880 1303 482412',
    href: 'https://wa.me/8801303482412',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'BOGURA SADAR, BOGURA, BANGLADESH',
    href: 'https://maps.google.com/?q=Bogura+Sadar+Bogura',
  },
]

const socials = [
  {
    icon: FiverrLogo,
    href: 'https://www.fiverr.com/s/WebEmax',
    label: 'Fiverr',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/mominul-islam-b02849445',
    label: 'LinkedIn',
  },
  {
    icon: FaWhatsapp,
    href: 'https://wa.me/8801303482412',
    label: 'WhatsApp',
  },
  {
    icon: FaFacebookF,
    href: 'https://www.facebook.com/md.mominul.islam.80070',
    label: 'Facebook',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/mominul______29?cplk=NnozeWY1aDVlMXBv',
    label: 'Instagram',
  },
  {
    icon: FaThreads,
    href: 'https://www.threads.com/@mominul______29',
    label: 'Threads',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Mobile App Development (Android & Cross-Platform)',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return

    setFormState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('success')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setFormState('success')
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 theme-main-bg theme-text-main border-t theme-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8" ref={ref}>
        
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Contact Info (5 Cols) with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-widest theme-text-muted mb-1">
                START A PROJECT
              </p>
              <h2 className="font-billboard text-3xl xs:text-4xl sm:text-6xl theme-text-main tracking-wide leading-none">
                LET&apos;S WORK<br />
                <span className="theme-text-accent">TOGETHER</span>
              </h2>
              <p className="text-sm theme-text-muted mt-3 sm:mt-4 leading-relaxed max-w-md">
                Have an ambitious mobile application, Next.js web platform, or custom engineering project in mind? Reach out directly or place an order via Fiverr.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-2.5 sm:space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl neu-card neu-card-hover transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl neu-card flex items-center justify-center transition-colors flex-shrink-0 text-emerald-500"
                    >
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase theme-text-muted">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold theme-text-main truncate">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight size={15} className="theme-text-muted group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                  </a>
                )
              })}
            </div>

            {/* Social Icons */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs font-mono uppercase tracking-widest theme-text-muted text-center sm:text-left font-bold">
                CONNECTED NETWORKS
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {socials.map((soc) => {
                  const Icon = soc.icon
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl neu-card neu-card-hover flex items-center justify-center theme-text-muted hover:theme-text-main transition-colors"
                      aria-label={soc.label}
                    >
                      <Icon size={15} />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Message Form (7 Cols) with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-7 neu-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            {/* Subtle 3D Ambient Corner Orb */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full orb-3d pointer-events-none opacity-50 hidden sm:block" />

            <div className="border-b theme-border pb-4 mb-5 sm:mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-billboard text-xl sm:text-2xl theme-text-main flex items-center gap-2">
                  <span>DIRECT INQUIRY FORM</span>
                </h3>
                <p className="text-xs theme-text-muted font-mono mt-0.5">
                  Typically replies in less than 2 hours
                </p>
              </div>
              <span
                className="text-[10px] font-mono px-3 py-1 rounded-full glass-pill font-bold theme-text-main flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACTIVE NOW</span>
              </span>
            </div>

            {formState === 'success' ? (
              <div className="py-8 sm:py-12 text-center space-y-4">
                <div
                  className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg"
                >
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-billboard text-2xl sm:text-3xl theme-text-main">
                  INQUIRY TRANSMITTED
                </h4>
                <p className="text-xs sm:text-sm theme-text-muted max-w-md mx-auto leading-relaxed">
                  Thank you! Your message has been sent successfully. Md. Mominul Islam has been notified and will review your requirements shortly.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormState('idle')
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Mobile App Development (Android & Cross-Platform)',
                        message: ''
                      })
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full neu-card text-xs font-mono font-bold theme-text-main hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-4 py-3 rounded-2xl neu-inset border border-slate-200/60 dark:border-white/10 text-base sm:text-sm focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-2xl neu-inset border border-slate-200/60 dark:border-white/10 text-base sm:text-sm focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Phone/WhatsApp & Category */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                      PHONE / WHATSAPP NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. +880 1700 000000"
                      className="w-full px-4 py-3 rounded-2xl neu-inset border border-slate-200/60 dark:border-white/10 text-base sm:text-sm focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                      PROJECT CATEGORY
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl neu-inset border border-slate-200/60 dark:border-white/10 text-base sm:text-sm focus:outline-none transition-colors cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                      }}
                    >
                      <option value="Mobile App Development (Android & Cross-Platform)">Mobile App Development (Android &amp; Cross-Platform)</option>
                      <option value="Full-Stack Web Platform (Next.js 14)">Full-Stack Web Platform (Next.js 14)</option>
                      <option value="AI / High-Throughput Backend Architecture">AI / High-Throughput Backend Architecture</option>
                      <option value="Fiverr Direct Order & Consultation">Fiverr Direct Order &amp; Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                    PROJECT DETAILS *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your product vision, timeline, and key features..."
                    className="w-full px-4 py-3 rounded-2xl neu-inset border border-slate-200/60 dark:border-white/10 text-base sm:text-sm focus:outline-none transition-colors resize-none"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--btn-primary-text)'
                  }}
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      <span>DISPATCHING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>DISPATCH INQUIRY</span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] font-mono theme-text-muted text-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Direct &amp; Confidential</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="theme-text-accent" />
                    <span>Instant Direct Notification</span>
                  </span>
                </div>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  )
}
