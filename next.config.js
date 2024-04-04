/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/[slug]',
      },
    ];
  },
}

module.exports = nextConfig
