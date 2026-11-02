export default function BkashLogo({ className = 'w-6 h-6', size }: { className?: string; size?: number }) {
  const style = size ? { width: size, height: size } : undefined
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* bKash signature origami bird silhouette */}
      <path
        d="M20 70 L50 20 L80 45 L50 45 Z"
        fill="#E2136E"
      />
      <path
        d="M50 45 L80 45 L65 75 Z"
        fill="#D10A60"
      />
      <path
        d="M35 55 L50 20 L45 55 Z"
        fill="#FF2D8D"
      />
    </svg>
  )
}

