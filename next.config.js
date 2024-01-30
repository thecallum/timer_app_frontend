/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/calendar',
      permanent: false,
    },
  ],
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  env: {
    API_KEY: process.env.SERVICE_API_KEY ?? '',
    API_URL: process.env.SERVICE_API_URL ?? '',
  },
}

module.exports = nextConfig
