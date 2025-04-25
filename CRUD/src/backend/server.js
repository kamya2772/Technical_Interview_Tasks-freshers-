// backend/server.js
require("dotenv").config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todos"); // Import the routes

// Express App
const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (allows frontend to call backend)
app.use(express.json()); // Parses incoming JSON requests (req.body)

// Log requests (Optional)
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// API Routes
app.use("/api/todos", todoRoutes); // Mount the todo routes under /api/todos

// Global Error Handler (Basic Example)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).send("Something broke!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    // Start listening for requests only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if DB connection fails
  });
