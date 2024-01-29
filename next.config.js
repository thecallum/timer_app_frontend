/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  // redirects: async () => [
  //   {
  //     source: '/',
  //     destination: '/calendar',
  //     permanent: false,
  //   },
  // ],
  // distDir: "build/_next",
  // target: "server",
  swcMinify: true,
  images: {
    // Nowhere to cache the images in Lambda (read only)
    unoptimized: true, // Next 12.3+, other "experimental -> images -> unoptimized"
  },
  output: "standalone", // THIS IS IMPORTANT
}

module.exports = nextConfig

// https://remaster.com/blog/nextjs-lambda-serverless-framework