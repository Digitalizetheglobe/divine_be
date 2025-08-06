const { body, param, query } = require('express-validator');

// Validation rules for creating a booking - All fields optional
const createBookingValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  
  body('date')
    .optional()
    .isDate()
    .withMessage('Date must be a valid date'),
  
  body('time')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),
  
  body('contact')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Contact must not exceed 20 characters'),
  
  body('message')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters'),
  
  body('mentorName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Mentor name must not exceed 100 characters'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  
  body('postalCode')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('Postal code must not exceed 10 characters'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('City must not exceed 50 characters'),
  
  body('demo1')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo1 must not exceed 255 characters'),
  
  body('demo2')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo2 must not exceed 255 characters'),
  
  body('demo3')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo3 must not exceed 255 characters'),
  
  body('demo4')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo4 must not exceed 255 characters'),
  
  body('demo5')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo5 must not exceed 255 characters')
];

// Validation rules for updating a booking
const updateBookingValidation = [
  param('id')
    .isInt()
    .withMessage('Booking ID must be a valid integer'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('date')
    .optional()
    .isDate()
    .withMessage('Date must be a valid date'),
  
  body('time')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),
  
  body('contact')
    .optional()
    .isLength({ min: 10, max: 20 })
    .withMessage('Contact must be between 10 and 20 characters')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Contact must contain only numbers, spaces, hyphens, and parentheses'),
  
  body('message')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters'),
  
  body('mentorName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Mentor name must be between 2 and 100 characters'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Address must be between 10 and 500 characters'),
  
  body('postalCode')
    .optional()
    .trim()
    .isLength({ min: 5, max: 10 })
    .withMessage('Postal code must be between 5 and 10 characters'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  
  body('demo1')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo1 must not exceed 255 characters'),
  
  body('demo2')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo2 must not exceed 255 characters'),
  
  body('demo3')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo3 must not exceed 255 characters'),
  
  body('demo4')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo4 must not exceed 255 characters'),
  
  body('demo5')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Demo5 must not exceed 255 characters')
];

// Validation rules for updating booking status
const updateStatusValidation = [
  param('id')
    .isInt()
    .withMessage('Booking ID must be a valid integer'),
  
  body('status')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be one of: pending, confirmed, cancelled, completed')
    .notEmpty()
    .withMessage('Status is required')
];

// Validation rules for query parameters
const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be one of: pending, confirmed, cancelled, completed'),
  
  query('mentorName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Mentor name must be between 2 and 100 characters')
];

// Validation rules for ID parameter
const idValidation = [
  param('id')
    .isInt()
    .withMessage('Booking ID must be a valid integer')
];

module.exports = {
  createBookingValidation,
  updateBookingValidation,
  updateStatusValidation,
  queryValidation,
  idValidation
}; 