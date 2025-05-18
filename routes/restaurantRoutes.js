const express = require('express');
const { addToDecision } = require('../controllers/restaurantController'); // Import the function
const {
  getPendingRestaurants,
  approveRestaurant,
  rejectRestaurant
} = require('../controllers/restaurantController');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController'); // <-- MUST BE HERE
// Route to add restaurant details to the decision table
router.post('/decision', addToDecision);
// Fetch all pending restaurants
router.get('/decision', getPendingRestaurants);

// Approve a restaurant
router.patch('/approve/:id', approveRestaurant);

// Reject a restaurant
router.delete('/reject/:id', rejectRestaurant);



const Restaurant = require('../models/restaurantModel'); // Include your restaurant model



 // Sign-in Route
router.post('/signin', async (req, res) => {
  const { restaurantName, mailId, password } = req.body;

  try {
    // Find the restaurant by restaurantName, mailId, and password
    const restaurant = await Restaurant.findOne({ restaurantName, mailId, password });

    if (restaurant) {
      res.status(200).json({ message: 'Sign-in successful', restaurant });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
router.get('/all', async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants from the database
    res.json(restaurants); // Send the restaurants as a JSON response
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).send('Error fetching restaurants');
  }
});
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);
// Get all dishes from all restaurants
router.get('/all-dishes', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    // Assuming each restaurant has a 'dishes' array field
    let allDishes = [];
    restaurants.forEach(r => {
      if (r.dishes && Array.isArray(r.dishes)) {
        // Add restaurant reference to each dish if you want to show restaurant details
        allDishes = allDishes.concat(r.dishes.map(dish => ({
          ...dish,
          restaurantName: r.restaurantName
        })));
      }
    });
    res.json(allDishes);
  } catch (error) {
    res.status(500).send('Error fetching dishes');
  }
});
module.exports = router;