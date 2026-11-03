'use client'

import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
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
import {
  Sparkles,
  Network,
  Rotate3d,
  Layers,
  Cpu,
  Zap,
} from 'lucide-react'
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
  tagline: string
  taglineBn: string
  tier: string
}

// 6-Tier Tapered Matrix for Desktop & Tablet (11 -> 10 -> 8 -> 6 -> 4 -> 2)
const desktopTechRows: TechItem[][] = [
  // Row 1: Core Languages & Web (11 items)
  [
    { name: 'Python', icon: SiPython, color: '#3776AB', category: 'BACKEND & APIS', tagline: 'AI, Microservices & Data Pipelines', taglineBn: 'এআই, মাইক্রোসার্ভিস ও ডাটা পাইপলাইন', tier: 'Advanced' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'MOBILE & FRONTEND', tagline: 'Modern ESNext & Interactive Web', taglineBn: 'আধুনিক ইএস-নেক্সট ও ওয়েব স্ক্রিপ্টিং', tier: 'Expert' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'MOBILE & FRONTEND', tagline: 'Strict Type-Safe Architecture', taglineBn: 'টাইপ-সেফ অ্যাপ্লিকেশন আর্কিটেকচার', tier: 'Expert' },
    { name: 'C', icon: SiC, color: '#659AD2', category: 'BACKEND & APIS', tagline: 'Low-Level Memory & Fundamentals', taglineBn: 'কম্পিউটিং ফান্ডামেন্টালস ও মেমোরি ম্যানেজমেন্ট', tier: 'Core' },
    { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'BACKEND & APIS', tagline: 'High-Performance Algorithms & DSA', taglineBn: 'হাই-পারফরম্যান্স অ্যালগরিদম ও ডেটা স্ট্রাকচার', tier: 'Core' },
    { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'MOBILE & FRONTEND', tagline: 'Native Android Modern Engine', taglineBn: 'নেটিভ অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট', tier: 'Expert' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'MOBILE & FRONTEND', tagline: 'Semantic Web & Accessible DOM', taglineBn: 'সিম্যান্টিক স্ট্রাকচার ও অ্যাক্সেসিবিলিটি', tier: 'Core' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'MOBILE & FRONTEND', tagline: 'Hardware-Accelerated 3D Styling', taglineBn: 'অ্যানিমেশন ও অ্যাডভান্সড রেসপনসিভ স্টাইলিং', tier: 'Expert' },
    { name: 'React', icon: SiReact, color: '#61DAFB', category: 'MOBILE & FRONTEND', tagline: 'Component Systems & State Machines', taglineBn: 'কম্পোনেন্ট ভিত্তিক ইউআই ও স্টেট ম্যানেজমেন্ট', tier: 'Expert' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'MOBILE & FRONTEND', tagline: 'SSR, Server Actions & Edge Caching', taglineBn: 'ফুল-স্ট্যাক এসএসআর ও এজ নেটওয়ার্ক', tier: 'Expert' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'MOBILE & FRONTEND', tagline: 'Zero-Runtime Utility Design System', taglineBn: 'ইউটিলিটি-ফার্স্ট মডার্ন ডিজাইন ফ্রেমওয়ার্ক', tier: 'Expert' },
  ],

  // Row 2: Mobile & Backend Frameworks (10 items)
  [
    { name: 'Flutter', icon: SiFlutter, color: '#47C5FB', category: 'MOBILE & FRONTEND', tagline: 'Cross-Platform 120fps Native Apps', taglineBn: '১২০fps ক্রস-প্ল্যাটফর্ম হাই-এন্ড মোবাইল অ্যাপ', tier: 'Master' },
    { name: 'Compose', icon: SiJetpackcompose, color: '#4285F4', category: 'MOBILE & FRONTEND', tagline: 'Declarative Modern Android UI', taglineBn: 'আধুনিক ডিক্লেয়ারেটিভ অ্যান্ড্রয়েড ইউআই', tier: 'Expert' },
    { name: 'React Native', icon: SiReact, color: '#61DAFB', category: 'MOBILE & FRONTEND', tagline: 'Universal Native Mobile Apps', taglineBn: 'ইউনিভার্সাল নেটিভ মোবাইল অ্যাপ্লিকেশন', tier: 'Advanced' },
    { name: 'Android', icon: SiAndroidstudio, color: '#3DDC84', category: 'MOBILE & FRONTEND', tagline: 'Gradle Build, Profiling & Play Store', taglineBn: 'গ্রেডল বিল্ড, প্লে-স্টোর ডিপ্লয় ও অপটিমাইজেশন', tier: 'Master' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#68A063', category: 'BACKEND & APIS', tagline: 'Async Event-Driven Microservices', taglineBn: 'ইভেন্ট-ড্রিভেন ব্যাকএন্ড ও এপিআই সার্ভিস', tier: 'Expert' },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688', category: 'BACKEND & APIS', tagline: 'Blazing Fast Python Async REST APIs', taglineBn: 'হাই-স্পিড পাইথন অ্যাসিঙ্ক রেস্ট এপিআই', tier: 'Advanced' },
    { name: 'Golang', icon: SiGo, color: '#00ADD8', category: 'BACKEND & APIS', tagline: 'Concurrent High-Throughput Engines', taglineBn: 'হাই-থ্রুপুট কনকারেন্ট সার্ভিস', tier: 'Advanced' },
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', category: 'BACKEND & APIS', tagline: 'Enterprise MVC & Scalable Backends', taglineBn: 'এন্টারপ্রাইজ এমভিসি ও ডাটাবেজ সিস্টেম', tier: 'Expert' },
    { name: 'Django', icon: SiDjango, color: '#00b86b', category: 'BACKEND & APIS', tagline: 'Batteries-Included Robust Web APIs', taglineBn: 'সিকিউর পাইথন ব্যাকএন্ড ও অ্যাডমিন আর্কিটেকচার', tier: 'Advanced' },
    { name: 'Flask', icon: SiFlask, color: '#e0e0e0', category: 'BACKEND & APIS', tagline: 'Lightweight REST Microservices', taglineBn: 'লাইটওয়েট মাইক্রোসার্ভিস ব্যাকএন্ড', tier: 'Advanced' },
  ],

  // Row 3: Databases & ORM (8 items)
  [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'DATABASES & ORM', tagline: 'ACID Relational Enterprise Database', taglineBn: 'হাই-পারফরম্যান্স রিলেশনাল ডাটাবেজ সিস্টেম', tier: 'Expert' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'DATABASES & ORM', tagline: 'Distributed High-Scale NoSQL Engine', taglineBn: 'স্কেলেবল নো-এসকিউএল ডকুমেন্ট ডাটাবেজ', tier: 'Expert' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'DATABASES & ORM', tagline: 'Indexed Relational Storage & Queries', taglineBn: 'ইনডেক্সড রিলেশনাল স্টোরেজ ও অপটিমাইজড কুয়েরি', tier: 'Expert' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'DATABASES & ORM', tagline: 'Realtime Cloud Firestore & Auth SDK', taglineBn: 'রিয়েলটাইম ক্লাউড স্টোর, অথ ও নোটিফিকেশন', tier: 'Expert' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E', category: 'DATABASES & ORM', tagline: 'Serverless Postgres, Edge & RLS', taglineBn: 'সার্ভারলেস পোস্টগ্রেস ও রো-লেভেল সিকিউরিটি', tier: 'Expert' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D', category: 'DATABASES & ORM', tagline: 'In-Memory Sub-Millisecond Cache Layer', taglineBn: 'ইন-মেমোরি ক্যাশ লেয়ার ও সেশন স্টোর', tier: 'Advanced' },
    { name: 'Prisma', icon: SiPrisma, color: '#5a67d8', category: 'DATABASES & ORM', tagline: 'Type-Safe ORM & Migrations Pipeline', taglineBn: 'টাইপ-সেফ ডাটাবেজ ওআরএম ও স্কিমা মাইগ্রেশন', tier: 'Expert' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: 'BACKEND & APIS', tagline: 'Schema-Driven Precise Data Queries', taglineBn: 'স্কিমা-ড্রিভেন এপিআই কুয়েরি ও মিউটেশন', tier: 'Advanced' },
  ],

  // Row 4: DevOps & Cloud (6 items)
  [
    { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'DEVOPS & CLOUD', tagline: 'Containerized Microservice Deployments', taglineBn: 'কন্টেইনারাইজড অ্যাপ ডিপ্লয়মেন্ট ও কম্পোজ', tier: 'Expert' },
    { name: 'Linux VPS', icon: SiLinux, color: '#FCC624', category: 'DEVOPS & CLOUD', tagline: 'Debian/Ubuntu Server Hardening & SSH', taglineBn: 'লিনাক্স সার্ভার সিকিউরিটি, ইউজার ও এসএসএইচ কনফিগ', tier: 'Master' },
    { name: 'AWS Cloud', icon: FaAws, color: '#FF9900', category: 'DEVOPS & CLOUD', tagline: 'EC2, S3 Buckets & Cloud Architecture', taglineBn: 'ইসি২ ক্লাউড সার্ভার, এস৩ স্টোরেজ ও আর্কিটেকচার', tier: 'Advanced' },
    { name: 'Nginx', icon: SiNginx, color: '#009639', category: 'DEVOPS & CLOUD', tagline: 'Reverse Proxy, SSL & Load Balancing', taglineBn: 'রিভার্স প্রক্সি, এসএসএল এনক্রিপশন ও ব্যালান্সিং', tier: 'Expert' },
    { name: 'Git', icon: SiGit, color: '#F05032', category: 'DEVOPS & CLOUD', tagline: 'Distributed Version Control & Rebase', taglineBn: 'ভার্সন কন্ট্রোল, ব্রাঞ্চিং ও কোড হিস্টোরি', tier: 'Master' },
    { name: 'GitHub', icon: SiGithub, color: '#f0f6fc', category: 'DEVOPS & CLOUD', tagline: 'CI/CD Automated Pipelines & Actions', taglineBn: 'সিআই/সিডি অটোমেশন ও রিপোজিটরি ম্যানেজমেন্ট', tier: 'Master' },
  ],

  // Row 5: Developer Tools & Design (4 items)
  [
    { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC', category: 'DEVOPS & CLOUD', tagline: 'Custom IDE Workflow, Debugging & Extensions', taglineBn: 'কাস্টম আইডিই প্রোডাক্টিভিটি ও ডিবাগিং ওয়ার্কফ্লো', tier: 'Master' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'MOBILE & FRONTEND', tagline: 'Design Systems, Prototypes & Code Connect', taglineBn: 'ইউআই/ইউএক্স প্রোটোটাইপিং ও ডিজাইন সিস্টেম', tier: 'Expert' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'BACKEND & APIS', tagline: 'Automated API Testing & Documentation', taglineBn: 'এপিআই টেস্টিং, অটোমেশন ও ডকুমেন্টেশন', tier: 'Expert' },
    { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'DEVOPS & CLOUD', tagline: 'Serverless Edge Deployment & Analytics', taglineBn: 'সার্ভারলেস এজ ডিপ্লয়মেন্ট ও স্পিড অপটিমাইজেশন', tier: 'Master' },
  ],

  // Row 6: Real-Time Protocols (2 items)
  [
    { name: 'WebSockets', icon: SiSocketdotio, color: '#38bdf8', category: 'BACKEND & APIS', tagline: 'Full-Duplex Low-Latency Live Streaming', taglineBn: 'লো-ল্যাটেন্সি লাইভ চ্যাট ও রিয়েলটাইম ইভেন্ট ব্রডকাস্ট', tier: 'Expert' },
    { name: 'REST APIs', icon: Network, color: '#10B981', category: 'BACKEND & APIS', tagline: 'Scalable RESTful Architecture & Standards', taglineBn: 'স্কেলেবল রেস্টফুল আর্কিটেকচার ও এপিআই স্ট্যান্ডার্ড', tier: 'Master' },
  ],
]

// Mobile Tapered Hourglass Cascade (7 -> 5 -> 7 -> 3 -> 7 -> 1 -> 6 -> 4 -> 1)
// Perfectly calibrated for phones (< 768px) to eliminate wrapping & match user reference photo
const mobileTechRows: TechItem[][] = [
  // Mobile Row 1 (7 items)
  [
    desktopTechRows[0][0], // Python
    desktopTechRows[0][1], // JavaScript
    desktopTechRows[0][2], // TypeScript
    desktopTechRows[0][3], // C
    desktopTechRows[0][4], // C++
    desktopTechRows[0][5], // Kotlin
    desktopTechRows[0][6], // HTML5
  ],
  // Mobile Row 2 (5 items)
  [
    desktopTechRows[0][7], // CSS3
    desktopTechRows[0][8], // React
    desktopTechRows[0][9], // Next.js
    desktopTechRows[0][10], // Tailwind
    desktopTechRows[1][0], // Flutter
  ],
  // Mobile Row 3 (7 items)
  [
    desktopTechRows[1][1], // Compose
    desktopTechRows[1][2], // React Native
    desktopTechRows[1][3], // Android
    desktopTechRows[1][4], // Node.js
    desktopTechRows[1][5], // FastAPI
    desktopTechRows[1][6], // Golang
    desktopTechRows[1][7], // Laravel
  ],
  // Mobile Row 4 (3 items)
  [
    desktopTechRows[1][8], // Django
    desktopTechRows[1][9], // Flask
    desktopTechRows[5][0], // WebSockets
  ],
  // Mobile Row 5 (7 items)
  [
    desktopTechRows[2][0], // PostgreSQL
    desktopTechRows[2][1], // MongoDB
    desktopTechRows[2][2], // MySQL
    desktopTechRows[2][3], // Firebase
    desktopTechRows[2][4], // Supabase
    desktopTechRows[2][5], // Redis
    desktopTechRows[2][6], // Prisma
  ],
  // Mobile Row 6 (1 item - Center diamond jewel)
  [
    desktopTechRows[2][7], // GraphQL
  ],
  // Mobile Row 7 (6 items)
  [
    desktopTechRows[3][0], // Docker
    desktopTechRows[3][1], // Linux VPS
    desktopTechRows[3][2], // AWS Cloud
    desktopTechRows[3][3], // Nginx
    desktopTechRows[3][4], // Git
    desktopTechRows[3][5], // GitHub
  ],
  // Mobile Row 8 (4 items)
  [
    desktopTechRows[4][0], // VS Code
    desktopTechRows[4][1], // Figma
    desktopTechRows[4][2], // Postman
    desktopTechRows[4][3], // Vercel
  ],
  // Mobile Row 9 (1 item - Bottom Anchor)
  [
    desktopTechRows[5][1], // REST APIs
  ],
]

const categories: Category[] = [
  'ALL',
  'MOBILE & FRONTEND',
  'BACKEND & APIS',
  'DATABASES & ORM',
  'DEVOPS & CLOUD',
]

// =========================================================================
// 1. HIGH-PERFORMANCE 3D CANVAS CYBER GLOBE (Hardware-Accelerated 60-120fps)
// =========================================================================
function Canvas3DGlobe({
  spinSpeed = 1,
  interactiveMouse = true,
}: {
  spinSpeed?: number
  interactiveMouse?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    angleY: 0,
    angleX: 0.2,
    targetAngleX: 0.2,
    targetAngleY: 0,
    mouseX: 0,
    mouseY: 0,
    isHovering: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate fixed 3D points on sphere for latitude/longitude rings
    const radius = Math.min(width, height) * 0.42
    const latRings = 7
    const longRings = 9
    const pointsPerRing = 48

    // Orbiting cyber satellites
    const satellites = Array.from({ length: 18 }).map((_, i) => ({
      orbitRadius: radius * (1.05 + (i % 3) * 0.12),
      speed: (0.008 + (i % 4) * 0.004) * (i % 2 === 0 ? 1 : -1),
      angle: (i * Math.PI * 2) / 18,
      tilt: (i * Math.PI) / 6,
      size: 1.5 + (i % 3) * 1,
      color: i % 2 === 0 ? '#8b5cf6' : '#38bdf8',
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const state = stateRef.current
      if (interactiveMouse && state.isHovering) {
        state.targetAngleY += 0.003 * spinSpeed
        state.angleY += (state.targetAngleY - state.angleY) * 0.05
        state.angleX += (state.targetAngleX - state.angleX) * 0.05
      } else {
        state.angleY += 0.004 * spinSpeed
        state.angleX = 0.22 + Math.sin(state.angleY * 0.5) * 0.08
      }

      const cx = width / 2
      const cy = height / 2

      const cosY = Math.cos(state.angleY)
      const sinY = Math.sin(state.angleY)
      const cosX = Math.cos(state.angleX)
      const sinX = Math.sin(state.angleX)

      // Project 3D point (x, y, z) into 2D with perspective
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * cosY - z * sinY
        const z1 = x * sinY + z * cosY
        // Rotate X
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX

        const fov = 750
        const scale = fov / (fov + z2 + 100)
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          depth: z2,
          scale,
        }
      }

      // 1. Draw Latitudinal Rings
      ctx.lineWidth = 0.9
      for (let l = 1; l < latRings; l++) {
        const phi = (l / latRings) * Math.PI - Math.PI / 2
        const ringRadius = radius * Math.cos(phi)
        const y = radius * Math.sin(phi)

        ctx.beginPath()
        let first = true
        for (let p = 0; p <= pointsPerRing; p++) {
          const theta = (p / pointsPerRing) * Math.PI * 2
          const x = ringRadius * Math.cos(theta)
          const z = ringRadius * Math.sin(theta)
          const pt = project(x, y, z)

          if (first) {
            ctx.moveTo(pt.px, pt.py)
            first = false
          } else {
            ctx.lineTo(pt.px, pt.py)
          }
        }
        ctx.strokeStyle = l % 2 === 0 ? 'rgba(139, 92, 246, 0.22)' : 'rgba(56, 189, 248, 0.18)'
        ctx.stroke()
      }

      // 2. Draw Longitudinal Rings
      for (let m = 0; m < longRings; m++) {
        const theta = (m / longRings) * Math.PI

        ctx.beginPath()
        let first = true
        for (let p = 0; p <= pointsPerRing; p++) {
          const phi = (p / pointsPerRing) * Math.PI * 2
          const x = radius * Math.sin(phi) * Math.cos(theta)
          const y = radius * Math.cos(phi)
          const z = radius * Math.sin(phi) * Math.sin(theta)
          const pt = project(x, y, z)

          if (first) {
            ctx.moveTo(pt.px, pt.py)
            first = false
          } else {
            ctx.lineTo(pt.px, pt.py)
          }
        }
        ctx.strokeStyle = m % 2 === 0 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(56, 189, 248, 0.2)'
        ctx.stroke()
      }

      // 3. Draw Orbiting Cyber Satellite Nodes
      for (const sat of satellites) {
        sat.angle += sat.speed * spinSpeed
        const sx = sat.orbitRadius * Math.cos(sat.angle)
        const sz = sat.orbitRadius * Math.sin(sat.angle)
        const sy = sat.orbitRadius * Math.sin(sat.angle) * Math.sin(sat.tilt)

        const pt = project(sx, sy, sz)

        // Pulsing particle glow
        ctx.beginPath()
        ctx.arc(pt.px, pt.py, Math.max(1, sat.size * pt.scale), 0, Math.PI * 2)
        ctx.fillStyle = sat.color
        ctx.shadowColor = sat.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // 4. Perspective Tunnel Grid Lines Fanning Downward
      const fanningLines = 7
      for (let i = 0; i < fanningLines; i++) {
        const ratio = i / (fanningLines - 1)
        const startX = cx + (ratio - 0.5) * (width * 0.4)
        const startY = cy + radius * 0.5
        const endX = cx + (ratio - 0.5) * (width * 1.1)
        const endY = height

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 + Math.abs(ratio - 0.5) * 0.15})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / width - 0.5
      const y = (e.clientY - rect.top) / height - 0.5
      stateRef.current.targetAngleY = x * 2.2
      stateRef.current.targetAngleX = -y * 1.2
      stateRef.current.isHovering = true
    }

    const handleMouseLeave = () => {
      stateRef.current.isHovering = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [spinSpeed, interactiveMouse])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-45"
      style={{ willChange: 'transform' }}
    />
  )
}

// =========================================================================
// 2. 3D TILT SQUIRCLE GLASS TILE (With Holographic Depth & Glare)
// =========================================================================
function TechTile3D({
  item,
  isDimmed,
  is3DEnabled,
  onSelect,
}: {
  item: TechItem
  isDimmed: boolean
  is3DEnabled: boolean
  onSelect: (item: TechItem) => void
}) {
  const Icon = item.icon
  const tileRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DEnabled) return
    const el = tileRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rx = -((y - centerY) / centerY) * 16
    const ry = ((x - centerX) / centerX) * 16
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTilt({ rx, ry, glareX, glareY, active: true })
  }, [is3DEnabled])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false })
  }, [])

  return (
    <div
      ref={tileRef}
      onMouseEnter={() => onSelect(item)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item)}
      className={`group relative flex flex-col items-center justify-center 
        w-[40px] h-[48px] xs:w-[46px] xs:h-[54px] sm:w-[58px] sm:h-[66px] md:w-[72px] md:h-[80px] lg:w-[82px] lg:h-[90px]
        p-1 sm:p-1.5 md:p-2 rounded-xl sm:rounded-2xl md:rounded-3xl border 
        transition-all duration-200 cursor-pointer select-none flex-shrink-0
        ${
          tilt.active
            ? 'z-30 border-white/40 shadow-2xl scale-[1.08]'
            : isDimmed
            ? 'opacity-20 grayscale scale-95 border-white/5 bg-white/[0.01]'
            : 'border-white/10 dark:border-white/[0.08] bg-[#10121a]/85 dark:bg-[#0b0c13]/85 hover:border-white/30'
        }
      `}
      style={{
        transform:
          is3DEnabled && tilt.active
            ? `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(12px)`
            : 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transformStyle: 'preserve-3d',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: tilt.active
          ? `0 18px 36px -6px ${item.color}65, 0 0 20px ${item.color}40, inset 0 1px 1px rgba(255,255,255,0.25)`
          : '0 6px 16px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Dynamic Specular Holographic Glare */}
      {tilt.active && (
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl pointer-events-none transition-opacity duration-150 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Top Ambient Beacon */}
      {tilt.active && (
        <span
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 rounded-full blur-xs pointer-events-none"
          style={{ backgroundColor: item.color }}
        />
      )}

      {/* 3D Pop-Out Colorful Icon */}
      <div
        className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center transition-transform duration-200"
        style={{
          transform: tilt.active ? 'translateZ(26px)' : 'translateZ(0px)',
        }}
      >
        <Icon
          className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          style={{
            color: item.color,
            filter: tilt.active ? `drop-shadow(0 0 10px ${item.color}95)` : undefined,
          }}
        />
      </div>

      {/* Clean Technology Label */}
      <span
        className="mt-0.5 sm:mt-1 text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] font-medium text-stone-200 tracking-tight text-center truncate max-w-full px-0.5 sm:px-1 transition-all group-hover:text-white"
        style={{
          transform: tilt.active ? 'translateZ(16px)' : 'translateZ(0px)',
        }}
      >
        {item.name}
      </span>
    </div>
  )
}

// =========================================================================
// 3. MAIN INTERACTIVE 3D TECH STACK SECTION
// =========================================================================
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const { language, t } = useLanguage()

  // 3D & Animation Configurations
  const [is3DEnabled, setIs3DEnabled] = useState(true)
  const [spinSpeed, setSpinSpeed] = useState(1)
  const [selectedTech, setSelectedTech] = useState<TechItem>(desktopTechRows[1][0]) // Default to Flutter

  const categoryLabels: Record<Category, string> = {
    'ALL': t.skills.all,
    'MOBILE & FRONTEND': t.skills.mobileFrontend,
    'BACKEND & APIS': t.skills.backendApis,
    'DATABASES & ORM': t.skills.databasesOrm,
    'DEVOPS & CLOUD': t.skills.devopsCloud,
  }

  const totalCount = useMemo(() => {
    return desktopTechRows.reduce((acc, row) => acc + row.length, 0)
  }, [])

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 theme-main-bg theme-text-main border-t theme-border relative overflow-hidden"
    >
      {/* ============================================================== */}
      {/* 3D ROTATING WIREFRAME GLOBE & AMBIENT GLOW                     */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Violet/Cyan Central Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] sm:h-[700px] rounded-full blur-[150px] opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%)',
          }}
        />

        {/* Real Interactive 3D Canvas Cyber Globe */}
        <Canvas3DGlobe spinSpeed={spinSpeed} interactiveMouse={is3DEnabled} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8 space-y-2.5"
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
        {/* 3D INTERACTIVE HUD / TECH PREVIEW BANNER                       */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 max-w-xl mx-auto p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-[#0c0e15]/90 border border-white/10 backdrop-blur-xl shadow-xl flex items-center justify-between gap-3"
          style={{
            boxShadow: `0 8px 24px -4px ${selectedTech.color}35`,
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/15"
              style={{ backgroundColor: `${selectedTech.color}15` }}
            >
              {React.createElement(selectedTech.icon, {
                size: 22,
                style: { color: selectedTech.color },
              })}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white truncate font-sans">
                  {selectedTech.name}
                </h4>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${selectedTech.color}25`,
                    color: selectedTech.color,
                  }}
                >
                  {selectedTech.tier}
                </span>
              </div>
              <p className="text-[11px] font-mono text-stone-400 truncate">
                {language === 'bn' ? selectedTech.taglineBn : selectedTech.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0 text-stone-400 text-xs font-mono">
            <Zap size={14} className="text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Active Tech</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CATEGORY FILTER PILLS & 3D CONFIGURATION BAR                   */}
        {/* ============================================================== */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 border-b border-white/5 pb-4">
          {/* Category Tabs (Smooth Horizontal Scroll on Mobile) */}
          <div className="w-full sm:w-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 justify-start sm:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 cursor-pointer border whitespace-nowrap flex-shrink-0 ${
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

          {/* 3D Config Controls (User Requested "kicu sundor configuration koro") */}
          <div className="flex items-center gap-2 flex-shrink-0 self-center sm:self-auto">
            {/* 3D Tilt Toggle */}
            <button
              type="button"
              onClick={() => setIs3DEnabled((prev) => !prev)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                is3DEnabled
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-bold'
                  : 'bg-white/5 border-white/10 text-stone-500'
              }`}
              title="Toggle 3D Card Holographic Tilt"
            >
              <Rotate3d size={13} className={is3DEnabled ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
              <span>3D Hologram: {is3DEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Orbit Speed Toggle */}
            <button
              type="button"
              onClick={() => setSpinSpeed((prev) => (prev === 1 ? 2.5 : prev === 2.5 ? 0.4 : 1))}
              className="px-2.5 py-1 rounded-xl text-[11px] font-mono flex items-center gap-1.5 bg-white/5 border border-white/10 text-stone-300 hover:border-white/25 transition-all cursor-pointer"
              title="Change 3D Globe Rotation Speed"
            >
              <Cpu size={13} className="text-purple-400" />
              <span>Orbit: {spinSpeed === 1 ? '1x' : spinSpeed === 2.5 ? 'Fast' : 'Slow'}</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP MATRIX: TAPERED 6-TIER (11 -> 10 -> 8 -> 6 -> 4 -> 2)   */}
        {/* ============================================================== */}
        <div className="hidden md:flex flex-col items-center gap-2.5 md:gap-3 max-w-6xl mx-auto w-full">
          {desktopTechRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: rowIndex * 0.05 }}
              className="flex flex-nowrap justify-center items-center gap-2 md:gap-2.5 lg:gap-3 w-full"
            >
              {row.map((item) => {
                const isDimmed = activeCategory !== 'ALL' && item.category !== activeCategory
                return (
                  <TechTile3D
                    key={item.name}
                    item={item}
                    isDimmed={isDimmed}
                    is3DEnabled={is3DEnabled}
                    onSelect={setSelectedTech}
                  />
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* MOBILE MATRIX: TAPERED CASCADE (7 -> 5 -> 7 -> 3 -> 7 -> 1 ...) */}
        {/* Strictly flex-nowrap on every row to prevent wrapping on phones*/}
        {/* ============================================================== */}
        <div className="flex md:hidden flex-col items-center gap-1.5 xs:gap-2 w-full mx-auto">
          {mobileTechRows.map((row, rowIndex) => (
            <motion.div
              key={`m-${rowIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: rowIndex * 0.04 }}
              className="flex flex-nowrap justify-center items-center gap-1 xs:gap-1.5 sm:gap-2 w-full"
            >
              {row.map((item) => {
                const isDimmed = activeCategory !== 'ALL' && item.category !== activeCategory
                return (
                  <TechTile3D
                    key={`m-${item.name}-${rowIndex}`}
                    item={item}
                    isDimmed={isDimmed}
                    is3DEnabled={is3DEnabled}
                    onSelect={setSelectedTech}
                  />
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* Bottom Feature Badges */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-stone-400 border border-white/5 px-4 py-1.5 rounded-full bg-black/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive 3D Perspective Matrix</span>
          </span>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-stone-400 border border-white/5 px-4 py-1.5 rounded-full bg-black/25">
            <Layers size={13} className="text-purple-400" />
            <span>Hardware-Accelerated 120fps Depth</span>
          </span>
        </div>
      </div>
    </section>
  )
}
