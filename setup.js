// Simple setup script for Nyota Platform
const fs = require('fs');
const path = require('path');

console.log('🌟 Setting up Nyota Platform...\n');

// Create basic .env file for server
const envContent = `# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database Configuration (Basic setup)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nyota_platform
DB_USER=postgres
DB_PASSWORD=password
DATABASE_URL=postgresql://postgres:password@localhost:5432/nyota_platform

# JWT Configuration
JWT_SECRET=nyota_platform_secret_key_2024
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Basic setup - other services optional for testing
REDIS_URL=redis://localhost:6379
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=test@example.com
EMAIL_PASS=password
EMAIL_FROM=Nyota Platform <noreply@nyotaplatform.ke>
TWILIO_ACCOUNT_SID=test
TWILIO_AUTH_TOKEN=test
TWILIO_PHONE_NUMBER=+1234567890
ECITIZEN_API_URL=https://api.ecitizen.go.ke
ECITIZEN_API_KEY=test
KRA_API_URL=https://api.kra.go.ke
KRA_API_KEY=test
ID_SYSTEM_API_URL=https://api.identity.go.ke
ID_SYSTEM_API_KEY=test
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads/
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100`;

try {
  // Create server directory if it doesn't exist
  if (!fs.existsSync('server')) {
    fs.mkdirSync('server');
  }
  
  // Write .env file
  fs.writeFileSync(path.join('server', '.env'), envContent);
  console.log('✅ Created server/.env file');
  
  // Create uploads directory
  if (!fs.existsSync('server/uploads')) {
    fs.mkdirSync('server/uploads', { recursive: true });
    console.log('✅ Created uploads directory');
  }
  
  console.log('\n🎉 Setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Install server dependencies: cd server && npm install');
  console.log('3. Start frontend: npm run dev');
  console.log('4. Start backend: npm run server');
  console.log('\n🌐 Access the platform at: http://localhost:3000');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
}
