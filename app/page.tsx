'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import AppShowcase from '@/components/AppShowcase'
import WebsiteShowcase from '@/components/WebsiteShowcase'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothMotionBackdrop from '@/components/SmoothMotionBackdrop'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="relative theme-main-bg theme-text-main overflow-x-hidden min-h-screen">
        <SmoothMotionBackdrop />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <AppShowcase />
        <WebsiteShowcase />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        <ThemeSwitcher />
      </main>
    </ThemeProvider>
  )
}
