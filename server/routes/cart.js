const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// In-memory cart storage (in production, use Redis or database)
let carts = {};

// Get cart
router.get('/', protect, (req, res) => {
  const cart = carts[req.user._id] || [];
  res.json(cart);
});

// Add to cart
router.post('/', protect, (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!carts[req.user._id]) {
    carts[req.user._id] = [];
  }

  const cart = carts[req.user._id];
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    cart.push({ productId, quantity: quantity || 1 });
  }

  res.json(cart);
});

// Update cart item
router.put('/:productId', protect, (req, res) => {
  const { quantity } = req.body;
  
  if (!carts[req.user._id]) {
    carts[req.user._id] = [];
  }

  const cart = carts[req.user._id];
  const item = cart.find(item => item.productId === req.params.productId);

  if (item) {
    item.quantity = quantity;
  }

  res.json(cart);
});

// Remove from cart
router.delete('/:productId', protect, (req, res) => {
  if (!carts[req.user._id]) {
    carts[req.user._id] = [];
  }

  carts[req.user._id] = carts[req.user._id].filter(
    item => item.productId !== req.params.productId
  );

  res.json(carts[req.user._id]);
});

// Clear cart
router.delete('/', protect, (req, res) => {
  carts[req.user._id] = [];
  res.json([]);
});

module.exports = router;

