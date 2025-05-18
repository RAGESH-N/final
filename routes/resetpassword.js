const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User model

// Reset Password Endpoint
router.post('/reset-password', async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the password in plain text
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;