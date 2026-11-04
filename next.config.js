/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide Next.js header to prevent framework fingerprinting by scanners
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Anti-Clickjacking: Disallow embedding in iframes
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME-sniffing exploits
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Enforce modern referrer privacy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restrict browser permissions/hardware access
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()',
          },
          // Legacy XSS filter activation
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Enforce HTTPS across all subdomains with preload for 2 years
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent cross-domain Flash/PDF policy leaks
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          // DNS prefetching optimization
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
