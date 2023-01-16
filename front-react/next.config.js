/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'statics.turecibo.com'
      }
    ]
  }
}

module.exports = nextConfig
