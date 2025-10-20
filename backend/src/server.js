const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const trainingRoutes = require('./routes/training')
const savingsRoutes = require('./routes/savings')
const entrepreneurshipRoutes = require('./routes/entrepreneurship')
const communicationRoutes = require('./routes/communication')
const marketRoutes = require('./routes/market')
const govIntegrationRoutes = require('./routes/govIntegration')

const errorHandler = require('./middleware/errorHandler')
const { notFound } = require('./middleware/notFound')

const app = express()

// Security middleware
app.use(helmet())
app.use(compression())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Root route for Render health checks
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Welcome to Nyota Platform API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    endpoints: {
      health: '/health',
      auth: '/api/auth/*',
      user: '/api/user/*',
      training: '/api/training/*',
      savings: '/api/savings/*',
      entrepreneurship: '/api/entrepreneurship/*',
      communication: '/api/communication/*',
      market: '/api/market/*',
      gov: '/api/gov/*'
    }
  })
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/training', trainingRoutes)
app.use('/api/savings', savingsRoutes)
app.use('/api/entrepreneurship', entrepreneurshipRoutes)
app.use('/api/communication', communicationRoutes)
app.use('/api/market', marketRoutes)
app.use('/api/gov', govIntegrationRoutes)

// 404 handler
app.use(notFound)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Nyota Platform API Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
  console.log(`🌐 Server accessible on all interfaces (0.0.0.0:${PORT})`)
})

module.exports = app
