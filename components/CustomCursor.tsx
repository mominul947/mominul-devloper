'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    let followerX = 0
    let followerY = 0
    let animationId: number

    const updateFollower = () => {
      followerX += (position.x - followerX) * 0.12
      followerY += (position.y - followerY) * 0.12
      setFollower({ x: followerX, y: followerY })
      animationId = requestAnimationFrame(updateFollower)
    }

    animationId = requestAnimationFrame(updateFollower)
    return () => cancelAnimationFrame(animationId)
  }, [position])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const addHover = () => {
      const interactables = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, select, label'
      )
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    addHover()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '8px' : isClicking ? '6px' : '10px',
          height: isHovering ? '8px' : isClicking ? '6px' : '10px',
          background: isHovering ? '#06b6d4' : '#8b5cf6',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
          boxShadow: isHovering
            ? '0 0 15px rgba(6, 182, 212, 0.8)'
            : '0 0 15px rgba(139, 92, 246, 0.8)',
        }}
      />
      {/* Follower ring */}
      <div
        style={{
          position: 'fixed',
          left: follower.x,
          top: follower.y,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '50px' : isClicking ? '30px' : '38px',
          height: isHovering ? '50px' : isClicking ? '30px' : '38px',
          border: `1.5px solid ${isHovering ? 'rgba(6,182,212,0.6)' : 'rgba(139,92,246,0.5)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          backdropFilter: isHovering ? 'blur(2px)' : 'none',
        }}
      />
    </>
  )
}
