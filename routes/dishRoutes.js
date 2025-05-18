const express = require('express');
const multer = require('multer');
const Dish = require('../models/dishModel');

const router = express.Router();

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Add a new dish
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { dishName, description, price, cuisine, type, restaurantName, mailId } = req.body;

    if (!dishName || !description || !price || !cuisine || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newDish = new Dish({
      dishName,
      description,
      price,
      cuisine,
      type,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Save the relative path of the image
      restaurantName,
      mailId,
    });

    await newDish.save();
    res.status(201).json({ message: 'Dish added successfully!', dish: newDish });
  } catch (error) {
    console.error('Error while adding dish:', error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

// Fetch all dishes for a restaurant
router.get('/', async (req, res) => {
  try {
    const { restaurantName, mailId } = req.query;

    const dishes = await Dish.find({ restaurantName, mailId });
    res.status(200).json({ dishes });
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ message: 'Failed to fetch dishes' });
  }
});



// Edit/Update a dish
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { dishName, description, price, cuisine, type } = req.body;

    const updatedData = {
      dishName,
      description,
      price,
      cuisine,
      type,
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedDish = await Dish.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json({ message: 'Dish updated successfully!', dish: updatedDish });
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(500).json({ message: 'Failed to update dish' });
  }
});

// Delete a dish
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDish = await Dish.findByIdAndDelete(id);

    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json({ message: 'Dish deleted successfully!' });
  } catch (error) {
    console.error('Error deleting dish:', error);
    res.status(500).json({ message: 'Failed to delete dish' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const dishes = await Dish.find(); // or any logic for all dishes
    res.json(dishes);
  } catch (error){
    res.status(500).send('Error fetching dishes');
  }
});


module.exports = router;