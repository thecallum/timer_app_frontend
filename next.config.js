/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
