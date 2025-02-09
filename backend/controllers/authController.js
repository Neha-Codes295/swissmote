const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Register a new user
 * @param {Object} req - Express request object containing username and password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with registration status
 */
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      username, 
      password: hashedPassword,
      role: 'user' // Set default role
    });
    
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

/**
 * Authenticate user and generate JWT token
 * @param {Object} req - Express request object containing username and password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token or error message
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user and verify password
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

/**
 * Create and login as a guest user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with guest JWT token
 */
const guestLogin = async (req, res) => {
  try {
    // Create temporary guest username with timestamp
    const guestUsername = `guest_${Date.now()}`;
    
    const guestUser = new User({ 
      username: guestUsername,
      password: await bcrypt.hash(Date.now().toString(), 10), // Random password
      role: 'guest'
    });
    
    await guestUser.save();

    // Generate limited-time token for guest
    const token = jwt.sign(
      { 
        userId: guestUser._id,
        role: 'guest'
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // Guest sessions expire after 2 hours
    );

    res.json({ 
      token,
      user: {
        username: guestUser.username,
        role: 'guest'
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating guest session", error: error.message });
  }
};

module.exports = { register, login, guestLogin };