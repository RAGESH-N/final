const User = require('../models/userModel'); // Import the user model

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, userid, phone, email, address, password } = req.body;

    // Check for missing fields
    if (!username || !userid || !phone || !email || !address || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    // Check if User ID already exists
    const existingUserById = await User.findOne({ userid });
    if (existingUserById) {
      return res.status(400).json({ message: 'User ID already exists!' });
    }
    // Check if Phone Number already exists
    const existingUserByPhone = await User.findOne({ phone });
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'Phone number already exists!' });
    }
    // Create new user document
    const newUser = new User({
      username,
      userid,
      phone,
      email,
      address,
      password,
      profilePhoto: req.file ? `/uploads/${req.file.filename}` : null, // Save file path
    });
    // Save user to MongoDB
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error registering user:', err); // Log the error
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
};




// Login user with userId or phone

exports.loginUser = async (req, res) => {
  const { identifier, password } = req.body; // `identifier` can be userId or phone

  try {
    // Find user by userId or phone
    const user = await User.findOne({
      $or: [{ userid: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    // Successful login: Return user details
    res.status(200).json({
      message: 'Login successful!',
      userId: user.userid,
      profilePhoto: user.profilePhoto,
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};


// const User = require('../models/userModel'); // User Model





exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userid: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      userid: user.userid,
      phone: user.phone,
      email: user.email,
      address: user.address,
      profilePhoto: user.profilePhoto,
    });
  } catch (err) {
    console.error('Error fetching user details:', err.message);
    res.status(500).json({ message: 'An error occurred while fetching user details.' });
  }
};


// Reset Password
exports.resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({ userid: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Update the password
    user.password = newPassword; // Ideally, hash the password before saving
    await user.save();

    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'An error occurred while resetting the password.', error: error.message });
  }
};



