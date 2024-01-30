/** @type {import('next').NextConfig} */

const nextConfig = {
  // redirects: async () => [
  //   {
  //     source: '/',
  //     destination: '/calendar',
  //     permanent: false,
  //   },
  // ],
  swcMinify: true,
  images: {
    unoptimized: true, 
  },
  output: "standalone",
}

module.exports = nextConfig

// https://remaster.com/blog/nextjs-lambda-serverless-framework