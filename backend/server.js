// Required dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
require("dotenv").config();

// Initialize express and create HTTP server
const app = express();
const server = http.createServer(app);

// Socket.IO configuration
const io = socketio(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Global middleware configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Make Socket.IO available in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Socket.IO event handlers
const setupSocketEvents = (socket) => {
  console.log("New client connected");

  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
    console.log(`Client joined event room: ${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

io.on("connection", setupSocketEvents);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

// Initialize server
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  
  await connectDB();
  
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});