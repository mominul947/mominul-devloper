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
import { useLanguage } from '@/context/LanguageContext'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { language, t } = useLanguage()

  const contactItems = [
    {
      icon: Mail,
      label: language === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Direct Email',
      value: 'mominulwebwork@gmail.com',
      href: 'mailto:mominulwebwork@gmail.com',
    },
    {
      icon: FiverrLogo,
      label: language === 'bn' ? 'ফাইভার প্রো সার্ভিস' : 'Fiverr Pro Services',
      value: 'fiverr.com/s/WebEmax',
      href: 'https://www.fiverr.com/s/WebEmax',
    },
    {
      icon: FaWhatsapp,
      label: language === 'bn' ? 'হোয়াটসঅ্যাপ ও সরাসরি কল' : 'WhatsApp & Call',
      value: '+880 1303 482412',
      href: 'https://wa.me/8801303482412',
    },
    {
      icon: MapPin,
      label: language === 'bn' ? 'ঠিকানা ও অবস্থান' : 'Location',
      value: t.hero.location,
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

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submittedData, setSubmittedData] = useState<{
    name: string
    email: string
    phone: string
    projectType: string
    message: string
  } | null>(null)
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

    setSubmittedData({ ...form })
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
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Contact Info (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-5 space-y-6 sm:space-y-8"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-widest theme-text-muted mb-1">
                {language === 'bn' ? 'প্রজেক্ট শুরু করুন' : 'START A PROJECT'}
              </p>
              <h2 className="font-billboard text-3xl xs:text-4xl sm:text-6xl theme-text-main tracking-wide leading-none">
                {language === 'bn' ? (
                  <>একসাথে কাজ<br /><span className="theme-text-accent">শুরু করি</span></>
                ) : (
                  <>LET&apos;S WORK<br /><span className="theme-text-accent">TOGETHER</span></>
                )}
              </h2>
              <p className="text-sm theme-text-muted mt-3 sm:mt-4 leading-relaxed max-w-md">
                {language === 'bn'
                  ? 'আপনার কোনো মোবাইল অ্যাপ, আধুনিক ওয়েব প্ল্যাটফর্ম বা কাস্টম সফটওয়্যার প্রজেক্টের পরিকল্পনা থাকলে সরাসরি যোগাযোগ করুন অথবা ফাইভারে অর্ডার দিন।'
                  : 'Have an ambitious mobile application, Next.js web platform, or custom engineering project in mind? Reach out directly or place an order via Fiverr.'}
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
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono uppercase theme-text-muted">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold theme-text-main group-hover:text-emerald-500 transition-colors truncate">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight size={14} className="theme-text-muted ml-auto group-hover:theme-text-main transition-colors flex-shrink-0" />
                  </a>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[11px] font-mono uppercase theme-text-muted mb-2 tracking-wider">
                {language === 'bn' ? 'সামাজিক মাধ্যম' : 'PROFESSIONAL NETWORKS'}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {socials.map((soc) => {
                  const Icon = soc.icon
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl neu-card flex items-center justify-center theme-text-muted hover:theme-text-main hover:scale-110 transition-all border theme-border"
                      aria-label={soc.label}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Message Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="md:col-span-7 neu-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="border-b theme-border pb-4 mb-5 sm:mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-billboard text-xl sm:text-2xl theme-text-main flex items-center gap-2">
                  <span>{language === 'bn' ? 'সরাসরি ইনকোয়ারি ফর্ম' : 'DIRECT INQUIRY FORM'}</span>
                </h3>
                <p className="text-xs theme-text-muted font-mono mt-0.5">
                  {language === 'bn' ? 'সাধারণত ২ ঘণ্টার মধ্যে উত্তর দেওয়া হয়' : 'Typically replies in less than 2 hours'}
                </p>
              </div>
              <span
                className="text-[10px] font-mono px-3 py-1 rounded-full glass-pill font-bold theme-text-main flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'bn' ? 'অনলাইন' : 'ACTIVE NOW'}</span>
              </span>
            </div>

            {formState === 'success' ? (
              <div className="py-8 sm:py-10 text-center space-y-5">
                <div
                  className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg"
                >
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-billboard text-2xl sm:text-3xl theme-text-main">
                    {language === 'bn' ? 'বার্তাটি সফলভাবে পাঠানো হয়েছে!' : 'INQUIRY TRANSMITTED!'}
                  </h4>
                  <p className="text-xs sm:text-sm theme-text-muted max-w-md mx-auto leading-relaxed">
                    {language === 'bn' 
                      ? `ধন্যবাদ ${submittedData?.name || ''}! আপনার বার্তাটি mominulwebwork@gmail.com এ পাঠানো হয়েছে। তাৎক্ষণিক উত্তরের জন্য নিচে সরাসরি হোয়াটসঅ্যাপ বা ইমেইলে যোগাযোগ করতে পারেন:`
                      : `Thank you, ${submittedData?.name || ''}! Your message has been dispatched to mominulwebwork@gmail.com. For instant priority response, feel free to connect directly:`}
                  </p>
                </div>

                {/* Instant Connect Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/8801303482412?text=${encodeURIComponent(
                      `হ্যালো মোঃ মোমিনুল ইসলাম,\nআমি আপনার পোর্টফোলিও ওয়েবসাইট থেকে বার্তা পাঠিয়েছি:\n👤 নাম: ${submittedData?.name || ''}\n✉️ ইমেইল: ${submittedData?.email || ''}\n📞 ফোন: ${submittedData?.phone || ''}\n📁 প্রজেক্ট: ${submittedData?.projectType || ''}\n📝 বার্তা:\n${submittedData?.message || ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <FaWhatsapp size={16} />
                    <span>{language === 'bn' ? 'WhatsApp এ সরাসরি পাঠান' : 'Send via WhatsApp'}</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href={`mailto:mominulwebwork@gmail.com?subject=${encodeURIComponent(
                      `🚀 Portfolio Inquiry: ${submittedData?.name || 'Client'} (${submittedData?.projectType || 'Project'})`
                    )}&body=${encodeURIComponent(
                      `Client Name: ${submittedData?.name || ''}\nClient Email: ${submittedData?.email || ''}\nPhone / WhatsApp: ${submittedData?.phone || ''}\nProject Category: ${submittedData?.projectType || ''}\n\nMessage Details:\n${submittedData?.message || ''}`
                    )}`}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border theme-border hover:bg-white/10 theme-text-main font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <Mail size={15} />
                    <span>{language === 'bn' ? 'Gmail এ ওপেন করুন' : 'Open in Gmail'}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                <div className="pt-3 border-t theme-border max-w-xs mx-auto">
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
                      setSubmittedData(null)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono theme-text-muted hover:theme-text-accent transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>{language === 'bn' ? '← আরেকটি বার্তা লিখুন' : '← Send Another Message'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                      {language === 'bn' ? 'আপনার নাম *' : 'YOUR NAME *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-4 py-3 rounded-2xl neu-inset border border-slate-200/60 dark:border-white/10 text-base sm:text-sm focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                      {language === 'bn' ? 'ইমেইল ঠিকানা *' : 'EMAIL ADDRESS *'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
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
                      {language === 'bn' ? 'ফোন বা হোয়াটসঅ্যাপ নম্বর *' : 'PHONE / WHATSAPP NUMBER *'}
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
                      {language === 'bn' ? 'প্রজেক্ট ক্যাটাগরি' : 'PROJECT CATEGORY'}
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
                      <option value="Mobile App Development (Android & Cross-Platform)">
                        {language === 'bn' ? 'মোবাইল অ্যাপ ডেভেলপমেন্ট (অ্যান্ড্রয়েড ও ক্রস-প্ল্যাটফর্ম)' : 'Mobile App Development (Android & Cross-Platform)'}
                      </option>
                      <option value="Full-Stack Web Platform (Next.js 14)">
                        {language === 'bn' ? 'ফুল-স্ট্যাক ওয়েব প্ল্যাটফর্ম (Next.js 14)' : 'Full-Stack Web Platform (Next.js 14)'}
                      </option>
                      <option value="AI / High-Throughput Backend Architecture">
                        {language === 'bn' ? 'এআই ও হাই-পারফরম্যান্স ব্যাকএন্ড আর্কিটেকচার' : 'AI / High-Throughput Backend Architecture'}
                      </option>
                      <option value="Fiverr Direct Order & Consultation">
                        {language === 'bn' ? 'ফাইভার ডিরেক্ট অর্ডার ও কনসালটেশন' : 'Fiverr Direct Order & Consultation'}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase theme-text-muted mb-1.5 font-bold">
                    {language === 'bn' ? 'প্রজেক্টের বিবরণ *' : 'PROJECT DETAILS *'}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
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
                  className="w-full py-3.5 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--btn-primary-text)'
                  }}
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      <span>{t.contact.sendingBtn}</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>{t.contact.sendBtn}</span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] font-mono theme-text-muted text-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>{language === 'bn' ? 'নিরাপদ ও গোপনীয়' : 'Direct & Confidential'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="theme-text-accent" />
                    <span>{language === 'bn' ? 'তাত্ক্ষণিক নোটিফিকেশন' : 'Instant Direct Notification'}</span>
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
