const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Government integration route is working!',
    timestamp: new Date().toISOString()
  });
});

// eCitizen API integration
router.post('/ecitizen/verify', (req, res) => {
  const { idNumber } = req.body;
  
  if (!idNumber) {
    return res.status(400).json({
      success: false,
      error: 'ID number is required'
    });
  }

  // Mock eCitizen response
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
      eligibility: 'You are eligible for the Nyota Platform program.',
      source: 'eCitizen API'
    }
  });
});

// KRA API integration
router.post('/kra/verify', (req, res) => {
  const { kraPin } = req.body;
  
  if (!kraPin) {
    return res.status(400).json({
      success: false,
      error: 'KRA PIN is required'
    });
  }

  // Mock KRA response
  res.json({
    success: true,
    data: {
      kraPin,
      taxStatus: 'Active',
      businessName: 'John Doe Enterprises',
      registrationDate: '2020-01-01',
      taxCategory: 'Individual',
      source: 'KRA API'
    }
  });
});

// ID System API integration
router.post('/id-system/verify', (req, res) => {
  const { idNumber } = req.body;
  
  if (!idNumber) {
    return res.status(400).json({
      success: false,
      error: 'ID number is required'
    });
  }

  // Mock ID System response
  res.json({
    success: true,
    data: {
      idNumber,
      fullName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1995-06-15',
      gender: 'male',
      placeOfBirth: 'Nairobi',
      nationality: 'Kenyan',
      source: 'ID System API'
    }
  });
});

// Combined government data fetch
router.post('/fetch-all', (req, res) => {
  const { idNumber, kraPin } = req.body;
  
  if (!idNumber) {
    return res.status(400).json({
      success: false,
      error: 'ID number is required'
    });
  }

  // Mock combined response
  res.json({
    success: true,
    data: {
      idNumber,
      kraPin: kraPin || 'A123456789K',
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
      eligibility: 'You are eligible for the Nyota Platform program.',
      taxStatus: 'Active',
      businessName: 'John Doe Enterprises',
      registrationDate: '2020-01-01',
      taxCategory: 'Individual',
      placeOfBirth: 'Nairobi',
      nationality: 'Kenyan',
      sources: ['eCitizen API', 'KRA API', 'ID System API'],
      fetchedAt: new Date().toISOString()
    }
  });
});

// Health check for government services
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Government integration services are operational',
    services: {
      eCitizen: 'operational',
      kra: 'operational',
      idSystem: 'operational'
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
