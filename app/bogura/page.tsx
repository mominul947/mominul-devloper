'use client'

import { useState, useRef, useEffect, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import {
  ArrowLeft,
  Compass,
  MapPin,
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Info,
  Maximize2,
  Building2,
  Gamepad2,
  Navigation,
  Eye,
  Camera,
} from 'lucide-react'

// Landmark Data in Bogura
interface Landmark {
  id: string
  name: string
  bengaliName: string
  category: string
  position: [number, number, number]
  cameraTarget: [number, number, number]
  description: string
  trivia: string
  color: string
}

const landmarks: Landmark[] = [
  {
    id: 'satmatha',
    name: 'Satmatha Central Plaza',
    bengaliName: 'সাতমাথা জিরো পয়েন্ট',
    category: 'City Center Hub',
    position: [0, 1.5, 0],
    cameraTarget: [0, 8, 14],
    description:
      'The bustling heartbeat of Bogura city where 7 major highways converge. A historic commercial and social meeting plaza connecting North Bengal to the entire nation.',
    trivia: 'Zero Point of Bogura with 24/7 energetic urban life and street tea culture.',
    color: '#10b981',
  },
  {
    id: 'mahasthan',
    name: 'Mahasthangarh Citadel',
    bengaliName: 'মহাস্থানগড় প্রাচীন দুর্গ',
    category: '3rd Century BC Ancient Capital',
    position: [-16, 2, -18],
    cameraTarget: [-16, 10, -8],
    description:
      'The earliest urban archaeological citadel discovered in Bangladesh (Pundranagar), dating back to the 3rd Century BC. Enclosed by massive fortified ramparts above the Karatoa River.',
    trivia: 'Over 2,300 years of civilization relics including terracotta plaques and Ashoka-era coins.',
    color: '#f59e0b',
  },
  {
    id: 'doi-district',
    name: 'Bogura Doi Gastronomy Zone',
    bengaliName: 'বগুড়ার ঐতিহ্যবাহী দই পট্টি',
    category: 'World-Renowned Culinary Heritage',
    position: [14, 1.2, 8],
    cameraTarget: [14, 7, 18],
    description:
      'The culinary jewel of Bangladesh! Authentic Bogura Doi is prepared with pure caramelized milk in traditional clay pots, celebrated globally for its unmatched creamy texture.',
    trivia: 'Recognized with GI (Geographical Indication) tag as a unique heritage product of Bangladesh.',
    color: '#06b6d4',
  },
  {
    id: 'karatoa',
    name: 'Karatoa River Waterfront',
    bengaliName: 'করতোয়া নদী তীরবর্তী ঘাট',
    category: 'Historic Sacred Waterway',
    position: [-8, 0.4, 16],
    cameraTarget: [-8, 6, 24],
    description:
      'The ancient Karatoa River once served as the primary trade highway of ancient Bengal, cradling ancient Pundranagar civilization with lush alluvial banks.',
    trivia: 'Mentioned in ancient epic chronicles as a mighty mystical river.',
    color: '#3b82f6',
  },
  {
    id: 'tech-hub',
    name: 'Mominul Developer Base',
    bengaliName: 'মোমিনুল টেক হাব (বগুড়া সদর)',
    category: 'Software & Mobile Architecture Base',
    position: [12, 3, -12],
    cameraTarget: [12, 10, -2],
    description:
      'The creative development headquarters of Md. Mominul Islam. Engineering production Android mobile applications, WebGL simulations, and 60fps high-scale digital platforms.',
    trivia: 'Crafting production apps for clients worldwide directly from Bogura Sadar.',
    color: '#8b5cf6',
  },
]

// -------------------------------------------------------------
// 3D City Components
// -------------------------------------------------------------

// Ground with Cyberpunk Grid Lines
function Ground({ isNight }: { isNight: boolean }) {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color={isNight ? '#070a09' : '#141a17'}
          roughness={0.9}
          metalness={0.2}
        />
      </mesh>

      {/* Cyber Grid */}
      <gridHelper
        args={[120, 60, isNight ? '#10b981' : '#059669', isNight ? '#1e2925' : '#273832']}
        position={[0, 0.01, 0]}
      />

      {/* Karatoa River flowing diagonally */}
      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 6]} position={[-5, 0.02, 5]}>
        <planeGeometry args={[14, 130]} />
        <meshStandardMaterial
          color={isNight ? '#0369a1' : '#0284c7'}
          emissive={isNight ? '#0284c7' : '#0369a1'}
          emissiveIntensity={isNight ? 0.35 : 0.15}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

