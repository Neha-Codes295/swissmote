const Event = require("../models/Event");

/**
 * Event Controller
 * Handles all event-related operations including CRUD and attendee management
 */

/**
 * Creates a new event
 * @route POST /api/events
 * @access Private
 */
const createEvent = async (req, res) => {
  try {
    const { name, description, date, location, image } = req.body;
    const createdBy = req.user.userId;

    const event = await Event.create({ 
      name, 
      description, 
      date, 
      location, 
      image, 
      createdBy 
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to create event", 
      error: error.message 
    });
  }
};

/**
 * Retrieves all events with creator information
 * @route GET /api/events
 * @access Public
 */
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "username")
      .sort({ date: 1 }); // Sort by date ascending

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch events", 
      error: error.message 
    });
  }
};

/**
 * Retrieves a single event by its ID
 * @route GET /api/events/:id
 * @access Public
 */
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "username");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch event", 
      error: error.message 
    });
  }
};

/**
 * Updates an existing event
 * @route PUT /api/events/:id
 * @access Private (Event Creator Only)
 */
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      image: req.body.image
    };

    // Find event and check authorization in one query
    const event = await Event.findOne({ 
      _id: id, 
      createdBy: req.user.userId 
    });

    if (!event) {
      return res.status(404).json({ 
        message: "Event not found or unauthorized" 
      });
    }

    // Update only provided fields
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        event[key] = updates[key];
      }
    });

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to update event", 
      error: error.message 
    });
  }
};

/**
 * Deletes an event
 * @route DELETE /api/events/:id
 * @access Private (Event Creator Only)
 */
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ 
      _id: req.params.id, 
      createdBy: req.user.userId 
    });

    if (!event) {
      return res.status(404).json({ 
        message: "Event not found or unauthorized" 
      });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to delete event", 
      error: error.message 
    });
  }
};

/**
 * Adds current user as an attendee to an event
 * @route POST /api/events/:id/attend
 * @access Private
 */
const addAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = req.user.userId;

    // Check if user is already attending
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ 
        message: "You are already registered for this event" 
      });
    }

    // Add attendee and save in one operation
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $push: { attendees: userId } },
      { new: true }
    );

    // Emit real-time update
    req.io.emit("attendeeUpdate", { 
      eventId: req.params.id, 
      attendees: updatedEvent.attendees 
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to register for event", 
      error: error.message 
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addAttendee,
};