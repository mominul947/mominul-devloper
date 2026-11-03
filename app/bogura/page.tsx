'use client'

import { useState, useRef, useEffect, Suspense, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Stars, OrbitControls } from '@react-three/drei'
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
  RotateCcw,
  Footprints,
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
    position: [-22, 2, -24],
    cameraTarget: [-22, 10, -14],
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
    position: [18, 1.2, 12],
    cameraTarget: [18, 7, 22],
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
    position: [-10, 0.4, 20],
    cameraTarget: [-10, 6, 28],
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
    position: [16, 3, -16],
    cameraTarget: [16, 10, -6],
    description:
      'The creative development headquarters of Md. Mominul Islam. Engineering production Android mobile applications, WebGL simulations, and 60fps high-scale digital platforms.',
    trivia: 'Crafting production apps for clients worldwide directly from Bogura Sadar.',
    color: '#8b5cf6',
  },
]

// -------------------------------------------------------------
// 3D HUMAN WALKING AVATAR (Interactive Character)
// -------------------------------------------------------------
function HumanCharacter({
  position,
  rotationY,
  isMoving,
  walkCycle,
}: {
  position: [number, number, number]
  rotationY: number
  isMoving: boolean
  walkCycle: number
}) {
  const leftLegAngle = isMoving ? Math.sin(walkCycle) * 0.5 : 0
  const rightLegAngle = isMoving ? -Math.sin(walkCycle) * 0.5 : 0
  const leftArmAngle = isMoving ? -Math.sin(walkCycle) * 0.5 : 0
  const rightArmAngle = isMoving ? Math.sin(walkCycle) * 0.5 : 0
  const torsoBob = isMoving ? Math.abs(Math.sin(walkCycle * 2)) * 0.05 : 0

  return (
    <group position={[position[0], position[1] + torsoBob, position[2]]} rotation={[0, rotationY, 0]}>
      {/* Soft Ground Shadow Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>

      {/* Character Root */}
      <group position={[0, 0.85, 0]}>
        {/* Head */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.4} />
        </mesh>
        {/* Explorer Cap / Hair */}
        <mesh position={[0, 0.82, 0.02]}>
          <cylinderGeometry args={[0.2, 0.22, 0.09, 12]} />
          <meshStandardMaterial color="#0f766e" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.8, 0.14]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.24, 0.03, 0.16]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>

        {/* Torso / Bengali Kurta/Jacket */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.38, 0.48, 0.22]} />
          <meshStandardMaterial color="#047857" roughness={0.5} />
        </mesh>
        {/* Belt */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.39, 0.06, 0.23]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Backpack */}
        <mesh position={[0, 0.36, -0.15]}>
          <boxGeometry args={[0.26, 0.32, 0.14]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>

        {/* Left Arm */}
        <group position={[-0.24, 0.5, 0]} rotation={[leftArmAngle, 0, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.1, 0.38, 0.1]} />
            <meshStandardMaterial color="#065f46" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group position={[0.24, 0.5, 0]} rotation={[rightArmAngle, 0, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.1, 0.38, 0.1]} />
            <meshStandardMaterial color="#065f46" />
          </mesh>
        </group>

        {/* Left Leg */}
        <group position={[-0.11, 0.08, 0]} rotation={[leftLegAngle, 0, 0]}>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.13, 0.48, 0.14]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.66, 0.04]}>
            <boxGeometry args={[0.14, 0.08, 0.22]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Right Leg */}
        <group position={[0.11, 0.08, 0]} rotation={[rightLegAngle, 0, 0]}>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.13, 0.48, 0.14]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.66, 0.04]}>
            <boxGeometry args={[0.14, 0.08, 0.22]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// -------------------------------------------------------------
// THIRD-PERSON PLAYER CONTROLLER (WASD + Joystick + Camera Follow)
// -------------------------------------------------------------
function PlayerController({
  playerPos,
  setPlayerPos,
  playerRot,
  setPlayerRot,
  joystickVector,
  isPersonMode,
}: {
  playerPos: [number, number, number]
  setPlayerPos: (pos: [number, number, number]) => void
  playerRot: number
  setPlayerRot: (rot: number) => void
  joystickVector: { x: number; y: number }
  isPersonMode: boolean
}) {
  const { camera } = useThree()
  const keys = useRef<{ [key: string]: boolean }>({})
  const [isMoving, setIsMoving] = useState(false)
  const walkCycleRef = useRef(0)

  // Keyboard Event Listeners for WASD and Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (!isPersonMode) return

    // Calculate Keyboard Inputs
    let moveForward = 0
    let turn = 0

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveForward += 1
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveForward -= 1
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) turn += 1
    if (keys.current['KeyD'] || keys.current['ArrowRight']) turn -= 1

    // Combine with Joystick Inputs
    // joystickVector.y is forward/backward (-1 to 1), joystickVector.x is turn/strafe (-1 to 1)
    if (Math.abs(joystickVector.y) > 0.05) {
      moveForward += -joystickVector.y
    }
    if (Math.abs(joystickVector.x) > 0.05) {
      turn += -joystickVector.x
    }

    // Clamp values
    moveForward = Math.max(-1, Math.min(1, moveForward))
    turn = Math.max(-1, Math.min(1, turn))

    const moving = Math.abs(moveForward) > 0.05 || Math.abs(turn) > 0.05
    setIsMoving(moving)

    let nextRot = playerRot
    if (Math.abs(turn) > 0.05) {
      nextRot += turn * delta * 2.8
      setPlayerRot(nextRot)
    }

    let nextX = playerPos[0]
    let nextZ = playerPos[2]

    if (Math.abs(moveForward) > 0.05) {
      const speed = 7.5 // units per second
      nextX += Math.sin(nextRot) * moveForward * speed * delta
      nextZ += Math.cos(nextRot) * moveForward * speed * delta

      // Boundary limits (within Bogura map -55 to 55)
      nextX = Math.max(-55, Math.min(55, nextX))
      nextZ = Math.max(-55, Math.min(55, nextZ))

      // Roundabout Monument Plinth Obstacle Avoidance (center cylinder radius 4.2)
      const distFromCenter = Math.sqrt(nextX * nextX + nextZ * nextZ)
      if (distFromCenter < 4.2) {
        const pushAngle = Math.atan2(nextZ, nextX)
        nextX = Math.cos(pushAngle) * 4.25
        nextZ = Math.sin(pushAngle) * 4.25
      }

      setPlayerPos([nextX, 0, nextZ])
      walkCycleRef.current += delta * 14 * Math.abs(moveForward)
    }

    // Smooth Third-Person Camera Follow
    // Camera is positioned behind player based on heading
    const camDist = 6.5
    const camHeight = 3.6
    const targetCamX = nextX - Math.sin(nextRot) * camDist
    const targetCamY = camHeight
    const targetCamZ = nextZ - Math.cos(nextRot) * camDist

    // Lerp camera position for fluid cinematic movement
    camera.position.x += (targetCamX - camera.position.x) * 0.1
    camera.position.y += (targetCamY - camera.position.y) * 0.1
    camera.position.z += (targetCamZ - camera.position.z) * 0.1

    // Camera looks slightly ahead of character's head
    const lookTarget = new THREE.Vector3(
      nextX + Math.sin(nextRot) * 2,
      1.3,
      nextZ + Math.cos(nextRot) * 2
    )
    camera.lookAt(lookTarget)
  })

  return (
    <HumanCharacter
      position={playerPos}
      rotationY={playerRot}
      isMoving={isMoving}
      walkCycle={walkCycleRef.current}
    />
  )
}

