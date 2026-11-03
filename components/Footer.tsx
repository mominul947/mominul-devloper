'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, Phone, MapPin, CreditCard } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaThreads, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import FiverrLogo from '@/components/FiverrLogo'
import { useLanguage } from '@/context/LanguageContext'

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
  const { language, t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="theme-surface-bg theme-text-muted border-t theme-border pt-12 sm:pt-16 pb-24 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
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
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono">
              <MapPin size={14} className="theme-text-accent" />
              <span className="font-semibold theme-text-main">{t.footer.location}</span>
            </div>
          </div>

          {/* Direct Channels (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest theme-text-main font-bold">
              {language === 'bn' ? 'সরাসরি যোগাযোগ' : 'DIRECT REACH'}
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
              {t.footer.navigation}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { label: t.nav.home, href: '#hero' },
                { label: t.nav.about, href: '#about' },
                { label: t.nav.apps, href: '#apps' },
                { label: t.nav.website, href: '#website' },
                { label: t.nav.services, href: '#projects' },
                { label: t.nav.contact, href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:theme-text-main transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`https://wa.me/8801303482412?text=${encodeURIComponent(
                  language === 'bn'
                    ? 'হ্যালো মোঃ মোমিনুল ইসলাম, আমি সরাসরি পেমেন্ট করতে চাই (বিকাশ / নগদ / ব্যাংক)।'
                    : 'Hello Md. Mominul Islam, I would like to make a payment directly via WhatsApp.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:theme-text-main transition-colors text-emerald-500 font-bold flex items-center gap-1.5 col-span-2 pt-1 border-t theme-border text-xs"
              >
                <FaWhatsapp size={14} className="text-[#25D366]" />
                <span>{language === 'bn' ? 'সরাসরি পেমেন্ট করুন (WhatsApp) ↗' : 'Pay Directly via WhatsApp ↗'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="theme-text-muted">
            © {new Date().getFullYear()} Md. Mominul Islam. {t.footer.copyright}
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
              title={t.common.backToTop}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </motion.div>
    </footer>
  )
}
