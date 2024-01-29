/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/calendar',
      permanent: false,
    },
  ],
  distDir: "build/_next",
  target: "server"
}

module.exports = nextConfig
