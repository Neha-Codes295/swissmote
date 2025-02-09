const mongoose = require("mongoose");

/**
 * User Schema Definition
 * Defines the structure for user documents in MongoDB
 * @property {String} username - Unique identifier for the user
 * @property {String} password - Hashed password for user authentication
 * @property {String} role - User access level (user/guest)
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove whitespace from both ends
    minlength: [3, 'Username must be at least 3 characters long']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ["user", "guest"],
    default: "user",
    lowercase: true // Ensure role is always stored in lowercase
  },
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the User model
module.exports = mongoose.model("User", userSchema);