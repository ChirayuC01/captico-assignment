const express = require("express");
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    bulkUploadCourses
} = require("../controllers/courseController");

const router = express.Router();

// Plural for collections
router.get("/courses", getCourses); // Fetch all courses
router.post("/courses", createCourse); // Create a new course
router.post("/courses/bulk-upload", bulkUploadCourses); // Create multiple new course

// Singular for individual entities
router.get("/course/:id", getCourseById); // Fetch a course by ID
router.put("/course/:id", updateCourse); // Update a course by ID
router.delete("/course/:id", deleteCourse); // Delete a course by ID

module.exports = router;
