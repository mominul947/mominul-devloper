'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Maximize2,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import FiverrLogo from '@/components/FiverrLogo'
import { useLanguage } from '@/context/LanguageContext'

export interface AppBanner {
  id: string
  title: string
  titleBn: string
  category: string
  categoryBn: string
  filterTag: 'all' | 'food' | 'iot' | 'health' | 'enterprise' | 'services' | 'ai-social'
  tagline: string
  taglineBn: string
  deliverable: string
  deliverableBn: string
  image: string
  accent: string
  techStack: string[]
  highlights: string[]
  highlightsBn: string[]
}

export const appBanners: AppBanner[] = [
  {
    id: 'chic-burger',
    title: 'Chic Burger & Fast Food On-Demand',
    titleBn: 'চিক বার্গার ও ফাস্ট ফুড অনলাইন ডেলিভারি',
    category: 'Food & Dining',
    categoryBn: 'ফুড ও ডাইনিং',
    filterTag: 'food',
    tagline: 'Multi-restaurant food ordering system with dynamic menu cart and real-time order tracking.',
    taglineBn: 'মাল্টি-রেস্তোরাঁ ফুড অর্ডারিং সিস্টেম, লাইভ মেনু কার্ট ও রিয়েল-টাইম অর্ডার ট্র্যাকিং।',
    deliverable: 'Android & iOS App Bundle',
    deliverableBn: 'অ্যান্ড্রয়েড ও আইওএস অ্যাপ বান্ডেল',
    image: '/images/banners/chic-burger-delivery.png',
    accent: '#f59e0b',
    techStack: ['Flutter', 'Android Native', 'Node.js', 'Firebase', 'Stripe'],
    highlights: [
      'Interactive visual menu cart with instant discounts',
      'Doorstep driver geolocation & push notifications',
      'Multi-outlet ordering with digital invoice checkout',
    ],
    highlightsBn: [
      'ইন্টারেক্টিভ মেনু কার্ট ও ক্যাশব্যাক ডিসকাউন্ট ইঞ্জিন',
      'লাইভ ড্রাইভার জিপিএস লোকেশন ও পুশ নোটিফিকেশন',
      'ডিজিটাল ক্যাশলেস ইনভয়েস ও নিরাপদ পেমেন্ট গেটওয়ে',
    ],
  },
  {
    id: 'pizza-gourmet',
    title: 'Artisan Pizza & Italian Gourmet Delivery',
    titleBn: 'আর্টিসান পিজ্জা ও ইতালিয়ান গুরমেট ডেলিভারি',
    category: 'Food & Dining',
    categoryBn: 'ফুড ও ডাইনিং',
    filterTag: 'food',
    tagline: 'Express pizza ordering portal with custom crust & toppings builder and coupon engine.',
    taglineBn: 'কাস্টম টপিং ক্রাস্ট বিল্ডার ও কুপন ডিসকাউন্ট সমন্বিত এক্সপ্রেস পিজ্জা অর্ডারিং পোর্টাল।',
    deliverable: 'Client Mobile Build',
    deliverableBn: 'ক্লায়েন্ট মোবাইল বিল্ড',
    image: '/images/banners/pizza-gourmet-delivery.png',
    accent: '#ef4444',
    techStack: ['Flutter', 'Android Native', 'REST API', 'Google Maps'],
    highlights: [
      'Visual custom toppings & crust size customizer',
      'Geo-targeted discount codes & express delivery dispatch',
      'Real-time order stage tracker from oven to delivery',
    ],
    highlightsBn: [
      'ভিজ্যুয়াল টপিং ও ক্রাস্ট কাস্টমাইজেশন বিল্ডার',
      'লোকেশন-ভিত্তিক প্রোমো কোড ও এক্সপ্রেস রাইডার অ্যাসাইন',
      'ওভেন থেকে ডেলিভারি পর্যন্ত রিয়েল-টাইম স্ট্যাটাস ট্র্যাকার',
    ],
  },
  {
    id: 'sunlytix-solar',
    title: 'SunLytix — CleanTech Smart Solar Energy IoT',
    titleBn: 'সানলাইটিক্স — স্মার্ট সোলার এনার্জি আইওটি মনিটর',
    category: 'CleanTech & IoT',
    categoryBn: 'ক্লিনটেক ও স্মার্ট আইওটি',
    filterTag: 'iot',
    tagline: 'Next-gen solar telemetry suite monitoring kW output, battery levels and AI efficiency modes.',
    taglineBn: 'সোলার প্যানেল কিলোওয়াট আউটপুট, ব্যাটারি চার্জিং ও স্মার্ট এআই অপটিমাইজেশন আইওটি ড্যাশবোর্ড।',
    deliverable: 'Hardware IoT & Mobile Platform',
    deliverableBn: 'হার্ডওয়্যার আইওটি ও মোবাইল প্ল্যাটফর্ম',
    image: '/images/banners/sunlytix-solar-iot.png',
    accent: '#10b981',
    techStack: ['Flutter', 'MQTT Protocol', 'Android Native', 'Node.js', 'InfluxDB'],
    highlights: [
      'Real-time solar kW telemetry & battery storage monitoring',
      'AI Smart Energy Mode for auto load balancing',
      'Historical power yield analytics & carbon offset metrics',
    ],
    highlightsBn: [
      'রিয়েল-টাইম সৌরবিদ্যুৎ কিলোওয়াট উৎপাদন ও ব্যাটারি মনিটরিং',
      'স্মার্ট এআই অটো লোড ব্যালেন্সিং মোড',
      'দৈনিক বিদ্যুৎ সাশ্রয় ও পাওয়ার ইল্ড অ্যানালিটিক্স',
    ],
  },
  {
    id: 'studygenie-ai',
    title: 'StudyGenie — Academic AI Student Assistant',
    titleBn: 'স্টাডিজিনি — স্মার্ট স্টুডেন্ট একাডেমিক এআই সহকারী',
    category: 'AI & Education',
    categoryBn: 'এআই ও শিক্ষা প্রযুক্তি',
    filterTag: 'ai-social',
    tagline: 'Intelligent learning companion featuring lecture voice summaries, essay outlines & paraphrasing.',
    taglineBn: 'লেকচার ভয়েস রেকর্ডার, অটোমেটেড সামারি, প্রবন্ধ আউটলাইন ও প্যারাফ্রেজিং স্মার্ট এআই সহকারী।',
    deliverable: 'AI Utility Mobile Build',
    deliverableBn: 'এআই ইউটিলিটি মোবাইল বিল্ড',
    image: '/images/banners/studygenie-ai-assistant.png',
    accent: '#8b5cf6',
    techStack: ['Flutter', 'OpenAI API', 'Python FastAPI', 'Vector DB', 'Firebase'],
    highlights: [
      'Audio lecture recorder with instant AI textbook summary',
      'Academic Essay Outliner & grammar writing tutor',
      'Plagiarism-free smart text paraphraser & presentation decks',
    ],
    highlightsBn: [
      'অডিও লেকচার রেকর্ডিং থেকে অটো এআই সামারি ও নোট তৈরি',
      'একাডেমিক প্রবন্ধ আউটলাইন ও গ্রামার টিউটর অ্যাসিস্ট্যান্ট',
      'স্মার্ট প্যারাফ্রেজিং ও স্লাইড প্রেজেন্টেশন আউটলাইনার',
    ],
  },
  {
    id: 'mindpulse-wellness',
    title: 'MindPulse — Mental Wellness & Biometric Sleep Tracker',
    titleBn: 'মাইন্ডপালস — মেন্টাল হেলথ ও স্লিপ বায়োমেট্রিক ট্র্যাকার',
    category: 'Healthcare & Wellness',
    categoryBn: 'হেলথকেয়ার ও ওয়েলনেস',
    filterTag: 'health',
    tagline: 'Holistic health companion with Freud score analysis, sleep stages and resting HR telemetry.',
    taglineBn: 'ফ্রয়েড স্কোর অ্যানালিসিস, স্লিপ সাইকেল স্টেজ ও হার্টরেট ট্র্যাকিং সমৃদ্ধ আধুনিক হেলথ অ্যাপ।',
    deliverable: 'Digital Health Android MVP',
    deliverableBn: 'ডিজিটাল হেলথ অ্যান্ড্রয়েড এমভিপি',
    image: '/images/banners/mindpulse-wellness-sleep.png',
    accent: '#06b6d4',
    techStack: ['Flutter', 'HealthKit API', 'Android Sensor SDK', 'Dart', 'Chart.js'],
    highlights: [
      'Comprehensive Freud mood score & mental health index',
      'Sleep stage analytics: Awake, Light, Deep REM cycle',
      'Biometric resting heart rate telemetry & guided meditation',
    ],
    highlightsBn: [
      'দৈনিক মুড ফ্রয়েড স্কোর ও স্ট্রেস লেভেল ট্র্যাকিং',
      'স্মার্ট স্লিপ ট্র্যাকার: লাইট, ডিপ ও আরইএম ফেজ বিশ্লেষণ',
      'বায়োমেট্রিক পালস সেন্সর ও গাইডেড মেডিটেশন ট্র্যাকার',
    ],
  },
  {
    id: 'medcare-clinical',
    title: 'MedCare Pro — Hospital EHR & Clinical Appointments',
    titleBn: 'মেডকেয়ার প্রো — হাসপাতাল ইএইচআর ও ডাক্তার অ্যাপয়েন্টমেন্ট',
    category: 'Healthcare & Wellness',
    categoryBn: 'হেলথকেয়ার ও ওয়েলনেস',
    filterTag: 'health',
    tagline: 'End-to-end hospital clinical suite with doctor appointment scheduling and patient queue tracking.',
    taglineBn: 'ডাক্তার শিডিউলিং, ডিজিটাল প্রেসক্রিপশন ও রোগীর লাইভ সিরিয়াল কিউ ট্র্যাকিং ক্লিনিক্যাল স্যুট।',
    deliverable: 'Hospital SaaS Platform',
    deliverableBn: 'হসপিটাল ও ক্লিনিক ক্লাউড প্ল্যাটফর্ম',
    image: '/images/banners/medcare-clinical-suite.png',
    accent: '#3b82f6',
    techStack: ['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Doctor appointment queue with automated token check-in',
      'Electronic Health Records (EHR) & secure patient history',
      'Automated medical invoice generation & department reports',
    ],
    highlightsBn: [
      'স্মার্ট টোকেন সিস্টেম সহ ডাক্তার অ্যাপয়েন্টমেন্ট লাইভ কিউ',
      'নিরাপদ ইলেকট্রনিক হেলথ রেকর্ডস (EHR) ও পেশেন্ট হিস্ট্রি',
      'স্বয়ংক্রিয় মেডিকেল বিলিং ও ডিপার্টমেন্টাল রিপোর্ট',
    ],
  },
  {
    id: 'nexuslogix-supplychain',
    title: 'NexusLogix — Global Supply Chain & Logistics Hub',
    titleBn: 'নেক্সাসলজিক্স — সাপ্লাই চেইন ও ওয়্যারহাউস লজিস্টিকস',
    category: 'Enterprise & Analytics',
    categoryBn: 'এন্টারপ্রাইজ ও অ্যানালিটিক্স',
    filterTag: 'enterprise',
    tagline: 'Mission-critical supply chain dashboard tracking inventory turnover, supplier risk and WIP units.',
    taglineBn: 'ওয়্যারহাউস স্টক ম্যানেজমেন্ট, সাপ্লায়ার রিস্ক স্কোরিং ও অন-টাইম ডেলিভারি কন্ট্রোল সেন্টার।',
    deliverable: 'Enterprise Logistics Control Center',
    deliverableBn: 'এন্টারপ্রাইজ লজিস্টিকস কন্ট্রোল সেন্টার',
    image: '/images/banners/nexuslogix-supply-chain.png',
    accent: '#6366f1',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Chart.js'],
    highlights: [
      'Multi-warehouse inventory turnover & low stock telemetry',
      'Supplier on-time fulfillment rate & risk scoring algorithm',
      'Work in progress (WIP) tracking across regional supply hubs',
    ],
    highlightsBn: [
      'মাল্টি-ওয়্যারহাউস স্টক ট্র্যাকিং ও লো-স্টক অটো রিমাইন্ডার',
      'সাপ্লায়ার অন-টাইম ডেলিভারি স্কোর ও রিস্ক অ্যানালাইসিস',
      'রিয়েল-টাইম ওয়ার্ক-ইন-প্রগ্রেস (WIP) লজিস্টিকস ট্র্যাকিং',
    ],
  },
  {
    id: 'stockpulse-analytics',
    title: 'StockPulse — Retail Inventory & Sales Performance',
    titleBn: 'স্টকপালস — রিটেল ইনভেন্টরি ও সেলস পারফরম্যান্স অ্যানালিটিক্স',
    category: 'Enterprise & Analytics',
    categoryBn: 'এন্টারপ্রাইজ ও অ্যানালিটিক্স',
    filterTag: 'enterprise',
    tagline: 'High-scale inventory analytics dashboard tracking sales velocity, product margins and incoming stock.',
    taglineBn: 'সেলস ইনক্রিজ ভেলোসিটি, ইনকামিং স্টক ও ইনভেন্টরি ডিস্ট্রিবিউশন রিয়েল-টাইম অ্যানালিটিক্স।',
    deliverable: 'Enterprise SaaS Dashboard',
    deliverableBn: 'এন্টারপ্রাইজ ড্যাশবোর্ড সল্যুশন',
    image: '/images/banners/stockpulse-inventory-analytics.png',
    accent: '#14b8a6',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    highlights: [
      'Real-time monthly sales trajectory & revenue goal tracker',
      'Live warehouse incoming stock replenishment notifications',
      'Categorical inventory distribution pie & velocity charts',
    ],
    highlightsBn: [
      'মাসিক সেলস টার্গেট ও রেভিনিউ প্রজেকশন ট্র্যাকার',
      'ওয়্যারহাউস ইনকামিং স্টক রিস্টক নোটিফিকেশন সিস্টেম',
      'ক্যাটাগরি-ভিত্তিক ইনভেন্টরি ডিস্ট্রিবিউশন ও মার্জিন চার্ট',
    ],
  },
  {
    id: 'homecare-services',
    title: 'HomeCare Pro — On-Demand Cleaning & Home Repairs',
    titleBn: 'হোমকেয়ার প্রো — অন-ডিমান্ড হোম ক্লিনিং ও টেকনিশিয়ান সার্ভিস',
    category: 'Home Services',
    categoryBn: 'হোম সার্ভিসেস',
    filterTag: 'services',
    tagline: 'On-demand technician dispatch system for house cleaning, plumbing and certified AC repair.',
    taglineBn: 'অন-ডিমান্ড ক্লিনিং, প্লাম্বিং, সোফা কার্পেট ওয়াশ ও এসি টেকনিশিয়ান বুকিং প্ল্যাটফর্ম।',
    deliverable: 'Custom Client Mobile Build',
    deliverableBn: 'ক্লায়েন্ট মোবাইল বিল্ড',
    image: '/images/banners/homecare-services.png',
    accent: '#10b981',
    techStack: ['Flutter', 'Android Native', 'Node.js', 'Google Maps API', 'PostgreSQL'],
    highlights: [
      'Hourly rate matrix for deep sofa, plumbing & kitchen cleaning',
      'Certified background-checked technician matching engine',
      'Transparent digital quote & instant booking confirmation',
    ],
    highlightsBn: [
      'ঘণ্টাভিত্তিক ট্রান্সপারেন্ট প্রাইসিং ও ডোরস্টেপ সার্ভিস',
      'ভেরিফায়েড টেকনিশিয়ান ও ক্লিনিং এক্সপার্ট বুকিং অ্যালগরিদম',
      'লাইভ বুকিং কনফার্মেশন ও ডিজিটাল ইনভয়েসিং',
    ],
  },
  {
    id: 'electrorent-commerce',
    title: 'ElectroRent — Smart Appliance Rental & Gadget Commerce',
    titleBn: 'ইলেকট্রোরেন্ট — ইলেকট্রনিক্স ও হোম অ্যাপ্লায়েন্স রেন্টাল কমার্স',
    category: 'E-Commerce & Rental',
    categoryBn: 'ই-কমার্স ও রেন্টাল',
    filterTag: 'services',
    tagline: 'Sustainable consumer electronics rental portal with monthly subscriptions and doorstep pickup.',
    taglineBn: 'স্মার্ট টিভি, ওয়াশিং মেশিন ও হোম অ্যাপ্লায়েন্স মান্থলি রেন্টাল ও রিস্টোর প্ল্যাটফর্ম।',
    deliverable: 'Android E-Commerce MVP',
    deliverableBn: 'অ্যান্ড্রয়েড ই-কমার্স এমভিপি',
    image: '/images/banners/electrorent-commerce.png',
    accent: '#f97316',
    techStack: ['Flutter', 'Next.js API', 'Node.js', 'Stripe', 'PostgreSQL'],
    highlights: [
      'Monthly lease calculator for smart TVs, ACs & washing machines',
      'Automated scheduled pickup address & return verification',
      'Condition grade appraisal & flexible subscription renewal',
    ],
    highlightsBn: [
      'মান্থলি সাবস্ক্রিপশন ক্যালকুলেটর ও সহজ কিস্তি সিস্টেম',
      'শিডিউল্ড ডোরস্টেপ পিকআপ ও রিটার্ন ট্র্যাকিং',
      'প্রোডাক্ট কোয়ালিটি গ্রেড ভেরিফিকেশন ও সিকিউর ডিপোজিট',
    ],
  },
  {
    id: 'fixgadget-repair',
    title: 'FixGadget — Smartphone & Tech Repair Booking',
    titleBn: 'ফিক্সগ্যাজেট — স্মার্টফোন ও ল্যাপটপ রিপেয়ার বুকিং',
    category: 'Tech Utilities',
    categoryBn: 'টেক ইউটিলিটি',
    filterTag: 'services',
    tagline: 'Instant repair pricing engine for smartphone screens, batteries and certified device diagnostics.',
    taglineBn: 'স্মার্টফোন ডিসপ্লে, ব্যাটারি রিপ্লেসমেন্ট ও গ্যাজেট ডায়াগনস্টিকস ইনস্ট্যান্ট কোট বুকিং।',
    deliverable: 'Mobile Utility Application',
    deliverableBn: 'মোবাইল ইউটিলিটি অ্যাপ',
    image: '/images/banners/fixgadget-device-repair.png',
    accent: '#06b6d4',
    techStack: ['Flutter', 'Android Native', 'Firebase Cloud', 'Node.js'],
    highlights: [
      'Instant repair cost estimation for iPhone & Android models',
      'Doorstep certified technician pickup or drop-off scheduling',
      'Warranty guarantee tracking on replacement hardware parts',
    ],
    highlightsBn: [
      'ব্র্যান্ড ও মডেল অনুযায়ী তাৎক্ষণিক রিপেয়ার খরচ ক্যালকুলেশন',
      'ডোরস্টেপ টেকনিশিয়ান পিকআপ ও সার্ভিস ট্র্যাকিং',
      'প্রতিটি পার্টস রিপ্লেসমেন্টে ডিজিটাল ওয়ারেন্টি কার্ড',
    ],
  },
  {
    id: 'realtime-chat',
    title: 'PulseChat — High-Speed Encrypted Messenger',
    titleBn: 'পালসচ্যাট — উচ্চগতির সুরক্ষিত মেসেঞ্জার অ্যাপ্লিকেশন',
    category: 'Social & Communication',
    categoryBn: 'সোশ্যাল ও কমিউনিকেশন',
    filterTag: 'ai-social',
    tagline: 'Ultra-fast private messaging application with sub-50ms WebSocket telemetry and media sharing.',
    taglineBn: 'সাব-৫০ মিলি-সেকেন্ড ওয়েবসকেট আর্কিটেকচার, এন্ড-টু-এন্ড এনক্রিপশন ও মাল্টিমিডিয়া শেয়ারিং।',
    deliverable: 'Real-Time Android Mobile Build',
    deliverableBn: 'রিয়েল-টাইম মোবাইল বিল্ড',
    image: '/images/banners/realtime-messenger-chat.png',
    accent: '#ec4899',
    techStack: ['Flutter', 'WebSockets', 'Node.js', 'Redis', 'MongoDB'],
    highlights: [
      'Sub-50ms instant bidirectional message sync via WebSockets',
      'Active typing indicators, read receipts & voice message cache',
      'Lightweight memory footprint optimized for low-end Android',
    ],
    highlightsBn: [
      'ওয়েবসকেটের মাধ্যমে বিদ্যুৎগতির ডুয়াল মেসেজ সিঙ্ক',
      'লাইভ টাইপিং স্টেটাস, রিড রিসিপ্ট ও দ্রুতগতির ভয়েস মেসেজ',
      'কম র‍্যামের ফোনেও স্মুথ পারফরম্যান্সের জন্য বিশেষ অপ্টিমাইজেশন',
    ],
  },
  {
    id: 'gvk-nightlife',
    title: 'GVK Night Hours — Nightlife & Club Event Ticketing',
    titleBn: 'জিভিকে নাইট আওয়ার্স — কনসার্ট ও নাইটলাইফ ইভেন্ট টিকেট প্ল্যাটফর্ম',
    category: 'Entertainment & Events',
    categoryBn: 'এন্টারটেইনমেন্ট ও ইভেন্ট',
    filterTag: 'services',
    tagline: 'Nightlife venue discovery and VIP party ticketing platform with dynamic geolocation venue maps.',
    taglineBn: 'নাইটলাইফ ভেন্যু ডিসকভারি, ভিআইপি পার্টি টিকেট বুকিং ও ইন্টারেক্টিভ ভেন্যু ম্যাপ।',
    deliverable: 'Entertainment Event Mobile Platform',
    deliverableBn: 'ইভেন্ট ও টিকেট মোবাইল প্ল্যাটফর্ম',
    image: '/images/banners/gvk-nightlife-events.png',
    accent: '#a855f7',
    techStack: ['Flutter', 'Android Native', 'Node.js', 'Google Maps API', 'QR Scanner'],
    highlights: [
      'Live geolocation map of trending events & nightlife clubs',
      'Digital QR pass generation for seamless entrance gate check-in',
      'Calendar RSVP reminders & VIP table bottle service booking',
    ],
    highlightsBn: [
      'লাইভ ম্যাপে ট্রেন্ডিং কনসার্ট ও ইভেন্ট ভেন্যু লোকেশন',
      'গেট ভেরিফিকেশনের জন্য ইনস্ট্যান্ট ডিজিটাল কিউআর কোড পাস',
      'ক্যালেন্ডার সিঙ্ক ও ভিআইপি লাউঞ্জ টেবিল রিজার্ভেশন',
    ],
  },
  {
    id: 'greencove-eco',
    title: 'GreenCove — Sustainable Living & Eco Portal',
    titleBn: 'গ্রীনকভ — পরিবেশবান্ধব টেকসই লাইফস্টাইল পোর্টাল',
    category: 'CleanTech & Community',
    categoryBn: 'ক্লিনটেক ও সোশ্যাল',
    filterTag: 'iot',
    tagline: 'Eco-conscious lifestyle community connecting sustainable vendors with conscious consumers.',
    taglineBn: 'পরিবেশবান্ধব লাইফস্টাইল, টেকসই পণ্য ও সচেতন গ্রাহকদের ডিজিটাল নেটওয়ার্ক।',
    deliverable: 'Eco Community Mobile MVP',
    deliverableBn: 'ইকো কমিউনিটি মোবাইল এমভিপি',
    image: '/images/banners/greencove-eco-platform.png',
    accent: '#22c55e',
    techStack: ['Flutter', 'Firebase', 'Node.js', 'Tailwind CSS'],
    highlights: [
      'Verified zero-waste & organic eco-vendor directory',
      'Carbon footprint estimator & community impact points',
      'Minimalist, nature-inspired user interface design',
    ],
    highlightsBn: [
      'ভেরিফায়েড অর্গানিক ও পরিবেশবান্ধব পণ্যের ডিরেক্টরি',
      'কার্বন ফুটপ্রিন্ট পরিমাপক ও কমিউনিটি রিওয়ার্ড পয়েন্ট',
      'চোখ জুড়ানো মিনিমালিস্ট ও রিফ্রেশিং ইউজার ইন্টারফেস',
    ],
  },
]

