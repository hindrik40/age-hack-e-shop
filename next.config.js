/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: '**.manus.space' },
      { protocol: 'https', hostname: '**.loca.lt' },
      { protocol: 'https', hostname: '**.trycloudflare.com' },
    ],
  },
}

module.exports = nextConfig
