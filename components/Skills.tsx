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
import { Sparkles, Terminal } from 'lucide-react'
import type { IconType } from 'react-icons'
import TechStack3DBackground from './TechStack3DBackground'

interface TechItem {
  id: string
  name: string
  icon: IconType
  color: string
  category: 'core' | 'frontend' | 'backend' | 'aiml' | 'database' | 'devops' | 'tools'
}

// 42 High-Impact Colorful Technologies matching user reference matrix
const TECH_REGISTRY: Record<string, TechItem> = {
  python: { id: 'python', name: 'Python', icon: SiPython, color: '#387EB8', category: 'core' },
  javascript: { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'core' },
  typescript: { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'core' },
  c: { id: 'c', name: 'C', icon: SiC, color: '#659AD2', category: 'core' },
  cpp: { id: 'cpp', name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'core' },
  kotlin: { id: 'kotlin', name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'core' },
  html: { id: 'html', name: 'HTML', icon: FaHtml5, color: '#E34F26', category: 'frontend' },
  css: { id: 'css', name: 'CSS', icon: FaCss3Alt, color: '#1572B6', category: 'frontend' },
  bash: { id: 'bash', name: 'Bash', icon: SiGnubash, color: '#4EAA25', category: 'devops' },
  react: { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB', category: 'frontend' },
  nextjs: { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#EDEDED', category: 'frontend' },
  bootstrap: { id: 'bootstrap', name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', category: 'frontend' },
  nodejs: { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', category: 'backend' },
  django: { id: 'django', name: 'Django', icon: SiDjango, color: '#2BA977', category: 'backend' },
  flask: { id: 'flask', name: 'Flask', icon: SiFlask, color: '#E0E0E0', category: 'backend' },
  fastapi: { id: 'fastapi', name: 'FastAPI', icon: SiFastapi, color: '#05998B', category: 'backend' },
  tensorflow: { id: 'tensorflow', name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', category: 'aiml' },
  pytorch: { id: 'pytorch', name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'aiml' },
  scikitlearn: { id: 'scikitlearn', name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E', category: 'aiml' },
  opencv: { id: 'opencv', name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', category: 'aiml' },
  numpy: { id: 'numpy', name: 'NumPy', icon: SiNumpy, color: '#4DABCF', category: 'aiml' },
  tailwind: { id: 'tailwind', name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },
  pandas: { id: 'pandas', name: 'Pandas', icon: SiPandas, color: '#E70488', category: 'aiml' },
  mysql: { id: 'mysql', name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'database' },
  postgresql: { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'database' },
  mongodb: { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'database' },
  firebase: { id: 'firebase', name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'database' },
  redis: { id: 'redis', name: 'Redis', icon: SiRedis, color: '#FF4438', category: 'database' },
  docker: { id: 'docker', name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'devops' },
  azure: { id: 'azure', name: 'Azure', icon: TbBrandAzure, color: '#0078D4', category: 'devops' },
  git: { id: 'git', name: 'Git', icon: SiGit, color: '#F05032', category: 'devops' },
  github: { id: 'github', name: 'GitHub', icon: SiGithub, color: '#F0F6FC', category: 'devops' },
  linux: { id: 'linux', name: 'Linux', icon: SiLinux, color: '#FCC624', category: 'devops' },
  aws: { id: 'aws', name: 'AWS', icon: FaAws, color: '#FF9900', category: 'devops' },
  vscode: { id: 'vscode', name: 'VS Code', icon: TbBrandVscode, color: '#007ACC', category: 'tools' },
  vercel: { id: 'vercel', name: 'Vercel', icon: SiVercel, color: '#FFFFFF', category: 'devops' },
  jupyter: { id: 'jupyter', name: 'Jupyter', icon: SiJupyter, color: '#F37626', category: 'aiml' },
  figma: { id: 'figma', name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'tools' },
  postman: { id: 'postman', name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'tools' },
  photoshop: { id: 'photoshop', name: 'Photoshop', icon: TbBrandAdobePhotoshop, color: '#31A8FF', category: 'tools' },
  huggingface: { id: 'huggingface', name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E', category: 'aiml' },
  msoffice: { id: 'msoffice', name: 'MS Office', icon: TbBrandOffice, color: '#D83B01', category: 'tools' },
}

// DESKTOP TAPERED MATRIX: 11 -> 10 -> 8 -> 6 -> 4 -> 2 (41 items)
// Matching user desktop reference photo media_1793719195230_77d5e227.jpg
const DESKTOP_ROWS: string[][] = [
  // Row 1: 11 items
  ['python', 'javascript', 'typescript', 'c', 'cpp', 'kotlin', 'html', 'css', 'react', 'nextjs', 'bootstrap'],
  // Row 2: 10 items
  ['nodejs', 'django', 'flask', 'fastapi', 'tensorflow', 'pytorch', 'scikitlearn', 'opencv', 'numpy', 'tailwind'],
  // Row 3: 8 items
  ['pandas', 'mysql', 'postgresql', 'mongodb', 'firebase', 'redis', 'docker', 'azure'],
  // Row 4: 6 items
  ['git', 'github', 'linux', 'aws', 'vscode', 'vercel'],
  // Row 5: 4 items
  ['jupyter', 'figma', 'postman', 'photoshop'],
  // Row 6: 2 items
  ['huggingface', 'msoffice']
]

// MOBILE CONTOUR MATRIX: 7 -> 5 -> 7 -> 3 -> 7 -> 1 -> 6 -> 4 -> 2 (42 items)
// Matching user mobile reference photo media_1793719196340_e25caa9f.jpg
const MOBILE_ROWS: string[][] = [
  // Row 1: 7 items
  ['python', 'javascript', 'typescript', 'c', 'cpp', 'kotlin', 'html'],
  // Row 2: 5 items
  ['css', 'bash', 'react', 'nextjs', 'bootstrap'],
  // Row 3: 7 items
  ['nodejs', 'django', 'flask', 'fastapi', 'tensorflow', 'pytorch', 'scikitlearn'],
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
      {/* Specular glare shine on top */}
      <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />

      {/* Brand Colorful Icon */}
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

      {/* Tech Name Label Underneath */}
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

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-24 relative overflow-hidden bg-[#06080d] text-white border-t border-white/5 select-none"
    >
      {/* 3D INTERACTIVE WIREFRAME GLOBE / CYBER MESH (Zero-lag on mobile) */}
      <TechStack3DBackground inView={inView} />

      {/* ATMOSPHERIC BACKGROUND MATCHING USER'S PORTFOLIO PALETTE (Emerald + Cyan + Deep Space) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Central emerald & cyan atmospheric orb behind the 3D globe */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[450px] sm:h-[650px] rounded-full blur-[120px] sm:blur-[160px] opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.18) 40%, rgba(99,102,241,0.08) 70%, transparent 100%)'
          }}
        />

        {/* Outer ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-cyan-600/10 blur-[140px] rounded-full" />

        {/* Curved perspective wireframe tunnel grid lines */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 90% 60% at 50% 45%, transparent 35%, rgba(16, 185, 129, 0.35) 75%, transparent 100%),
              repeating-radial-gradient(ellipse 90% 60% at 50% 45%, transparent 0, transparent 40px, rgba(255, 255, 255, 0.1) 41px, transparent 42px)
            `
          }}
        />

        {/* Subtle Cyber Dust Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* SECTION HEADER: MATCHING USER'S WEBSITE AESTHETICS (Emerald/Cyan Theme) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8"
        >
          {/* Neon Emerald Top Badge (Matching site's navbar style) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles size={12} className="text-emerald-400 animate-pulse" />
            <span>Interactive Brand Ecosystem</span>
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
            Multi-platform full-stack engineering stack — hovering triggers authentic neon brand resonance.
          </p>
        </motion.div>

        {/* CATEGORY FILTER PILLS (Matching site's emerald theme, swipeable on mobile) */}
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
                      : 'bg-white/[0.03] text-stone-400 border-white/10 hover:border-emerald-500/30 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP MATRIX: TAPERED FUNNEL (11 -> 10 -> 8 -> 6 -> 4 -> 2)      */}
        {/* (Hidden on mobile screens, strictly visible on md and up)           */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="hidden md:flex flex-col items-center justify-center gap-2.5 lg:gap-3.5 mx-auto relative z-10"
        >
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
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE MATRIX: HOURGLASS FUNNEL (7->5->7->3->7->1->6->4->2)        */}
        {/* (Zero-lag hardware-accelerated for touch phones)                   */}
        {/* ------------------------------------------------------------------ */}
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
        </motion.div>

        {/* Bottom Verification Status */}
        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400/80">
          <Terminal size={14} className="text-emerald-400" />
          <span>42 Core Production Technologies Indexed & Verified</span>
        </div>

      </div>
    </section>
  )
}
