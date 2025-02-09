import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Constants
const API_URL = "http://localhost:5000";
const SOCKET_CONFIG = { transports: ["polling"] };

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const socket = io(API_URL, SOCKET_CONFIG);
    
    // Fetch initial events data
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      }
    };

    // Handle real-time attendee updates
    const handleAttendeeUpdate = (data) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === data.eventId
            ? { ...event, attendees: data.attendees }
            : event
        )
      );
    };

    // Set up socket listeners
    socket.on("attendeeUpdate", handleAttendeeUpdate);
    
    // Fetch initial data
    fetchEvents();

    // Cleanup function
    return () => {
      socket.off("attendeeUpdate", handleAttendeeUpdate);
      socket.disconnect();
    };
  }, []); // Removed socket from dependencies as it's initialized inside useEffect

  // Render event card component
  const EventCard = ({ event }) => (
    <div key={event._id} className="event-card">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Attendees: {event.attendees.length}</p>
    </div>
  );

  return (
    <div className="event-dashboard">
      <h1>Event Dashboard</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="events-container">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventDashboard;