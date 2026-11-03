'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import AppShowcase from '@/components/AppShowcase'
import WebsiteShowcase from '@/components/WebsiteShowcase'
import BoguraCityTeaser from '@/components/BoguraCityTeaser'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothMotionBackdrop from '@/components/SmoothMotionBackdrop'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative theme-main-bg theme-text-main min-h-screen">
          <SmoothMotionBackdrop />
          <ScrollProgress />
          <Navbar />
          <main className="relative overflow-x-hidden">
            <Hero />
            <About />
            <AppShowcase />
            <WebsiteShowcase />
            <BoguraCityTeaser />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </main>
          <ThemeSwitcher />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
