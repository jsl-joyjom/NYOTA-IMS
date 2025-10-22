/**
 * Environment Configuration
 * Centralized configuration for environment variables and API settings
 */

// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000, // 10 seconds
  },
  
  // App Configuration
  app: {
    name: 'NYOTA Platform',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
  
  // Feature Flags (if needed)
  features: {
    enableDebugLogs: process.env.NODE_ENV === 'development',
    enableAnalytics: process.env.NODE_ENV === 'production',
  },
} as const

// Helper function to get API URL
export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, '') // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, '') // Remove leading slash
  return `${baseUrl}/${cleanEndpoint}`
}

// Helper function to check if we're in development
export const isDevelopment = () => config.app.environment === 'development'

// Helper function to check if we're in production
export const isProduction = () => config.app.environment === 'production'

// Log configuration in development
if (isDevelopment()) {
  console.log('🔧 App Configuration:', {
    apiUrl: config.api.baseUrl,
    environment: config.app.environment,
    appName: config.app.name,
  })
}
