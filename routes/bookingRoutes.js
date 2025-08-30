const express = require('express');
const router = express.Router();
const {
  createBooking,
  createOfflineBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
  getBookingsByMentor
} = require('../controllers/bookingController');

const {
  createBookingValidation,
  createOfflineBookingValidation,
  updateBookingValidation,
  updateStatusValidation,
  queryValidation,
  idValidation
} = require('../middleware/validation');

/**
 * @route   POST /api/bookings
 * @desc    Create a new online booking (with PayPal)
 * @access  Public
 */
router.post('/', createBookingValidation, createBooking);

/**
 * @route   POST /api/bookings/offline
 * @desc    Create a new offline/cash booking (for dashboard use)
 * @access  Public
 */
router.post('/offline', createOfflineBookingValidation, createOfflineBooking);

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

/**
 * @route   GET /api/bookings/payment-method
 * @desc    Get bookings by payment method (online/offline/cash)
 * @access  Public
 */
router.get('/payment-method', queryValidation, (req, res) => {
  const { paymentMethod } = req.query;
  
  if (!paymentMethod || !['online', 'offline', 'cash'].includes(paymentMethod)) {
    return res.status(400).json({
      status: 'error',
      message: 'Payment method must be one of: online, offline, cash'
    });
  }

  // Call the controller function
  const { getBookingsByPaymentMethod } = require('../controllers/bookingController');
  return getBookingsByPaymentMethod(req, res);
});

module.exports = router; 