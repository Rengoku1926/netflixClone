// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['fakeimg.pl'],
    },
    eslint: {
        ignoreDuringBuilds: true, // Ignores ESLint errors in production
      },
  };
  
  module.exports = nextConfig;
  