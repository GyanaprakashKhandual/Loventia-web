const { body, validationResult } = require('express-validator');
const User = require('../models/user.model'); // Adjust the path to your User model

// Common validation rules
const userValidationRules = () => {
  return [
    // Profile Image validation
    body('profileImage')
      .notEmpty().withMessage('Profile image is required')
      .isString().withMessage('Profile image must be a string'),
    
    // Full Name validation
    body('fullName')
      .notEmpty().withMessage('Full name is required')
      .isString().withMessage('Full name must be a string')
      .trim()
      .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
    
    // Email validation
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail()
      .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('Email already in use');
        }
      }),
    
    // Phone number validation (adjust based on your requirements)
    body('no')
      .notEmpty().withMessage('Phone number is required')
      .isString().withMessage('Phone number must be a string')
      .trim()
      .isMobilePhone().withMessage('Invalid phone number')
      .custom(async (no) => {
        const existingUser = await User.findOne({ no });
        if (existingUser) {
          throw new Error('Phone number already in use');
        }
      }),
    
    // Gender validation
    body('gender')
      .optional()
      .isIn(['Male', 'Female', 'Prefer not to Say']).withMessage('Invalid gender value'),
    
    // Email verified validation
    body('emailVerified')
      .notEmpty().withMessage('Email verification status is required')
      .isBoolean().withMessage('Email verification must be a boolean'),
    
    // Phone number verified validation
    body('noVerified')
      .notEmpty().withMessage('Phone verification status is required')
      .isBoolean().withMessage('Phone verification must be a boolean')
  ];
};

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};