// -------------------------------------------------------------
// 3D BANGLADESHI CYCLE RICKSHAW
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
      {/* Front Wheel */}
      <mesh position={[0, 0.4, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rear Wheels */}
      <mesh position={[-0.55, 0.4, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
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
      {/* Passenger Box */}
      <mesh position={[0, 0.6, -0.4]}>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial color="#eab308" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Passenger Seat */}
      <mesh position={[0, 0.8, -0.5]}>
        <boxGeometry args={[0.8, 0.15, 0.4]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      {/* Painted Hood */}
      <mesh position={[0, 1.25, -0.5]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.85, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={hoodColor} roughness={0.5} />
      </mesh>
    </group>
  )
}

// -------------------------------------------------------------
// POLICE TRAFFIC KIOSK (Seven Rings)
// -------------------------------------------------------------
function PoliceTrafficKiosk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={[0.7, 0.7, 0.7]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.5, 24]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.52, 1.52, 0.15, 24]} />
        <meshStandardMaterial color="#eab308" roughness={0.5} />
      </mesh>
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.6, 24]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.2, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.9, 0]}>
        <coneGeometry args={[1.4, 0.5, 24]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.4} />
      </mesh>
      {/* Yellow barricades */}
      <mesh position={[0, 0.35, 1.9]}>
        <boxGeometry args={[1.6, 0.6, 0.15]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
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

  useFrame((_, delta) => {
    rickshawAngleRef.current += delta * 0.4
    if (rickshawGroupRef.current) {
      rickshawGroupRef.current.rotation.y = rickshawAngleRef.current
    }
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 1.2
    }
  })

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
      {/* Asphalt Roundabout Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <ringGeometry args={[4.2, 8.8, 48]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Dashed Lane Guide */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[6.4, 6.55, 36]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
      </mesh>

      {/* 7 Radiating Road Arms */}
      {roads.map((r, i) => (
        <group key={i} rotation={[0, r.angle, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, 18]} receiveShadow>
            <planeGeometry args={[4.4, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 18]}>
            <planeGeometry args={[0.18, 23]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
          <mesh position={[-2.3, 0.1, 18]}>
            <boxGeometry args={[0.2, 0.2, 24]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[2.3, 0.1, 18]}>
            <boxGeometry args={[0.2, 0.2, 24]} />
            <meshStandardMaterial color="#475569" />
          </mesh>

          {/* 3D Road Signboard */}
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

      {/* Police Traffic Kiosk */}
      <PoliceTrafficKiosk position={[6.8, 0, 4.2]} />

      {/* Green Turf Central Island */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[4.2, 4.4, 0.4, 42]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>

      {/* White Perimeter Railing */}
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[4.05, 0.03, 8, 48]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.6} />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((idx) => {
        const a = (idx * Math.PI * 2) / 14
        return (
          <mesh key={idx} position={[Math.cos(a) * 4.05, 0.5, Math.sin(a) * 4.05]}>
            <cylinderGeometry args={[0.03, 0.03, 0.35, 6]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.6} />
          </mesh>
        )
      })}

      {/* The 7 Iconic Curved Orange Wedge Steps */}
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

      {/* Flowerbed Shrubs */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => {
        const a = (j * Math.PI * 2) / 8 + 0.4
        return (
          <mesh key={j} position={[Math.cos(a) * 2.8, 0.48, Math.sin(a) * 2.8]}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.9} />
          </mesh>
        )
      })}

      {/* Bir Srestho Square Monument */}
      <group position={[0, 0.4, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[2.2, 2.5, 0.4, 7]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.7, 1.9, 0.3, 7]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
        </mesh>

        {/* 7 Flared White Wing Pillars */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * Math.PI * 2) / 7
          return (
            <group key={i} rotation={[0, angle, 0]} position={[0, 0.65, 0]}>
              <mesh position={[0, 0.7, 1.15]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[0.3, 1.4, 0.2]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
              </mesh>
              <mesh position={[0, 0.75, 1.26]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[0.22, 0.35, 0.04]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
              </mesh>
              <mesh position={[0, 1.45, 1.1]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshBasicMaterial color="#34d399" />
              </mesh>
            </group>
          )
        })}

        {/* Central Rectangular Pillar */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <boxGeometry args={[1.1, 3.2, 1.1]} />
          <meshStandardMaterial color="#78350f" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Monument Commemorative Name Plate */}
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

        {/* Flared Pavilion Canopy Capital */}
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[1.5, 1.1, 0.45, 4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 4.35, 0]}>
          <cylinderGeometry args={[1.3, 1.5, 0.3, 4]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
        </mesh>

        {/* Golden Globe Finial */}
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

        {/* Rotating Beacon */}
        <mesh ref={beaconRef} position={[0, 5.3, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={isNight ? 1.8 : 0.8}
          />
        </mesh>

        <pointLight
          position={[0, 3.5, 0]}
          color="#10b981"
          intensity={isNight ? 4.5 : 1.5}
          distance={12}
        />
      </group>

      {/* Circulating Rickshaws */}
      <group ref={rickshawGroupRef}>
        <Rickshaw3D position={[5.4, 0, 0]} rotationY={0} hoodColor="#dc2626" />
        <Rickshaw3D position={[-5.6, 0, 1.2]} rotationY={Math.PI} hoodColor="#eab308" />
        <Rickshaw3D position={[0, 0, 5.5]} rotationY={-Math.PI / 2} hoodColor="#0284c7" />
        <Rickshaw3D position={[2.5, 0, -4.8]} rotationY={Math.PI / 1.5} hoodColor="#9333ea" />
      </group>
    </group>
  )
}

// -------------------------------------------------------------
// PROCEDURAL CITY SKYSCRAPERS & ROOFTOP BILLBOARDS
// -------------------------------------------------------------
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

    const coords: Array<[number, number, boolean, string]> = [
      [9, 10, true, 'বগুড়ার বিখ্যাত দই'],
      [14, 6, false, ''],
      [11, 16, true, 'SEVEN RINGS CEMENT'],
      [18, 12, false, ''],
      [16, -2, false, ''],
      [-10, 11, true, 'মোমিনুল টেক হাব'],
      [-15, 7, false, ''],
      [-13, 17, false, ''],
      [-18, 13, true, 'BOGURA SMART CITY'],
      [-11, -12, true, 'Pundranagar Heritage'],
      [-16, -8, false, ''],
      [-8, -17, false, ''],
      [-17, -18, true, 'MAHASTHAN TRAVELS'],
      [10, -11, true, 'North Bengal Plaza'],
      [15, -9, false, ''],
      [12, -18, false, ''],
      [18, -16, false, ''],
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
          <mesh castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {b.hasBillboard && (
            <group position={[0, b.size[1] / 2 + 0.9, 0]}>
              <mesh position={[-b.size[0] * 0.35, -0.4, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
              <mesh position={[b.size[0] * 0.35, -0.4, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
              <mesh>
                <boxGeometry args={[b.size[0] * 0.9, 0.9, 0.08]} />
                <meshStandardMaterial
                  color={isNight ? '#042f2e' : '#f8fafc'}
                  roughness={0.3}
                  metalness={0.5}
                />
              </mesh>
              <Text
                position={[0, 0, 0.05]}
                fontSize={0.22}
                color={isNight ? '#34d399' : '#047857'}
                anchorX="center"
                anchorY="middle"
              >
                {b.billboardText || 'BOGURA'}
              </Text>
              {isNight && (
                <pointLight position={[0, 0.4, 0.3]} color="#10b981" intensity={1.5} distance={4} />
              )}
            </group>
          )}

          {b.size[1] > 7 && (
            <mesh position={[0, b.size[1] / 2 + 1, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
              <meshBasicMaterial color={isNight ? b.emissive : '#86efac'} />
            </mesh>
          )}

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

// -------------------------------------------------------------
// MAHASTHANGARH ANCIENT FORTIFIED CITADEL
// -------------------------------------------------------------
function MahasthangarhCitadel({ isNight }: { isNight: boolean }) {
  return (
    <group position={[-22, 0, -24]}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[12, 1.6, 12]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[8.5, 1.2, 8.5]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="#b45309" roughness={0.8} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <coneGeometry args={[1.5, 2, 4]} />
        <meshStandardMaterial color="#d97706" emissive="#f59e0b" emissiveIntensity={isNight ? 0.8 : 0.2} />
      </mesh>
      <pointLight position={[0, 5, 0]} color="#f59e0b" intensity={isNight ? 4 : 2} distance={14} />
    </group>
  )
}

// -------------------------------------------------------------
// GROUND & KARATOA WATERWAY
// -------------------------------------------------------------
function Ground({ isNight }: { isNight: boolean }) {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial
          color={isNight ? '#070a09' : '#141a17'}
          roughness={0.9}
          metalness={0.2}
        />
      </mesh>
      <gridHelper
        args={[130, 65, isNight ? '#10b981' : '#059669', isNight ? '#1e2925' : '#273832']}
        position={[0, 0.01, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 6]} position={[-14, 0.02, 14]}>
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
// INTERACTIVE LANDMARK MARKER
// -------------------------------------------------------------
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
        <mesh>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color={landmark.color}
            emissive={landmark.color}
            emissiveIntensity={isSelected ? 1.5 : 0.8}
          />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
          <meshBasicMaterial color={landmark.color} />
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.6, 0.8, 16]} />
        <meshBasicMaterial color={landmark.color} transparent opacity={isSelected ? 0.9 : 0.4} />
      </mesh>
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

// -------------------------------------------------------------
// RADAR MINI-MAP COMPONENT (Left Side of Screen)
// -------------------------------------------------------------
function LeftMiniMap({
  playerPos,
  playerRot,
  landmarks,
  onTeleport,
}: {
  playerPos: [number, number, number]
  playerRot: number
  landmarks: Landmark[]
  onTeleport: (pos: [number, number, number]) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const mapSize = isExpanded ? 240 : 160
  const worldRange = 55 // -55 to +55 maps to 0 to mapSize

  // Convert World Coordinates (X, Z) to Map Pixels
  const toMapCoord = (x: number, z: number) => {
    const px = ((x + worldRange) / (worldRange * 2)) * mapSize
    const py = ((z + worldRange) / (worldRange * 2)) * mapSize
    return { px, py }
  }

  const playerMap = toMapCoord(playerPos[0], playerPos[2])
  const distToSatmatha = Math.round(
    Math.sqrt(playerPos[0] * playerPos[0] + playerPos[2] * playerPos[2]) * 10
  )

  return (
    <div className="absolute top-20 left-4 z-30 select-none">
      <div
        className="rounded-2xl border border-emerald-500/40 bg-black/85 backdrop-blur-xl p-3 shadow-2xl transition-all"
        style={{ width: mapSize + 24 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              BOGURA RADAR MAP
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-stone-300 hover:text-white"
          >
            {isExpanded ? 'Mini' : 'Zoom'}
          </button>
        </div>

        {/* Radar Map Canvas Representation */}
        <div
          className="relative rounded-xl overflow-hidden border border-emerald-500/20 bg-[#06120d] cursor-crosshair"
          style={{ width: mapSize, height: mapSize }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const clickX = e.clientX - rect.left
            const clickY = e.clientY - rect.top
            const worldX = (clickX / mapSize) * (worldRange * 2) - worldRange
            const worldZ = (clickY / mapSize) * (worldRange * 2) - worldRange
            onTeleport([worldX, 0, worldZ])
          }}
          title="Click anywhere to fast-travel / teleport!"
        >
          {/* Radar Sweep Animation Line */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(16,185,129,0.08)_100%)] pointer-events-none" />

          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-emerald-500/30" />
            ))}
          </div>

          {/* Karatoa River diagonal ribbon */}
          <div
            className="absolute bg-sky-500/30 -rotate-45 pointer-events-none"
            style={{
              top: '15%',
              left: '-20%',
              width: '140%',
              height: isExpanded ? '18px' : '12px',
            }}
          />

          {/* 7 Roads radiating from Satmatha center */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const rad = (i * Math.PI * 2) / 7
            const length = mapSize * 0.46
            const centerX = mapSize / 2
            const centerY = mapSize / 2
            const endX = centerX + Math.sin(rad) * length
            const endY = centerY + Math.cos(rad) * length
            return (
              <svg
                key={i}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="#334155"
                  strokeWidth={isExpanded ? 3.5 : 2.5}
                />
              </svg>
            )
          })}

          {/* Satmatha Central Roundabout (Center) */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400 bg-emerald-500/30 flex items-center justify-center pointer-events-none"
            style={{
              left: `${mapSize / 2}px`,
              top: `${mapSize / 2}px`,
              width: isExpanded ? '28px' : '20px',
              height: isExpanded ? '28px' : '20px',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Landmarks on Radar */}
          {landmarks.map((l) => {
            const { px, py } = toMapCoord(l.position[0], l.position[2])
            return (
              <div
                key={l.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-white pointer-events-none shadow"
                style={{
                  left: `${px}px`,
                  top: `${py}px`,
                  backgroundColor: l.color,
                }}
                title={l.name}
              />
            )
          })}

          {/* PLAYER BLINKING MARKER WITH HEADING ARROW */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-75"
            style={{
              left: `${playerMap.px}px`,
              top: `${playerMap.py}px`,
            }}
          >
            {/* Player Heading Pointer */}
            <div
              className="w-4 h-4 flex items-center justify-center"
              style={{
                transform: `rotate(${playerRot * (180 / Math.PI)}deg)`,
              }}
            >
              <div
                className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[9px] border-b-emerald-400 filter drop-shadow-[0_0_4px_#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Live Distance & Info Footer */}
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-stone-300">
          <span className="flex items-center gap-1">
            <Compass size={11} className="text-emerald-400" />
            <span>Zero Point:</span>
          </span>
          <span className="font-bold text-emerald-400">{distToSatmatha}m</span>
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// VIRTUAL JOYSTICK FOR MOBILE / TOUCH & MOUSE CONTROLS
// -------------------------------------------------------------
function VirtualJoystick({
  onMove,
}: {
  onMove: (vector: { x: number; y: number }) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const maxRadius = 38 // max distance knob can travel from center

  const handlePointerStart = (clientX: number, clientY: number) => {
    isDragging.current = true
    handlePointerMove(clientX, clientY)
  }

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = clientX - centerX
    const dy = clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)

    const clampedDist = Math.min(dist, maxRadius)
    const knobX = Math.cos(angle) * clampedDist
    const knobY = Math.sin(angle) * clampedDist

    setKnobPos({ x: knobX, y: knobY })
    // Normalized vector from -1 to 1
    onMove({
      x: knobX / maxRadius,
      y: knobY / maxRadius,
    })
  }

  const handlePointerEnd = () => {
    isDragging.current = false
    setKnobPos({ x: 0, y: 0 })
    onMove({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
      onMouseMove={(e) => isDragging.current && handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerEnd}
      onMouseLeave={handlePointerEnd}
      onTouchStart={(e) => {
        const touch = e.touches[0]
        handlePointerStart(touch.clientX, touch.clientY)
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0]
        handlePointerMove(touch.clientX, touch.clientY)
      }}
      onTouchEnd={handlePointerEnd}
      className="w-28 h-28 rounded-full border-2 border-emerald-500/40 bg-black/75 backdrop-blur-md flex items-center justify-center relative touch-none shadow-2xl cursor-pointer"
      title="Virtual Joystick: Drag to walk through the streets"
    >
      {/* Outer directional ticks */}
      <span className="absolute top-1 text-[8px] font-mono text-emerald-400 font-bold">W</span>
      <span className="absolute bottom-1 text-[8px] font-mono text-emerald-400 font-bold">S</span>
      <span className="absolute left-1.5 text-[8px] font-mono text-emerald-400 font-bold">A</span>
      <span className="absolute right-1.5 text-[8px] font-mono text-emerald-400 font-bold">D</span>

      {/* Inner movable knob */}
      <div
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border border-white/60 shadow-lg shadow-emerald-500/40 flex items-center justify-center pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
        }}
      >
        <Footprints size={18} className="text-slate-950" />
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// MAIN BOGURA 3D CITY PAGE COMPONENT
// -------------------------------------------------------------
export default function BoguraCityPage() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(landmarks[0])
  const [isNight, setIsNight] = useState<boolean>(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const [isPersonMode, setIsPersonMode] = useState<boolean>(true) // default to playable person mode!

  // Player Character State
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0, 7.5])
  const [playerRot, setPlayerRot] = useState<number>(0)
  const [joystickVector, setJoystickVector] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)

  // Toggle ambient city audio
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

  // Fast-travel / Teleport to Landmark
  const handleTeleport = (pos: [number, number, number]) => {
    setPlayerPos([pos[0], 0, pos[2] + 4])
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#070b09] select-none font-sans text-white">
      {/* 3D WebGL Canvas Stage */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 8, 16], fov: 45 }}
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

            {/* Third-Person Playable Human Character */}
            <PlayerController
              playerPos={playerPos}
              setPlayerPos={setPlayerPos}
              playerRot={playerRot}
              setPlayerRot={setPlayerRot}
              joystickVector={joystickVector}
              isPersonMode={isPersonMode}
            />

            {/* Landmark Interactive Beacons */}
            {landmarks.map((l) => (
              <LandmarkMarker
                key={l.id}
                landmark={l}
                isSelected={selectedLandmark?.id === l.id}
                onClick={() => {
                  setSelectedLandmark(l)
                  handleTeleport(l.position)
                }}
              />
            ))}
          </Suspense>

          {/* Drone Orbit Controls when Person Mode is toggled off */}
          {!isPersonMode && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              maxPolarAngle={Math.PI / 2 - 0.05}
              minDistance={4}
              maxDistance={65}
            />
          )}
        </Canvas>
      </div>

      {/* =============================================================
          HEADS-UP DISPLAY (HUD) GAME UI OVERLAY
         ============================================================= */}

      {/* Top Navigation Bar */}
      <header className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
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
            <span className="text-xs font-bold tracking-wide">BOGURA 3D GAME</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              OPEN WORLD
            </span>
          </div>
        </div>

        {/* Right Controls: Mode Toggle, Audio & Night */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Mode Switcher: Human Walking vs Drone Orbit */}
          <button
            onClick={() => setIsPersonMode(!isPersonMode)}
            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-md shadow-lg ${
              isPersonMode
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-black/75 text-white border-white/15 hover:bg-white/10'
            }`}
            title="Toggle between Walking Character and Free Drone Camera"
          >
            {isPersonMode ? <Footprints size={15} /> : <Camera size={15} />}
            <span className="hidden xs:inline">
              {isPersonMode ? 'Walk Mode' : 'Drone Mode'}
            </span>
          </button>

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

      {/* RADAR MINI-MAP (Left Side of Screen) */}
      <LeftMiniMap
        playerPos={playerPos}
        playerRot={playerRot}
        landmarks={landmarks}
        onTeleport={handleTeleport}
      />

      {/* DESKTOP WASD KEYBOARD HELPER (Bottom Right) */}
      {isPersonMode && (
        <div className="hidden md:flex absolute bottom-24 right-4 z-20 pointer-events-none flex-col items-center gap-1 bg-black/70 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
            PC WASD CONTROLS
          </span>
          <div className="flex gap-1">
            <kbd className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center shadow">
              W
            </kbd>
          </div>
          <div className="flex gap-1">
            <kbd className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center shadow">
              A
            </kbd>
            <kbd className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center shadow">
              S
            </kbd>
            <kbd className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center shadow">
              D
            </kbd>
          </div>
        </div>
      )}

      {/* MOBILE / ON-SCREEN VIRTUAL JOYSTICK (Bottom Right or Left) */}
      {isPersonMode && (
        <div className="absolute bottom-24 right-4 md:right-36 z-20 pointer-events-auto">
          <VirtualJoystick onMove={setJoystickVector} />
        </div>
      )}

      {/* Bottom Landmark Navigation Dock */}
      <footer className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl overflow-x-auto pointer-events-auto">
          {landmarks.map((landmark) => {
            const isActive = selectedLandmark?.id === landmark.id
            return (
              <button
                key={landmark.id}
                onClick={() => {
                  setSelectedLandmark(landmark)
                  handleTeleport(landmark.position)
                }}
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
