const express = require('express');
const router = express.Router();

// Submit business idea
router.post('/business-idea', (req, res) => {
  const { title, description, sector, targetMarket, fundingRequired } = req.body;
  
  res.json({
    success: true,
    message: 'Business idea submitted successfully',
    data: {
      id: Date.now().toString(),
      title,
      description,
      sector,
      targetMarket,
      fundingRequired,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    }
  });
});

// Get business ideas
router.get('/business-ideas', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Eco-Friendly Packaging Solutions',
        description: 'Sustainable packaging for local businesses',
        sector: 'Environmental',
        targetMarket: 'Local businesses',
        fundingRequired: 50000,
        status: 'submitted',
        submittedAt: '2024-01-10T00:00:00Z'
      }
    ]
  });
});

// Take aptitude test
router.post('/aptitude-test', (req, res) => {
  const { answers } = req.body;
  
  res.json({
    success: true,
    message: 'Aptitude test completed successfully',
    data: {
      id: Date.now().toString(),
      score: 85,
      maxScore: 100,
      completedAt: new Date().toISOString(),
      results: [
        {
          category: 'Business Planning',
          score: 90,
          maxScore: 100,
          percentage: 90
        },
        {
          category: 'Financial Management',
          score: 80,
          maxScore: 100,
          percentage: 80
        }
      ]
    }
  });
});

// Apply for grant
router.post('/grant-application', (req, res) => {
  const { businessIdeaId, amount, phase } = req.body;
  
  res.json({
    success: true,
    message: 'Grant application submitted successfully',
    data: {
      id: Date.now().toString(),
      businessIdeaId,
      amount,
      phase,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
  });
});

module.exports = router;
