const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

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

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Nyota Platform API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Step 1: Validate ID
app.post('/api/auth/validate-id', (req, res) => {
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
app.post('/api/auth/verify-contact', (req, res) => {
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
app.post('/api/auth/verify-otp', (req, res) => {
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
app.post('/api/auth/register', (req, res) => {
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
app.post('/api/auth/login', (req, res) => {
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

// Dashboard data
app.get('/api/user/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      totalStipend: 15000,
      savingsBalance: 1800,
      enrolledCourses: 2,
      completedMilestones: 5,
      businessIdeas: 1,
      unreadMessages: 3,
      recentActivities: [
        {
          id: 1,
          type: 'milestone',
          title: 'Completed Digital Marketing Module',
          description: 'Earned KES 3,000 stipend',
          time: '2 hours ago',
        },
        {
          id: 2,
          type: 'savings',
          title: 'Monthly Savings Added',
          description: 'KES 180 added to savings account',
          time: '1 day ago',
        }
      ]
    }
  });
});

// Training courses
app.get('/api/training/courses', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Digital Marketing Fundamentals',
        description: 'Learn the basics of digital marketing including SEO, social media, and content marketing.',
        sector: 'Technology',
        duration: 8,
        progress: 75,
        status: 'in_progress',
        enrolledAt: '2024-01-15',
        milestones: [
          {
            id: '1',
            title: 'Introduction to Digital Marketing',
            description: 'Understanding the digital landscape',
            order: 1,
            isCompleted: true,
            completedAt: '2024-01-20',
            stipendAmount: 2000,
          },
          {
            id: '2',
            title: 'SEO Fundamentals',
            description: 'Search engine optimization basics',
            order: 2,
            isCompleted: true,
            completedAt: '2024-01-28',
            stipendAmount: 3000,
          }
        ]
      }
    ]
  });
});

// Update user profile
app.post('/api/user/update-profile', (req, res) => {
  console.log('👤 Profile Update Request:', req.body);
  
  const { idNumber, ...profileData } = req.body;
  const userIndex = users.findIndex(u => u.idNumber === idNumber);

  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'User not found.' 
    });
  }

  // Update user profile
  users[userIndex] = { ...users[userIndex], ...profileData };
  
  console.log('✅ Profile Updated Successfully');
  res.json({
    success: true,
    data: {
      message: 'Profile updated successfully',
      user: users[userIndex]
    }
  });
});

// Upload profile photo
app.post('/api/user/upload-photo', (req, res) => {
  console.log('📸 Photo Upload Request');
  
  // In a real app, you'd handle file upload with multer
  // For now, we'll simulate a successful upload
  res.json({
    success: true,
    data: {
      message: 'Profile photo uploaded successfully',
      imageUrl: '/uploads/profile-photos/user-123.jpg'
    }
  });
});

// Update user settings
app.post('/api/user/update-settings', (req, res) => {
  console.log('⚙️ Settings Update Request:', req.body);
  
  const { idNumber, settings } = req.body;
  const userIndex = users.findIndex(u => u.idNumber === idNumber);

  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'User not found.' 
    });
  }

  // Update user settings
  if (!users[userIndex].settings) {
    users[userIndex].settings = {};
  }
  users[userIndex].settings = { ...users[userIndex].settings, ...settings };
  
  console.log('✅ Settings Updated Successfully');
  res.json({
    success: true,
    data: {
      message: 'Settings updated successfully',
      settings: users[userIndex].settings
    }
  });
});

// Update payment details
app.post('/api/user/update-payment', (req, res) => {
  console.log('💳 Payment Details Update Request:', req.body);
  
  const { idNumber, paymentDetails } = req.body;
  const userIndex = users.findIndex(u => u.idNumber === idNumber);

  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'User not found.' 
    });
  }

  // Update payment details
  if (!users[userIndex].paymentDetails) {
    users[userIndex].paymentDetails = {};
  }
  users[userIndex].paymentDetails = { ...users[userIndex].paymentDetails, ...paymentDetails };
  
  console.log('✅ Payment Details Updated Successfully');
  res.json({
    success: true,
    data: {
      message: 'Payment details updated successfully',
      paymentDetails: users[userIndex].paymentDetails
    }
  });
});

// Get user profile
app.get('/api/user/profile', (req, res) => {
  const { idNumber } = req.query;
  const user = users.find(u => u.idNumber === idNumber);

  if (!user) {
    return res.status(404).json({ 
      success: false,
      error: 'User not found.' 
    });
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        idNumber: user.idNumber,
        firstName: user.name?.split(' ')[0] || 'John',
        lastName: user.name?.split(' ')[1] || 'Doe',
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dob,
        gender: user.gender,
        residence: user.residence,
        address: user.address,
        kraPin: user.kraPin,
        isPwd: user.isPwd,
        settings: user.settings || {},
        paymentDetails: user.paymentDetails || {}
      }
    }
  });
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  console.log('❌ Route not found:', req.originalUrl);
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Nyota Platform API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Frontend URL: http://localhost:3000`);
  console.log(`\n✨ Ready to serve requests!`);
  console.log(`\n🔑 Test ID Numbers:`);
  console.log(`   Valid: 12345678 (John Doe, Age 29, Not PWD)`);
  console.log(`   Valid: 87654321 (Mary Wanjiku, Age 34, PWD)`);
  console.log(`   Valid: 11111111 (Peter Kimani, Age 24, Not PWD)`);
  console.log(`   Invalid: 22222222 (Grace Akinyi, Age 39, Too old)`);
});

module.exports = app;
