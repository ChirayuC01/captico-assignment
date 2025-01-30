const express = require("express");
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    bulkUploadCourses
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Plural for collections
router.get("/courses", getCourses); // Fetch all courses
router.post("/courses", protect, createCourse); // Create a new course
router.post("/courses/bulk-upload", protect, bulkUploadCourses); // Create multiple new course

// Singular for individual entities
router.get("/course/:id", getCourseById); // Fetch a course by ID
router.put("/course/:id", protect, updateCourse); // Update a course by ID
router.delete("/course/:id", protect, deleteCourse); // Delete a course by ID

module.exports = router;
