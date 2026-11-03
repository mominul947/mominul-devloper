'use client'

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import type { IconType } from 'react-icons'

export interface TechItem {
  id: string
  name: string
  icon: IconType
  color: string
  category: 'core' | 'frontend' | 'backend' | 'aiml' | 'database' | 'devops' | 'tools'
}

interface TechStack3DGlobeProps {
  items: TechItem[]
  activeCategory: string
  inView: boolean
}

interface NodeCoord {
  x: number
  y: number
  z: number
}

export default function TechStack3DGlobe({ items, activeCategory, inView }: TechStack3DGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)

  // Spherical base coordinates using Fibonacci sphere algorithm (Golden angle)
  const baseCoords = useMemo<NodeCoord[]>(() => {
    const N = items.length
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    return items.map((_, i) => {
      const y = 1 - (i / Math.max(1, N - 1)) * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = goldenAngle * i
      return {
        x: Math.cos(theta) * radius,
        y: y,
        z: Math.sin(theta) * radius,
      }
    })
  }, [items])

  // Current rotation angles and physics velocity
  const rotRef = useRef({ x: 0.15, y: 0.35 })
  const velRef = useRef({ x: 0, y: 0.0035 })
  const isDraggingRef = useRef(false)
  const lastPointerRef = useRef({ x: 0, y: 0 })
  const hoveredRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // Track projected positions for DOM rendering
  const [projected, setProjected] = useState<
    {
      x: number
      y: number
      scale: number
      opacity: number
      zIndex: number
      isFront: boolean
    }[]
  >([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 60FPS Hardware-Accelerated Projection Loop
  useEffect(() => {
    if (!inView) return

    let rafId: number
    const count = items.length
    const goldenCoords = baseCoords

    const animate = () => {
      const rot = rotRef.current
      const vel = velRef.current

      // Apply rotation physics
      if (!isDraggingRef.current) {
        if (!hoveredRef.current) {
          // Idle gentle constant orbit
          rot.y += vel.y
          rot.x += vel.x

          // Natural inertia damping
          vel.x *= 0.94
          vel.y = vel.y * 0.95 + 0.0035 * 0.05
        } else {
          // Slow down when hovering
          rot.y += 0.0008
        }
      }

      // Sphere radius based on viewport
      const width = containerRef.current?.clientWidth || (isMobile ? 360 : 700)
      const radius = isMobile
        ? Math.min(width * 0.42, 175)
        : Math.min(width * 0.38, 260)
      const cameraDist = isMobile ? 480 : 620

      // Trigonometry lookup for current rotation
      const cosY = Math.cos(rot.y)
      const sinY = Math.sin(rot.y)
      const cosX = Math.cos(rot.x)
      const sinX = Math.sin(rot.x)

      const nextProjected: typeof projected = new Array(count)

      for (let i = 0; i < count; i++) {
        const base = goldenCoords[i]

        // 1. Rotate around Y (Yaw)
        const x1 = base.x * cosY + base.z * sinY
        const z1 = -base.x * sinY + base.z * cosY
        const y1 = base.y

        // 2. Rotate around X (Pitch)
        const y2 = y1 * cosX - z1 * sinX
        const z2 = y1 * sinX + z1 * cosX
        const x2 = x1

        // 3. Perspective Projection
        const worldX = x2 * radius
        const worldY = y2 * radius
        const worldZ = z2 * radius

        const k = cameraDist / (cameraDist - worldZ)
        const screenX = worldX * k
        const screenY = worldY * k

        // Depth cueing: front items are larger and brighter
        const depthNorm = (worldZ + radius) / (2 * radius) // 0 (back) to 1 (front)
        const scale = Math.max(0.65, k * (0.75 + 0.38 * depthNorm))
        const opacity = Math.min(1, Math.max(0.24, 0.22 + 0.78 * depthNorm))
        const zIndex = Math.round(depthNorm * 100)

        nextProjected[i] = {
          x: screenX,
          y: screenY,
          scale,
          opacity,
          zIndex,
          isFront: worldZ > -radius * 0.2,
        }
      }

      setProjected(nextProjected)
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [inView, items.length, baseCoords, isMobile])

  // Mouse / Touch Dragging Handlers
  const handlePointerDown = useCallback((clientX: number, clientY: number) => {
    isDraggingRef.current = true
    lastPointerRef.current = { x: clientX, y: clientY }
    velRef.current = { x: 0, y: 0 }
  }, [])

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return
    const dx = clientX - lastPointerRef.current.x
    const dy = clientY - lastPointerRef.current.y
    lastPointerRef.current = { x: clientX, y: clientY }

    const sensitivity = 0.0065
    rotRef.current.y += dx * sensitivity
    rotRef.current.x -= dy * sensitivity

    velRef.current.y = dx * sensitivity * 0.5
    velRef.current.x = -dy * sensitivity * 0.5
  }, [])

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Sphere Interactive Stage */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1 && isDraggingRef.current) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
          }
        }}
        onTouchEnd={handlePointerUp}
        className="relative w-full max-w-[850px] h-[520px] xs:h-[560px] sm:h-[640px] md:h-[680px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-none"
        style={{ perspective: '1000px', contain: 'layout style' }}
      >
        {/* Central Ambient Wireframe Rings behind 3D nodes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {/* Outer glowing orbital ring */}
          <div className="w-[320px] xs:w-[380px] sm:w-[520px] md:w-[600px] h-[320px] xs:h-[380px] sm:h-[520px] md:h-[600px] rounded-full border border-emerald-500/15 animate-[spin_40s_linear_infinite]" />
          {/* Inner tilted cyan orbit */}
          <div
            className="absolute w-[280px] xs:w-[330px] sm:w-[460px] md:w-[530px] h-[280px] xs:h-[330px] sm:h-[460px] md:h-[530px] rounded-full border border-cyan-400/20"
            style={{ transform: 'rotateX(68deg) rotateY(15deg)' }}
          />
          {/* Deep glowing emerald/cyan planetary core */}
          <div className="absolute w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] rounded-full bg-emerald-500/10 blur-[60px] sm:blur-[90px] pointer-events-none" />
        </div>

        {/* 42 3D NODES ROTATING ALONG SPHERE SURFACE */}
        {projected.length === items.length &&
          items.map((tech, index) => {
            const pos = projected[index]
            if (!pos) return null

            const isHovered = hoveredId === tech.id
            const isCategoryActive = activeCategory === 'ALL' || tech.category === activeCategory
            const Icon = tech.icon

            // Highlight status
            const finalScale = isHovered ? pos.scale * 1.35 : pos.scale
            const finalOpacity = !isCategoryActive
              ? 0.15
              : isHovered
              ? 1
              : pos.opacity

            return (
              <div
                key={`globe-${tech.id}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedTech(tech)
                }}
                onMouseEnter={() => {
                  setHoveredId(tech.id)
                  hoveredRef.current = true
                }}
                onMouseLeave={() => {
                  setHoveredId(null)
                  hoveredRef.current = false
                }}
                className="absolute flex items-center justify-center cursor-pointer transition-shadow duration-150"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate3d(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px), 0px) scale(${finalScale})`,
                  zIndex: isHovered ? 999 : pos.zIndex,
                  opacity: finalOpacity,
                  willChange: 'transform, opacity',
                  pointerEvents: isCategoryActive ? 'auto' : 'none',
                }}
              >
                {/* 3D Glass Pill Tag */}
                <div
                  className={`flex items-center gap-1.5 xs:gap-2 px-2.5 py-1.5 xs:px-3 xs:py-2 rounded-xl border backdrop-blur-md transition-all duration-200 select-none shadow-md ${
                    isHovered
                      ? 'bg-[#151928]/95 scale-105'
                      : 'bg-[#0c0e18]/85 hover:bg-[#121524]/90'
                  }`}
                  style={{
                    borderColor: isHovered
                      ? tech.color
                      : isCategoryActive && pos.isFront
                      ? 'rgba(255, 255, 255, 0.16)'
                      : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isHovered
                      ? `0 0 24px ${tech.color}60, 0 8px 18px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.25)`
                      : pos.isFront
                      ? `0 4px 12px rgba(0,0,0,0.5), 0 0 12px ${tech.color}25`
                      : '0 2px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Colorful Brand Icon */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 8px ${tech.color})`
                        : `drop-shadow(0 0 3px ${tech.color}80)`,
                    }}
                  >
                    <Icon
                      className="text-[17px] xs:text-[19px] sm:text-[22px]"
                      style={{ color: tech.color }}
                    />
                  </div>

                  {/* Brand Label (Visible always, crisp typography) */}
                  <span
                    className="text-[10px] xs:text-[11px] sm:text-xs font-mono font-bold tracking-tight whitespace-nowrap"
                    style={{
                      color: isHovered ? '#FFFFFF' : 'rgba(235, 240, 250, 0.92)',
                      textShadow: isHovered
                        ? `0 0 8px ${tech.color}`
                        : '0 1px 3px rgba(0,0,0,0.8)',
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
              </div>
            )
          })}
      </div>

      {/* Floating Guidance & Interaction Hint */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-stone-400">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>🖐️ Drag or swipe to rotate 3D sphere</span>
        </span>
        <span className="text-stone-500 hidden sm:inline">•</span>
        <span className="text-stone-400 hidden sm:inline">
          Hover any tech badge to freeze and inspect
        </span>
      </div>

      {/* Selected Tech Inspector Card (Optional Detail Toast) */}
      {selectedTech && (
        <div className="mt-4 p-3 rounded-2xl bg-[#0f1322]/95 border border-emerald-500/40 shadow-2xl flex items-center gap-3 animate-fade-in max-w-sm">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
            style={{ backgroundColor: `${selectedTech.color}20` }}
          >
            {React.createElement(selectedTech.icon, {
              className: 'text-2xl',
              style: { color: selectedTech.color },
            })}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">{selectedTech.name}</h4>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                {selectedTech.category}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 truncate">
              Production Stack • Active in Live Deployments
            </p>
          </div>
          <button
            onClick={() => setSelectedTech(null)}
            className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded-md bg-white/5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
