'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, Phone, MapPin, CreditCard } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaThreads, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'
import BkashLogo from '@/components/BkashLogo'

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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="theme-surface-bg theme-text-muted border-t theme-border pt-12 sm:pt-16 pb-24 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-8"
      >
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b theme-border">
          
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm border-2"
                style={{ borderColor: 'var(--accent)' }}
              >
                <img
                  src="/images/hero-portrait-01.png"
                  alt="Md. Mominul Islam"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-billboard text-2xl theme-text-main tracking-wide">
                Md. Mominul Islam
              </span>
            </div>
            <p className="text-xs sm:text-sm theme-text-muted max-w-md leading-relaxed font-normal">
              Full-Stack, Mobile (Flutter &amp; Kotlin), and Backend Engineer (Laravel, Node.js, Golang, Python, Next.js, VPS &amp; App Hosting). Engineering scalable digital solutions from Bogura, Bangladesh.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono">
              <MapPin size={14} className="theme-text-accent" />
              <span className="font-semibold theme-text-main">BOGURA SADAR, BOGURA, BANGLADESH</span>
            </div>
          </div>

          {/* Direct Channels (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest theme-text-main font-bold">
              DIRECT REACH
            </p>
            <div className="space-y-2 text-xs font-mono">
              <a
                href="mailto:mominulwebwork@gmail.com"
                className="flex items-center gap-2 hover:theme-text-main transition-colors"
              >
                <Mail size={13} className="theme-text-accent" />
                <span>mominulwebwork@gmail.com</span>
              </a>
              <a
                href="https://wa.me/8801303482412"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:theme-text-main transition-colors"
              >
                <Phone size={13} className="theme-text-accent" />
                <span>01303482412</span>
              </a>
              <a
                href="https://www.fiverr.com/s/WebEmax"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:theme-text-main transition-colors"
              >
                <FiverrLogo size={16} />
                <span>fiverr.com/s/WebEmax</span>
              </a>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest theme-text-main font-bold">
              SECTIONS
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { label: 'Hero', href: '#hero' },
                { label: 'About', href: '#about' },
                { label: 'Apps', href: '#apps' },
                { label: 'Website', href: '#website' },
                { label: 'Services', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:theme-text-main transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/pay"
                className="hover:theme-text-main transition-colors text-emerald-500 font-bold flex items-center gap-1.5 col-span-2 pt-1 border-t theme-border text-xs"
              >
                <CreditCard size={14} />
                <span>Online Payment Portal (bKash, Nagad, Bank) ↗</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="theme-text-muted">
            © {new Date().getFullYear()} Md. Mominul Islam. All Rights Reserved.
          </p>

          <div className="flex items-center gap-2">
            {socials.map((soc) => {
              const Icon = soc.icon
              return (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border theme-border hover:theme-border-hover flex items-center justify-center theme-text-muted hover:theme-text-main transition-all"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                  aria-label={soc.label}
                >
                  <Icon size={14} />
                </a>
              )
            })}

            <button
              onClick={scrollToTop}
              className="ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--btn-primary-text)',
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </motion.div>
    </footer>
  )
}
