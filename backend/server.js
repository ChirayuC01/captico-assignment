const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Configure CORS to allow your frontend origin
const corsOptions = {
    origin: "https://captico-assignment-ebon.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"]
};

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
