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
    ];
  },
};

module.exports = nextConfig;
