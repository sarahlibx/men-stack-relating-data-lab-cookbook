const mongoose = require('mongoose');

// pantry items that can belong to many users (many to many)
const foodSchema = mongoose.Schema({
  foods: {
    type: String,
    required: true,
  }
});

// pantry items that belong to one user
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
