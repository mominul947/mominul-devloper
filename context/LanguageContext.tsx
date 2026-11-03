'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'bn'

export interface TranslationDictionary {
  nav: {
    home: string
    about: string
    apps: string
    website: string
    services: string
    contact: string
    payOnline: string
    letsTalk: string
    role: string
    langToggle: string
  }
  hero: {
    roleBadge: string
    availableBadge: string
    title1: string
    title2: string
    bio: string
    viewWork: string
    startProject: string
    yearsExp: string
    projectsCount: string
    clientsCount: string
    location: string
    photoLabel1: string
    photoLabel2: string
  }
  about: {
    badge: string
    heading: string
    subheading: string
    bio1: string
    bio2: string
    bio3: string
    yearsExp: string
    appsBuilt: string
    clientSatisfaction: string
    corePhilosophy: string
    philosophyText: string
    educationTitle: string
    educationDesc: string
  }
  apps: {
    badge: string
    heading: string
    subtitle: string
    liveDemo: string
    playStore: string
    keyFeatures: string
    activeUsers: string
  }
  website: {
    badge: string
    heading: string
    subtitle: string
    visitSite: string
    preview: string
  }
  hometown: {
    badge: string
    title: string
    desc: string
    mahasthan: string
    satmatha: string
    curd: string
    tagline1: string
    tagline2: string
    videoCredit: string
    hoverSound: string
    soundOn: string
    subcaption: string
  }
  skills: {
    badge: string
    heading: string
    sub: string
    all: string
    mobileFrontend: string
    backendApis: string
    databasesOrm: string
    devopsCloud: string
  }
  services: {
    badge: string
    heading: string
    subtitle: string
    getStarted: string
  }
  contact: {
    badge: string
    heading: string
    subtitle: string
    namePlaceholder: string
    emailPlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
    sendBtn: string
    sendingBtn: string
    successMsg: string
    directChannels: string
    whatsappText: string
    emailDirect: string
    phoneDirect: string
  }
  footer: {
    tagline: string
    copyright: string
    location: string
    crafted: string
    navigation: string
    services: string
    connect: string
  }
  common: {
    backToTop: string
    switchLanguage: string
  }
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      apps: 'Apps',
      website: 'Website',
      services: 'Services',
      contact: 'Contact',
      payOnline: 'PAY ONLINE',
      letsTalk: "LET'S TALK",
      role: 'MOBILE & WEB ARCHITECT',
      langToggle: 'বাংলা',
    },
    hero: {
      roleBadge: 'FULL-STACK & MOBILE APP DEVELOPER',
      availableBadge: 'AVAILABLE FOR FREELANCE & CONTRACTS',
      title1: 'FULL-STACK DEVELOPER',
      title2: '& MOBILE ARCHITECT',
      bio: "Hi, I'm Md. Mominul Islam. Engineering production-grade Android apps, high-scale web platforms, and digital software architectures with clean code and pixel-perfect design.",
      viewWork: 'EXPLORE APPS & WEBSITES',
      startProject: "LET'S WORK TOGETHER",
      yearsExp: 'YEARS EXP',
      projectsCount: 'PROJECTS',
      clientsCount: 'CLIENTS',
      location: 'Bogura Sadar, Bogura, Bangladesh',
      photoLabel1: 'Lead Executive Portrait',
      photoLabel2: 'Approachable View',
    },
    about: {
      badge: 'ARCHITECT BIOGRAPHY',
      heading: 'ENGINEERING HIGH-SCALE SOLUTIONS WITH PASSION',
      subheading: 'Based in Bogura Sadar, crafting production systems for clients worldwide.',
      bio1: "I am Md. Mominul Islam, a dedicated Full-Stack Software Engineer and Mobile Application Architect with extensive experience in Android (Kotlin, Jetpack Compose, Flutter) and full-stack web platforms (Next.js, Node.js, FastAPI, PostgreSQL).",
      bio2: "From enterprise backend architectures to responsive, high-converting digital storefronts, my work is driven by three pillars: speed, security, and exceptional user experience.",
      bio3: "I collaborate with startups, agencies, and businesses across the globe to turn ambitious concepts into reliable, revenue-generating software products.",
      yearsExp: 'Years of Experience',
      appsBuilt: 'Projects Completed',
      clientSatisfaction: 'Client Satisfaction',
      corePhilosophy: 'Core Engineering Philosophy',
      philosophyText: 'Write clean, testable code that scales smoothly from 10 to 100,000+ daily active users without compromise.',
      educationTitle: 'Engineering Discipline',
      educationDesc: 'Continuous learning, strict performance profiling, and benchmarking against real-world production constraints.',
    },
    apps: {
      badge: 'FLAGSHIP MOBILE PORTFOLIO',
      heading: 'PRODUCTION ANDROID & MOBILE APPLICATIONS',
      subtitle: 'Engineered for 60fps performance, offline resilience, and modern material design.',
      liveDemo: 'Live Demo',
      playStore: 'Google Play',
      keyFeatures: 'Key Highlights',
      activeUsers: 'Live Production',
    },
    website: {
      badge: 'FULL-STACK ARCHITECTURE',
      heading: 'HIGH-CONVERTING WEB PLATFORMS & PORTALS',
      subtitle: 'Fast, secure, responsive web applications built with Next.js and modern API stacks.',
      visitSite: 'Visit Website',
      preview: 'Live Preview',
    },
    hometown: {
      badge: 'MY HOMETOWN • BOGURA, BANGLADESH',
      title: 'WELCOME TO BOGURA',
      desc: 'The historic heart of North Bengal. Where 2,500 years of civilization meet modern energy. Proudly born and raised here, crafting software for the world.',
      mahasthan: 'Mahasthangarh — Ancient 3rd Century BC Citadel',
      satmatha: 'Satmatha Zero Point — 7-Way Highway Convergence',
      curd: 'Bogura Curd — World-Famous GI-Certified Delicacy',
      tagline1: 'Rooted in Bogura',
      tagline2: 'Building Worldwide ↗',
      videoCredit: 'Video credit by Uthshobe',
      hoverSound: 'Muted (Hover for Sound)',
      soundOn: 'Sound On',
      subcaption: 'Bogura Sadar, Bangladesh',
    },
    skills: {
      badge: 'PRODUCTION TESTED CAPABILITIES',
      heading: 'TECH STACK & SKILLS',
      sub: 'BENCHMARKED ON PRODUCTION LINUX VPS',
      all: 'ALL',
      mobileFrontend: 'MOBILE & FRONTEND',
      backendApis: 'BACKEND & APIS',
      databasesOrm: 'DATABASES & ORM',
      devopsCloud: 'DEVOPS & CLOUD',
    },
    services: {
      badge: 'WHAT I OFFER',
      heading: 'SERVICES & TAILORED CAPABILITIES',
      subtitle: 'End-to-end development services built to accelerate your business and product launch.',
      getStarted: 'Get Started',
    },
    contact: {
      badge: 'GET IN TOUCH',
      heading: "LET'S BUILD SOMETHING EXTRAORDINARY",
      subtitle: 'Have an Android app project, web platform, or technical challenge? Reach out directly.',
      namePlaceholder: 'Your Name (e.g. John Doe)',
      emailPlaceholder: 'Your Email (e.g. john@example.com)',
      subjectPlaceholder: 'Project Subject / Inquiry',
      messagePlaceholder: 'Tell me about your project, timeline, and requirements...',
      sendBtn: 'SEND MESSAGE',
      sendingBtn: 'SENDING MESSAGE...',
      successMsg: 'Message delivered successfully! I will respond promptly.',
      directChannels: 'Direct Communication Channels',
      whatsappText: 'Instant WhatsApp Chat',
      emailDirect: 'Direct Email',
      phoneDirect: 'Phone Support',
    },
    footer: {
      tagline: 'Engineering high-performance mobile and web software from Bogura, Bangladesh for clients worldwide.',
      copyright: 'All rights reserved.',
      location: 'Bogura Sadar, Rajshahi Division, Bangladesh',
      crafted: 'Crafted with precision & passion.',
      navigation: 'Quick Links',
      services: 'Expertise',
      connect: 'Connect',
    },
    common: {
      backToTop: 'Back to Top',
      switchLanguage: 'Switch to Bengali',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      about: 'পরিচিতি',
      apps: 'অ্যাপস',
      website: 'ওয়েবসাইট',
      services: 'সার্ভিস',
      contact: 'যোগাযোগ',
      payOnline: 'পে অনলাইন',
      letsTalk: 'কথা বলুন',
      role: 'মোবাইল ও ওয়েব আর্কিটেক্ট',
      langToggle: 'English',
    },
    hero: {
      roleBadge: 'ফুল-স্ট্যাক ও মোবাইল অ্যাপ ডেভেলপার',
      availableBadge: 'ফ্রিল্যান্স ও প্রজেক্ট কাজের জন্য প্রস্তুত',
      title1: 'ফুল-স্ট্যাক ডেভেলপার',
      title2: 'ও মোবাইল আর্কিটেক্ট',
      bio: 'আমি মোঃ মোমিনুল ইসলাম। উচ্চমানের অ্যান্ড্রয়েড অ্যাপ, শক্তিশালী ওয়েব প্ল্যাটফর্ম ও আধুনিক সফটওয়্যার সমাধান তৈরি করি—ক্লিন আর্কিটেকচার ও নিখুঁত ডিজাইনের সমন্বয়ে।',
      viewWork: 'অ্যাপস ও ওয়েবসাইট দেখুন',
      startProject: 'একসাথে কাজ শুরু করুন',
      yearsExp: 'বছরের অভিজ্ঞতা',
      projectsCount: 'সফল প্রজেক্ট',
      clientsCount: 'হ্যাপি ক্লায়েন্ট',
      location: 'বগুড়া সদর, বগুড়া, বাংলাদেশ',
      photoLabel1: 'অফিসিয়াল এক্সিকিউটিভ পোর্ট্রেট',
      photoLabel2: 'প্রফেশনাল ফ্রন্টাল ভিউ',
    },
    about: {
      badge: 'ডেভেলপারের পরিচিতি',
      heading: 'দক্ষতা ও নিষ্ঠার সাথে আধুনিক সফটওয়্যার নির্মাণ',
      subheading: 'বগুড়া সদর থেকে বিশ্বজুড়ে ক্লায়েন্টদের জন্য সেরা ডিজিটাল সলিউশন।',
      bio1: 'আমি মোঃ মোমিনুল ইসলাম, একজন ডেডিকেটেড ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার ও মোবাইল অ্যাপ আর্কিটেক্ট। অ্যান্ড্রয়েড (Kotlin, Jetpack Compose, Flutter) এবং ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্টে (Next.js, Node.js, FastAPI, PostgreSQL) আমার বিশেষ দক্ষতা রয়েছে।',
      bio2: 'বড় মাপের ব্যাকএন্ড আর্কিটেকচার থেকে শুরু করে দ্রুতগতির আধুনিক ওয়েবসাইট পর্যন্ত—প্রতিটি কাজেই আমি গতি, নিরাপত্তা এবং দারুণ ইউজার এক্সপেরিয়েন্স নিশ্চিত করি।',
      bio3: 'দেশ-বিদেশের স্টার্টআপ, এজেন্সি ও বিভিন্ন ব্যবসার সাথে সরাসরি কাজ করে আইডিয়াকে বাস্তব ও লাভজনক সফটওয়্যার প্রোডাক্টে রূপ দেওয়াই আমার প্রধান লক্ষ্য।',
      yearsExp: 'বছরের বাস্তব অভিজ্ঞতা',
      appsBuilt: 'সম্পন্ন প্রজেক্ট সংখ্যা',
      clientSatisfaction: 'ক্লায়েন্ট সন্তুষ্টির হার',
      corePhilosophy: 'কাজের মূল দর্শন',
      philosophyText: 'পরিচ্ছন্ন ও নিখুঁত কোড লেখা—যা ১০ জন থেকে শুরু করে ১ লক্ষাধিক সক্রিয় ইউজার পর্যন্ত নিরবচ্ছিন্নভাবে পারফর্ম করবে।',
      educationTitle: 'প্রকৌশলগত শৃঙ্খলা',
      educationDesc: 'প্রতিনিয়ত নতুন প্রযুক্তি শেখা, কোড অপ্টিমাইজেশন এবং বাস্তব প্রোডাকশন সার্ভারে পারফরম্যান্স যাচাইকরণ।',
    },
    apps: {
      badge: 'মোবাইল অ্যাপ্লিকেশন সমাহার',
      heading: 'প্রোডাকশন-গ্রেড অ্যান্ড্রয়েড অ্যাপস',
      subtitle: '৬০ এফপিএস স্মুথ পারফরম্যান্স, অফলাইন সাপোর্ট ও আধুনিক ম্যাটেরিয়াল ডিজাইনে নির্মিত।',
      liveDemo: 'লাইভ ডেমো',
      playStore: 'গুগল প্লে স্টোর',
      keyFeatures: 'প্রধান বৈশিষ্ট্যসমূহ',
      activeUsers: 'লাইভ প্রোডাকশন',
    },
    website: {
      badge: 'ফুল-স্ট্যাক আর্কিটেকচার',
      heading: 'আধুনিক ও প্রফেশনাল ওয়েব প্ল্যাটফর্ম',
      subtitle: 'Next.js ও আধুনিক এপিআই দিয়ে তৈরি দ্রুতগতির, নিরাপদ ও এসইও-বান্ধব ওয়েব অ্যাপ্লিকেশন।',
      visitSite: 'ওয়েবসাইট দেখুন',
      preview: 'লাইভ প্রিভিউ',
    },
    hometown: {
      badge: 'আমার প্রাণের শহর • বগুড়া, বাংলাদেশ',
      title: 'ঐতিহ্যের শহর বগুড়ায় স্বাগতম',
      desc: 'উত্তরবঙ্গের ঐতিহাসিক প্রবেশদ্বার। আড়াই হাজার বছরের প্রাচীন ঐতিহ্য ও আধুনিক জীবনের মিলনস্থল। এই প্রিয় শহরেই আমার জন্ম ও বেড়ে ওঠা, যেখান থেকে বিশ্বমানের সফটওয়্যার তৈরি করি।',
      mahasthan: 'মহাস্থানগড় — খ্রিস্টপূর্ব ৩য় শতকের প্রাচীন বাংলার দুর্গ ও রাজধানী',
      satmatha: 'সাতমাথা জিরো পয়েন্ট — ঐতিহাসিক ৭টি মহাসড়কের মিলনস্থল',
      curd: 'বগুড়ার দই — বিশ্বখ্যাত জিআই সার্টিফাইড ঐতিহ্যবাহী খাবার',
      tagline1: 'বগুড়ায় আমার শেকড়',
      tagline2: 'কাজ করছি বিশ্বজুড়ে ↗',
      videoCredit: 'ভিডিও ক্রেডিট: Uthshobe',
      hoverSound: 'মিউট করা (সাউন্ড শুনতে কার্সর আনুন)',
      soundOn: 'সাউন্ড চালু আছে',
      subcaption: 'বগুড়া সদর, বাংলাদেশ',
    },
    skills: {
      badge: 'প্রমাণিত প্রযুক্তিগত সক্ষমতা',
      heading: 'টেক স্ট্যাক ও স্কিলস',
      sub: 'প্রোডাকশন লিনাক্স সার্ভারে পরীক্ষিত ও প্রমাণিত',
      all: 'সব স্কিলস',
      mobileFrontend: 'মোবাইল ও ফ্রন্টএন্ড',
      backendApis: 'ব্যাকএন্ড ও এপিআই',
      databasesOrm: 'ডাটাবেজ ও ওআরএম',
      devopsCloud: 'ডেভঅপস ও ক্লাউড',
    },
    services: {
      badge: 'আমার সার্ভিসসমূহ',
      heading: 'সার্ভিস ও ডিজিটাল সলিউশন',
      subtitle: 'আপনার ব্যবসার প্রসারের জন্য সম্পূর্ণ কাস্টমাইজড সফটওয়্যার ও অ্যাপ ডেভেলপমেন্ট।',
      getStarted: 'শুরু করুন',
    },
    contact: {
      badge: 'যোগাযোগের মাধ্যম',
      heading: 'আসুন একসাথে অসাধারণ কিছু তৈরি করি',
      subtitle: 'নতুন কোনো অ্যান্ড্রয়েড অ্যাপ বা আধুনিক ওয়েবসাইটের পরিকল্পনা আছে? এখনই সরাসরি যোগাযোগ করুন।',
      namePlaceholder: 'আপনার পুরো নাম',
      emailPlaceholder: 'আপনার ইমেইল ঠিকানা',
      subjectPlaceholder: 'প্রজেক্টের বিষয় / শিরোনাম',
      messagePlaceholder: 'আপনার প্রজেক্টের বিস্তারিত বিবরণ, প্রয়োজনীয়তা ও সময়সীমা লিখুন...',
      sendBtn: 'বার্তা পাঠান',
      sendingBtn: 'বার্তা পাঠানো হচ্ছে...',
      successMsg: 'বার্তাটি সফলভাবে পৌঁছেছে! আমি দ্রুতই আপনার সাথে যোগাযোগ করব।',
      directChannels: 'সরাসরি যোগাযোগের ঠিকানা',
      whatsappText: 'হোয়াটসঅ্যাপে চ্যাট করুন',
      emailDirect: 'অফিসিয়াল ইমেইল',
      phoneDirect: 'সরাসরি ফোন',
    },
    footer: {
      tagline: 'বগুড়া, বাংলাদেশ থেকে বিশ্বজুড়ে ক্লায়েন্টদের জন্য উচ্চমানের মোবাইল ও ওয়েব সফটওয়্যার আর্কিটেকচার।',
      copyright: 'সর্বস্বত্ব সংরক্ষিত।',
      location: 'বগুড়া সদর, রাজশাহী বিভাগ, বাংলাদেশ',
      crafted: 'নিখুঁত প্রযুক্তি ও নিষ্ঠার সাথে নির্মিত।',
      navigation: 'প্রয়োজনীয় লিংক',
      services: 'দক্ষতা সমূহ',
      connect: 'সামাজিক মাধ্যম',
    },
    common: {
      backToTop: 'উপরে ফিরে যান',
      switchLanguage: 'Switch to English',
    },
  },
}

interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: TranslationDictionary
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.en,
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const language: Language = 'en'

  useEffect(() => {
    try {
      localStorage.setItem('user_language', 'en')
      document.documentElement.lang = 'en'
    } catch {}
  }, [])

  const setLanguage = () => {}
  const toggleLanguage = () => {}

  return (
    <LanguageContext.Provider
      value={{
        language: 'en',
        setLanguage,
        toggleLanguage,
        t: translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
