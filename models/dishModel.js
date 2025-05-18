const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Veg', 'Non-Veg'],
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  mailId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Dish', dishSchema);