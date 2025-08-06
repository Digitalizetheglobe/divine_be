const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
  getBookingsByMentor
} = require('../controllers/bookingController');

const {
  createBookingValidation,
  updateBookingValidation,
  updateStatusValidation,
  queryValidation,
  idValidation
} = require('../middleware/validation');

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/', createBookingValidation, createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings with pagination and filtering
 * @access  Public
 */
router.get('/', queryValidation, getAllBookings);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID
 * @access  Public
 */
router.get('/:id', idValidation, getBookingById);

/**
 * @route   PUT /api/bookings/:id
 * @desc    Update booking by ID
 * @access  Public
 */
router.put('/:id', updateBookingValidation, updateBooking);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete booking by ID
 * @access  Public
 */
router.delete('/:id', idValidation, deleteBooking);

/**
 * @route   PATCH /api/bookings/:id/status
 * @desc    Update booking status
 * @access  Public
 */
router.patch('/:id/status', updateStatusValidation, updateBookingStatus);

/**
 * @route   GET /api/bookings/mentor/:mentorName
 * @desc    Get bookings by mentor name
 * @access  Public
 */
router.get('/mentor/:mentorName', queryValidation, getBookingsByMentor);

module.exports = router; 