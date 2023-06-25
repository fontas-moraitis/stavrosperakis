/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['a.storyblok.com'],
  },
  env: {
    storyblokAccessToken: 'V0xwB0q7VQvBe1IPBmmDyQtt'
  }
}

module.exports = nextConfig
