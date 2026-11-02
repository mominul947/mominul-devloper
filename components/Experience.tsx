'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Senior Full Stack & Mobile Developer',
    company: 'TechNova Solutions & Freelance',
    location: 'Remote & Global Clients',
    period: '2023 – Present',
    description:
      'Architecting high-scale SaaS web platforms and cross-platform mobile applications. Led microservice performance tuning and real-time WebSocket implementations.',
    achievements: [
      'Engineered cross-platform mobile applications with sub-120ms API response latency',
      'Architected Next.js 14 platforms with Server Actions and automated Stripe workflows',
      'Delivered 50+ successful projects across international freelance clients on Fiverr',
      'Maintained 99.8% crash-free mobile sessions and automated CI/CD releases',
    ],
    tags: ['React Native', 'Next.js 14', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer & App Engineer',
    company: 'PixelCraft Agency',
    location: 'Bogura Sadar, Bogura',
    period: '2023 – 2024',
    description:
      'Developed 25+ client applications and digital portals. Specialized in responsive UI architecture, real-time messaging, and high-conversion payment flows.',
    achievements: [
      'Delivered 25+ custom web & mobile client applications on schedule',
      'Integrated real-time push notifications and secure OAuth biometric auth flows',
      'Achieved 98+ Google Lighthouse performance scores across client deployments',
    ],
    tags: ['React', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redis'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <section id="experience" className="py-24 bg-[#0a0a0d] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-red-500 mb-1">
              CAREER TIMELINE
            </p>
            <h2 className="font-billboard text-4xl sm:text-6xl text-white tracking-wide">
              EXPERIENCE & TRACK RECORD
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            PROVEN TRACK RECORD IN MOBILE & WEB
          </span>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative">
          {/* Vertical Crimson Accent Line */}
          <div className="hidden lg:block absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-red-500 via-red-500/30 to-transparent pointer-events-none" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative flex flex-col lg:flex-row items-start gap-6 p-6 sm:p-8 rounded-2xl bg-[#0f0f14] border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 group"
            >
              {/* Left Indicator Node */}
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                {exp.type === 'education' ? (
                  <GraduationCap size={24} />
                ) : (
                  <Briefcase size={24} />
                )}
              </div>

              {/* Center Content */}
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div>
                    <h3 className="font-billboard text-2xl text-white group-hover:text-red-400 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-red-400 font-mono mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10">
                      <Calendar size={13} className="text-red-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-red-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="grid sm:grid-cols-2 gap-2 pt-1">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
