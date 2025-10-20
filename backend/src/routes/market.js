const express = require('express');
const router = express.Router();

// Get products
router.get('/products', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Handmade Soap Collection',
        description: 'Natural, organic handmade soaps',
        category: 'Beauty & Personal Care',
        price: 500,
        images: ['soap1.jpg', 'soap2.jpg'],
        isActive: true,
        createdAt: '2024-01-10T00:00:00Z'
      },
      {
        id: '2',
        title: 'Custom Wooden Furniture',
        description: 'Handcrafted wooden furniture pieces',
        category: 'Home & Garden',
        price: 15000,
        images: ['furniture1.jpg'],
        isActive: true,
        createdAt: '2024-01-12T00:00:00Z'
      }
    ],
    total: 2,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: 1
  });
});

// Create product
router.post('/products', (req, res) => {
  const { title, description, category, price, images } = req.body;
  
  res.json({
    success: true,
    message: 'Product created successfully',
    data: {
      id: Date.now().toString(),
      title,
      description,
      category,
      price,
      images,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  });
});

// Update product
router.put('/products/:productId', (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: {
      id: productId,
      ...updateData,
      updatedAt: new Date().toISOString()
    }
  });
});

module.exports = router;
