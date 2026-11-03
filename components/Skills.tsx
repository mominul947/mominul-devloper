'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs,
  SiMongodb, SiPostgresql, SiRedis, SiPrisma, SiSupabase, SiFirebase,
  SiDocker,
  SiFlutter, SiKotlin, SiJetpackcompose, SiLaravel,
  SiPython, SiFastapi, SiGo, SiSocketdotio, SiGraphql,
  SiLinux, SiNginx, SiGithubactions
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { Sparkles, CheckCircle2 } from 'lucide-react'

const categories = [
  'ALL',
  'MOBILE & FRONTEND',
  'BACKEND & APIS',
  'DATABASES & ORM',
  'DEVOPS & CLOUD'
]

const skills = [
  // Mobile & Frontend
  { name: 'Flutter', icon: SiFlutter, color: '#02569B', level: 95, category: 'MOBILE & FRONTEND' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', level: 94, category: 'MOBILE & FRONTEND' },
  { name: 'Jetpack Compose', icon: SiJetpackcompose, color: '#4285F4', level: 92, category: 'MOBILE & FRONTEND' },
  { name: 'Next.js 14', icon: SiNextdotjs, color: '#e2e8f0', level: 96, category: 'MOBILE & FRONTEND' },
  { name: 'React Native', icon: SiReact, color: '#0284c7', level: 92, category: 'MOBILE & FRONTEND' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 95, category: 'MOBILE & FRONTEND' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 96, category: 'MOBILE & FRONTEND' },

  // Backend & APIs
  { name: 'Node.js', icon: SiNodedotjs, color: '#16a34a', level: 94, category: 'BACKEND & APIS' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688', level: 93, category: 'BACKEND & APIS' },
  { name: 'Python', icon: SiPython, color: '#3776AB', level: 92, category: 'BACKEND & APIS' },
  { name: 'Golang', icon: SiGo, color: '#00ADD8', level: 88, category: 'BACKEND & APIS' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', level: 95, category: 'BACKEND & APIS' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', level: 90, category: 'BACKEND & APIS' },
  { name: 'WebSockets', icon: SiSocketdotio, color: '#38bdf8', level: 92, category: 'BACKEND & APIS' },

  // Databases & ORM
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', level: 94, category: 'DATABASES & ORM' },
  { name: 'MongoDB', icon: SiMongodb, color: '#059669', level: 94, category: 'DATABASES & ORM' },
  { name: 'Redis', icon: SiRedis, color: '#dc2626', level: 90, category: 'DATABASES & ORM' },
  { name: 'Prisma ORM', icon: SiPrisma, color: '#38bdf8', level: 92, category: 'DATABASES & ORM' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E', level: 91, category: 'DATABASES & ORM' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 92, category: 'DATABASES & ORM' },

  // DevOps & Cloud
  { name: 'Docker', icon: SiDocker, color: '#0284c7', level: 90, category: 'DEVOPS & CLOUD' },
  { name: 'Linux VPS', icon: SiLinux, color: '#FCC624', level: 93, category: 'DEVOPS & CLOUD' },
  { name: 'Nginx Proxy', icon: SiNginx, color: '#009639', level: 92, category: 'DEVOPS & CLOUD' },
  { name: 'AWS Cloud', icon: FaAws, color: '#FF9900', level: 88, category: 'DEVOPS & CLOUD' },
  { name: 'GitHub CI/CD', icon: SiGithubactions, color: '#2088FF', level: 91, category: 'DEVOPS & CLOUD' },
]

// High-Performance Mobile-Optimized Skill Card (No layout reflows, hardware-accelerated)
function SkillCard({ skill, inView }: { skill: typeof skills[0]; inView: boolean }) {
  const Icon = skill.icon

  return (
    <div
      className="p-3 sm:p-3.5 rounded-2xl border theme-border transition-colors duration-150 group cursor-default flex items-center gap-3 shadow-xs hover:border-emerald-500/40 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        contain: 'paint layout',
      }}
    >
      {/* Skill Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border theme-border transition-transform group-hover:scale-105"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <Icon size={20} style={{ color: skill.color }} />
      </div>

      {/* Info & Progress */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <h3 className="font-bold theme-text-main text-xs sm:text-sm truncate">
            {skill.name}
          </h3>
          <span className="text-[10px] font-mono font-bold text-emerald-500 flex-shrink-0">
            {skill.level}%
          </span>
        </div>

        {/* Hardware-Accelerated Progress Bar */}
        <div className="w-full h-1 rounded-full bg-black/15 dark:bg-white/10 overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 origin-left transition-transform duration-700 ease-out"
            style={{
              transform: inView ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
              willChange: inView ? 'auto' : 'transform',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  // once: true ensures animations run smoothly ONCE and don't re-trigger on every mobile scroll event!
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filtered = useMemo(() => {
    return activeCategory === 'ALL'
      ? skills
      : skills.filter((s) => s.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="skills" className="py-12 sm:py-20 theme-main-bg theme-text-main border-t theme-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10" ref={ref}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 border-b theme-border pb-3 sm:pb-4"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest theme-text-accent font-bold mb-1 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>PRODUCTION TESTED CAPABILITIES</span>
            </p>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              TECH STACK &amp; SKILLS
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 font-bold">
            <CheckCircle2 size={13} />
            <span>BENCHMARKED ON PRODUCTION LINUX VPS</span>
          </div>
        </motion.div>

        {/* Category Filters (Swipeable on mobile) */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-150 cursor-pointer border flex-shrink-0"
                style={{
                  backgroundColor: isActive ? 'var(--accent)' : 'var(--bg-card)',
                  color: isActive ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                  borderColor: isActive ? 'var(--accent)' : 'var(--border-subtle)',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Compact 4-Column High-Performance Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
