const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Add to cart (increment quantity if already exists)
router.post('/add', async (req, res) => {
  try {
    const { userId, dish } = req.body;
    let cartItem = await Cart.findOne({ userId, dishId: dish._id });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId,
        dishId: dish._id,
        dishName: dish.dishName,
        price: dish.price,
        restaurantName: dish.restaurantName,
        quantity: 1
      });
      await cartItem.save();
    }
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err });
  }
});

// Get all cart items for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
});

// Update quantity for a cart item
router.patch('/:cartItemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findById(req.params.cartItemId);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: 'Quantity updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating quantity', error: err });
  }
});

// Remove a single cart item
// routes/cart.js
router.delete('/:cartItemId', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartItemId);
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    console.error(err); // <--- check this log
    res.status(500).json({ message: 'Error removing cart item', error: err });
  }
});
// Clear cart for a user
router.delete('/user/:userId', async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart', error: err });
  }
});

module.exports = router;