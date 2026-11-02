'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// 3D Liquid Iridescent Ribbon / Silk Torus (Smooth High-End Motion)
function LiquidRibbon() {
  const ribbonRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ribbonRef.current) return
    const t = state.clock.getElapsedTime()
    ribbonRef.current.rotation.x = t * 0.15
    ribbonRef.current.rotation.y = t * 0.2
    ribbonRef.current.position.y = Math.sin(t * 0.6) * 0.25
  })

  return (
    <group position={[3.2, 0.2, -1.5]}>
      <mesh ref={ribbonRef}>
        <torusKnotGeometry args={[1.4, 0.35, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#1e1b4b"
          emissive="#312e81"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          wireframe={false}
        />
      </mesh>
      {/* Dynamic Colored Spotlight on Ribbon */}
      <pointLight color="#6366f1" intensity={3} distance={5} />
      <pointLight color="#06b6d4" intensity={2} distance={6} />
    </group>
  )
}

// Floating Luxury Glass Prisms (Drifting gracefully with physics)
function FloatingPrisms() {
  return (
    <>
      {/* Top Left Prism */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.8} position={[-4.5, 2.2, -2]}>
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshPhysicalMaterial
            color="#0f172a"
            emissive="#38bdf8"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
          />
        </mesh>
      </Float>

      {/* Bottom Left Prism */}
      <Float speed={2} rotationIntensity={1.8} floatIntensity={1.5} position={[-3.8, -2, -1.8]}>
        <mesh>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshPhysicalMaterial
            color="#18181b"
            emissive="#818cf8"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
          />
        </mesh>
      </Float>

      {/* Top Right Ambient Prism */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2} position={[4.8, 2.5, -3]}>
        <mesh>
          <tetrahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color="#09090b"
            emissive="#a855f7"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Mid Left Subtle Floating Sphere */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[-5, 0, -3]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color="#1e1b4b"
            emissive="#4338ca"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={1.5}
          />
        </mesh>
      </Float>
    </>
  )
}

// Scene Root with Smooth Pointer Tracking
function InteractiveScene() {
  const sceneRef = useRef<THREE.Group>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    if (!sceneRef.current) return
    const { x, y } = state.pointer
    // Smooth camera / scene tilt
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, x * 0.18, 0.04)
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -y * 0.12, 0.04)

    // Interactive pointer light
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 4, 0.08)
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 4, 0.08)
    }
  })

  return (
    <group ref={sceneRef}>
      <LiquidRibbon />
      <FloatingPrisms />
      <pointLight ref={lightRef} position={[0, 0, 3]} intensity={1.5} color="#818cf8" distance={8} />
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-8, -8, -2]} intensity={0.8} color="#3b82f6" />
        <InteractiveScene />
      </Canvas>
    </div>
  )
}
