/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode to prevent double rendering issues
  reactStrictMode: false,
  
  // Optimize for production
  swcMinify: true,
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Images configuration
  images: {
    unoptimized: true,
  },
}

export default nextConfig
