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
    name: 'Satmatha (Bir Srestho Square)',
    bengaliName: 'সাতমাথা (বীরশ্রেষ্ঠ স্কয়ার)',
    category: 'Historic 7-Way Zero Point',
    position: [0, 1.8, 0],
    cameraTarget: [0, 7, 12],
    description:
      'The bustling heartbeat of Bogura city where 7 major historical highways meet. Features the iconic Bir Srestho Square monument honoring Bangladesh\'s 7 greatest national heroes, vibrant cycle rickshaws, and 24/7 city energy.',
    trivia: 'Zero Point of Bogura, connecting Sherpur, Nawabbari, Station, Rangpur & Merina highways with round-the-clock street tea culture.',
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
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial
          color={isNight ? '#070a09' : '#141a17'}
          roughness={0.9}
          metalness={0.2}
        />
      </mesh>

      {/* Cyber Grid */}
      <gridHelper
        args={[130, 65, isNight ? '#10b981' : '#059669', isNight ? '#1e2925' : '#273832']}
        position={[0, 0.01, 0]}
      />

      {/* Karatoa River flowing diagonally */}
      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 6]} position={[-12, 0.02, 12]}>
        <planeGeometry args={[12, 140]} />
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

// -------------------------------------------------------------
// AUTHENTIC 3D BANGLADESHI CYCLE RICKSHAW
// -------------------------------------------------------------
function Rickshaw3D({
  position,
  rotationY,
  hoodColor = '#dc2626',
}: {
  position: [number, number, number]
  rotationY: number
  hoodColor?: string
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={[0.55, 0.55, 0.55]}>
      {/* Rickshaw Wheels */}
      {/* Front Wheel */}
      <mesh position={[0, 0.4, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rear Left Wheel */}
      <mesh position={[-0.55, 0.4, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rear Right Wheel */}
      <mesh position={[0.55, 0.4, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Triangular Metal Frame */}
      <mesh position={[0, 0.45, 0.3]}>
        <boxGeometry args={[0.1, 0.1, 1.6]} />
        <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Handlebar */}
      <mesh position={[0, 0.9, 0.9]}>
        <boxGeometry args={[0.6, 0.05, 0.05]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Puller Seat */}
      <mesh position={[0, 0.75, 0.4]}>
        <boxGeometry args={[0.25, 0.08, 0.25]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Passenger Passenger Body / Cart Box */}
      <mesh position={[0, 0.6, -0.4]}>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial color="#eab308" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Passenger Cushioned Seat */}
      <mesh position={[0, 0.8, -0.5]}>
        <boxGeometry args={[0.8, 0.15, 0.4]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      {/* Rickshaw Painted Hood (Canvas canopy) */}
      <mesh position={[0, 1.25, -0.5]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.85, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={hoodColor} roughness={0.5} />
      </mesh>
      {/* Traditional Rickshaw Footrest */}
      <mesh position={[0, 0.35, 0.1]}>
        <boxGeometry args={[0.6, 0.04, 0.3]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </group>
  )
}

// -------------------------------------------------------------
// SEVEN RINGS POLICE TRAFFIC KIOSK (From Reference Photo)
// -------------------------------------------------------------
function PoliceTrafficKiosk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={[0.7, 0.7, 0.7]}>
      {/* Raised Round Traffic Island Base */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.5, 24]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Striped Yellow/Black Curb */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.52, 1.52, 0.15, 24]} />
        <meshStandardMaterial color="#eab308" roughness={0.5} />
      </mesh>

      {/* Canopy Pillars */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      ))}

      {/* Red Drum Roof - Seven Rings Kiosk */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.6, 24]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      {/* White Sign band on roof */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.2, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Police Umbrella / Shelter Top */}
      <mesh position={[0, 2.9, 0]}>
        <coneGeometry args={[1.4, 0.5, 24]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.4} />
      </mesh>

      {/* Traffic Yellow Barricades in front */}
      <mesh position={[0, 0.35, 1.9]}>
        <boxGeometry args={[1.6, 0.6, 0.15]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.35, 1.95]}>
        <boxGeometry args={[1.4, 0.15, 0.05]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

// -------------------------------------------------------------
// SATMATHA 7-WAY CENTRAL ROUNDABOUT & BIR SRESTHO SQUARE MONUMENT
// -------------------------------------------------------------
function SatmathaMonument({ isNight }: { isNight: boolean }) {
  const rickshawAngleRef = useRef(0)
  const rickshawGroupRef = useRef<THREE.Group>(null!)
  const beaconRef = useRef<THREE.Mesh>(null!)

  // Animate Rickshaws circulating around Satmatha roundabout
  useFrame((_, delta) => {
    rickshawAngleRef.current += delta * 0.4
    if (rickshawGroupRef.current) {
      rickshawGroupRef.current.rotation.y = rickshawAngleRef.current
    }
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 1.2
    }
  })

  // 7 Major Converging Roads of Bogura Satmatha
  const roads = useMemo(
    () => [
      { name: 'Sherpur Rd', bengali: 'শেরপুর রোড', angle: 0 },
      { name: 'Nawabbari Rd', bengali: 'নবাববাড়ী রোড', angle: (1 * Math.PI * 2) / 7 },
      { name: 'Kazi Nazrul Islam Rd', bengali: 'নজরুল ইসলাম রোড', angle: (2 * Math.PI * 2) / 7 },
      { name: 'Merina Rd', bengali: 'মেরিনা রোড', angle: (3 * Math.PI * 2) / 7 },
      { name: 'Station Rd', bengali: 'রেলওয়ে স্টেশন রোড', angle: (4 * Math.PI * 2) / 7 },
      { name: 'Rangpur Rd', bengali: 'রংপুর রোড', angle: (5 * Math.PI * 2) / 7 },
      { name: 'Circuit House Rd', bengali: 'সার্কিট হাউজ রোড', angle: (6 * Math.PI * 2) / 7 },
    ],
    []
  )

  return (
    <group position={[0, 0, 0]}>
      {/* -------------------------------------------------------------
          1. ASPHALT ROUNDABOUT CARRIAGEWAY & 7 HIGHWAYS
         ------------------------------------------------------------- */}
      {/* Main Asphalt Roundabout Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <ringGeometry args={[4.2, 8.8, 48]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Dashed Roundabout Lane Guide */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[6.4, 6.55, 36]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
      </mesh>

      {/* 7 Radiating Road Arms (Satmatha) */}
      {roads.map((r, i) => (
        <group key={i} rotation={[0, r.angle, 0]}>
          {/* Asphalt Road Arm */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, 14]} receiveShadow>
            <planeGeometry args={[4.4, 15]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>

          {/* White Centerline */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 14]}>
            <planeGeometry args={[0.18, 14]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>

          {/* Road Border Curbs */}
          <mesh position={[-2.3, 0.1, 14]}>
            <boxGeometry args={[0.2, 0.2, 15]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[2.3, 0.1, 14]}>
            <boxGeometry args={[0.2, 0.2, 15]} />
            <meshStandardMaterial color="#475569" />
          </mesh>

          {/* 3D Road Signboard (Google Maps Style) */}
          <group position={[3.2, 1.8, 12]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh>
              <boxGeometry args={[2.8, 0.7, 0.08]} />
              <meshStandardMaterial color="#0f766e" roughness={0.3} />
            </mesh>
            <mesh position={[0, -1, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>
            <Text
              position={[0, 0.05, 0.05]}
              fontSize={0.24}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {r.name}
            </Text>
          </group>
        </group>
      ))}

      {/* -------------------------------------------------------------
          2. POLICE TRAFFIC KIOSK (Near Sherpur Road junction)
         ------------------------------------------------------------- */}
      <PoliceTrafficKiosk position={[6.8, 0, 4.2]} />

      {/* -------------------------------------------------------------
          3. ROUNDABOUT CENTRAL GARDEN ISLAND WITH ORANGE WEDGES
         ------------------------------------------------------------- */}
      {/* Green Turf Central Island (Flowerbed) */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[4.2, 4.4, 0.4, 42]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>

      {/* Circular White Perimeter Railing */}
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[4.05, 0.03, 8, 48]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.6} />
      </mesh>
      {/* Railing Vertical Posts */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((idx) => {
        const a = (idx * Math.PI * 2) / 14
        return (
          <mesh key={idx} position={[Math.cos(a) * 4.05, 0.5, Math.sin(a) * 4.05]}>
            <cylinderGeometry args={[0.03, 0.03, 0.35, 6]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.6} />
          </mesh>
        )
      })}

      {/* The 7 Iconic Curved Orange Wedge Steps / Buttresses (From Photos 1 & 3) */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const angle = (i * Math.PI * 2) / 7 + 0.2
        return (
          <group key={i} rotation={[0, angle, 0]} position={[0, 0, 0]}>
            <mesh position={[0, 0.35, 3.85]}>
              <boxGeometry args={[0.9, 0.45, 0.6]} />
              <meshStandardMaterial color="#ea580c" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.15, 4.2]}>
              <boxGeometry args={[1.1, 0.25, 0.35]} />
              <meshStandardMaterial color="#f97316" roughness={0.6} />
            </mesh>
          </group>
        )
      })}

      {/* Flowerbed Shrubs inside the island */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => {
        const a = (j * Math.PI * 2) / 8 + 0.4
        return (
          <mesh key={j} position={[Math.cos(a) * 2.8, 0.48, Math.sin(a) * 2.8]}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.9} />
          </mesh>
        )
      })}

      {/* -------------------------------------------------------------
          4. BIR SRESTHO SQUARE MONUMENT (বীরশ্রেষ্ঠ স্কয়ার স্মৃতিস্তম্ভ)
         ------------------------------------------------------------- */}
      <group position={[0, 0.4, 0]}>
        {/* Tier 1: White/Grey Marble Stepped Plinth */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[2.2, 2.5, 0.4, 7]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Tier 2: Hexagonal Plinth Step */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.7, 1.9, 0.3, 7]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
        </mesh>

        {/* 7 Flared White Wing Pillars (Wings of Freedom honoring 7 Bir Srestho) */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * Math.PI * 2) / 7
          return (
            <group key={i} rotation={[0, angle, 0]} position={[0, 0.65, 0]}>
              {/* Vertical Wing Wall */}
              <mesh position={[0, 0.7, 1.15]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[0.3, 1.4, 0.2]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
              </mesh>
              {/* Golden Commemorative Bir Srestho Portrait Frame */}
              <mesh position={[0, 0.75, 1.26]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[0.22, 0.35, 0.04]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Wing Top Finial Light */}
              <mesh position={[0, 1.45, 1.1]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshBasicMaterial color="#34d399" />
              </mesh>
            </group>
          )
        })}

        {/* Central Rectangular Pillar / Column (Brown Granite) */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <boxGeometry args={[1.1, 3.2, 1.1]} />
          <meshStandardMaterial color="#78350f" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Monument Commemorative Name Plate (Front & Back) */}
        <mesh position={[0, 2.4, 0.57]}>
          <boxGeometry args={[0.85, 0.6, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <Text
          position={[0, 2.4, 0.61]}
          fontSize={0.16}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
        >
          বীরশ্রেষ্ঠ স্কয়ার
        </Text>

        <mesh position={[0, 2.4, -0.57]}>
          <boxGeometry args={[0.85, 0.6, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <Text
          position={[0, 2.4, -0.61]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.14}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
        >
          BIR SRESTHO SQ
        </Text>

        {/* The Iconic Flared Pavilion Canopy Capital (Top Crown) */}
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[1.5, 1.1, 0.45, 4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 4.35, 0]}>
          <cylinderGeometry args={[1.3, 1.5, 0.3, 4]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
        </mesh>

        {/* Golden Globe / Sphere Finial atop the Monument */}
        <mesh position={[0, 4.75, 0]}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.1}
            metalness={0.9}
            emissive="#f59e0b"
            emissiveIntensity={isNight ? 0.6 : 0.2}
          />
        </mesh>

        {/* Rotating Emerald Cyber Beacon atop the Spire */}
        <mesh ref={beaconRef} position={[0, 5.3, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={isNight ? 1.8 : 0.8}
          />
        </mesh>

        {/* Architectural Night Lighting on the Monument */}
        <pointLight
          position={[0, 3.5, 0]}
          color="#10b981"
          intensity={isNight ? 4.5 : 1.5}
          distance={12}
        />
        <pointLight
          position={[0, 5.2, 0]}
          color="#34d399"
          intensity={isNight ? 3 : 1}
          distance={10}
        />
      </group>

      {/* -------------------------------------------------------------
          5. CIRCULATING BANGLADESHI CYCLE RICKSHAWS
         ------------------------------------------------------------- */}
      <group ref={rickshawGroupRef}>
        {/* Rickshaw 1 - Red Hood */}
        <Rickshaw3D position={[5.4, 0, 0]} rotationY={0} hoodColor="#dc2626" />
        {/* Rickshaw 2 - Yellow Hood */}
        <Rickshaw3D position={[-5.6, 0, 1.2]} rotationY={Math.PI} hoodColor="#eab308" />
        {/* Rickshaw 3 - Cyan Hood */}
        <Rickshaw3D position={[0, 0, 5.5]} rotationY={-Math.PI / 2} hoodColor="#0284c7" />
        {/* Rickshaw 4 - Purple Hood */}
        <Rickshaw3D position={[2.5, 0, -4.8]} rotationY={Math.PI / 1.5} hoodColor="#9333ea" />
      </group>
    </group>
  )
}

// Procedural 3D City Buildings & Rooftop Billboards
function CityBuildings({ isNight }: { isNight: boolean }) {
  const buildings = useMemo(() => {
    const list: Array<{
      pos: [number, number, number]
      size: [number, number, number]
      color: string
      emissive: string
      hasBillboard?: boolean
      billboardText?: string
    }> = []

    // Coords clustered around the 7 roads of Satmatha
    const coords: Array<[number, number, boolean, string]> = [
      // Cluster 1 (Sherpur Rd & Nawabbari Rd)
      [9, 10, true, 'বগুড়ার বিখ্যাত দই'],
      [14, 6, false, ''],
      [11, 16, true, 'SEVEN RINGS CEMENT'],
      [18, 12, false, ''],
      [16, -2, false, ''],

      // Cluster 2 (Kazi Nazrul Islam & Merina Rd)
      [-10, 11, true, 'মোমিনুল টেক হাব'],
      [-15, 7, false, ''],
      [-13, 17, false, ''],
      [-18, 13, true, 'BOGURA SMART CITY'],

      // Cluster 3 (Station Rd & Rangpur Rd)
      [-11, -12, true, 'Pundranagar Heritage'],
      [-16, -8, false, ''],
      [-8, -17, false, ''],
      [-17, -18, true, 'MAHASTHAN TRAVELS'],

      // Cluster 4 (Circuit House Rd & East)
      [10, -11, true, 'North Bengal Plaza'],
      [15, -9, false, ''],
      [12, -18, false, ''],
      [18, -16, false, ''],

      // Outer Perimeter Skyscrapers
      [25, 8, false, ''],
      [-26, 9, false, ''],
      [24, -14, false, ''],
      [-25, -15, false, ''],
      [4, 25, false, ''],
      [-5, 26, false, ''],
      [5, -26, false, ''],
      [-6, -27, false, ''],
    ]

    coords.forEach(([x, z, hasBillboard, billboardText], i) => {
      const height = 4 + ((i * 7) % 9) * 0.9
      const width = 2.4 + ((i * 3) % 4) * 0.4
      const depth = 2.4 + ((i * 5) % 4) * 0.4
      const colors = ['#111815', '#16201b', '#0f1713', '#1e2823']
      const emissives = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6']

      list.push({
        pos: [x, height / 2, z],
        size: [width, height, depth],
        color: colors[i % colors.length],
        emissive: emissives[i % emissives.length],
        hasBillboard,
        billboardText,
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

          {/* Rooftop Billboard (Seen in Google Street View of Satmatha) */}
          {b.hasBillboard && (
            <group position={[0, b.size[1] / 2 + 0.9, 0]}>
              {/* Metal Truss Legs */}
              <mesh position={[-b.size[0] * 0.35, -0.4, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
              <mesh position={[b.size[0] * 0.35, -0.4, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>

              {/* Billboard Board Frame */}
              <mesh>
                <boxGeometry args={[b.size[0] * 0.9, 0.9, 0.08]} />
                <meshStandardMaterial
                  color={isNight ? '#042f2e' : '#f8fafc'}
                  roughness={0.3}
                  metalness={0.5}
                />
              </mesh>

              {/* Billboard Text */}
              <Text
                position={[0, 0, 0.05]}
                fontSize={0.22}
                color={isNight ? '#34d399' : '#047857'}
                anchorX="center"
                anchorY="middle"
              >
                {b.billboardText || 'BOGURA'}
              </Text>

              {/* Billboard Night Glow Spot */}
              {isNight && (
                <pointLight position={[0, 0.4, 0.3]} color="#10b981" intensity={1.5} distance={4} />
              )}
            </group>
          )}

          {/* Glowing Rooftop Spire on taller buildings */}
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

// Mahasthangarh Ancient 3D Fortified Citadel
function MahasthangarhCitadel({ isNight }: { isNight: boolean }) {
  return (
    <group position={[-18, 0, -20]}>
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
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (target && controlsRef.current) {
      controlsRef.current.target.set(target[0], 1.2, target[2])
    }
  }, [target])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minDistance={4}
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
        osc.frequency.setValueAtTime(65.4, ctx.currentTime)

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
          camera={{ position: [0, 9, 15], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={[isNight ? '#070b09' : '#1e2923']} />
          <fog attach="fog" args={[isNight ? '#070b09' : '#1e2923', 25, 75]} />

          {/* Lighting */}
          <ambientLight intensity={isNight ? 0.45 : 0.9} />
          <directionalLight
            position={[15, 25, 15]}
            intensity={isNight ? 0.9 : 1.7}
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

          <CameraRig target={selectedLandmark ? selectedLandmark.cameraTarget : null} />
        </Canvas>
      </div>

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
            <span className="text-xs font-bold tracking-wide">BOGURA SATMATHA 3D</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              BIR SRESTHO SQ
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

      {/* Selected Landmark Discovery Card */}
      {selectedLandmark && (
        <aside className="absolute bottom-20 sm:bottom-24 left-4 max-w-sm sm:max-w-md w-[calc(100%-2rem)] z-20 pointer-events-auto">
          <div className="rounded-2xl border border-white/15 bg-black/85 backdrop-blur-xl p-4 sm:p-5 shadow-2xl space-y-3 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: selectedLandmark.color }}
            />

            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${selectedLandmark.color}25`,
                  color: selectedLandmark.color,
                  border: `1px solid ${selectedLandmark.color}50`,
                }}
              >
                {selectedLandmark.category}
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                Bogura 3D Map
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{selectedLandmark.name}</span>
              </h2>
              <p className="text-xs text-emerald-400 font-medium">
                {selectedLandmark.bengaliName}
              </p>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {selectedLandmark.description}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-start gap-2">
              <Sparkles size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-200/90 leading-tight">
                <span className="font-bold text-amber-400">Insight: </span>
                {selectedLandmark.trivia}
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* Bottom Landmark Navigation Dock */}
      <footer className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl overflow-x-auto pointer-events-auto">
          {landmarks.map((landmark) => {
            const isActive = selectedLandmark?.id === landmark.id
            return (
              <button
                key={landmark.id}
                onClick={() => setSelectedLandmark(landmark)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: landmark.color }}
                />
                <span>{landmark.name.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>
      </footer>
    </main>
  )
}
