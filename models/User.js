const mongoose = require('mongoose');

// Check if the model is already compiled to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  password: { type: String, required: true }, // Assuming hashed passwords
}, { timestamps: true }));

module.exports = User;