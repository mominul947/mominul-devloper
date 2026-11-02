export default function NagadLogo({ className = 'w-6 h-6', size }: { className?: string; size?: number }) {
  const style = size ? { width: size, height: size } : undefined
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#E53935" />
      <circle cx="50" cy="50" r="30" fill="#F7941D" />
      <circle cx="50" cy="50" r="16" fill="#FFF" />
      {/* Dynamic ribbon flare */}
      <path
        d="M50 20 C65 20, 80 35, 80 50 C80 65, 65 80, 50 80 C40 80, 32 75, 26 68 L36 58 C39 63, 44 66, 50 66 C59 66, 66 59, 66 50 C66 41, 59 34, 50 34 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

