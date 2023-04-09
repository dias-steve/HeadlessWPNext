/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['wpwctheme.local','localhost', 'otgbac.ovh', 'ageaire-back.ovh'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
