const express = require('express');
const router = express.Router();

// Mock authentication routes
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!', status: 'success' });
});

// Validate ID
router.post('/validate-id', (req, res) => {
  const { idNumber } = req.body;
  
  if (!idNumber) {
    return res.status(400).json({
      success: false,
      error: 'ID number is required'
    });
  }

  // Mock validation
  res.json({
    success: true,
    data: {
      idNumber,
      fullName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1995-06-15',
      gender: 'male',
      kraPin: 'A123456789K',
      location: 'Nairobi',
      county: 'Nairobi County',
      isPWD: false,
      age: 29,
      eligibility: 'You are eligible for the Nyota Platform program.'
    }
  });
});

// Verify contact
router.post('/verify-contact', (req, res) => {
  const { email, phone } = req.body;
  
  if (!email || !phone) {
    return res.status(400).json({
      success: false,
      error: 'Email and phone are required'
    });
  }

  res.json({
    success: true,
    message: 'Contact verification initiated',
    data: { email, phone }
  });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  
  if (!otp) {
    return res.status(400).json({
      success: false,
      error: 'OTP is required'
    });
  }

  res.json({
    success: true,
    message: 'OTP verified successfully'
  });
});

// Register user
router.post('/register', (req, res) => {
  const { idNumber, email, phone, password, firstName, lastName } = req.body;
  
  if (!idNumber || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  res.status(201).json({
    success: true,
    data: {
      id: Date.now().toString(),
      message: 'Your Nyota account has been successfully created.',
      user: {
        id: Date.now().toString(),
        idNumber,
        email,
        firstName: firstName || 'John',
        lastName: lastName || 'Doe',
        isPWD: false
      }
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { idNumber, password } = req.body;
  
  if (!idNumber || !password) {
    return res.status(400).json({
      success: false,
      error: 'ID number and password are required'
    });
  }

  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        idNumber,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }
    }
  });
});

module.exports = router;
