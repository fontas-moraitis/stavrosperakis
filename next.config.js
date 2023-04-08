/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.storyblok.com'],
  },
  env:{
    storyblokAccessToken: 'V0xwB0q7VQvBe1IPBmmDyQtt'
  }
}

module.exports = nextConfig
