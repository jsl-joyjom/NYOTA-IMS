const express = require('express');
const router = express.Router();

// Mock government data
const mockGovData = {
  '12345678': {
    idNumber: '12345678',
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
  },
  '87654321': {
    idNumber: '87654321',
    fullName: 'Mary Wanjiku',
    firstName: 'Mary',
    lastName: 'Wanjiku',
    dateOfBirth: '1990-03-20',
    gender: 'female',
    kraPin: 'B987654321M',
    location: 'Kisumu',
    county: 'Kisumu County',
    isPWD: true,
    age: 34,
    eligibility: 'You are eligible for the Nyota Platform program with PWD priority.'
  },
  '11111111': {
    idNumber: '11111111',
    fullName: 'Peter Kimani',
    firstName: 'Peter',
    lastName: 'Kimani',
    dateOfBirth: '2000-08-10',
    gender: 'male',
    kraPin: 'C111111111P',
    location: 'Mombasa',
    county: 'Mombasa County',
    isPWD: false,
    age: 24,
    eligibility: 'You are eligible for the Nyota Platform program.'
  },
  '22222222': {
    idNumber: '22222222',
    fullName: 'Grace Akinyi',
    firstName: 'Grace',
    lastName: 'Akinyi',
    dateOfBirth: '1985-12-05',
    gender: 'female',
    kraPin: 'D222222222Q',
    location: 'Nakuru',
    county: 'Nakuru County',
    isPWD: false,
    age: 39,
    eligibility: 'You are not eligible for this program. Maximum age is 35 years.'
  }
};

// Mock authentication routes
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!', status: 'success' });
});

// Step 1: Validate ID
router.post('/validate-id', (req, res) => {
  console.log('📋 ID Validation Request:', req.body);
  
  const { idNumber } = req.body;
  
  if (!idNumber) {
    return res.status(400).json({
      success: false,
      error: 'ID number is required'
    });
  }

  const govData = mockGovData[idNumber];
  
  if (!govData) {
    return res.status(404).json({
      success: false,
      error: 'Invalid ID number. Please check and try again.'
    });
  }

  // Check eligibility
  if (govData.age > 35) {
    return res.status(403).json({
      success: false,
      error: 'You are not eligible for this program. Maximum age is 35 years.',
      data: {
        idNumber,
        age: govData.age,
        isPWD: govData.isPWD
      }
    });
  }

  if (govData.age >= 30 && govData.age <= 35 && !govData.isPWD) {
    return res.status(403).json({
      success: false,
      error: 'You are not eligible for this program. Age 30-35 is only available for Persons with Disabilities.',
      data: {
        idNumber,
        age: govData.age,
        isPWD: govData.isPWD
      }
    });
  }

  console.log('✅ ID Validated Successfully:', govData.fullName);
  res.json({
    success: true,
    data: govData
  });
});

// Step 2: Verify contact
router.post('/verify-contact', (req, res) => {
  console.log('📧 Contact Verification Request:', req.body);
  
  const { email, phone, idNumber } = req.body;
  
  if (!email || !phone || !idNumber) {
    return res.status(400).json({
      success: false,
      error: 'Email, phone number, and ID number are required'
    });
  }

  const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(`📧 Email OTP for ${email}: ${emailOtp}`);
  console.log(`📱 SMS OTP for ${phone}: ${phoneOtp}`);

  res.json({
    success: true,
    data: {
      message: 'OTP codes sent to your email and phone',
      emailOtp: emailOtp,
      phoneOtp: phoneOtp,
      idNumber
    }
  });
});

// Step 3: Verify OTP
router.post('/verify-otp', (req, res) => {
  console.log('🔐 OTP Verification Request:', req.body);
  
  const { emailOtp, phoneOtp } = req.body;
  
  if (!emailOtp || !phoneOtp) {
    return res.status(400).json({
      success: false,
      error: 'Both email and phone OTP codes are required'
    });
  }

  // Accept any 6-digit OTP for testing
  if (emailOtp.length === 6 && phoneOtp.length === 6) {
    console.log('✅ OTP Verified Successfully');
    res.json({
      success: true,
      data: {
        message: 'OTP verification successful'
      }
    });
  } else {
    res.status(400).json({
      success: false,
      error: 'Invalid OTP codes'
    });
  }
});

// Step 4: Register user
router.post('/register', (req, res) => {
  console.log('👤 Registration Request:', req.body);
  
  const { 
    idNumber, 
    email, 
    phone, 
    password, 
    firstName, 
    lastName, 
    dateOfBirth, 
    gender, 
    kraPin, 
    location,
    county,
    isPWD 
  } = req.body;
  
  if (!idNumber || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  console.log('✅ User Registered Successfully:', firstName, lastName);
  res.status(201).json({
    success: true,
    data: {
      id: Date.now().toString(),
      message: 'Your Nyota account has been successfully created.',
      user: {
        id: Date.now().toString(),
        idNumber: idNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
        isPWD: isPWD
      }
    }
  });
});

// Login
router.post('/login', (req, res) => {
  console.log('🔑 Login Request:', req.body);
  
  const { idNumber, password } = req.body;

  if (!idNumber || !password) {
    return res.status(400).json({
      success: false,
      error: 'ID number and password are required'
    });
  }

  console.log('✅ Login Successful for:', idNumber);
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        idNumber: idNumber,
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isVerified: true,
        residence: 'Nairobi',
        address: 'Nairobi, Nairobi County'
      }
    }
  });
});

module.exports = router;
