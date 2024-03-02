/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
}

module.exports = nextConfig
