'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiKotlin,
  SiReact, SiNextdotjs, SiBootstrap, SiNodedotjs, SiDjango, SiFlask,
  SiFastapi, SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiNumpy,
  SiTailwindcss, SiPandas, SiMysql, SiPostgresql, SiMongodb, SiFirebase,
  SiRedis, SiDocker, SiGit, SiGithub, SiLinux, SiVercel, SiJupyter,
  SiFigma, SiPostman, SiHuggingface, SiGnubash
} from 'react-icons/si'
import { FaHtml5, FaCss3Alt, FaAws } from 'react-icons/fa6'
import { TbBrandAzure, TbBrandVscode, TbBrandAdobePhotoshop, TbBrandOffice } from 'react-icons/tb'
import { Sparkles, Terminal, Globe2, LayoutGrid } from 'lucide-react'
import TechStack3DGlobe, { TechItem } from './TechStack3DGlobe'
import TechStack3DBackground from './TechStack3DBackground'

// 42 High-Impact Colorful Technologies
const ALL_TECH_LIST: TechItem[] = [
  { id: 'python', name: 'Python', icon: SiPython, color: '#387EB8', category: 'core' },
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'core' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'core' },
  { id: 'c', name: 'C', icon: SiC, color: '#659AD2', category: 'core' },
  { id: 'cpp', name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'core' },
  { id: 'kotlin', name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'core' },
  { id: 'html', name: 'HTML5', icon: FaHtml5, color: '#E34F26', category: 'frontend' },
  { id: 'css', name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'frontend' },
  { id: 'bash', name: 'Bash', icon: SiGnubash, color: '#4EAA25', category: 'devops' },
  { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#EDEDED', category: 'frontend' },
  { id: 'bootstrap', name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', category: 'backend' },
  { id: 'django', name: 'Django', icon: SiDjango, color: '#2BA977', category: 'backend' },
  { id: 'flask', name: 'Flask', icon: SiFlask, color: '#E0E0E0', category: 'backend' },
  { id: 'fastapi', name: 'FastAPI', icon: SiFastapi, color: '#05998B', category: 'backend' },
  { id: 'tensorflow', name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', category: 'aiml' },
  { id: 'pytorch', name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'aiml' },
  { id: 'scikitlearn', name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E', category: 'aiml' },
  { id: 'opencv', name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', category: 'aiml' },
  { id: 'numpy', name: 'NumPy', icon: SiNumpy, color: '#4DABCF', category: 'aiml' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },
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

// DESKTOP TAPERED MATRIX: 11 -> 10 -> 8 -> 6 -> 4 -> 2 (41 items)
const DESKTOP_ROWS: string[][] = [
  ['python', 'javascript', 'typescript', 'c', 'cpp', 'kotlin', 'html', 'css', 'react', 'nextjs', 'bootstrap'],
  ['nodejs', 'django', 'flask', 'fastapi', 'tensorflow', 'pytorch', 'scikitlearn', 'opencv', 'numpy', 'tailwind'],
  ['pandas', 'mysql', 'postgresql', 'mongodb', 'firebase', 'redis', 'docker', 'azure'],
  ['git', 'github', 'linux', 'aws', 'vscode', 'vercel'],
  ['jupyter', 'figma', 'postman', 'photoshop'],
  ['huggingface', 'msoffice']
]

// MOBILE CONTOUR MATRIX: 7 -> 5 -> 7 -> 3 -> 7 -> 1 -> 6 -> 4 -> 2 (42 items)
const MOBILE_ROWS: string[][] = [
  ['python', 'javascript', 'typescript', 'c', 'cpp', 'kotlin', 'html'],
  ['css', 'bash', 'react', 'nextjs', 'bootstrap'],
  ['nodejs', 'django', 'flask', 'fastapi', 'tensorflow', 'pytorch', 'scikitlearn'],
  ['opencv', 'numpy', 'tailwind'],
  ['pandas', 'mysql', 'postgresql', 'mongodb', 'firebase', 'redis', 'docker'],
  ['azure'],
  ['git', 'github', 'linux', 'aws', 'vscode', 'vercel'],
  ['jupyter', 'figma', 'postman', 'photoshop'],
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

function SquircleTechTile({
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
      className={`relative group flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none ${
        isDesktop
          ? 'w-[64px] h-[72px] sm:w-[70px] sm:h-[80px] md:w-[76px] md:h-[86px] lg:w-[82px] lg:h-[92px] rounded-xl sm:rounded-2xl p-1.5'
          : 'w-[42px] h-[50px] xs:w-[46px] xs:h-[54px] rounded-lg xs:rounded-xl p-1'
      }`}
      style={{
        backgroundColor: hovered
          ? 'rgba(18, 22, 34, 0.95)'
          : 'rgba(10, 12, 19, 0.85)',
        backdropFilter: 'blur(8px)',
        border: hovered
          ? `1px solid ${tech.color}`
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: hovered
          ? `0 0 20px ${tech.color}45, 0 8px 16px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.2)`
          : '0 4px 10px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255,255,255,0.04)',
        opacity: isDimmed ? 0.25 : 1,
        transform: hovered ? 'scale(1.1) translateY(-3px)' : 'scale(1) translateY(0)',
        zIndex: hovered ? 30 : 10,
        contain: 'paint layout',
        willChange: 'transform',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />

      <div
        className="transition-transform duration-200 group-hover:scale-105 flex items-center justify-center"
        style={{
          filter: hovered
            ? `drop-shadow(0 0 8px ${tech.color})`
            : `drop-shadow(0 1px 2px rgba(0,0,0,0.5))`,
        }}
      >
        <Icon
          className={
            isDesktop
              ? 'text-xl sm:text-2xl md:text-[26px] lg:text-[28px]'
              : 'text-[15px] xs:text-[17px]'
          }
          style={{ color: tech.color }}
        />
      </div>

      <span
        className={`font-mono text-center tracking-tight truncate max-w-full font-medium transition-colors duration-150 ${
          isDesktop
            ? 'mt-1 text-[9px] sm:text-[10px] md:text-[11px]'
            : 'mt-0.5 text-[6.5px] xs:text-[7.5px]'
        }`}
        style={{
          color: hovered ? '#FFFFFF' : 'rgba(214, 219, 230, 0.85)',
          textShadow: hovered ? `0 0 6px ${tech.color}` : 'none'
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
  const [viewMode, setViewMode] = useState<'3d' | 'matrix'>('3d')

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-24 relative overflow-hidden bg-[#06080d] text-white border-t border-white/5 select-none"
    >
      {/* 3D Background Mesh (Active in matrix mode or ambient) */}
      {viewMode === 'matrix' && <TechStack3DBackground inView={inView} />}

      {/* ATMOSPHERIC BACKGROUND MATCHING PORTFOLIO PALETTE (Emerald + Cyan + Cyber Slate) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[450px] sm:h-[650px] rounded-full blur-[120px] sm:blur-[160px] opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.18) 40%, rgba(99,102,241,0.08) 70%, transparent 100%)'
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
          className="flex flex-col items-center justify-center text-center mb-6"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles size={12} className="text-emerald-400 animate-pulse" />
            <span>3D Interactive Engineering Ecosystem</span>
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
          <p className="mt-2 text-xs sm:text-sm text-stone-400 font-mono tracking-wide max-w-xl">
            Integrated multi-platform ecosystem — 42 technologies mounted directly in full 3D interactive spatial orbit.
          </p>

          {/* VIEW MODE TOGGLE BUTTONS (3D Globe vs Matrix Grid) */}
          <div className="mt-5 inline-flex items-center p-1 rounded-full bg-[#0d101a] border border-white/10 shadow-lg">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Globe2 size={13} />
              <span>3D Cyber Globe</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Matrix Grid</span>
            </button>
          </div>
        </motion.div>

        {/* CATEGORY FILTER PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex items-center justify-center mb-6 sm:mb-8"
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
                      : 'bg-white/[0.03] text-stone-400 border-white/10 hover:border-emerald-500/30 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ===================================================================== */}
        {/* VIEW 1: 3D CYBER GLOBE (Skills mounted directly onto the 3D Sphere!) */}
        {/* ===================================================================== */}
        {viewMode === '3d' && (
          <TechStack3DGlobe
            items={ALL_TECH_LIST}
            activeCategory={activeCategory}
            inView={inView}
          />
        )}

        {/* ===================================================================== */}
        {/* VIEW 2: FLAT MATRIX GRID (Alternative Clean Tapered View)             */}
        {/* ===================================================================== */}
        {viewMode === 'matrix' && (
          <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col items-center justify-center gap-2.5 lg:gap-3.5 mx-auto relative z-10 animate-fade-in">
              {DESKTOP_ROWS.map((rowTechIds, rowIndex) => (
                <div
                  key={`desktop-row-${rowIndex}`}
                  className="flex flex-nowrap items-center justify-center gap-2 lg:gap-2.5"
                >
                  {rowTechIds.map((id) => {
                    const tech = TECH_REGISTRY[id]
                    if (!tech) return null
                    const isDimmed = activeCategory !== 'ALL' && tech.category !== activeCategory
                    return (
                      <SquircleTechTile
                        key={`dt-${tech.id}`}
                        tech={tech}
                        isDimmed={isDimmed}
                        isDesktop={true}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden flex-col items-center justify-center gap-1.5 xs:gap-2 mx-auto relative z-10 animate-fade-in">
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
                      <SquircleTechTile
                        key={`mob-${tech.id}`}
                        tech={tech}
                        isDimmed={isDimmed}
                        isDesktop={false}
                      />
                    )
                    })}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom Verification Status */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400/80">
          <Terminal size={14} className="text-emerald-400" />
          <span>42 Core Production Technologies In Spatial Orbit</span>
        </div>

      </div>
    </section>
  )
}
