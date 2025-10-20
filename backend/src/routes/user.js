const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: '1',
      idNumber: '12345678',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+254700000000',
      dateOfBirth: '1995-06-15',
      gender: 'male',
      kraPin: 'A123456789K',
      residence: 'Nairobi',
      address: '123 Main Street, Nairobi',
      isVerified: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  });
});

// Update user profile
router.post('/update-profile', (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: req.body
  });
});

// Upload photo
router.post('/upload-photo', (req, res) => {
  res.json({
    success: true,
    message: 'Photo uploaded successfully',
    data: {
      photoUrl: 'https://example.com/photos/user-1.jpg'
    }
  });
});

// Update settings
router.post('/update-settings', (req, res) => {
  res.json({
    success: true,
    message: 'Settings updated successfully',
    data: req.body
  });
});

// Update payment info
router.post('/update-payment', (req, res) => {
  res.json({
    success: true,
    message: 'Payment information updated successfully',
    data: req.body
  });
});

// Get dashboard data
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        name: 'John Doe',
        progress: 75,
        totalEarnings: 15000,
        savings: 5000
      },
      stats: {
        coursesCompleted: 3,
        milestonesReached: 8,
        totalStipend: 15000,
        savingsRate: 12
      },
      recentActivity: [
        {
          type: 'milestone',
          message: 'Completed Digital Marketing Module 2',
          date: '2024-01-15',
          amount: 2000
        }
      ]
    }
  });
});

module.exports = router;
