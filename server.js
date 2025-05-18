const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
const restaurantRoutes = require('./routes/restaurantRoutes'); // Import restaurant routes
const cartRoutes = require('./routes/cart');
const dishRoutes = require('./routes/dishRoutes');
const app = express();
const path = require('path'); // Import 'path' module
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON requests

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/fooddelivery';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => console.error('Failed to connect to MongoDB:', error));


// Register routes
app.use('/api/users', userRoutes); // Register user-related routes
app.use('/api/admin', adminRoutes); // Register admin-related routes

// Register Routes
app.use('/api/restaurants', restaurantRoutes);
// Routes
app.use('/api/dishes', dishRoutes);

// app.use('/api', require('./routes/dishRoutes'));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
//home dish
app.use('/api/dishes', dishRoutes);
// Start the server
// Get all dishes from all restaurants, with city included


app.use('/api/cart', cartRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});