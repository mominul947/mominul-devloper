'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  Sparkles,
  MapPin,
  Play,
  Pause,
  Film,
  ArrowUpRight,
  Globe2,
  Mountain,
  Waves,
  Trees,
  Volume2,
  VolumeX,
  X,
  Maximize2,
} from 'lucide-react'

interface TouristSpot {
  id: string
  name: string
  bengaliName: string
  tagline: string
  division: string
  category: 'Beach' | 'Hills' | 'Forest' | 'Heritage' | 'Island'
  coordinates: string
  elevation: string
  description: string
  highlights: string[]
  accentColor: string
  icon: any
  videoUrl?: string
}

const spots: TouristSpot[] = [
  {
    id: 'coxsbazar',
    name: "Cox's Bazar",
    bengaliName: 'কক্সবাজার সমুদ্র সৈকত',
    tagline: "World's Longest Natural Unbroken Sea Beach (120 km)",
    division: 'Chittagong',
    category: 'Beach',
    coordinates: '21.4272° N, 92.0058° E',
    elevation: 'Sea Level (0m)',
    description:
      'The crown jewel of Bangladesh tourism featuring endless sandy beaches, golden sunset panoramas, Marine Drive coastal highway curves, and energetic surf culture.',
    highlights: ['120km Unbroken Shoreline', 'Scenic Marine Drive Highway', 'Inani Coral & Himchari Cliffs', 'Golden Hour Sunset Waves'],
    accentColor: '#3b82f6',
    icon: Waves,
    videoUrl: '/images/video/coxbazar.mp4',
  },
  {
    id: 'sajek',
    name: 'Sajek Valley',
    bengaliName: 'সাজেক ভ্যালি',
    tagline: 'The Kingdom of Clouds & Serene Hilltops',
    division: 'Rangamati, Chittagong',
    category: 'Hills',
    coordinates: '23.3820° N, 92.2938° E',
    elevation: '1,800 ft (550m)',
    description:
      'Immerse above the clouds in the majestic valleys of Sajek. Experience breathtaking 360-degree drone flyovers, morning mist covering lush green hills, and vibrant tribal mountain life.',
    highlights: ['Cloud Valley Sunrise', 'Konglak Peak Viewpoint', 'Hajachora & Sikam Waterfall', 'Night Stargazing & Milky Way'],
    accentColor: '#06b6d4',
    icon: Mountain,
  },
  {
    id: 'sundarbans',
    name: 'The Sundarbans',
    bengaliName: 'সুন্দরবন ম্যানগ্রোভ বন',
    tagline: "World's Largest Coastal Mangrove Forest & Tiger Territory",
    division: 'Khulna / Barishal',
    category: 'Forest',
    coordinates: '21.9497° N, 89.1833° E',
    elevation: 'Sea Level (3m)',
    description:
      'UNESCO World Heritage site home to the Royal Bengal Tiger, spotted deer, and winding tidal estuaries. A mystical wilderness of dense mangrove canopy and untouched wildlife.',
    highlights: ['Royal Bengal Tiger Habitat', 'Kotka Wildlife Sanctuary', 'Hiron Point & Mangrove Safari', 'Bioluminescent Night Waters'],
    accentColor: '#10b981',
    icon: Trees,
  },
  {
    id: 'sreemangal',
    name: 'Sreemangal',
    bengaliName: 'শ্রীমঙ্গল চা বাগান',
    tagline: 'The Verdant Tea Capital of Bangladesh',
    division: 'Moulvibazar, Sylhet',
    category: 'Hills',
    coordinates: '24.3065° N, 91.7296° E',
    elevation: '280 ft (85m)',
    description:
      'Endless rolling slopes of emerald-green tea estates, fresh rainforest aromas, Lawachara National Park canopy, and the iconic 7-layer colored tea culture.',
    highlights: ['Rolling Green Tea Gardens', 'Lawachara Rainforest Canopy', 'Baikka Beel Bird Sanctuary', 'Iconic Seven-Layer Tea'],
    accentColor: '#84cc16',
    icon: Trees,
  },
  {
    id: 'bandarban',
    name: 'Bandarban (Nilgiri)',
    bengaliName: 'বান্দরবান ও নীলগিরি',
    tagline: 'The Rooftop of Bangladesh with Cloud-Touching Summits',
    division: 'Bandarban, Chittagong',
    category: 'Hills',
    coordinates: '22.1953° N, 92.2184° E',
    elevation: '2,200 ft (670m)',
    description:
      'Towering mountain peaks, mist-shrouded roads, authentic ethnic villages, and scenic spots like Nilgiri, Keokradong, Nafakhum waterfalls, and Boga Lake.',
    highlights: ['Nilgiri Cloud Resort', 'Boga Lake Volcanic Caldera', 'Keokradong Summit Trail', 'Nafakhum Mighty Waterfalls'],
    accentColor: '#a855f7',
    icon: Mountain,
  },
  {
    id: 'saintmartin',
    name: "Saint Martin's Island",
    bengaliName: 'সেন্ট মার্টিন প্রবাল দ্বীপ',
    tagline: 'The Lone Tropical Coral Paradise in the Bay of Bengal',
    division: 'Cox’s Bazar',
    category: 'Island',
    coordinates: '20.6272° N, 92.3225° E',
    elevation: 'Sea Level (4m)',
    description:
      'Pristine crystal-turquoise waters, coral reefs, coconut groves, and Chera Dwip atoll. Experience the serenity of Bangladesh’s only coral-reefed tropical island.',
    highlights: ['Turquoise Bay Waters', 'Chera Dwip Coral Reef', 'Coconut Grove Beaches', 'Fresh Coastal Seafood & Lagoon'],
    accentColor: '#0ea5e9',
    icon: Waves,
  },
]

