/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'nyota-backend-zrao.onrender.com'],
  },
  // Environment variables are automatically available in Next.js
  // No need to explicitly define them in env object unless you want to override
  env: {
    // You can add custom environment variables here if needed
    // NEXT_PUBLIC_API_URL is automatically available as process.env.NEXT_PUBLIC_API_URL
  },
}

module.exports = nextConfig
