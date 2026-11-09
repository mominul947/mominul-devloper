'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface TechStack3DBackgroundProps {
  inView: boolean
}

export default function TechStack3DBackground({ inView }: TechStack3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglSupported, setWebglSupported] = React.useState(true)

  useEffect(() => {
    // Check WebGL support before attempting to create renderer
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
        return
      }
    } catch {
      setWebglSupported(false)
      return
    }

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // 1. Mobile Detection for Zero-Lag Optimization
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

    // 2. Scene Setup
    const scene = new THREE.Scene()
    const width = container.clientWidth || 800
    const height = container.clientHeight || 700

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = isMobile ? 7.5 : 6.5

    // Renderer with ultra-light performance settings for 60fps on mobile
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile, // Disable MSAA on mobile for max GPU fillrate
        powerPreference: 'high-performance',
      })
    } catch {
      // WebGL not available — silently degrade
      setWebglSupported(false)
      return
    }

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1 : 1.5)
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height)

    // 3. 3D Cyber Wireframe Globe (Matching Reference Image)
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    // Geodesic Wireframe Sphere (Reduced vertices on mobile for max GPU efficiency)
    const sphereRadius = isMobile ? 2.3 : 2.7
    const sphereDetail = isMobile ? 10 : 24

    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereDetail, sphereDetail)
    const wireframe = new THREE.WireframeGeometry(sphereGeometry)

    // Cyan / Emerald gradient wireframe lines matching user's site
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981, // Emerald green
      transparent: true,
      opacity: isMobile ? 0.22 : 0.28,
      linewidth: 1,
    })
    const sphereLines = new THREE.LineSegments(wireframe, lineMaterial)
    globeGroup.add(sphereLines)

    // Inner Glowing Core / Geodesic Accent (Cyan)
    const innerGeo = new THREE.IcosahedronGeometry(sphereRadius * 0.72, isMobile ? 0 : 2)
    const innerWire = new THREE.WireframeGeometry(innerGeo)
    const innerMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4, // Cyan
      transparent: true,
      opacity: 0.18,
    })
    const innerMesh = new THREE.LineSegments(innerWire, innerMat)
    globeGroup.add(innerMesh)

    // 4. Subtle Cyber Nodes / Particles at Vertices
    const particleCount = isMobile ? 24 : 120
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = sphereRadius * (0.85 + Math.random() * 0.3)

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = r * Math.cos(phi)
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x34d399, // Mint emerald
      size: isMobile ? 0.05 : 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial)
    globeGroup.add(particlePoints)

    // 5. 3D Orbiting Cyber Rings (Tilted)
    const ringGeo = new THREE.RingGeometry(sphereRadius * 1.35, sphereRadius * 1.37, isMobile ? 32 : 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.14,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.5
    globeGroup.add(ring)

    // 6. Interactive Smooth Tilt
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetX = x * 0.35
      targetY = y * 0.25
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // 7. Animation Loop with Visibility Control (0 CPU when out of view)
    let animationFrameId: number
    let clock = new THREE.Clock()
    let isRunning = inView
    let lastRenderTime = 0

    const render = (currentTime: number) => {
      if (!isRunning) return

      // Pacing on mobile to leave 100% GPU headroom for touch momentum scrolling
      if (isMobile && currentTime - lastRenderTime < 24) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      lastRenderTime = currentTime

      const delta = clock.getDelta()

      // Smooth auto-rotation
      globeGroup.rotation.y += delta * 0.22
      globeGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.12

      innerMesh.rotation.y -= delta * 0.15
      innerMesh.rotation.z += delta * 0.1

      ring.rotation.z += delta * 0.08

      // Lerp mouse interaction on desktop
      if (!isMobile) {
        mouseX += (targetX - mouseX) * 0.05
        mouseY += (targetY - mouseY) * 0.05
        globeGroup.position.x = mouseX * 0.8
        globeGroup.position.y = mouseY * 0.6
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(render)
    }

    if (inView) {
      isRunning = true
      animationFrameId = requestAnimationFrame(render)
    }

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Clean up
    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      sphereGeometry.dispose()
      wireframe.dispose()
      lineMaterial.dispose()
      innerGeo.dispose()
      innerWire.dispose()
      innerMat.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      renderer.dispose()
    }
  }, [inView, webglSupported])

  // Graceful fallback: render nothing if WebGL is unavailable
  if (!webglSupported) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center z-0"
      style={{ contain: 'strict' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{
          opacity: 0.9,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

