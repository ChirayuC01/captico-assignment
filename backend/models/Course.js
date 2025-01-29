const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Automatically set to current date
});

module.exports = mongoose.model("Course", courseSchema);
