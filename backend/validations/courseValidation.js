const Joi = require("joi");

const courseValidationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.base": "Name should be a string.",
        "string.empty": "Name is required.",
        "string.min": "Name should have at least 3 characters.",
        "string.max": "Name should not exceed 100 characters.",
    }),
    description: Joi.string().min(3).max(500).required().messages({
        "string.base": "Description should be a string.",
        "string.empty": "Description is required.",
        "string.min": "Description should have at least 10 characters.",
        "string.max": "Description should not exceed 500 characters.",
    }),
    instructor: Joi.string().min(3).max(50).required().messages({
        "string.base": "Instructor name should be a string.",
        "string.empty": "Instructor name is required.",
        "string.min": "Instructor name should have at least 3 characters.",
        "string.max": "Instructor name should not exceed 50 characters.",
    }),
});

module.exports = courseValidationSchema;
