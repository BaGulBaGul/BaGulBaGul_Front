/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        // source: '/(.*)',
        source: '/:path*{/}?',
        headers: [
          {
            key: 'x-user',
            value: 'ss',
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
