const User = require('../models/User');



// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    // Include the 'password' field along with other user details
    const users = await User.find({}, 'userid username phone email address password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};




// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { username, userid, phone, email, address, password, createdAt } = req.body;
    
    // Create a new user instance
    const newUser = new User({
      username,
      userid,
      phone,
      email,
      address,
      password,
      createdAt,
    });
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: savedUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Failed to add user' });
  }
};