export default function ExploreBangladesh() {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot>(spots[0])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const inlineVideoRef = useRef<HTMLVideoElement>(null)

  // Target domain for the 3D Map experience (User can configure their dedicated domain URL)
  const target3DDomain = 'https://explore-bangladesh-3d.vercel.app'

  const toggleSound = () => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section id="explore-bd" className="relative py-20 sm:py-28 overflow-hidden theme-surface-bg theme-text-main border-t theme-border">
      
      {/* Ambient Atmosphere Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12 border-b theme-border pb-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Compass size={14} />
                <span>🇧🇩 IMMERSIVE 3D WEBGL PLATFORM • UPCOMING LAUNCH</span>
              </p>
            </div>
            <h2 className="font-billboard text-3xl xs:text-4xl sm:text-5xl theme-text-main tracking-wide">
              EXPLORE BANGLADESH 3D
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>4K CINEMATIC DRONE &amp; 3D MAP</span>
            </span>
          </div>
        </motion.div>

        {/* Hero Interactive 3D Teaser Stage */}
        <div className="rounded-3xl border theme-border bg-gradient-to-b from-[#090d0b] via-[#0d1410] to-[#090d0b] p-5 sm:p-8 xl:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Banner Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                <Globe2 size={13} />
                <span>INTERACTIVE DIGITAL TOURISM PLATFORM</span>
              </span>
              <h3 className="font-billboard text-2xl sm:text-3xl text-white">
                DISCOVER THE UNSEEN BEAUTY OF BANGLADESH
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                A groundbreaking 3D web experience connecting high-altitude drone cinematography, topographic WebGL Bangladesh map, and interactive regional explorations.
              </p>
            </div>

            {/* Direct Launch CTA Button to the Dedicated 3D Domain */}
            <div className="flex-shrink-0">
              <a
                href={target3DDomain}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] cursor-pointer group"
              >
                <Compass size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                <span>LAUNCH 3D BD MAP EXPERIENCE</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Interactive Spot Selector Pills */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {spots.map((spot) => {
              const isActive = selectedSpot.id === spot.id
              const hasVideo = !!spot.videoUrl
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'border-white/10 bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <MapPin size={12} className={isActive ? 'text-slate-950' : 'text-emerald-400'} />
                  <span>{spot.name}</span>
                  {hasVideo && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      ▶ Video Live
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Main Stage Grid (Left: Cinematic Spot Showcase, Right: 3D Holographic Map Viewport) */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Cinematic Spot Detail Card with Real Video Integration (7 Cols) */}
            <motion.div
              key={selectedSpot.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-7 rounded-2xl p-6 sm:p-7 border border-white/10 bg-black/50 backdrop-blur-md flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                    style={{
                      borderColor: `${selectedSpot.accentColor}50`,
                      backgroundColor: `${selectedSpot.accentColor}15`,
                      color: selectedSpot.accentColor,
                    }}
                  >
                    {selectedSpot.category} • {selectedSpot.division}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                    <MapPin size={11} className="text-emerald-400" />
                    <span>{selectedSpot.coordinates}</span>
                  </span>
                </div>

                <h4 className="font-billboard text-3xl sm:text-4xl text-white tracking-wide flex items-center gap-2">
                  <span>{selectedSpot.name}</span>
                  <span className="text-xs font-mono text-emerald-400 font-normal px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                    {selectedSpot.bengaliName}
                  </span>
                </h4>
                
                <p className="text-xs font-mono text-emerald-400/90 font-medium mt-1">
                  {selectedSpot.tagline}
                </p>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-3">
                  {selectedSpot.description}
                </p>
              </div>

              {/* REAL VIDEO EMBEDDED PREVIEW (If video exists, e.g. Cox's Bazar) */}
              {selectedSpot.videoUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-black shadow-xl group aspect-video max-h-[240px]">
                  <video
                    ref={inlineVideoRef}
                    src={selectedSpot.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Top Video Overlay Bar */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-auto">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 font-bold shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>LIVE 4K CINEMATIC DRONE FOOTAGE</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={toggleSound}
                        className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer"
                        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      >
                        {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      </button>

                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer"
                        title="Fullscreen Player"
                      >
                        <Maximize2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Click to Expand Prompt */}
                  <div
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-auto"
                  >
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-lg">
                      <Play size={13} className="fill-slate-950" />
                      <span>Watch Fullscreen Cinematic View</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* Highlights Chips (for locations without live video yet) */
                <div className="space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center gap-1.5">
                    <Sparkles size={11} className="text-emerald-400" />
                    <span>Cinematic Drone &amp; 3D Highlights</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSpot.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2 text-xs text-stone-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={target3DDomain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Compass size={14} />
                  <span>View in 3D Map Coordinates</span>
                  <ArrowUpRight size={13} />
                </a>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/15"
                >
                  <Film size={14} className="text-emerald-400" />
                  <span>{selectedSpot.videoUrl ? 'Watch 4K Video' : 'Video Preview'}</span>
                </button>
              </div>
            </motion.div>

            {/* Right: 3D Holographic Map Representation (5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-black/80 to-[#070b09] flex flex-col justify-between relative overflow-hidden">
              
              {/* Radar Grid Lines Backdrop */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Header Telemetry */}
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 relative z-10 border-b border-white/10 pb-3">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>3D MAP RADAR • ACTIVE</span>
                </span>
                <span>GEO: 23.6850° N, 90.3563° E</span>
              </div>

              {/* Stylized Futuristic 3D Bangladesh Map Graphics with Pin Markers */}
              <div className="relative my-6 flex flex-col items-center justify-center min-h-[260px]">
                
                {/* 3D Map Base Platform Hologram */}
                <div className="w-56 h-56 rounded-full border border-emerald-500/20 bg-emerald-500/5 animate-pulse flex items-center justify-center relative">
                  <div className="w-40 h-40 rounded-full border border-dashed border-emerald-500/30 flex items-center justify-center" />
                  
                  {/* Central Bangladesh Geographic Compass */}
                  <div className="text-center z-10">
                    <span className="text-xs font-mono font-bold text-emerald-400">BANGLADESH</span>
                    <p className="text-[9px] font-mono text-stone-400">3D TOPOGRAPHIC MESH</p>
                    <span className="inline-block mt-1 text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      8 DIVISIONS • 64 DISTRICTS
                    </span>
                  </div>
                </div>

                {/* Floating 3D Map Pins */}
                {spots.map((s, idx) => {
                  const isSelected = selectedSpot.id === s.id
                  const hasVideo = !!s.videoUrl
                  // Geometric scatter for representation
                  const positions = [
                    'bottom-6 right-6', // Cox's Bazar
                    'top-4 right-12', // Sajek
                    'bottom-8 left-10', // Sundarbans
                    'top-8 right-24', // Sreemangal
                    'bottom-12 right-14', // Bandarban
                    'bottom-2 right-2', // St Martin
                  ]
                  const pos = positions[idx % positions.length]

                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSpot(s)}
                      className={`absolute ${pos} flex items-center gap-1 p-1.5 rounded-lg border text-[10px] font-mono transition-all cursor-pointer z-20 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500 text-slate-950 font-bold scale-110 shadow-lg shadow-emerald-500/40'
                          : 'border-white/10 bg-black/70 text-stone-300 hover:border-emerald-400/50'
                      }`}
                    >
                      <MapPin size={10} className={isSelected ? 'text-slate-950' : 'text-emerald-400'} />
                      <span className="truncate max-w-[80px]">{s.name}</span>
                      {hasVideo && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                    </button>
                  )
                })}
              </div>

              {/* Bottom Feature Specs */}
              <div className="grid grid-cols-2 gap-2 text-center pt-3 border-t border-white/10 relative z-10">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[9px] font-mono text-stone-400">Active Elevation</p>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5 font-mono">{selectedSpot.elevation}</p>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[9px] font-mono text-stone-400">Media Fidelity</p>
                  <p className="text-xs font-bold text-teal-400 mt-0.5 font-mono">4K UHD Cinema</p>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom 4 Feature Pillars */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <Film size={12} />
                <span>4K Drone Footage</span>
              </span>
              <p className="text-xs text-stone-400">
                Cinematic bird's-eye views and slow-motion scenic landscape recordings
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <Compass size={12} />
                <span>3D Topographic Mesh</span>
              </span>
              <p className="text-xs text-stone-400">
                WebGL rendered contour terrain elevations and natural waterways
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <MapPin size={12} />
                <span>GPS Geotagged Pins</span>
              </span>
              <p className="text-xs text-stone-400">
                Accurate latitude, longitude, and elevation data for major tourist landmarks
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <Volume2 size={12} />
                <span>Spatial Ambient Audio</span>
              </span>
              <p className="text-xs text-stone-400">
                Natural soundscapes including ocean tides, mountain breeze, and forest fauna
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Video Modal Player */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-3xl border border-white/20 bg-[#090d0b] p-4 sm:p-6 shadow-2xl text-left space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {selectedSpot.name} — 4K CINEMATIC FOOTAGE
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* REAL VIDEO PLAYER (If video exists) */}
              {selectedSpot.videoUrl ? (
                <div className="w-full rounded-2xl overflow-hidden bg-black aspect-video max-h-[65vh] border border-white/10 shadow-2xl relative">
                  <video
                    src={selectedSpot.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-black/60 border border-white/10 text-center space-y-3">
                  <Film size={36} className="text-emerald-400 mx-auto opacity-75" />
                  <h4 className="font-billboard text-xl text-white">Video Coming Soon</h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    {selectedSpot.name} ড্রোন ভিডিও খুব শীঘ্রই আপলোড করা হবে। কক্সবাজারের ভিডিওটি এখন লাইভ চলছে!
                  </p>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-stone-400 font-mono">
                  <span>📍 {selectedSpot.coordinates} • {selectedSpot.elevation}</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={target3DDomain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Launch 3D Map</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
