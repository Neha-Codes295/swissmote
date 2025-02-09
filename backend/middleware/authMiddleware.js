const jwt = require("jsonwebtoken");

/**
 * Authentication middleware to verify JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.header("Authorization");
  
  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ 
      message: "Access denied. No authorization header provided" 
    });
  }

  // Extract token (remove "Bearer " prefix)
  const token = authHeader.replace("Bearer ", "");
  
  try {
    // Verify token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user information to request object
    req.user = decoded;
    
    // Proceed to next middleware/route handler
    next();
  } catch (error) {
    // Return error if token is invalid or expired
    return res.status(401).json({ 
      message: "Invalid or expired token",
      error: error.message 
    });
  }
};

module.exports = authMiddleware;