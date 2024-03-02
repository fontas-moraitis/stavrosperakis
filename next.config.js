/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.storyblok.com'],
  },
  env: {
    storyblokPublic: 'P1IbngfFMslqaxxfvne0IAtt'
  },
}

module.exports = nextConfig
