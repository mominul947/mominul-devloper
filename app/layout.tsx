import type { Metadata } from 'next'
import './globals.css'
import AnalyticsTracker from '@/components/AnalyticsTracker'

export const metadata: Metadata = {
  title: 'Md. Mominul Islam | Full-Stack & Mobile App Developer',
  description: 'Portfolio of Md. Mominul Islam – Full-Stack & Mobile App Developer based in Bogura Sadar, Bogura, Bangladesh. Next.js, Node.js, React Native.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="neon-growth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  )
}
