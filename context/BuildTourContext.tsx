'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface BuildTourContextType {
  isTourActive: boolean
  startTour: () => void
  stopTour: () => void
}

const BuildTourContext = createContext<BuildTourContextType>({
  isTourActive: false,
  startTour: () => {},
  stopTour: () => {},
})

export function BuildTourProvider({ children }: { children: React.ReactNode }) {
  const [isTourActive, setIsTourActive] = useState(false)

  const startTour = useCallback(() => {
    setIsTourActive(true)
  }, [])

  const stopTour = useCallback(() => {
    setIsTourActive(false)
  }, [])

  return (
    <BuildTourContext.Provider value={{ isTourActive, startTour, stopTour }}>
      {children}
    </BuildTourContext.Provider>
  )
}

export function useBuildTour() {
  return useContext(BuildTourContext)
}
