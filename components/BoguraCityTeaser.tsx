'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Compass,
  Sparkles,
  MapPin,
  ArrowUpRight,
  Gamepad2,
  Layers,
  Building,
} from 'lucide-react'

export default function BoguraCityTeaser() {
  return (
    <section id="bogura" className="relative py-12 sm:py-16 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact, Slim & High-Impact City Banner Card */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#090d0b] via-[#0d1612] to-[#090d0b] p-6 sm:p-8 xl:p-9 shadow-2xl relative overflow-hidden group">
          
          {/* Subtle Grid Lines Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                  <Gamepad2 size={14} />
                  <span>3D WEBGL VIRTUAL CITY • BOGURA DISTRICT</span>
                </span>
              </div>

              <h3 className="font-billboard text-2xl xs:text-3xl sm:text-4xl text-white tracking-wide flex flex-wrap items-center gap-2.5">
                <span>EXPLORE BOGURA: THE 3D VIRTUAL CITY</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-normal">
                  GAME MODE
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Step inside an open-world 3D virtual simulation of historic &amp; futuristic Bogura — featuring 3D Mahasthangarh, Satmatha central tower, and interactive cyber-waterways engineered with Three.js &amp; WebGL.
              </p>

              {/* Highlights Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-stone-400">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1 text-emerald-400">
                  <Building size={11} />
                  <span>Mahasthangarh Citadel</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1 text-teal-300">
                  <Compass size={11} />
                  <span>Satmatha Plaza</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1 text-amber-300">
                  <Sparkles size={11} />
                  <span>3D Interactive Camera</span>
                </span>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="flex-shrink-0">
              <Link
                href="/bogura"
                target="_blank"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.03] cursor-pointer group"
              >
                <Gamepad2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>EXPLORE BOGURA NOW</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

