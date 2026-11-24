'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowUpRight,
  GitBranch,
  Star,
  GitFork,
  Code2,
  Terminal,
  CheckCircle2,
  Layers,
  Activity,
  Flame,
  FolderGit2,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react'
import { FaGithub, FaGooglePlay } from 'react-icons/fa6'
import { useLanguage } from '@/context/LanguageContext'

interface Repository {
  id: string
  name: string
  badge: string
  badgeColor: string
  description: string
  descriptionBn: string
  primaryLanguage: string
  languageColor: string
  stars: string
  forks: string
  topics: string[]
  githubUrl: string
  demoUrl?: string
  highlights: string[]
  highlightsBn: string[]
}

const repositories: Repository[] = [
  {
    id: 'mominul-devloper',
    name: 'mominul-devloper',
    badge: 'FLAGSHIP PORTFOLIO',
    badgeColor: 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10',
    description:
      'Personal 3D Full-Stack Developer Portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Three.js. Features 5 dynamic design themes, interactive 3D globes, multilingual support (EN/BN), and an integrated payment gateway.',
    descriptionBn:
      'Next.js 14, TypeScript, Tailwind CSS, Framer Motion ও Three.js দিয়ে তৈরি থ্রি-ডি ফুল-স্ট্যাক পোর্টফোলিও। ৫টি ডাইনামিক থিম, ৩ডি ব্যাকড্রপ, দ্বিভাষিক সাপোর্ট ও অনলাইন পেমেন্ট পোর্টাল যুক্ত।',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    stars: '12+',
    forks: '4',
    topics: ['nextjs14', 'typescript', 'threejs', 'tailwind'],
    githubUrl: 'https://github.com/mominul947/mominul-devloper',
    demoUrl: 'https://mominul-devloper-bd.vercel.app',
    highlights: [
      'Next.js 14 App Router with Server & Client Component optimization',
      'Interactive 3D Canvas Backgrounds powered by Three.js & Fiber',
      'Dual Language Engine (English & Bengali) with instant state switching',
      'Custom Payment Gateway & Real-Time Visitor Telemetry Tracking',
    ],
    highlightsBn: [
      'Next.js 14 অ্যাপ রাউটার ও পারফরম্যান্স অপটিমাইজেশন',
      'Three.js ও React Three Fiber পাওয়ার্ড ৩ডি ইন্টার‍্যাক্টিভ ব্যাকড্রপ',
      'বাংলা ও ইংরেজি দ্বিভাষিক ইঞ্জিন ও রিয়েল-টাইম সুইচিং',
      'ইন্টিগ্রেটেড অনলাইন পেমেন্ট পোর্টাল ও ভিজিটর কাউন্টার ট্র্যাকিং',
    ],
  },
  {
    id: 'mominul947',
    name: 'mominul947',
    badge: 'PROFILE SHOWCASE',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    description:
      'Special GitHub Profile README featuring animated neon hero banners, 14 mobile app & SaaS dashboard UI/UX designs, GitHub statistics bento grids, and dynamic trophy badges.',
    descriptionBn:
      'স্পেশাল গিটহাব প্রোফাইল README—অ্যানিমেটেড ব্যানার, ১৪টি মোবাইল অ্যাপ ও ড্যাশবোর্ড ডিজাইন শোকেস, গিটহাব লাইভ অ্যানালিটিক্স এবং ট্রফি ব্যাজ সংবলিত।',
    primaryLanguage: 'Markdown / SVG',
    languageColor: '#8957e5',
    stars: '8+',
    forks: '2',
    topics: ['github-profile', 'readme', 'svg-animation', 'ui-ux'],
    githubUrl: 'https://github.com/mominul947/mominul947',
    highlights: [
      'Showcases 14 production mobile & web app UI/UX architectures',
      'Animated SVG hero banner and architect code cards',
      'Automated GitHub streak, trophies, and language analytics',
      'Clean 2-column responsive layout for mobile design previews',
    ],
    highlightsBn: [
      '১৪টি মোবাইল অ্যাপ ও ওয়েব ড্যাশবোর্ড ডিজাইন শোকেস',
      'অ্যানিমেটেড এসভিজি ব্যানার ও আর্কিটেক্ট কোড কার্ড',
      'গিটহাব স্ট্রিক, ট্রফি ও ল্যাঙ্গুয়েজ অ্যানালিটিক্স ইন্টিগ্রেশন',
      'রেসপনসিভ ২-কলাম আর্কিটেকচার প্রিভিউ লেআউট',
    ],
  },
  {
    id: 'amar-recharge-play-store',
    name: 'amar-recharge-play-store',
    badge: 'PLAY STORE BUILD',
    badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    description:
      'Amar Recharge — Android production APK & App Bundle prepared for Google Play Store release. Built with Flutter & Dart, supporting automated telecom billing, recharge workflows, and instant SMS callbacks.',
    descriptionBn:
      'আমার রিচার্জ — গুগল প্লে স্টোর রিলিজের জন্য প্রস্তুত অ্যান্ড্রয়েড প্রোডাকশন রিলিজ। ফ্ল্যাটার ও ডার্ট দিয়ে তৈরি, রিয়েল-টাইম রিচার্জ অটোমেশন ও সিকিউর ট্রানজ্যাকশন সহ।',
    primaryLanguage: 'Dart / Flutter',
    languageColor: '#00b4ab',
    stars: '6+',
    forks: '3',
    topics: ['flutter', 'dart', 'android', 'playstore-release'],
    githubUrl: 'https://github.com/mominul947/amar-recharge-play-store',
    highlights: [
      'Google Play 64-bit release AAB & signed APK architecture',
      'Automated telecom operator detection and dynamic recharge routing',
      'Biometric authentication (fingerprint/face) for wallet security',
      'High-throughput REST API integration with background sync',
    ],
    highlightsBn: [
      'গুগল প্লে ৬৪-বিট সাইন্ড AAB ও APK আর্কিটেকচার',
      'টেলিকম অপারেটর অটো ডিটেকশন ও ডায়নামিক রিচার্জ প্রসেসিং',
      'বায়োমেট্রিক অথেনটিকেশন ও ওয়ালেট সিকিউরিটি',
      'হাই-পারফরম্যান্স REST API ও ব্যাকগ্রাউন্ড সিঙ্ক',
    ],
  },
  {
    id: 'amarrecharge2-play-',
    name: 'amarrecharge2-play-',
    badge: 'PRODUCTION V2',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    description:
      'Amar Recharge v2 — Updated Android release build with modern Material 3 design, multi-gateway digital payments, cloud push telemetry, and lightning-fast load times.',
    descriptionBn:
      'আমার রিচার্জ ভার্সন ২ — মেটেরিয়াল ৩ ডিজাইন, মাল্টিপল পেমেন্ট চ্যানেল ও ক্লাউড নোটিফিকেশন সহ আপগ্রেডেড অ্যান্ড্রয়েড রিলিজ।',
    primaryLanguage: 'Dart / Kotlin',
    languageColor: '#f59e0b',
    stars: '5+',
    forks: '2',
    topics: ['flutter-v2', 'material-3', 'cloud-messaging'],
    githubUrl: 'https://github.com/mominul947/amarrecharge2-play-',
    highlights: [
      'Upgraded Material Design 3 interface with dark/light themes',
      'Integrated Firebase Cloud Messaging (FCM) push notifications',
      'Native Android intent bridging for high-speed SMS processing',
      'Ultra-compact APK footprint (< 15MB) with tree-shaking',
    ],
    highlightsBn: [
      'আপগ্রেডেড মেটেরিয়াল ৩ ইন্টারফেস ও থিম সাপোর্ট',
      'ফায়ারবেস ক্লাউড মেসেজিং (FCM) পুশ নোটিফিকেশন ইন্টিগ্রেশন',
      'হাই-স্পিড ট্রানজ্যাকশন প্রসেসিং ও অপটিমাইজেশন',
      'অত্যন্ত হালকা সাইজ (< ১৫ মেগাবাইট) ও ফাস্ট লোডিং',
    ],
  },
  {
    id: 'T_Magic_NavigationMenu_Indicator',
    name: 'T_Magic_NavigationMenu_Indicator',
    badge: 'UI COMPONENT',
    badgeColor: 'border-pink-500/40 text-pink-400 bg-pink-500/10',
    description:
      'Animated curved bottom navigation bar with a smooth floating indicator for Flutter mobile apps. Designed with custom painters, fluid bezier curves, and physics-based spring animations.',
    descriptionBn:
      'ফ্ল্যাটার মোবাইল অ্যাপের জন্য ফ্লুইড ও স্মুথ কার্ভড বটম নেভিগেশন বার ইন্ডিকেটর প্যাকেজ। বেজিয়ার কার্ভ ও স্প্রিং অ্যানিমেশনে তৈরি।',
    primaryLanguage: 'Dart',
    languageColor: '#00b4ab',
    stars: '7+',
    forks: '3',
    topics: ['flutter-package', 'bottom-navigation', 'custom-painter'],
    githubUrl: 'https://github.com/mominul947/T_Magic_NavigationMenu_Indicator',
    highlights: [
      'Custom Bezier curve path computation for seamless notch morphing',
      '60fps physics-based spring animations with customizable duration',
      'Zero external dependencies — pure Dart & Flutter Canvas rendering',
      'Easy drop-in component with full theme adaptability',
    ],
    highlightsBn: [
      'স্মুথ বেজিয়ার কার্ভ ও ফ্লুইড ট্রানজিশন ক্যালকুলেশন',
      '৬০ এফপিএস স্প্রিং অ্যানিমেশন ও কাস্টম কালার সাপোর্ট',
      'কোনো এক্সটার্নাল ডিপেন্ডেন্সি ছাড়াই পিউর ডার্ট ক্যানভাসে তৈরি',
      'যেকোনো ফ্ল্যাটার প্রোজেক্টে সহজে ড্রপ-ইন করার সুবিধা',
    ],
  },
]

