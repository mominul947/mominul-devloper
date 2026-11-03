'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiPython, SiJavascript, SiTypescript, SiPhp, SiLaravel, SiFlutter,
  SiC, SiCplusplus, SiKotlin, SiReact, SiNextdotjs, SiBootstrap,
  SiNodedotjs, SiDjango, SiFlask, SiFastapi, SiTensorflow, SiPytorch,
  SiScikitlearn, SiOpencv, SiNumpy, SiTailwindcss, SiPandas, SiMysql,
  SiPostgresql, SiMongodb, SiFirebase, SiRedis, SiDocker, SiGit,
  SiGithub, SiLinux, SiVercel, SiJupyter, SiFigma, SiPostman,
  SiHuggingface, SiGnubash
} from 'react-icons/si'
import { FaHtml5, FaCss3Alt, FaAws } from 'react-icons/fa6'
import { TbBrandAzure, TbBrandVscode, TbBrandAdobePhotoshop, TbBrandOffice } from 'react-icons/tb'
import { Sparkles, Terminal } from 'lucide-react'
import type { IconType } from 'react-icons'
import TechStack3DBackground from './TechStack3DBackground'

export interface TechItem {
  id: string
  name: string
  icon: IconType
  color: string
  category: 'core' | 'frontend' | 'backend' | 'aiml' | 'database' | 'devops' | 'tools'
}

