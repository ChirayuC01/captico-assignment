const Course = require("../models/Course");
const courseValidationSchema = require("../validations/courseValidation");

// Create a new course
const createCourse = async (req, res) => {
    const { name, description, instructor } = req.body;

    // Validate input
    const { error } = courseValidationSchema.validate({ name, description, instructor });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const course = new Course({ name, description, instructor });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create Multiple Courses
const bulkUploadCourses = async (req, res) => {
    const courses = req.body;

    // Validate each course in the array
    const invalidCourses = [];
    const validCourses = [];

    for (const course of courses) {
        const { name, description, instructor } = course;
        const { error } = courseValidationSchema.validate({ name, description, instructor });
        if (error) {
            invalidCourses.push({ course, error: error.details[0].message });
        } else {
            validCourses.push({ name, description, instructor });
        }
    }

    if (invalidCourses.length > 0) {
        return res.status(400).json({
            message: "Some courses failed validation",
            invalidCourses,
        });
    }

    try {
        // Save all valid courses to the database
        const savedCourses = await Course.insertMany(validCourses);
        res.status(201).json({
            message: "Courses uploaded successfully",
            savedCourses,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a specific course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a course by ID
const updateCourse = async (req, res) => {
    const { name, description, instructor } = req.body;

    // Validate input
    const { error } = courseValidationSchema.validate({ name, description, instructor });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        course.name = name || course.name;
        course.description = description || course.description;
        course.instructor = instructor || course.instructor;

        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Delete a course by ID
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    bulkUploadCourses
};
