// models/cart.js
const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  dishId: { type: String, required: true },
  dishName: String,
  price: Number,
  restaurantName: String,
  quantity: { type: Number, default: 1 }
});
module.exports = mongoose.model('Cart', cartSchema);