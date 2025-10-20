const express = require('express');
const router = express.Router();

// Get messages
router.get('/messages', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        from: 'MSME Department',
        subject: 'Training Schedule Update',
        content: 'Your next training session has been rescheduled to next week.',
        date: '2024-01-15',
        read: false,
        attachments: ['schedule.pdf'],
        type: 'inbox'
      },
      {
        id: '2',
        from: 'You',
        subject: 'Grant Application Inquiry',
        content: 'I would like to inquire about the status of my grant application.',
        date: '2024-01-14',
        read: true,
        type: 'sent'
      }
    ],
    total: 2,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: 1
  });
});

// Send message
router.post('/messages', (req, res) => {
  const { to, subject, content, attachments } = req.body;
  
  res.json({
    success: true,
    message: 'Message sent successfully',
    data: {
      id: Date.now().toString(),
      to,
      subject,
      content,
      attachments,
      sentAt: new Date().toISOString()
    }
  });
});

// Get notifications
router.get('/notifications', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        type: 'training',
        title: 'New Course Available',
        message: 'Digital Marketing Advanced course is now available',
        isRead: false,
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        type: 'funding',
        title: 'Grant Application Status',
        message: 'Your grant application has been approved',
        isRead: true,
        createdAt: '2024-01-14T00:00:00Z'
      }
    ]
  });
});

// Mark message as read
router.put('/messages/:messageId/read', (req, res) => {
  const { messageId } = req.params;
  
  res.json({
    success: true,
    message: 'Message marked as read',
    data: {
      messageId,
      readAt: new Date().toISOString()
    }
  });
});

module.exports = router;
