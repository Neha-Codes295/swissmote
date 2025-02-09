const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Authentication Middleware
 * Protects all routes in this router by requiring valid authentication
 */
router.use(authMiddleware);

/**
 * Event Routes
 * GET    /api/events        - Get all events
 * POST   /api/events        - Create a new event
 * GET    /api/events/:id    - Get a specific event by ID
 * PUT    /api/events/:id    - Update a specific event
 * DELETE /api/events/:id    - Delete a specific event
 * POST   /api/events/:id/attend - Add current user as attendee to an event
 */

// Event listing and creation
router.get("/", eventController.getAllEvents);
router.post("/", eventController.createEvent);

// Single event operations
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

// Event attendance
router.post("/:id/attend", eventController.addAttendee);

module.exports = router;