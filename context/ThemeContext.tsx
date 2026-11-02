'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeType =
  | 'crimson-bold'
  | 'editorial-ivory'
  | 'mono-studio'
  | 'neon-growth'
  | 'aurora-velvet'

export interface ThemeMeta {
  id: ThemeType
  name: string
  label: string
  primaryColor: string
  accentColor: string
  isDark: boolean
  tagline: string
}

export const themes: ThemeMeta[] = [
  {
    id: 'neon-growth',
    name: 'Cyber Neon Lime',
    label: 'Neon Lime (Main)',
    primaryColor: '#080c0a',
    accentColor: '#84cc16',
    isDark: true,
    tagline: 'Cyber Growth High-Impact Neon Lime Aesthetic',
  },
  {
    id: 'editorial-ivory',
    name: 'Editorial White / Crimson',
    label: 'Clean White',
    primaryColor: '#ffffff',
    accentColor: '#ef4444',
    isDark: false,
    tagline: 'Clean White Scandinavian Aesthetic with Bold Crimson Accents',
  },
  {
    id: 'crimson-bold',
    name: 'Crimson Billboard',
    label: 'Red & Black',
    primaryColor: '#08080a',
    accentColor: '#ef4444',
    isDark: true,
    tagline: 'Rayhan Aditya Bold Editorial Red & Black',
  },
  {
    id: 'mono-studio',
    name: 'Mono Dark Studio',
    label: 'Obsidian Mono',
    primaryColor: '#000000',
    accentColor: '#f43f5e',
    isDark: true,
    tagline: 'Mono Signal M•S High-Contrast Luxury',
  },
  {
    id: 'aurora-velvet',
    name: 'Aurora Velvet',
    label: 'Royal Violet',
    primaryColor: '#0e101a',
    accentColor: '#a855f7',
    isDark: true,
    tagline: 'Aurora Studio Midnight Purple Editorial',
  },
]

interface ThemeContextValue {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  currentMeta: ThemeMeta
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('neon-growth')

  useEffect(() => {
    const saved = localStorage.getItem('mominul_portfolio_theme') as ThemeType
    if (saved && themes.some((t) => t.id === saved)) {
      setThemeState(saved)
      document.documentElement.setAttribute('data-theme', saved)
    } else {
      setThemeState('neon-growth')
      document.documentElement.setAttribute('data-theme', 'neon-growth')
    }
  }, [])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem('mominul_portfolio_theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const currentMeta = themes.find((t) => t.id === theme) || themes[0]

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentMeta }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
