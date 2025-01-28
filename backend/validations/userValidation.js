const Joi = require("joi");

const registerValidation = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.base": "Name should be a string.",
        "string.empty": "Name is required.",
        "string.min": "Name should have at least 3 characters.",
        "string.max": "Name should not exceed 50 characters.",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a string.",
        "string.email": "Email must be a valid email.",
        "string.empty": "Email is required.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password should be a string.",
        "string.empty": "Password is required.",
        "string.min": "Password should have at least 6 characters.",
    }),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a string.",
        "string.email": "Email must be a valid email.",
        "string.empty": "Email is required.",
    }),
    password: Joi.string().required().messages({
        "string.base": "Password should be a string.",
        "string.empty": "Password is required.",
    }),
});

module.exports = { registerValidation, loginValidation };
