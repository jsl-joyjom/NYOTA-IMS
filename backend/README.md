# Nyota Platform Backend API

Backend API server for the Nyota Youth Empowerment and MSME Engagement Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis (optional, for caching)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

3. **Database Setup:**
   ```bash
   npm run migrate
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Start Production Server:**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── database/
│   │   └── migrations/          # Database migration files
│   └── server.js               # Additional server logic
├── index.js                    # Main server entry point
├── package.json               # Dependencies and scripts
├── knexfile.js               # Database configuration
├── .env                      # Environment variables
└── env.example              # Environment template
```

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/validate-id` - Validate ID number
- `POST /api/auth/verify-contact` - Verify contact info
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/dashboard` - Get dashboard data
- `GET /api/user/profile` - Get user profile
- `POST /api/user/update-profile` - Update profile
- `POST /api/user/upload-photo` - Upload profile photo
- `POST /api/user/update-settings` - Update user settings
- `POST /api/user/update-payment` - Update payment info

### Training
- `GET /api/training/courses` - Get available courses

### Health Check
- `GET /health` - Server health check

## 🗄️ Database

The application uses PostgreSQL with Knex.js for database management.

### Migrations
Run database migrations:
```bash
npm run migrate
```

### Available Tables
- users
- user_profiles
- courses
- milestones
- enrollments
- milestone_completions
- savings_accounts
- transactions
- business_ideas
- aptitude_tests
- grant_applications
- messages
- notifications
- products
- otp_verifications

## 🔧 Environment Variables

See `env.example` for all required environment variables.

## 📦 Deployment

This backend is ready for deployment on:
- Railway
- Render
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## 🛠️ Development

- **Start dev server:** `npm run dev`
- **Run migrations:** `npm run migrate`
- **Run seeds:** `npm run seed`
- **Run tests:** `npm test`

## 📄 License

MIT License - see LICENSE file for details.
