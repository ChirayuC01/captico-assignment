const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Express Application Setup
const app = express();

// Configure CORS to allow frontend origin
const corsOptions = {
    origin: ["https://captico-assignment-ebon.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (if using cookies/sessions)
};

// Apply CORS before routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Allow preflight requests

// Load environment variables from .env file
dotenv.config();

app.use(express.json()); // Configures JSON parsing middleware for request bodies

// Server port configuration with fallback
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));


// API Routes Configuration
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

// Endpoint to verify API is running
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
