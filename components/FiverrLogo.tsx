import React from 'react'
import Image from 'next/image'

interface FiverrLogoProps {
  className?: string
  size?: number
}

/**
 * Official circular Fiverr badge using the exact circular Fiverr icon provided by the user.
 */
export default function FiverrLogo({ className = '', size }: FiverrLogoProps) {
  const pixelSize = size ?? 18
  return (
    <span
      style={{
        width: pixelSize,
        height: pixelSize,
        minWidth: pixelSize,
        minHeight: pixelSize,
      }}
      className={`relative inline-flex items-center justify-center rounded-full flex-shrink-0 select-none overflow-hidden aspect-square ${className}`}
      aria-label="Fiverr"
    >
      <Image
        src="/images/fiverr-icon.png"
        alt="Fiverr"
        width={pixelSize * 2}
        height={pixelSize * 2}
        className="w-full h-full object-cover rounded-full"
      />
    </span>
  )
}