// 42 High-Impact Colorful Technologies (Including PHP, Laravel, Flutter)
const ALL_TECH_LIST: TechItem[] = [
  { id: 'python', name: 'Python', icon: SiPython, color: '#387EB8', category: 'core' },
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'core' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'core' },
  { id: 'php', name: 'PHP', icon: SiPhp, color: '#777BB4', category: 'backend' },
  { id: 'laravel', name: 'Laravel', icon: SiLaravel, color: '#FF2D20', category: 'backend' },
  { id: 'flutter', name: 'Flutter', icon: SiFlutter, color: '#47C5FB', category: 'frontend' },
  { id: 'c', name: 'C', icon: SiC, color: '#659AD2', category: 'core' },
  { id: 'cpp', name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'core' },
  { id: 'kotlin', name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'core' },
  { id: 'html', name: 'HTML5', icon: FaHtml5, color: '#E34F26', category: 'frontend' },
  { id: 'css', name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'frontend' },
  { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#EDEDED', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', category: 'backend' },
  { id: 'django', name: 'Django', icon: SiDjango, color: '#2BA977', category: 'backend' },
  { id: 'flask', name: 'Flask', icon: SiFlask, color: '#E0E0E0', category: 'backend' },
  { id: 'fastapi', name: 'FastAPI', icon: SiFastapi, color: '#05998B', category: 'backend' },
  { id: 'tensorflow', name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', category: 'aiml' },
  { id: 'pytorch', name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'aiml' },
  { id: 'scikitlearn', name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E', category: 'aiml' },
  { id: 'opencv', name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', category: 'aiml' },
  { id: 'numpy', name: 'NumPy', icon: SiNumpy, color: '#4DABCF', category: 'aiml' },
  { id: 'pandas', name: 'Pandas', icon: SiPandas, color: '#E70488', category: 'aiml' },
  { id: 'mysql', name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'database' },
  { id: 'firebase', name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'database' },
  { id: 'redis', name: 'Redis', icon: SiRedis, color: '#FF4438', category: 'database' },
  { id: 'docker', name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'devops' },
  { id: 'azure', name: 'Azure', icon: TbBrandAzure, color: '#0078D4', category: 'devops' },
  { id: 'git', name: 'Git', icon: SiGit, color: '#F05032', category: 'devops' },
  { id: 'github', name: 'GitHub', icon: SiGithub, color: '#F0F6FC', category: 'devops' },
  { id: 'linux', name: 'Linux', icon: SiLinux, color: '#FCC624', category: 'devops' },
  { id: 'aws', name: 'AWS Cloud', icon: FaAws, color: '#FF9900', category: 'devops' },
  { id: 'vscode', name: 'VS Code', icon: TbBrandVscode, color: '#007ACC', category: 'tools' },
  { id: 'vercel', name: 'Vercel', icon: SiVercel, color: '#FFFFFF', category: 'devops' },
  { id: 'jupyter', name: 'Jupyter', icon: SiJupyter, color: '#F37626', category: 'aiml' },
  { id: 'figma', name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'tools' },
  { id: 'postman', name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'tools' },
  { id: 'photoshop', name: 'Photoshop', icon: TbBrandAdobePhotoshop, color: '#31A8FF', category: 'tools' },
  { id: 'huggingface', name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E', category: 'aiml' },
  { id: 'msoffice', name: 'MS Office', icon: TbBrandOffice, color: '#D83B01', category: 'tools' },
]

const TECH_REGISTRY: Record<string, TechItem> = ALL_TECH_LIST.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {} as Record<string, TechItem>)

// DESKTOP PYRAMID MATRIX: 11 -> 10 -> 8 -> 6 -> 4 -> 2 (41 items)
// Features PHP and Laravel prominently in the top tiers
const DESKTOP_ROWS: string[][] = [
  // Row 1: 11 items (Core Languages & Frontend Foundation)
  ['python', 'javascript', 'typescript', 'php', 'c', 'cpp', 'kotlin', 'flutter', 'react', 'nextjs', 'tailwind'],
  // Row 2: 10 items (Backend Engines & AI Frameworks)
  ['laravel', 'nodejs', 'django', 'fastapi', 'flask', 'tensorflow', 'pytorch', 'scikitlearn', 'opencv', 'numpy'],
  // Row 3: 8 items (Databases & Cloud Architecture)
  ['pandas', 'mysql', 'postgresql', 'mongodb', 'firebase', 'redis', 'docker', 'azure'],
  // Row 4: 6 items (DevOps & Infrastructure)
  ['git', 'github', 'linux', 'aws', 'vscode', 'vercel'],
  // Row 5: 4 items (Creative Tools & APIs)
  ['jupyter', 'figma', 'postman', 'photoshop'],
  // Row 6: 2 items (Machine Learning & Productivity)
  ['huggingface', 'msoffice']
]

// MOBILE PYRAMID CONTOUR: 7 -> 5 -> 7 -> 3 -> 7 -> 1 -> 6 -> 4 -> 2
const MOBILE_ROWS: string[][] = [
  // Row 1: 7 items (Includes PHP)
  ['python', 'javascript', 'typescript', 'php', 'c', 'cpp', 'kotlin'],
  // Row 2: 5 items (Includes Flutter & Frontend)
  ['html', 'css', 'flutter', 'react', 'nextjs'],
  // Row 3: 7 items (Includes Laravel & Backend)
  ['laravel', 'nodejs', 'django', 'fastapi', 'flask', 'tensorflow', 'pytorch'],
  // Row 4: 3 items
  ['opencv', 'numpy', 'tailwind'],
  // Row 5: 7 items
  ['pandas', 'mysql', 'postgresql', 'mongodb', 'firebase', 'redis', 'docker'],
  // Row 6: 1 item
  ['azure'],
  // Row 7: 6 items
  ['git', 'github', 'linux', 'aws', 'vscode', 'vercel'],
  // Row 8: 4 items
  ['jupyter', 'figma', 'postman', 'photoshop'],
  // Row 9: 2 items
  ['huggingface', 'msoffice']
]

const CATEGORY_FILTERS = [
  { id: 'ALL', label: 'All Technologies' },
  { id: 'core', label: 'Languages' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'aiml', label: 'AI, ML & Data' },
  { id: 'database', label: 'Databases' },
  { id: 'devops', label: 'DevOps & Cloud' },
  { id: 'tools', label: 'Tools & Design' }
]

// 100% Crisp, Non-Blurry, 3D Interactive Squircle Card
function SharpSquircleTechTile({
  tech,
  isDimmed,
  isDesktop
}: {
  tech: TechItem
  isDimmed: boolean
  isDesktop: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = tech.icon

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-200 ${
        isDesktop
          ? 'w-[66px] h-[74px] sm:w-[72px] sm:h-[82px] md:w-[78px] md:h-[88px] lg:w-[84px] lg:h-[94px] rounded-xl sm:rounded-2xl p-1.5'
          : 'w-[44px] h-[52px] xs:w-[48px] xs:h-[56px] rounded-lg xs:rounded-xl p-1'
      }`}
      style={{
        backgroundColor: hovered ? '#151928' : '#0c0f18',
        border: hovered
          ? `1.5px solid ${tech.color}`
          : '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: hovered
          ? `0 0 24px ${tech.color}55, 0 10px 20px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255,255,255,0.25)`
          : '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.06)',
        opacity: isDimmed ? 0.22 : 1,
        transform: hovered
          ? 'translateZ(28px) translateY(-5px) scale(1.12)'
          : 'translateZ(0px) translateY(0px) scale(1)',
        zIndex: hovered ? 40 : 10,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Specular crisp top highlight */}
      <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/15 to-transparent rounded-t-xl pointer-events-none" />

      {/* Razor-Sharp Brand Icon (100% Vector Crispness) */}
      <div
        className="transition-transform duration-200 group-hover:scale-110 flex items-center justify-center"
        style={{
          filter: hovered
            ? `drop-shadow(0 0 10px ${tech.color})`
            : `drop-shadow(0 1px 2px rgba(0,0,0,0.6))`,
        }}
      >
        <Icon
          className={
            isDesktop
              ? 'text-2xl sm:text-[26px] md:text-[28px] lg:text-[30px]'
              : 'text-[17px] xs:text-[19px]'
          }
          style={{ color: tech.color }}
        />
      </div>

      {/* Crystal Clear High-Contrast Tech Name */}
      <span
        className={`font-mono text-center tracking-tight truncate max-w-full font-bold transition-colors duration-150 ${
          isDesktop
            ? 'mt-1 text-[9.5px] sm:text-[10.5px] md:text-[11.5px]'
            : 'mt-0.5 text-[7px] xs:text-[8px]'
        }`}
        style={{
          color: hovered ? '#FFFFFF' : '#E2E8F0',
          textShadow: hovered
            ? `0 0 8px ${tech.color}`
            : '0 1px 2px rgba(0,0,0,0.9)',
          letterSpacing: '-0.02em',
        }}
      >
        {tech.name}
      </span>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-30px' })
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  // Interactive 3D Perspective Tilt for the entire Matrix Plane
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMovePlane = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateY = (x / (rect.width / 2)) * 6
    const rotateX = -(y / (rect.height / 2)) * 6
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeavePlane = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-24 relative overflow-hidden bg-[#06080d] text-white border-t border-white/5 select-none"
    >
      {/* 3D ROTATING WIREFRAME CYBER GLOBE IN BACKGROUND */}
      <TechStack3DBackground inView={inView} />

      {/* ATMOSPHERIC BACKGROUND MATCHING PORTFOLIO PALETTE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[450px] sm:h-[650px] rounded-full blur-[130px] opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.32) 0%, rgba(6,182,212,0.18) 40%, rgba(99,102,241,0.08) 70%, transparent 100%)'
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-cyan-600/10 blur-[140px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 90% 60% at 50% 45%, transparent 35%, rgba(16, 185, 129, 0.35) 75%, transparent 100%),
              repeating-radial-gradient(ellipse 90% 60% at 50% 45%, transparent 0, transparent 40px, rgba(255, 255, 255, 0.1) 41px, transparent 42px)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles size={12} className="text-emerald-400 animate-pulse" />
            <span>Interactive 3D Engineering Matrix</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-widest uppercase"
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              letterSpacing: '0.16em',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #A7F3D0 55%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(16, 185, 129, 0.35)'
            }}
          >
            TECH STACK
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 font-mono tracking-wide max-w-xl">
            Multi-platform full-stack engineering stack — hovering triggers authentic neon brand resonance.
          </p>
        </motion.div>

        {/* CATEGORY FILTER PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex items-center justify-center mb-8 sm:mb-12"
        >
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-none justify-start sm:justify-center">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium tracking-wide transition-all duration-150 cursor-pointer flex-shrink-0 border ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] font-bold'
                      : 'bg-[#0e121c] text-stone-300 border-white/10 hover:border-emerald-500/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* =========================================================================
            PYRAMID MATRIX (11 -> 10 -> 8 -> 6 -> 4 -> 2) WITH LARAVEL, PHP & FLUTTER
           ========================================================================= */}
        <div
          onMouseMove={handleMouseMovePlane}
          onMouseLeave={handleMouseLeavePlane}
          className="relative mx-auto transition-transform duration-300 ease-out"
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* DESKTOP MATRIX: TAPERED PYRAMID (11 -> 10 -> 8 -> 6 -> 4 -> 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="hidden md:flex flex-col items-center justify-center gap-2.5 lg:gap-3.5 mx-auto relative z-10 transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {DESKTOP_ROWS.map((rowTechIds, rowIndex) => (
              <div
                key={`desktop-row-${rowIndex}`}
                className="flex flex-nowrap items-center justify-center gap-2 lg:gap-2.5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {rowTechIds.map((id) => {
                  const tech = TECH_REGISTRY[id]
                  if (!tech) return null
                  const isDimmed = activeCategory !== 'ALL' && tech.category !== activeCategory
                  return (
                    <SharpSquircleTechTile
                      key={`dt-${tech.id}`}
                      tech={tech}
                      isDimmed={isDimmed}
                      isDesktop={true}
                    />
                  )
                })}
              </div>
            ))}
          </motion.div>

          {/* MOBILE MATRIX: HOURGLASS FUNNEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex md:hidden flex-col items-center justify-center gap-1.5 xs:gap-2 mx-auto relative z-10"
          >
            {MOBILE_ROWS.map((rowTechIds, rowIndex) => (
              <div
                key={`mobile-row-${rowIndex}`}
                className="flex flex-nowrap items-center justify-center gap-1 xs:gap-1.5 w-full"
              >
                {rowTechIds.map((id) => {
                  const tech = TECH_REGISTRY[id]
                  if (!tech) return null
                  const isDimmed = activeCategory !== 'ALL' && tech.category !== activeCategory
                  return (
                    <SharpSquircleTechTile
                      key={`mob-${tech.id}`}
                      tech={tech}
                      isDimmed={isDimmed}
                      isDesktop={false}
                    />
                  )
                })}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Verification Status */}
        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
          <Terminal size={14} className="text-emerald-400" />
          <span>42 Core Production Technologies Verified & Indexed</span>
        </div>

      </div>
    </section>
  )
}
