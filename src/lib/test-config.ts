/**
 * Configuration Test Utility
 * Use this to test your environment variable setup
 */

import { config, getApiUrl, isDevelopment, isProduction } from './config'

export const testConfiguration = () => {
  console.log('🧪 Testing Configuration...')
  
  // Test basic configuration
  console.log('📊 App Config:', {
    name: config.app.name,
    version: config.app.version,
    environment: config.app.environment,
  })
  
  // Test API configuration
  console.log('🌐 API Config:', {
    baseUrl: config.api.baseUrl,
    timeout: config.api.timeout,
  })
  
  // Test helper functions
  console.log('🔧 Helper Functions:', {
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
  })
  
  // Test API URL generation
  console.log('🔗 API URL Examples:', {
    base: getApiUrl(),
    auth: getApiUrl('/api/auth/login'),
    user: getApiUrl('/api/user/profile'),
  })
  
  // Test environment variable
  console.log('🔑 Environment Variables:', {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
  })
  
  console.log('✅ Configuration test completed!')
}

// Auto-run in development
if (typeof window !== 'undefined' && isDevelopment()) {
  testConfiguration()
}
