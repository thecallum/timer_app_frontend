/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => ([
    {
      source: "/",
      destination: "/calendar",
      permanent: false
    }
  ])
}

module.exports = nextConfig
