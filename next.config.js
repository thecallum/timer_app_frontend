/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
  reactStrictMode: true,
}

module.exports = nextConfig
