#!/usr/bin/env node

/**
 * Environment Setup Script
 * Helps set up environment variables for different environments
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up environment variables for NYOTA Platform...\n')

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), 'env.example')

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    // Copy env.example to .env.local
    fs.copyFileSync(envExamplePath, envLocalPath)
    console.log('✅ Created .env.local from env.example')
  } else {
    // Create .env.local with default values
    const defaultEnv = `# Local development environment variables
# This file is for local development only and should not be committed to version control

# Backend API URL - Update this to your actual backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Add other environment-specific variables here
# NEXT_PUBLIC_APP_ENV=development
`
    fs.writeFileSync(envLocalPath, defaultEnv)
    console.log('✅ Created .env.local with default values')
  }
} else {
  console.log('ℹ️  .env.local already exists')
}

// Display current configuration
console.log('\n📋 Current Environment Configuration:')
console.log('=====================================')

try {
  const envContent = fs.readFileSync(envLocalPath, 'utf8')
  const lines = envContent.split('\n').filter(line => 
    line.trim() && !line.startsWith('#') && line.includes('=')
  )
  
  lines.forEach(line => {
    const [key, value] = line.split('=')
    console.log(`${key}=${value}`)
  })
} catch (error) {
  console.log('❌ Could not read .env.local file')
}

console.log('\n🔧 Next Steps:')
console.log('==============')
console.log('1. Update NEXT_PUBLIC_API_URL in .env.local to point to your backend')
console.log('2. For production deployment, set the environment variable in your hosting platform')
console.log('3. Run "npm run dev" to start development server')
console.log('4. Check browser console for configuration logs')

console.log('\n📚 For deployment instructions, see DEPLOYMENT_GUIDE.md')
console.log('\n✨ Environment setup complete!')
