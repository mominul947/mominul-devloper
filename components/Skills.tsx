'use client'

import React, { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiCplusplus,
  SiKotlin,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiJetpackcompose,
  SiAndroidstudio,
  SiNodedotjs,
  SiFastapi,
  SiGo,
  SiLaravel,
  SiDjango,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiRedis,
  SiPrisma,
  SiGraphql,
  SiDocker,
  SiLinux,
  SiNginx,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
  SiVercel,
  SiSocketdotio,
} from 'react-icons/si'
import { FaCss3Alt, FaAws } from 'react-icons/fa6'
import { TbBrandVscode } from 'react-icons/tb'
import { Sparkles, Network } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type Category =
  | 'ALL'
  | 'MOBILE & FRONTEND'
  | 'BACKEND & APIS'
  | 'DATABASES & ORM'
  | 'DEVOPS & CLOUD'

interface TechItem {
  name: string
  icon: React.ComponentType<any>
  color: string
  category: Category
}

// 6-Tier Tapered Matrix (11 -> 10 -> 8 -> 6 -> 4 -> 2)
const techRows: TechItem[][] = [
  // Row 1: Core Languages & Web (11 items)
  [
    { name: 'Python', icon: SiPython, color: '#3776AB', category: 'BACKEND & APIS' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'MOBILE & FRONTEND' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'MOBILE & FRONTEND' },
    { name: 'C', icon: SiC, color: '#659AD2', category: 'BACKEND & APIS' },
    { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'BACKEND & APIS' },
    { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'MOBILE & FRONTEND' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'MOBILE & FRONTEND' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'MOBILE & FRONTEND' },
    { name: 'React', icon: SiReact, color: '#61DAFB', category: 'MOBILE & FRONTEND' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'MOBILE & FRONTEND' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'MOBILE & FRONTEND' },
  ],

  // Row 2: Mobile & Backend Frameworks (10 items)
  [
    { name: 'Flutter', icon: SiFlutter, color: '#47C5FB', category: 'MOBILE & FRONTEND' },
    { name: 'Compose', icon: SiJetpackcompose, color: '#4285F4', category: 'MOBILE & FRONTEND' },
    { name: 'React Native', icon: SiReact, color: '#61DAFB', category: 'MOBILE & FRONTEND' },
    { name: 'Android', icon: SiAndroidstudio, color: '#3DDC84', category: 'MOBILE & FRONTEND' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#68A063', category: 'BACKEND & APIS' },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688', category: 'BACKEND & APIS' },
    { name: 'Golang', icon: SiGo, color: '#00ADD8', category: 'BACKEND & APIS' },
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', category: 'BACKEND & APIS' },
    { name: 'Django', icon: SiDjango, color: '#00b86b', category: 'BACKEND & APIS' },
    { name: 'Flask', icon: SiFlask, color: '#e0e0e0', category: 'BACKEND & APIS' },
  ],

  // Row 3: Databases & ORM (8 items)
  [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'DATABASES & ORM' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'DATABASES & ORM' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'DATABASES & ORM' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'DATABASES & ORM' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E', category: 'DATABASES & ORM' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D', category: 'DATABASES & ORM' },
    { name: 'Prisma', icon: SiPrisma, color: '#5a67d8', category: 'DATABASES & ORM' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: 'BACKEND & APIS' },
  ],

  // Row 4: DevOps & Cloud (6 items)
  [
    { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'DEVOPS & CLOUD' },
    { name: 'Linux VPS', icon: SiLinux, color: '#FCC624', category: 'DEVOPS & CLOUD' },
    { name: 'AWS Cloud', icon: FaAws, color: '#FF9900', category: 'DEVOPS & CLOUD' },
    { name: 'Nginx', icon: SiNginx, color: '#009639', category: 'DEVOPS & CLOUD' },
    { name: 'Git', icon: SiGit, color: '#F05032', category: 'DEVOPS & CLOUD' },
    { name: 'GitHub', icon: SiGithub, color: '#f0f6fc', category: 'DEVOPS & CLOUD' },
  ],

  // Row 5: Developer Tools & Design (4 items)
  [
    { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC', category: 'DEVOPS & CLOUD' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'MOBILE & FRONTEND' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'BACKEND & APIS' },
    { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'DEVOPS & CLOUD' },
  ],

  // Row 6: Real-Time Protocols (2 items)
  [
    { name: 'WebSockets', icon: SiSocketdotio, color: '#38bdf8', category: 'BACKEND & APIS' },
    { name: 'REST APIs', icon: Network, color: '#10B981', category: 'BACKEND & APIS' },
  ],
]

const categories: Category[] = [
  'ALL',
  'MOBILE & FRONTEND',
  'BACKEND & APIS',
  'DATABASES & ORM',
  'DEVOPS & CLOUD',
]

// Single Tech Squircle Glass Tile Component
function TechTile({
  item,
  isDimmed,
}: {
  item: TechItem
  isDimmed: boolean
}) {
  const Icon = item.icon
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col items-center justify-center 
        w-[68px] h-[68px] xs:w-[74px] xs:h-[74px] sm:w-[86px] sm:h-[86px] md:w-[92px] md:h-[92px]
        rounded-2xl sm:rounded-3xl border 
        transition-all duration-200 cursor-pointer select-none
        ${
          hovered
            ? 'scale-105 -translate-y-1 z-20 border-white/40'
            : isDimmed
            ? 'opacity-25 grayscale scale-95 border-white/5 bg-white/[0.01]'
            : 'border-white/10 dark:border-white/[0.08] bg-[#12131b]/80 dark:bg-[#0c0d14]/80 hover:border-white/30'
        }
      `}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: hovered
          ? `0 14px 28px -6px ${item.color}50, 0 0 16px ${item.color}30`
          : '0 4px 14px rgba(0, 0, 0, 0.35)',
      }}
    >
      {/* Ambient Top Glow on Hover */}
      {hovered && (
        <span
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full blur-xs pointer-events-none"
          style={{ backgroundColor: item.color }}
        />
      )}

      {/* Colorful Icon */}
      <div className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        <Icon
          size={26}
          style={{
            color: item.color,
            filter: hovered ? `drop-shadow(0 0 8px ${item.color}80)` : undefined,
          }}
        />
      </div>

      {/* Clean Technology Label */}
      <span className="mt-1 text-[9px] sm:text-[10.5px] font-medium text-stone-200 tracking-tight text-center truncate max-w-full px-1.5 transition-colors group-hover:text-white">
        {item.name}
      </span>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const { language, t } = useLanguage()

  const categoryLabels: Record<Category, string> = {
    'ALL': t.skills.all,
    'MOBILE & FRONTEND': t.skills.mobileFrontend,
    'BACKEND & APIS': t.skills.backendApis,
    'DATABASES & ORM': t.skills.databasesOrm,
    'DEVOPS & CLOUD': t.skills.devopsCloud,
  }

  // Count total technologies
  const totalCount = useMemo(() => {
    return techRows.reduce((acc, row) => acc + row.length, 0)
  }, [])

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 theme-main-bg theme-text-main border-t theme-border relative overflow-hidden"
    >
      {/* ============================================================== */}
      {/* 3D WIREFRAME SPHERE & CYBER TUNNEL BACKGROUND                  */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Central Violet / Cyan Radial Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] sm:h-[650px] rounded-full blur-[140px] opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%)',
          }}
        />

        {/* 3D Wireframe Globe & Latitudinal Orbit Rings (Pure SVG, 120fps) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] opacity-20 dark:opacity-25"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Sphere Ring */}
          <circle cx="300" cy="300" r="260" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 4" />
          
          {/* Latitudinal Ellipses */}
          <ellipse cx="300" cy="300" rx="260" ry="180" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="300" cy="300" rx="260" ry="100" stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
          <ellipse cx="300" cy="300" rx="260" ry="35" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />

          {/* Longitudinal Ellipses */}
          <ellipse cx="300" cy="300" rx="180" ry="260" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="300" cy="300" rx="100" ry="260" stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
          <ellipse cx="300" cy="300" rx="35" ry="260" stroke="#8b5cf6" strokeWidth="1" opacity="0.8" />

          {/* Perspective Fanning Lines going Downwards */}
          <line x1="300" y1="300" x2="20" y2="580" stroke="#8b5cf6" strokeWidth="0.75" opacity="0.5" />
          <line x1="300" y1="300" x2="160" y2="595" stroke="#8b5cf6" strokeWidth="0.75" opacity="0.5" />
          <line x1="300" y1="300" x2="300" y2="600" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
          <line x1="300" y1="300" x2="440" y2="595" stroke="#8b5cf6" strokeWidth="0.75" opacity="0.5" />
          <line x1="300" y1="300" x2="580" y2="580" stroke="#8b5cf6" strokeWidth="0.75" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-12 space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles size={13} />
            <span>{totalCount}+ PRODUCTION TECHNOLOGIES</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-[0.2em] uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            {language === 'bn' ? 'টেক স্ট্যাক' : 'TECH STACK'}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-stone-400 max-w-xl mx-auto">
            {language === 'bn'
              ? 'মোবাইল ও ফুল-স্ট্যাক ইঞ্জিনিয়ারিংয়ের জন্য পরীক্ষিত ও আধুনিক টেকনোলজি সমাহার'
              : 'Architected for High-Impact Mobile, Distributed Cloud & Scalable Web Systems'}
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* CATEGORY FILTER PILLS                                          */}
        {/* ============================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-purple-600 border-purple-400 text-white font-bold shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-white/[0.04] border-white/10 text-stone-400 hover:text-white hover:border-white/25'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            )
          })}
        </div>

        {/* ============================================================== */}
        {/* TAPERED 6-TIER MATRIX (Exact Match to User Reference Photo)    */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3 max-w-6xl mx-auto">
          {techRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.35, delay: rowIndex * 0.06 }}
              className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 md:gap-3 w-full"
            >
              {row.map((item) => {
                const isDimmed = activeCategory !== 'ALL' && item.category !== activeCategory
                return (
                  <TechTile
                    key={item.name}
                    item={item}
                    isDimmed={isDimmed}
                  />
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* Bottom Micro Footer Badge */}
        <div className="mt-12 sm:mt-16 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-stone-500 border border-white/5 px-4 py-1.5 rounded-full bg-black/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Benchmarked for 60-120fps Mobile & Microservice Scalability</span>
          </span>
        </div>
      </div>
    </section>
  )
}
