const mongoose = require('mongoose');

// Define Mongoose Schema for Users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userid: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  address: { type: String, required: true },
  password: { 
    type: String, 
    required: true, 
    minlength: 8, 
    match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
  },
  profilePhoto: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;