// Procedural 3D City Buildings
function CityBuildings({ isNight }: { isNight: boolean }) {
  const buildings = useMemo(() => {
    const list: Array<{
      pos: [number, number, number]
      size: [number, number, number]
      color: string
      emissive: string
    }> = []

    // Seeded pseudo-random generation of city skyscrapers
    const coords = [
      // Cluster East
      [6, 4], [8, 8], [12, 2], [14, -6], [10, -10], [6, -14], [16, -16], [18, -4],
      // Cluster West
      [-6, 6], [-10, 10], [-14, 4], [-12, -4], [-8, -10], [-14, -12], [-18, -6],
      // Outer Perimeter
      [22, 10], [24, -8], [-22, 12], [-24, -10], [4, 20], [-6, 22], [8, -24], [-10, -26],
      // Extra density
      [10, 14], [16, 12], [-14, 16], [-18, 14], [18, -12], [-16, -20],
    ]

    coords.forEach(([x, z], i) => {
      const height = 3 + ((i * 7) % 11) * 0.9
      const width = 2.2 + ((i * 3) % 4) * 0.4
      const depth = 2.2 + ((i * 5) % 4) * 0.4
      const colors = ['#111815', '#16201b', '#0f1713', '#1e2823']
      const emissives = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6']

      list.push({
        pos: [x, height / 2, z],
        size: [width, height, depth],
        color: colors[i % colors.length],
        emissive: emissives[i % emissives.length],
      })
    })

    return list
  }, [])

  return (
    <group>
      {buildings.map((b, idx) => (
        <group key={idx} position={b.pos}>
          {/* Main Building Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Glowing Rooftop Spire / Antenna on taller buildings */}
          {b.size[1] > 7 && (
            <mesh position={[0, b.size[1] / 2 + 1, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
              <meshBasicMaterial color={isNight ? b.emissive : '#86efac'} />
            </mesh>
          )}

          {/* Neon Window Stripes */}
          {isNight && (
            <mesh position={[0, 0, b.size[2] / 2 + 0.02]}>
              <planeGeometry args={[b.size[0] * 0.7, b.size[1] * 0.8]} />
              <meshBasicMaterial
                color={b.emissive}
                transparent
                opacity={0.35}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

// Satmatha Central Monument (7-Way Roundabout Tower)
function SatmathaMonument({ isNight }: { isNight: boolean }) {
  const spireRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (spireRef.current) {
      spireRef.current.rotation.y += delta * 0.8
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Roundabout Circular Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <ringGeometry args={[0, 4.5, 32]} />
        <meshStandardMaterial color={isNight ? '#064e3b' : '#047857'} />
      </mesh>

      {/* 7 Radial Road Outlets */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const angle = (i * Math.PI * 2) / 7
        return (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, angle]}
            position={[Math.cos(angle) * 7, 0.03, Math.sin(angle) * 7]}
          >
            <planeGeometry args={[2, 6]} />
            <meshStandardMaterial color={isNight ? '#0f1713' : '#1e2923'} />
          </mesh>
        )
      })}

      {/* Central Pedestal */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[1.6, 2, 1.4, 7]} />
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Tower Shaft */}
      <mesh position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.7, 1.1, 4, 7]} />
        <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rotating Laser Beacon */}
      <mesh ref={spireRef} position={[0, 5.8, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={isNight ? 1.5 : 0.6}
        />
      </mesh>

      <pointLight position={[0, 6, 0]} color="#10b981" intensity={isNight ? 5 : 2} distance={15} />
    </group>
  )
}

// Mahasthangarh Ancient 3D Fortified Citadel
function MahasthangarhCitadel({ isNight }: { isNight: boolean }) {
  return (
    <group position={[-16, 0, -18]}>
      {/* Layer 1: Massive Fortified Rampart Base */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[12, 1.6, 12]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>

      {/* Layer 2: Ancient Terraced Citadel */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[8.5, 1.2, 8.5]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>

      {/* Layer 3: Pundranagar Palace Step */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="#b45309" roughness={0.8} />
      </mesh>

      {/* Ancient Temple Spire */}
      <mesh position={[0, 4.4, 0]}>
        <coneGeometry args={[1.5, 2, 4]} />
        <meshStandardMaterial color="#d97706" emissive="#f59e0b" emissiveIntensity={isNight ? 0.8 : 0.2} />
      </mesh>

      {/* Golden Archaeological Beacon */}
      <pointLight position={[0, 5, 0]} color="#f59e0b" intensity={isNight ? 4 : 2} distance={14} />
    </group>
  )
}

// Animated Cyber Traffic Laser Beams
function TrafficStreams({ isNight }: { isNight: boolean }) {
  const stream1 = useRef<THREE.Mesh>(null!)
  const stream2 = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (stream1.current) {
      stream1.current.position.x = ((t * 8) % 60) - 30
    }
    if (stream2.current) {
      stream2.current.position.z = (((t * 6) + 15) % 60) - 30
    }
  })

  return (
    <group position={[0, 0.15, 0]}>
      <mesh ref={stream1} position={[0, 0, 3]}>
        <boxGeometry args={[2.5, 0.1, 0.25]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh ref={stream2} position={[3, 0, 0]}>
        <boxGeometry args={[0.25, 0.1, 2.5]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>
    </group>
  )
}

// 3D Interactive Landmark Beacon Marker
function LandmarkMarker({
  landmark,
  isSelected,
  onClick,
}: {
  landmark: Landmark
  isSelected: boolean
  onClick: () => void
}) {
  const pinRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (pinRef.current) {
      const t = state.clock.getElapsedTime()
      pinRef.current.position.y = landmark.position[1] + Math.sin(t * 3 + landmark.position[0]) * 0.25
      pinRef.current.rotation.y = t * 1.2
    }
  })

  return (
    <group position={landmark.position} onClick={(e) => { e.stopPropagation(); onClick() }}>
      <group ref={pinRef}>
        {/* Floating Diamond Pin */}
        <mesh>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color={landmark.color}
            emissive={landmark.color}
            emissiveIntensity={isSelected ? 1.5 : 0.8}
            wireframe={false}
          />
        </mesh>

        {/* Pin Stem */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
          <meshBasicMaterial color={landmark.color} />
        </mesh>
      </group>

      {/* Ripple ring on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.6, 0.8, 16]} />
        <meshBasicMaterial color={landmark.color} transparent opacity={isSelected ? 0.9 : 0.4} />
      </mesh>

      {/* 3D Floating Name Label */}
      <Float speed={1.5} floatIntensity={0.3}>
        <Text
          position={[0, 1.4, 0]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
        >
          {landmark.name}
        </Text>
      </Float>
    </group>
  )
}

// Camera Controller for smooth fly-to animations
function CameraRig({ target }: { target: [number, number, number] | null }) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (target && controlsRef.current) {
      controlsRef.current.target.set(target[0], 1, target[2])
    }
  }, [target])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.05} // don't go below ground
      minDistance={6}
      maxDistance={65}
      autoRotate={!target}
      autoRotateSpeed={0.4}
    />
  )
}

// -------------------------------------------------------------
// MAIN BOGURA 3D CITY PAGE COMPONENT
// -------------------------------------------------------------
export default function BoguraCityPage() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(landmarks[0])
  const [isNight, setIsNight] = useState<boolean>(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)

  // Toggle ambient cyber sound generator (Web Audio API)
  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(65.4, ctx.currentTime) // Deep C2 drone

        // LFO for breathing city ambience
        const lfo = ctx.createOscillator()
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime)
        const lfoGain = ctx.createGain()
        lfoGain.gain.setValueAtTime(8, ctx.currentTime)
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)
        lfo.start()

        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()

        audioContextRef.current = ctx
        oscRef.current = osc
        setIsAudioPlaying(true)
      } catch (e) {
        console.error('Audio not supported', e)
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      setIsAudioPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#070b09] select-none font-sans text-white">
      
      {/* 3D WebGL Canvas Stage */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 16, 26], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={[isNight ? '#070b09' : '#1e2923']} />
          <fog attach="fog" args={[isNight ? '#070b09' : '#1e2923', 25, 75]} />

          {/* Lighting */}
          <ambientLight intensity={isNight ? 0.35 : 0.8} />
          <directionalLight
            position={[15, 25, 15]}
            intensity={isNight ? 0.7 : 1.5}
            color={isNight ? '#a7f3d0' : '#ffffff'}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {isNight && <Stars radius={80} depth={50} count={2500} factor={4} saturation={0.5} fade />}

          <Suspense fallback={null}>
            <Ground isNight={isNight} />
            <SatmathaMonument isNight={isNight} />
            <MahasthangarhCitadel isNight={isNight} />
            <CityBuildings isNight={isNight} />
            <TrafficStreams isNight={isNight} />

            {/* Landmark Interactive Beacons */}
            {landmarks.map((l) => (
              <LandmarkMarker
                key={l.id}
                landmark={l}
                isSelected={selectedLandmark?.id === l.id}
                onClick={() => setSelectedLandmark(l)}
              />
            ))}
          </Suspense>

          <CameraRig target={selectedLandmark ? selectedLandmark.position : null} />
        </Canvas>
      </div>

      {/* =============================================================
          HEADS-UP DISPLAY (HUD) GAME UI OVERLAY
         ============================================================= */}
      
      {/* Top Navigation Bar */}
      <header className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Left: Back to Portfolio & Title */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl bg-black/75 hover:bg-emerald-500 hover:text-slate-950 text-white font-mono text-xs font-bold border border-white/15 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Portfolio</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold tracking-wide">BOGURA 3D METAVERSE</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              OPEN WORLD
            </span>
          </div>
        </div>

        {/* Right: Audio & Time / Night Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleAudio}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg ${
              isAudioPlaying
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-black/75 text-white border-white/15 hover:bg-white/10'
            }`}
            title={isAudioPlaying ? 'Mute City Audio' : 'Play Ambient City Audio'}
          >
            {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setIsNight(!isNight)}
            className="w-9 h-9 rounded-xl bg-black/75 hover:bg-white/10 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
            title={isNight ? 'Switch to Daylight' : 'Switch to Cyber Midnight'}
          >
            {isNight ? <Moon size={16} className="text-teal-300" /> : <Sun size={16} className="text-amber-400" />}
          </button>
        </div>
      </header>

      {/* Selected Landmark Discovery Card (Bottom-Left / Center-Left) */}
      {selectedLandmark && (
        <aside className="absolute bottom-20 sm:bottom-24 left-4 max-w-sm sm:max-w-md w-[calc(100%-2rem)] z-20 pointer-events-auto">
          <div className="rounded-2xl border border-white/15 bg-black/85 backdrop-blur-xl p-4 sm:p-5 shadow-2xl space-y-3 relative overflow-hidden">
            {/* Ambient accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: selectedLandmark.color }}
            />

            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  color: selectedLandmark.color,
                  backgroundColor: `${selectedLandmark.color}20`,
                  border: `1px solid ${selectedLandmark.color}40`,
                }}
              >
                {selectedLandmark.category}
              </span>
              <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                <Navigation size={11} className="text-emerald-400" />
                <span>{selectedLandmark.position[0]}, {selectedLandmark.position[2]}</span>
              </span>
            </div>

            <div>
              <h2 className="text-xl font-billboard text-white flex items-center gap-2">
                <span>{selectedLandmark.name}</span>
                <span className="text-xs font-mono text-emerald-400 font-normal">
                  ({selectedLandmark.bengaliName})
                </span>
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed mt-1">
                {selectedLandmark.description}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-stone-300 flex items-start gap-2">
              <Sparkles size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{selectedLandmark.trivia}</span>
            </div>
          </div>
        </aside>
      )}

      {/* Bottom Landmark Quick Navigator Dock */}
      <footer className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-xl shadow-2xl overflow-x-auto max-w-full pointer-events-auto scrollbar-none">
          {landmarks.map((l) => {
            const isCur = selectedLandmark?.id === l.id
            return (
              <button
                key={l.id}
                onClick={() => setSelectedLandmark(l)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isCur
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md scale-105'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <MapPin size={11} className={isCur ? 'text-slate-950' : 'text-emerald-400'} />
                <span>{l.name}</span>
              </button>
            )
          })}
        </div>
      </footer>

      {/* Floating Game Controls Guide (Desktop only) */}
      <div className="hidden lg:flex items-center gap-3 absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono text-stone-300 pointer-events-none">
        <span className="flex items-center gap-1">
          <Gamepad2 size={12} className="text-emerald-400" />
          <span>DRAG: Orbit City</span>
        </span>
        <span>•</span>
        <span>SCROLL: Zoom</span>
        <span>•</span>
        <span>CLICK: Discover Landmarks</span>
      </div>

    </main>
  )
}

