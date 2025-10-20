const express = require('express');
const router = express.Router();

// Get all courses
router.get('/courses', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Digital Marketing Fundamentals',
        description: 'Learn the basics of digital marketing including SEO, social media, and content marketing.',
        sector: 'Digital Marketing',
        duration: '8 weeks',
        prerequisites: ['Basic computer skills'],
        milestones: [
          {
            id: '1',
            title: 'Introduction to Digital Marketing',
            description: 'Understanding the digital landscape',
            order: 1,
            isCompleted: true,
            stipendAmount: 1000
          },
          {
            id: '2',
            title: 'SEO Basics',
            description: 'Search Engine Optimization fundamentals',
            order: 2,
            isCompleted: false,
            stipendAmount: 1500
          }
        ],
        documents: [
          {
            id: '1',
            title: 'Course Syllabus',
            type: 'pdf',
            url: 'https://example.com/syllabus.pdf',
            isRequired: true
          }
        ]
      },
      {
        id: '2',
        title: 'Entrepreneurship Essentials',
        description: 'Learn how to start and run a successful business.',
        sector: 'Business',
        duration: '12 weeks',
        prerequisites: ['Form 4 education'],
        milestones: [
          {
            id: '3',
            title: 'Business Planning',
            description: 'Creating a comprehensive business plan',
            order: 1,
            isCompleted: false,
            stipendAmount: 2000
          }
        ],
        documents: [
          {
            id: '2',
            title: 'Business Plan Template',
            type: 'pdf',
            url: 'https://example.com/template.pdf',
            isRequired: true
          }
        ]
      }
    ]
  });
});

// Enroll in course
router.post('/courses/:courseId/enroll', (req, res) => {
  const { courseId } = req.params;
  
  res.json({
    success: true,
    message: 'Successfully enrolled in course',
    data: {
      enrollmentId: Date.now().toString(),
      courseId,
      status: 'enrolled',
      enrolledAt: new Date().toISOString()
    }
  });
});

// Get user enrollments
router.get('/enrollments', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        courseId: '1',
        status: 'in_progress',
        progress: 50,
        enrolledAt: '2024-01-01T00:00:00Z',
        totalStipendEarned: 1000
      }
    ]
  });
});

// Complete milestone
router.post('/milestones/:milestoneId/complete', (req, res) => {
  const { milestoneId } = req.params;
  
  res.json({
    success: true,
    message: 'Milestone completed successfully',
    data: {
      milestoneId,
      completedAt: new Date().toISOString(),
      stipendAmount: 1000
    }
  });
});

module.exports = router;