export default function GitHubSection() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'repos' | 'analytics'>('repos')
  const [copiedClone, setCopiedClone] = useState(false)

  const cloneCommand = 'git clone https://github.com/mominul947/mominul-devloper.git'

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(cloneCommand)
      setCopiedClone(true)
      setTimeout(() => setCopiedClone(false), 2000)
    }
  }

  return (
    <section
      id="github"
      className="relative py-10 sm:py-20 md:py-28 overflow-hidden theme-surface-bg theme-text-main border-t border-b theme-border"
    >
      {/* Massive Background Typography ("GITHUB") */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen text-center pointer-events-none select-none z-0 overflow-hidden">
        <h2
          className="font-billboard text-[20vw] sm:text-[18vw] leading-none tracking-tight font-black whitespace-nowrap transition-colors duration-300"
          style={{
            color: 'var(--billboard-color)',
            opacity: 'calc(var(--billboard-opacity) * 0.75)',
          }}
        >
          GITHUB
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-5 sm:space-y-10">
        {/* Section Subhead & Billboard Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 border-b theme-border pb-4 sm:pb-8">
          <div className="space-y-1.5 sm:space-y-3">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest border theme-border"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <FaGithub className="theme-text-accent" size={13} />
              <span className="font-bold theme-text-accent">
                {language === 'bn' ? 'ওপেন সোর্স কোডবেস' : 'OPEN SOURCE & REPOSITORIES'}
              </span>
            </div>

            <h2 className="font-billboard text-3xl sm:text-5xl lg:text-7xl theme-text-main tracking-wide leading-[0.95]">
              {language === 'bn' ? 'গিটহাব আর্কিটেকচার' : 'GITHUB CODE'}{' '}
              <span className="theme-text-accent">
                {language === 'bn' ? '& রিপোজিটরি' : '& ARCHITECTURE'}
              </span>
            </h2>

            <p className="text-xs sm:text-sm theme-text-muted max-w-2xl leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
              {language === 'bn'
                ? 'আমার সমস্ত প্রোডাকশন অ্যাপ, রিলিজ বিল্ড, Next.js আর্কিটেকচার এবং ওপেন সোর্স ইউআই কম্পোনেন্ট সরাসরি গিটহাবে হোস্ট করা আছে।'
                : 'Explore production-grade Android builds, Next.js platforms, UI packages, and scalable architecture repos hosted live on my GitHub profile.'}
            </p>
          </div>

          {/* Quick CTA to GitHub Profile */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/mominul947"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-theme-primary px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <FaGithub size={14} />
              <span>{language === 'bn' ? 'গিটহাব প্রোফাইল' : 'View GitHub Profile'}</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Profile Card & Terminal Bento Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5">
          {/* Left: GitHub Identity Card (Full width on mobile, 7 cols on md+) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-7 p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl border theme-border flex flex-col justify-between relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b theme-border">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 flex-shrink-0 shadow-md"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/186952596?v=4"
                    alt="Md. Mominul Islam on GitHub"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-billboard text-xl sm:text-3xl theme-text-main tracking-wide truncate">
                      Mominul Islam
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-mono theme-text-accent truncate">
                    @mominul947 • Founder @ Mom Tech BD
                  </p>
                </div>
              </div>

              <a
                href="https://github.com/mominul947?tab=followers"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border theme-border text-[11px] sm:text-xs font-mono hover:border-emerald-500 transition-colors flex items-center gap-1 flex-shrink-0"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                <FaGithub size={12} />
                <span className="hidden xs:inline">Followers:</span>
                <span className="font-bold theme-text-accent">1</span>
              </a>
            </div>

            {/* Quick Metrics Badges (Compact 4-column row on mobile) */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3 py-3 sm:py-4">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl border theme-border text-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <p className="font-billboard text-lg sm:text-2xl theme-text-accent leading-none">5+</p>
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider theme-text-muted mt-0.5 truncate">Repos</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl border theme-border text-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <p className="font-billboard text-lg sm:text-2xl text-emerald-500 leading-none">50+</p>
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider theme-text-muted mt-0.5 truncate">Commits</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl border theme-border text-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <p className="font-billboard text-lg sm:text-2xl text-sky-400 leading-none">14</p>
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider theme-text-muted mt-0.5 truncate">Designs</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl border theme-border text-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <p className="font-billboard text-lg sm:text-2xl text-amber-400 leading-none">100%</p>
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider theme-text-muted mt-0.5 truncate">Open</p>
              </div>
            </div>

            {/* Compact Mobile Clone Pill */}
            <div className="flex md:hidden items-center justify-between gap-2 p-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono text-zinc-300">
              <code className="truncate text-emerald-400">git clone mominul-devloper</code>
              <button
                onClick={handleCopy}
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-white flex-shrink-0 cursor-pointer"
                title="Copy command"
              >
                {copiedClone ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>

            {/* Bio quote (Visible on sm+) */}
            <p className="hidden sm:flex text-xs font-mono theme-text-muted leading-relaxed pt-2 border-t theme-border items-center gap-2">
              <Terminal size={14} className="theme-text-accent flex-shrink-0" />
              <span className="truncate">Full-Stack Web & Mobile App Architect • Next.js, Flutter, TypeScript & Cloud VPS</span>
            </p>
          </motion.div>

          {/* Right: Quick Terminal Clone Box (Visible only on md+) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="hidden md:flex md:col-span-5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border theme-border flex-col justify-between font-mono"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-2.5 border-b theme-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] theme-text-muted tracking-wider">bash — mominul@dev</span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-emerald-400 text-[11px]">$ # Clone 3D portfolio source repository</p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2 overflow-x-auto text-[11px] text-zinc-300">
                  <code className="truncate">{cloneCommand}</code>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0 cursor-pointer"
                    title="Copy command"
                  >
                    {copiedClone ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
                <p className="text-sky-400 pt-0.5 text-[11px]">$ cd mominul-devloper &amp;&amp; npm install</p>
                <p className="text-amber-400 text-[11px]">$ npm run dev # &gt; ready on :3000</p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t theme-border flex items-center justify-between text-[10px] theme-text-muted">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Verified Clean Architecture</span>
              </span>
              <a
                href="https://github.com/mominul947/mominul-devloper"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-text-accent hover:underline flex items-center gap-1 font-bold"
              >
                <span>Repo Details</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tab Switcher: Repositories vs Analytics */}
        <div className="flex items-center justify-center">
          <div
            className="p-1 rounded-xl sm:rounded-2xl border theme-border flex items-center gap-1 sm:gap-2"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <button
              onClick={() => setActiveTab('repos')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundColor: activeTab === 'repos' ? 'var(--accent)' : 'transparent',
                color: activeTab === 'repos' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
              }}
            >
              <FolderGit2 size={14} />
              <span>{language === 'bn' ? 'রিপোজিটরি (৫)' : 'Featured Repos (5)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundColor: activeTab === 'analytics' ? 'var(--accent)' : 'transparent',
                color: activeTab === 'analytics' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
              }}
            >
              <Activity size={14} />
              <span>{language === 'bn' ? 'স্ট্যাটস ও স্ট্রিক' : 'Stats & Streak'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Featured Repositories (Mobile Swipeable Deck, Desktop Grid) */}
        {activeTab === 'repos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
              {repositories.map((repo, idx) => (
                <div
                  key={repo.id}
                  className="w-[84vw] xs:w-[78vw] sm:w-auto flex-shrink-0 snap-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl border theme-border flex flex-col justify-between group hover:border-emerald-500/60 transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  {/* Top Bar: Icon, Name & Badge */}
                  <div className="space-y-2.5 sm:space-y-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border theme-border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: 'var(--bg-surface)' }}
                        >
                          <FolderGit2 className="theme-text-accent" size={16} />
                        </div>
                        <div className="min-w-0">
                          <a
                            href={repo.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-sm sm:text-base lg:text-lg theme-text-main group-hover:theme-text-accent transition-colors truncate block"
                          >
                            {repo.name}
                          </a>
                          <p className="text-[10px] sm:text-[11px] font-mono theme-text-muted flex items-center gap-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{ backgroundColor: repo.languageColor }}
                            />
                            <span>{repo.primaryLanguage}</span>
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold border whitespace-nowrap flex-shrink-0 ${repo.badgeColor}`}
                      >
                        {repo.badge}
                      </span>
                    </div>

                    {/* Description (2 lines on mobile, clean leading) */}
                    <p className="text-[11px] sm:text-xs theme-text-muted leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                      {language === 'bn' ? repo.descriptionBn : repo.description}
                    </p>

                    {/* Highlights Bullet List (Hidden on mobile to save vertical space, shown on sm+) */}
                    <div className="hidden sm:block space-y-1.5 pt-2 border-t theme-border text-[11px] font-mono">
                      {(language === 'bn' ? repo.highlightsBn : repo.highlights).slice(0, 3).map((item, hIdx) => (
                        <p key={hIdx} className="flex items-start gap-1.5 theme-text-muted">
                          <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </p>
                      ))}
                    </div>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono theme-text-muted border theme-border"
                          style={{ backgroundColor: 'var(--bg-surface)' }}
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions & Links */}
                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t theme-border flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2.5 text-[11px] font-mono theme-text-muted">
                      <span className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} />
                        <span>{repo.forks}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {repo.demoUrl && (
                        <a
                          href={repo.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono flex items-center gap-1 border border-emerald-500/40 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all font-semibold"
                        >
                          <span>Live</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono flex items-center gap-1 border theme-border hover:theme-text-accent transition-colors font-semibold"
                        style={{ backgroundColor: 'var(--bg-surface)' }}
                      >
                        <FaGithub size={12} />
                        <span>Repo</span>
                        <ArrowUpRight size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Mobile Swipe Cue */}
            <p className="flex sm:hidden items-center justify-center gap-1 text-[10px] font-mono theme-text-muted text-center pt-1">
              <span>← {language === 'bn' ? 'রিপোজিটরি দেখতে সোয়াইপ করুন' : 'Swipe to explore 5 repos'} →</span>
            </p>
          </motion.div>
        )}

        {/* Tab 2: Live Analytics & Contribution Heatmaps */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Bento Grid with Live GitHub SVG Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6">
              {/* Profile Details Card (7 cols) */}
              <div
                className="lg:col-span-7 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border theme-border flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between pb-2.5 border-b theme-border mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider theme-text-main font-bold">
                    <Activity size={13} className="theme-text-accent" />
                    <span>Profile Summary Details</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-emerald-500 font-bold">LIVE TELEMETRY</span>
                </div>

                <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 sm:p-2 bg-[#0d1117] border border-white/10 shadow-inner">
                  <img
                    src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=mominul947&theme=tokyonight"
                    alt="Mominul Islam Profile Details on GitHub"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Repos per Language & Stats (5 cols) */}
              <div
                className="lg:col-span-5 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border theme-border flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between pb-2.5 border-b theme-border mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider theme-text-main font-bold">
                    <Code2 size={13} className="theme-text-accent" />
                    <span>Top Languages</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-sky-400 font-bold">TECH MIX</span>
                </div>

                <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 sm:p-2 bg-[#0d1117] border border-white/10 shadow-inner">
                  <img
                    src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=mominul947&theme=tokyonight"
                    alt="Mominul Islam Repos per Language"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GitHub Streak Card (6 cols) */}
              <div
                className="lg:col-span-6 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border theme-border overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between pb-2.5 border-b theme-border mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider theme-text-main font-bold">
                    <Flame size={13} className="text-orange-500" />
                    <span>Contribution Streak</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-orange-400 font-bold">COMMITS</span>
                </div>

                <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-3 bg-[#0d1117] border border-white/10 shadow-inner">
                  <img
                    src="https://streak-stats.demolab.com?user=mominul947&theme=tokyonight&hide_border=true&background=0d1117&ring=10b981&fire=06b6d4&currStreakLabel=10b981"
                    alt="Mominul Islam GitHub Streak"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Productive Time / Commits UTC+6 (6 cols) */}
              <div
                className="lg:col-span-6 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border theme-border overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between pb-2.5 border-b theme-border mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider theme-text-main font-bold">
                    <Activity size={13} className="text-purple-400" />
                    <span>Productive Hours (UTC+6)</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-purple-400 font-bold">DAY / NIGHT</span>
                </div>

                <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 sm:p-2 bg-[#0d1117] border border-white/10 shadow-inner">
                  <img
                    src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=mominul947&theme=tokyonight&utcOffset=6"
                    alt="Mominul Islam Productive Time UTC+6"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Callout Banner */}
        <div
          className="p-5 sm:p-8 sm:p-10 rounded-2xl sm:rounded-3xl border theme-border flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="space-y-1 sm:space-y-2 text-center md:text-left">
            <h4 className="font-billboard text-xl sm:text-2xl md:text-3xl theme-text-main tracking-wide">
              {language === 'bn' ? 'ওপেন সোর্স কোড দেখতে চান?' : 'Want to Inspect Full Source Codes?'}
            </h4>
            <p className="text-xs sm:text-sm theme-text-muted max-w-xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
              {language === 'bn'
                ? 'আমার সমস্ত মোবাইল ও ফুল-স্ট্যাক প্রজেক্টের সোর্স কোড, স্থাপত্য এবং ডকুমেন্টেশন গিটহাবে রয়েছে।'
                : 'Follow my latest repositories, inspect clean software architectures, or star projects directly on GitHub.'}
            </p>
          </div>

          <div className="flex items-center justify-center w-full md:w-auto flex-shrink-0">
            <a
              href="https://github.com/mominul947"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-theme-primary w-full md:w-auto px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all"
            >
              <FaGithub size={15} />
              <span>{language === 'bn' ? 'গিটহাবে ফলো করুন' : 'Follow @mominul947'}</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
