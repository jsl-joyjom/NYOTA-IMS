const express = require('express');
const router = express.Router();

// Get savings account
router.get('/account', (req, res) => {
  res.json({
    success: true,
    data: {
      id: '1',
      userId: '1',
      balance: 5000,
      monthlyTarget: 2000,
      totalSaved: 5000,
      createdAt: '2024-01-01T00:00:00Z'
    }
  });
});

// Get transactions
router.get('/transactions', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        type: 'stipend',
        amount: 2000,
        description: 'Digital Marketing Module 1 completion',
        reference: 'STIP-001',
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        type: 'savings',
        amount: 240,
        description: '12% mandatory savings',
        reference: 'SAV-001',
        createdAt: '2024-01-15T00:00:00Z'
      }
    ],
    total: 2,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: 1
  });
});

// Update savings target
router.put('/target', (req, res) => {
  const { target } = req.body;
  
  res.json({
    success: true,
    message: 'Savings target updated successfully',
    data: {
      monthlyTarget: target,
      updatedAt: new Date().toISOString()
    }
  });
});

module.exports = router;
