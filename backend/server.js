const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Configure CORS to allow frontend origin
const corsOptions = {
    origin: ["https://captico-assignment-ebon.vercel.app/", "http://localhost:5173/"],
    methods: ["GET", "POST", "PUT", "DELETE"]
};

// Load environment variables from .env file
dotenv.config();

// Express Application Setup
const app = express();
app.use(express.json()); // Configures JSON parsing middleware for request bodies
app.use(cors(corsOptions)); // Implements CORS protection with defined options


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
