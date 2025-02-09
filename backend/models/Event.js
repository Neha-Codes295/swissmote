const mongoose = require("mongoose");

/**
 * Event Schema - Defines the structure for events in the application
 * @schema Event
 */
const eventSchema = new mongoose.Schema({
  // Basic event information
  name: { 
    type: String, 
    required: true,
    trim: true // Removes whitespace from both ends
  },
  
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  
  date: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(date) {
        return date >= new Date(); // Ensures date is not in the past
      },
      message: 'Event date cannot be in the past'
    }
  },
  
  location: { 
    type: String, 
    required: true,
    trim: true
  },
  
  image: { 
    type: String, 
    required: true,
    trim: true
  },
  
  // Relationships
  attendees: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" // References the User model
  }],
  
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create indexes for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ createdBy: 1 });

// Export the model
module.exports = mongoose.model("Event", eventSchema);