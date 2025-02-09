const express = require("express");
const authController = require("../controllers/authController");

/**
 * Express router instance to handle authentication routes
 */
const router = express.Router();

/**
 * Authentication Routes
 * POST /auth/register - Register a new user
 * POST /auth/login - Login existing user
 * POST /auth/guest-login - Login as guest user
 */
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/guest-login", authController.guestLogin);

// Export the router for use in the main application
module.exports = router;