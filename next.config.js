/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
