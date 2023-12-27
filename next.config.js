/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
      {
        source: '/dashboard',
        destination: '/',
      },
      {
        source: '/login',
        destination: '/auth',
      },
    ];
  },
};

module.exports = nextConfig;