export default function AppBannerShowcase() {
  const [activeFilter, setActiveFilter] = useState<AppBanner['filterTag']>('all')
  const [zoomedBanner, setZoomedBanner] = useState<AppBanner | null>(null)
  const [scrollSpeed, setScrollSpeed] = useState<number>(1)
  const [scrollDirection, setScrollDirection] = useState<'normal' | 'reverse'>('normal')
  const { language } = useLanguage()

  const filterTabs = useMemo(() => [
    { id: 'all', label: 'All Banners', labelBn: 'সবগুলো ব্যানার', count: 14 },
    { id: 'food', label: 'Food & Dining', labelBn: 'ফুড ও ডাইনিং', count: 2 },
    { id: 'iot', label: 'IoT & CleanTech', labelBn: 'স্মার্ট আইওটি ও ক্লিনটেক', count: 2 },
    { id: 'health', label: 'Health & Wellness', labelBn: 'স্বাস্থ্য ও ওয়েলনেস', count: 2 },
    { id: 'enterprise', label: 'Enterprise & SaaS', labelBn: 'এন্টারপ্রাইজ ও ড্যাশবোর্ড', count: 2 },
    { id: 'services', label: 'Services & Commerce', labelBn: 'সার্ভিসেস ও কমার্স', count: 4 },
    { id: 'ai-social', label: 'AI & Social', labelBn: 'এআই ও সোশ্যাল', count: 2 },
  ], [])

  const filteredBanners = useMemo(() => {
    if (activeFilter === 'all') return appBanners
    return appBanners.filter((b) => b.filterTag === activeFilter)
  }, [activeFilter])

  // Repeated base set of banners so that it has at least 8 banners, then duplicated for seamless -50% marquee loop
  const marqueeBanners = useMemo(() => {
    if (filteredBanners.length === 0) return []
    let base = [...filteredBanners]
    while (base.length < 8) {
      base = [...base, ...filteredBanners]
    }
    return [...base, ...base]
  }, [filteredBanners])

  // Duration in seconds: ~6.5s per item in base set at 1x speed, perfectly smooth & calm pace
  const animationDuration = useMemo(() => {
    const baseCount = Math.max(8, filteredBanners.length)
    return Math.round((baseCount * 6.5) / scrollSpeed)
  }, [filteredBanners.length, scrollSpeed])

  // Lightbox keyboard navigation
  const handlePrevLightbox = useCallback(() => {
    if (!zoomedBanner) return
    const curIdx = appBanners.findIndex((b) => b.id === zoomedBanner.id)
    const prevIdx = (curIdx - 1 + appBanners.length) % appBanners.length
    setZoomedBanner(appBanners[prevIdx])
  }, [zoomedBanner])

  const handleNextLightbox = useCallback(() => {
    if (!zoomedBanner) return
    const curIdx = appBanners.findIndex((b) => b.id === zoomedBanner.id)
    const nextIdx = (curIdx + 1) % appBanners.length
    setZoomedBanner(appBanners[nextIdx])
  }, [zoomedBanner])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!zoomedBanner) return
      if (e.key === 'Escape') setZoomedBanner(null)
      if (e.key === 'ArrowLeft') handlePrevLightbox()
      if (e.key === 'ArrowRight') handleNextLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [zoomedBanner, handlePrevLightbox, handleNextLightbox])

  return (
    <section id="app-banners" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden theme-main-bg theme-text-main border-t theme-border">

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b theme-border pb-4 sm:pb-6"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
              <Layers size={13} />
              <span>
                {language === 'bn'
                  ? 'প্রোডাকশন অ্যাপ ব্যানার ও আর্কিটেকচার সমাহার'
                  : 'PRODUCTION APP BANNERS & DELIVERABLES'}
              </span>
            </p>
            <h2 className="font-billboard text-2xl xs:text-3xl sm:text-4xl lg:text-5xl theme-text-main tracking-wide">
              {language === 'bn'
                ? 'ফিচার্ড অ্যাপস ও ড্যাশবোর্ড ব্যানার স্লাইডার'
                : 'FEATURED APP BANNERS & SUITE SLIDER'}
            </h2>
            <p className="text-xs sm:text-sm theme-text-muted mt-1.5 max-w-2xl leading-relaxed">
              {language === 'bn'
                ? 'দেশি-বিদেশি ক্লায়েন্ট ও বাণিজ্যিক প্রজেক্টের জন্য নির্মিত অ্যাপ ও ড্যাশবোর্ডের হাই-রেজোলিউশন প্রোডাকশন ব্যানার — স্মুথ অটো স্লাইডিং শোকেস।'
                : 'Curated high-resolution production banners, system interfaces, and architecture deliverables with smooth continuous auto-sliding.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>
                {language === 'bn' ? '১৪টি প্রোডাকশন ব্যানার' : '14 PRODUCTION BANNERS'}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Filter Pills & Auto-Slide Indicator Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none max-w-full">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as AppBanner['filterTag'])}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
                    : 'border theme-border theme-text-muted hover:theme-text-main bg-black/5 dark:bg-white/5 hover:border-emerald-500/40'
                    }`}
                >
                  <span>{language === 'bn' ? tab.labelBn : tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-black/20 text-slate-950' : 'bg-emerald-500/15 text-emerald-400'
                      }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Continuous Auto-Sliding Active Indicator */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-bold">
                {language === 'bn' ? 'অবিরাম অটো-স্লাইড (ডান → বাম)' : 'Auto-Sliding (R → L)'}
              </span>
              <span className="hidden xs:inline text-[10px] opacity-80">
                {scrollDirection === 'reverse'
                  ? (language === 'bn' ? '• বামে চলছে' : '• Left')
                  : (language === 'bn' ? '• চলছে' : '• Active')}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HARDWARE-ACCELERATED CONTINUOUS NON-STOP MARQUEE (RIGHT TO LEFT):
            - Auto-slides from right to left continuously ("dane thake bame jaitei thakbe")
            - Completely automatic, never stops ("akdom auto, thambe na")
            - 60fps/120fps GPU compositor layer
            - 2 identical sets for seamless infinite -50% translation
           ========================================================================= */}
        <div className="relative group/slider overflow-hidden py-2 select-none">
          {/* Edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-20 pointer-events-none bg-gradient-to-r from-[var(--bg-main)] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-20 pointer-events-none bg-gradient-to-l from-[var(--bg-main)] to-transparent" />

          {/* Marquee Track */}
          <div
            className="flex items-stretch gap-4 sm:gap-5 lg:gap-6 w-max animate-banner-marquee"
            style={{
              animationDuration: `${animationDuration}s`,
              animationDirection: scrollDirection,
              animationPlayState: zoomedBanner ? 'paused' : 'running',
            }}
          >
            {marqueeBanners.map((banner, idx) => {
              return (
                <div
                  key={`${banner.id}-${idx}`}
                  className="w-[84vw] max-w-[340px] sm:w-[46vw] sm:max-w-[400px] lg:w-[31.5vw] lg:max-w-[440px] flex-shrink-0 transition-transform duration-300"
                >
                  <div
                    className="flex flex-col rounded-3xl border theme-border hover:border-emerald-500/50 transition-all duration-300 shadow-xl overflow-hidden relative h-full group/card"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                  >
                    {/* Subtle Top Accent Ambient Glow */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ backgroundColor: banner.accent }}
                    />

                    {/* Banner Image Container with Zoom Click */}
                    <div
                      className="relative w-full aspect-[16/10] bg-black/40 cursor-zoom-in overflow-hidden select-none"
                      onClick={() => setZoomedBanner(banner)}
                      title="Click to Zoom Fullscreen"
                    >
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        priority={idx < 3}
                      />

                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 hover:opacity-40 transition-opacity" />

                      {/* Category & Deliverable Badges on Image */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{language === 'bn' ? banner.categoryBn : banner.category}</span>
                        </span>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-black/70 backdrop-blur-md text-stone-200 border border-white/15 shadow-md truncate max-w-[150px]">
                          {language === 'bn' ? banner.deliverableBn : banner.deliverable}
                        </span>
                      </div>

                      {/* Hover Zoom Prompt */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-xs font-mono text-white flex items-center gap-2 border border-white/20 shadow-xl">
                          <Maximize2 size={13} className="text-emerald-400" />
                          <span>{language === 'bn' ? 'বড় করে দেখুন' : 'Click to Zoom'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Banner Content Body */}
                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="font-billboard text-lg sm:text-xl lg:text-2xl theme-text-main leading-tight tracking-wide mb-1.5 group-hover:text-emerald-400 transition-colors">
                        {language === 'bn' ? banner.titleBn : banner.title}
                      </h3>

                      {/* Tagline / Description */}
                      <p className="text-xs theme-text-muted leading-relaxed line-clamp-2 mb-3.5">
                        {language === 'bn' ? banner.taglineBn : banner.tagline}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1 pt-2.5 border-t theme-border mb-3.5 flex-1">
                        {(language === 'bn' ? banner.highlightsBn : banner.highlights).slice(0, 2).map((feat, fIdx) => (
                          <p key={fIdx} className="text-[11px] theme-text-muted leading-snug flex items-start gap-1.5">
                            <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </p>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {banner.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono border theme-border bg-black/5 dark:bg-white/5 theme-text-muted font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t theme-border">
                        <button
                          onClick={() => setZoomedBanner(banner)}
                          className="py-2 sm:py-2.5 rounded-xl btn-theme-secondary font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                        >
                          <Maximize2 size={12} />
                          <span>{language === 'bn' ? 'জুম ভিউ' : 'Zoom View'}</span>
                        </button>

                        <a
                          href="https://www.fiverr.com/s/WebEmax"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 sm:py-2.5 rounded-xl btn-theme-primary font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 font-bold cursor-pointer shadow-md"
                        >
                          <FiverrLogo size={13} />
                          <span>{language === 'bn' ? 'অর্ডার করুন' : 'Order Build'}</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Left Arrow Button: Reverses flow (left to right) */}
          <button
            onClick={() => setScrollDirection((prev) => (prev === 'normal' ? 'reverse' : 'normal'))}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border shadow-2xl flex items-center justify-center cursor-pointer z-30 transition-all hover:scale-110 active:scale-95 ${
              scrollDirection === 'reverse'
                ? 'bg-emerald-500 text-black border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-500/30'
                : 'bg-stone-900/90 text-white border-stone-700 hover:bg-emerald-500 hover:text-black'
            }`}
            title={language === 'bn' ? 'বাম দিকে স্লাইড করুন' : 'Slide left to right'}
            aria-label="Slide Left to Right"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow Button: Speeds up temporarily or normal right-to-left */}
          <button
            onClick={() => {
              setScrollDirection('normal')
              setScrollSpeed((prev) => (prev === 1 ? 2 : 1))
            }}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border shadow-2xl flex items-center justify-center cursor-pointer z-30 transition-all hover:scale-110 active:scale-95 ${
              scrollSpeed > 1
                ? 'bg-emerald-500 text-black border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-500/30'
                : 'bg-stone-900/90 text-white border-stone-700 hover:bg-emerald-500 hover:text-black'
            }`}
            title={language === 'bn' ? 'গতি বাড়ান বা ডান-থেকে-বামে স্লাইড' : 'Speed up or normal direction'}
            aria-label="Speed up or normal direction"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Control Pills & Hint */}
        <div className="flex flex-col items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 p-1.5 rounded-full border theme-border bg-black/30 backdrop-blur-md">
            <button
              onClick={() => {
                setScrollDirection('normal')
                setScrollSpeed(1)
              }}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                scrollDirection === 'normal' && scrollSpeed === 1
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'theme-text-muted hover:theme-text-main'
              }`}
            >
              {language === 'bn' ? 'স্বাভাবিক গতি (ডান → বাম)' : 'Normal (R → L)'}
            </button>
            <button
              onClick={() => {
                setScrollDirection('normal')
                setScrollSpeed(2)
              }}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                scrollDirection === 'normal' && scrollSpeed === 2
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'theme-text-muted hover:theme-text-main'
              }`}
            >
              {language === 'bn' ? 'দ্রুত গতি (২x)' : 'Fast (2x)'}
            </button>
            <button
              onClick={() => setScrollDirection((prev) => (prev === 'normal' ? 'reverse' : 'normal'))}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                scrollDirection === 'reverse'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'theme-text-muted hover:theme-text-main'
              }`}
            >
              {language === 'bn' ? 'বাম → ডান' : 'Reverse (L → R)'}
            </button>
          </div>

          <p className="text-[11px] font-mono text-center theme-text-muted">
            {language === 'bn'
              ? '✨ ডান থেকে বামে অবিরত অটো-স্লাইড হচ্ছে (কখনো থামবে না) • যেকোনো ব্যানারে ক্লিক করে পূর্ণাঙ্গ জুম দেখুন'
              : '✨ Non-stop continuous auto-sliding active (Right → Left) • Click any banner to zoom fullscreen preview'}
          </p>
        </div>

      </div>

      {/* High-Resolution Banner Lightbox Modal */}
      <AnimatePresence>
        {zoomedBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setZoomedBanner(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border border-neutral-700 bg-[#09090b] shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Navigation & Title Bar */}
              <div className="px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between gap-4 bg-black/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-billboard text-base sm:text-lg text-white truncate">
                      {language === 'bn' ? zoomedBanner.titleBn : zoomedBanner.title}
                    </h4>
                    <p className="text-[10px] font-mono text-emerald-400">
                      {language === 'bn' ? zoomedBanner.categoryBn : zoomedBanner.category} • {zoomedBanner.deliverable}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[11px] font-mono text-stone-400 hidden sm:inline">
                    {appBanners.findIndex((b) => b.id === zoomedBanner.id) + 1} / {appBanners.length}
                  </span>
                  <button
                    onClick={() => setZoomedBanner(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                    title="Close (Esc)"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Banner Image Stage */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-neutral-950 flex items-center justify-center overflow-hidden">
                <Image
                  src={zoomedBanner.image}
                  alt={zoomedBanner.title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevLightbox()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-emerald-500 hover:text-black text-white border border-white/20 shadow-xl flex items-center justify-center transition-all cursor-pointer z-30"
                  title="Previous banner (Left Arrow)"
                  aria-label="Previous banner"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextLightbox()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-emerald-500 hover:text-black text-white border border-white/20 shadow-xl flex items-center justify-center transition-all cursor-pointer z-30"
                  title="Next banner (Right Arrow)"
                  aria-label="Next banner"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="px-5 py-4 border-t border-neutral-800 bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {language === 'bn' ? zoomedBanner.taglineBn : zoomedBanner.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {zoomedBanner.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-stone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-2 sm:pt-0">
                  <a
                    href="https://www.fiverr.com/s/WebEmax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl btn-theme-primary font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    <FiverrLogo size={14} />
                    <span>Order on Fiverr</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setZoomedBanner(null)}
                    className="px-4 py-2 rounded-xl btn-theme-secondary font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    <span>Contact</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
